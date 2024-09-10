/* eslint-disable react-hooks/exhaustive-deps */
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import Modal from "@/components/comman/Modal";
import PasswordInputWithLabel from "@/components/comman/PasswordInputWithLabel";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { InputWithLable } from "@/components/ui/inputwithlable";
// import { ToastAction } from "@/components/ui/toast";
import RegisterSideImage from "@/assets/images/LandingapageCompany.png";
import RunnerIcon from "@/assets/images/RunnerIcon.svg";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import { useToast } from "@/components/ui/use-toast";
import { RegisterContext } from "@/context/RegisterContext";
import { getDeviceToken } from "@/firebaseConfig";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  setClientRole,
  setCompanyId,
  setUserData,
} from "@/redux/reducer/CompanyReducer";
import { setPath } from "@/redux/reducer/PathReducer";
import { LogOut, ResendOtp } from "@/services/apiServices/authService";
import { checkOTP, createCompany } from "@/services/apiServices/company";
import { RegisterEmployee } from "@/services/apiServices/employee";
import { ErrorType, ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Please enter atleast 3 characters in company name" }),
    email: z
      .string()
      .min(1, { message: "Please enter email" })
      .email("Please enter valid email"),
    password: z
      .string()
      .min(1, { message: "Please enter password" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|-]).{8,}$/,
        "Password must contain at least one uppercase letter, one number, one special character, and a minimum of 8 characters"
      ),
    cpassword: z.string().min(1, { message: "Please enter confirm password" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password don't match",
    path: ["cpassword"], // Set the error path to 'cpassword'
  });

function Register() {
  const { clientId } = useAppSelector((state) => state.user);
  const [time, setTime] = useState<number>(0);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const {
    selectedRole,
    setSelectedRole,
    setShowRegistrationForm,
    showRegistrationForm,
  } = useContext(RegisterContext);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const email = watch("email");

  const { mutate: logout, isPending: logoutPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
      dispatch(setPath([]));
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    const userData = localStorage?.getItem("user");
    if (userData) {
      const user = JSON.parse(userData as string);
      const userId = user?.query ? user?.query?.id : user?.id;
      logout(userId);
    }
  };

  useEffect(() => {
    if (searchParams.get("email") || searchParams.get("type")) {
      handleLaunchJourney();
      setSelectedRole("company");
      setValue("email", searchParams.get("email") || "");
      handleLogout();
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const { mutate: registerEmployee, isPending: registerPending } = useMutation({
    mutationFn: RegisterEmployee,
    onSuccess: async (data) => {
      setTime(179);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.companyList],
      });
      setShowOtpPopup(false);
      dispatch(setCompanyId(data?.data?.data?.user?.id));
      localStorage.setItem("user", JSON.stringify(data?.data));
      navigate("/employee/dashboard");
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const { mutate: createcompany, isPending: createPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: async (data) => {
      dispatch(setCompanyId(data?.data?.data?.user?.id));
      // dispatch(setCompanyId(data?.data?.data?.user?.clientId));

      setShowOtpPopup(true);
      setTime(179);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.companyList],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const { mutate: createotp, isPending: createOtp } = useMutation({
    mutationFn: checkOTP,
    onSuccess: async (data) => {
      setShowOtpPopup(false);
      dispatch(setUserData(data?.data?.data?.id));
      dispatch(setClientRole(+data?.data?.data.role));
      dispatch(setCompanyId(data?.data?.data?.user?.id));
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.companyList],
      });
      localStorage.setItem("user", JSON?.stringify(data.data.data));
      localStorage.setItem(
        "path",
        JSON.stringify(data.data.data?.query?.pathStatus)
      );
      Cookies.set("accessToken", data?.data?.data?.accessToken);
      navigate("/assessment");
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   cssEase: "linear",
  //   arrows: false,
  // };

  const handleLaunchJourney = () => {
    setShowRegistrationForm(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ResendOtp,
    onSuccess: async () => {
      setTime(179);
      setShowOtpPopup(true);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (
    data: FieldValues
  ) => {
    if (searchParams.get("email") || searchParams.get("type")) {
      mutate({ email: searchParams.get("email") || email });
    } else {
      createcompany({ email: data.email, client: clientId });
    }
  };

  useEffect(() => {
    if (!clientId) {
      navigate("/");
    }
  }, [clientId]);

  const getToken = async () => {
    const token = await getDeviceToken();
    setDeviceToken(token || "");
  };

  useEffect(() => {
    getToken();
  }, []);

  console.log(deviceToken, "deviceToken++++++++++++++++++++");

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const getData = getValues();
    console.log("I am Called................");
    if (searchParams.get("email") || searchParams.get("type")) {
      console.log(getData, "getData+++++++++++++++++02");
      const payload = {
        name: getData?.name,
        email:
          (searchParams.get("email") as string) || (getData?.email as string),
        password: getData?.password,
        cpassword: getData?.cpassword,
        otp: +otp,
        deviceToken: deviceToken,
      };
      registerEmployee(payload);
    } else {
      console.log(getData, "getData");

      const payload = {
        ...getData,
        otp,
        client: clientId,
        deviceToken: deviceToken,
      };
      createotp(payload);
    }
  };

  const handleResendOtp = (email: string) => {
    mutate({ email: email });
  };

  return (
    <div className="">
      <HomeHeader />
      <div className="mainContailner">
        <div className="flex justify-center my-[26px]">
          {showRegistrationForm || selectedRole === "company" ? (
            <>
              <img
                src={RegisterSideImage}
                className="xl:w-auto min-w-[530px] w-[530px] h-full lg:block hidden"
                alt="LandingPageBuildImage"
                loading="lazy"
              />
            </>
          ) : (
            <div className="relative lg:block hidden">
              <img
                className="max-w-full w-full xl:h-[750px] h-[650px]"
                src="../assets/img/Image.png"
              />

              <h2 className="absolute top-[60px] left-1/2 -translate-x-1/2 text-white xl:text-[30px] text-[28px] xl:max-w-[505px] max-w-[400px] xl:leading-[46px] leading-[36px] w-full font-d-din-pro">
                <span className="text-[#73AF26]">Empower</span> your potential
                through our comprehensive training programs, where knowledge
                meets innovation
              </h2>
              <img
                className="absolute xl:bottom-[80px] bottom-[100px] left-1/2 -translate-x-1/2 max-h-[365px] h-auto"
                src="../assets/img/pngwing.png"
              />
            </div>
          )}

          <div className="w-full 2xl:px-0 px-5 sm:mt-[33px] mt-[20px] sm:max-w-[515px] max-w-[450px] mx-auto flex flex-col justify-between">
            <div>
              {!selectedRole && (
                <div className="flex justify-end text-[#000]">
                  <label>
                    Already have an account?{" "}
                    <Link to={"/auth"} className="font-[700] text-[#042937]">
                      Sign In
                    </Link>
                  </label>
                </div>
              )}

              {selectedRole !== "company" ? (
                <div className="lg:h-[524px] h-[350px] relative md:mt-[92px] sm:mt-[70px] mt-[45px]">
                  <div className="">
                    <div className="flex items-center justify-between">
                      <h3 className="sm:text-[24px] text-[22px] font-[700]  font-abhaya">
                        Which best describes you?
                      </h3>
                      <img className="" src={RunnerIcon} alt="RunnerIcon" />
                    </div>
                    <img className="" src="../assets/img/Line 23.png" />
                    <p className="text-[16px] font-[400] mt-3 font-abhaya text-[#000]">
                      Select your role so we can get you to the right place.
                    </p>
                    <div className="flex sm:flex-nowrap flex-wrap sm:gap-[40px] gap-[20px] mt-[40px]">
                      <PrimaryButton
                        name="I’m A Trainer"
                        onClick={() => {
                          navigate("/trainer-regestration");
                        }}
                        className="sm:w-[198px] w-full sm:h-[72px] h-[60px] sm:text-lg text-base flex items-center justify-center gap-[8px] primary-background text-color !font-abhaya font-semibold"
                        symbol={<img src="../assets/img/Analyzing Skill.png" />}
                      />

                      <PrimaryButton
                        name="I’m A Company"
                        onClick={() => {
                          setSelectedRole("company");
                        }}
                        className="sm:w-[198px] w-full sm:h-[72px] h-[60px] sm:text-lg text-base flex items-center justify-center gap-[8px] primary-background text-color !font-abhaya font-semibold"
                        symbol={<img src="../assets/img/Company.png" />}
                      />
                    </div>
                  </div>
                </div>
              ) : showRegistrationForm ? (
                <div className="">
                  <div className=" relative mt-[60px]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[24px] font-bold">
                        Just a few details away
                      </h3>
                      <img className="" src={RunnerIcon} alt="RunnerIcon" />
                    </div>
                    <img className="" src="../assets/img/Line 23.png" />
                    <p className="2xl:w-[530px] xl:w-[500px] w-[400px] h-[80px] text-[16px] font-[400] text-[#000]">
                      Simply fill in your company name, email, create a
                      password—and you’ll be sent a one-time password to get
                      directly in.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-2">
                        <InputWithLable
                          label="Registered Company Name"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Company Name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <ErrorMessage
                            message={errors.name.message as string}
                          />
                        )}
                      </div>
                      <div className="mb-2">
                        <InputWithLable
                          label="Email"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Email"
                          disabled={!!searchParams.get("email")}
                          {...register("email")}
                        />
                        {errors.email && (
                          <ErrorMessage
                            message={errors.email.message as string}
                          />
                        )}
                      </div>
                      <div className="mb-2">
                        <PasswordInputWithLabel
                          label="Set a Password"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Password"
                          {...register("password")}
                          error={errors?.password?.message as string}
                        />
                      </div>
                      <div className="mb-2">
                        <PasswordInputWithLabel
                          label="Confirm Password"
                          className="h-[46px] border solid 1.5px"
                          placeholder="Enter Confirm Password"
                          {...register("cpassword")}
                          error={errors?.cpassword?.message as string}
                        />
                      </div>

                      <div className=" mt-[20px] flex gap-x-[40px]">
                        <button
                          type="submit"
                          className="w-full h-[48px] bg-[#00778B] rounded-[4px] text-white"
                        >
                          Get OTP
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="w-full lg:mt-[92px] mt-[70px]">
                  <div className="lg:h-[524px] h-[300px] relative ">
                    <div className="flex items-center justify-between">
                      <h3 className="font-[700] xl:text-[24px] text-[22px]">
                        Let’s get your company assessed
                      </h3>
                      <img className="" src={RunnerIcon} alt="RunnerIcon" />
                    </div>
                    <img className="" src="../assets/img/Line 23.png" />

                    <p className="sm:w-[450px] w-full xl:w-full text-[#000]">
                      Just a few details to fill in, and you’ll be able to
                      self-assess where your company is now on their
                      sustainability journey.
                    </p>

                    <div className="mt-[20px] flex gap-x-[40px] ">
                      <button
                        className="w-[300px] h-[40px] bg-[#00778B] rounded-[4px] text-white"
                        onClick={handleLaunchJourney}
                      >
                        Start Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <div
              className="mt-[29px] flex justify-center gap-x-[19px]"
              id="auth-slider"
            >
              <div>
                <img className="" src="../assets/img/Group 1000001825.png" />
              </div>
              <Slider className="w-[381px] h-[44px]" {...settings}>
                <div>
                  <span className="text-color">
                    “Small choices, big impact. Ripples of eco-friendly actions
                    shape a{" "}
                    <span className="button-text-color">
                      sustainable future
                    </span>
                    ”
                  </span>
                </div>
                <div>
                  <span className="text-color">
                    “Small choices, big impact. Ripples of eco-friendly actions
                    shape a{" "}
                    <span className="button-text-color">
                      sustainable future
                    </span>
                    ”
                  </span>
                </div>
                <div>
                  <span className="text-color">
                    “Small choices, big impact. Ripples of eco-friendly actions
                    shape a{" "}
                    <span className="button-text-color">
                      sustainable future
                    </span>
                    ”
                  </span>
                </div>
              </Slider>
            </div> */}

            <div className="max-w-[296px] mx-auto mb-[37px] font-[400] text-[12px] text-center text-[#898989]">
              <label>
                Protected by reCAPTCHA and subject to the Skillnet
                <Link
                  to={"/privacypolicy"}
                  className="text-[#042937] font-bold mx-1"
                >
                  Privacy Policy
                </Link>
                and
                <Link
                  to={"/termsofservices"}
                  className="text-[#042937] font-bold mx-1"
                >
                  Terms of Service.
                </Link>
              </label>
            </div>
          </div>
        </div>
        <Modal
          open={showOtpPopup}
          onClose={() => setShowOtpPopup(false)}
          className="max-w-[550px]"
        >
          <div className="mb-[2px] mt-2 text-center font-abhaya">
            <h2 className="text-xl font-semibold">
              Please verify the one-time password in your inbox
            </h2>
            <p className="text-[#848181] text-[16px] font-abhaya">
              A one- time password has been sent to {email}
            </p>
          </div>
          <div className="flex justify-center gap-3 mb-[7px]">
            <InputOTP
              maxLength={6}
              onChange={(e) => {
                setOtp(e);
              }}
            >
              <InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              isLoading={registerPending}
              className="text-white w-[181px] text-base font-normal p-3 bg-[#64A70B] h-[48px] rounded-[9px]"
              onClick={(e) => {
                console.log("Called");
                handleVerifyOtp(e);
              }}
            >
              Submit
            </Button>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex justify-center gap-2">
              <Button
                variant={"ghost"}
                disabled={time !== 0 || isPending}
                onClick={() => handleResendOtp(email)}
                className="text-[#848181] text-[16px] font-[700] block p-0 h-auto hover:bg-transparent font-abhaya"
              >
                Resend OTP
              </Button>
              {time !== 0 && (
                <p className="text-[#848181] text-[16px] font-[700]">
                  {formatTime(time)}
                </p>
              )}
            </div>
            <Button
              variant={"ghost"}
              onClick={() => {
                setShowOtpPopup(false);
                setTime(0);
              }}
              className="text-[#369FFF] text-[16px] block p-0 h-auto hover:bg-transparent font-abhaya"
            >
              Send to a different email?
            </Button>
          </div>
        </Modal>
      </div>
      <HomeFooter />

      <Loading isLoading={createPending || createOtp || logoutPending} />
    </div>
  );
}

export default Register;
