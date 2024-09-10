import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import PasswordInput from "@/components/comman/Input/Password";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import { InputWithLable } from "@/components/ui/inputwithlable";
import { useToast } from "@/components/ui/use-toast";
import { getDeviceToken } from "@/firebaseConfig";
import { useAppDispatch } from "@/hooks/use-redux";
import {
  setClientRole,
  // setClientId,
  setCompanyId,
  setUserData,
} from "@/redux/reducer/CompanyReducer";
import { Login } from "@/services/apiServices/authService";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

function Auth() {
  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const schema = z.object({
    email: z
      .string()
      .email("Please enter valid email")
      .min(1, "Please enter email"),
    password: z.string().min(1, { message: "Please enter password" }),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  function trackUserLogin(role: number) {
    let roleName = "";
    const Roles = {
      Company: 1,
      TrainerCompany: 2,
      Trainer: 3,
      CompanyEmployee: 4,
      SuperAdmin: 5,
      Client: 6,
    };

    switch (role) {
      case Roles.Company:
        roleName = "Company";
        break;
      case Roles.TrainerCompany:
        roleName = "TrainerCompany";
        break;
      case Roles.Trainer:
        roleName = "Trainer";
        break;
      case Roles.CompanyEmployee:
        roleName = "CompanyEmployee";
        break;
      case Roles.SuperAdmin:
        roleName = "SuperAdmin";
        break;
      case Roles.Client:
        roleName = "Client";
        break;
      default:
        roleName = "Unknown";
        break;
    }

    return roleName;
  }

  const handleRedirect = (path: number, data: any) => {
    switch (path) {
      case 1:
        navigate("/savedassesment");
        break;
      case 2:
        navigate("/score");
        break;
      case 3:
        navigate("/companyregister");
        break;
      case 4:
        localStorage.setItem("user", JSON?.stringify(data));
        localStorage.setItem("path", JSON.stringify(data?.query?.pathstatus));
        navigate("/company/dashboard");
        break;
      default:
        localStorage.setItem("user", JSON?.stringify(data));
        localStorage.setItem("path", JSON.stringify(data?.query?.pathstatus));
        navigate("/company/dashboard");
        break;
    }
  };

  const { mutate: login_user, isPending: loginPanding } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      const user = data?.data?.data?.query;
      const role = trackUserLogin(+user?.role);
      console.log(role, user?.role, "rolerolerolerolerole");
      if ((window as any).gtag) {
        (window as any).gtag("event", "login", {
          user_id: user?.id,
          user_role: trackUserLogin(+user?.role),
          user_name: user?.name,
          user_email: user?.email,
          gender: user?.gender,
        });
      }

      if (data.data.data.status === "Inactive") {
        toast({
          variant: "destructive",
          title: data?.data?.message || "",
        });
      } else if (data.data.data.status === "Pending") {
        toast({
          variant: "destructive",
          title: data?.data?.message,
        });
      } else if (data.data.data.status === "IsNew") {
        navigate("/resetpassword", {
          state: {
            oldPassword: getValues("password"),
            email: getValues("email"),
            status:
              data?.data?.data?.status === "IsNew"
                ? "Pending"
                : data?.data?.data?.status || "",
            token: data?.data?.data?.accessToken || "",
          },
        });
        dispatch(setUserData(user.id));
      } else {
        dispatch(setUserData(user.id));
        dispatch(setClientRole(+user.role));
        localStorage.setItem("user", JSON.stringify(data.data.data));
        const expiresIn24Hours = new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        );
        Cookies.set("accessToken", data?.data?.data?.accessToken, {
          expires: expiresIn24Hours,
        });
        localStorage.setItem(
          "path",
          JSON.stringify(data.data.data?.query?.pathstatus)
        );
        dispatch(setCompanyId(data.data.data.query?.detailsid));

        if (user.role == UserRole.SuperAdmin || user.role == UserRole.Client) {
          toast({
            variant: "destructive",
            title: "User Not found",
          });
        }

        if (user.role == UserRole.Trainer) {
          navigate("/trainer/dashboard");
        }

        if (+user.role === UserRole.Trainee) {
          navigate("/trainee/dashboard");
        }

        if (user.role == UserRole.Employee) {
          navigate("/employee/dashboard");
          toast({
            variant: "success",
            title: data.data.message,
          });
        }

        if (user.role == UserRole.Client) {
          toast({
            variant: "default",
            title: "Only Company, Trainer Company and Trainee can login",
          });
        }

        if (user.role == UserRole.Company) {
          toast({
            title: data.data.message,
          });

          dispatch(setUserData(user.id));

          if (user.pathstatus < "4") {
            navigate("/savedassesment");
          } else {
            handleRedirect(parseInt(user.pathstatus), data.data.data);
          }

          // }
        }
      }
    },
    onError: (error: ErrorType) => {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.data.message,
      });
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const token: any = await getDeviceToken();
    const payload = {
      ...data,
      deviceToken: token,
    };
    login_user(payload);
  };

  return (
    <>
      <HomeHeader />
      <div className="mainContailner">
        <div className="flex my-[26px]">
          <div className="relative">
            <img
              className="max-w-full lg:block hidden xl:h-[750px] h-[980px]"
              src="../assets/img/Image.png"
            />

            <img
              className="absolute top-[60px] left-1/2 -translate-x-1/2 max-h-[365px] h-auto"
              src="../assets/img/pngwing.png"
            />
            <h2 className="absolute xl:bottom-[90px] bottom-[40px] left-1/2 -translate-x-1/2 text-white xl:text-[30px] text-[28px] xl:max-w-[505px] max-w-[400px] xl:leading-[46px] leading-[36px] w-full lg:block hidden">
              Quite literally:{" "}
              <span className="text-[#73AF26]">you’ll be the bridge</span> for
              companies across Ireland to upskill their teams, and{" "}
              <span className="text-[#73AF26]">become more sustainable</span>
            </h2>
          </div>

          <div className="w-full 2xl:px-0 px-5 max-w-[515px] lg:h-auto sm:h-[580px] h-[530px] mx-auto relative">
            {/* <div className="flex justify-end text-[#000]">
              <label>
                Already have an account?{" "}
                <Link to={"/register"} className="font-[700] text-[#042937]">
                  Sign In
                </Link>
              </label>
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative LoginBox max-w-[418px] mx-auto  mt-[40px] rounded-[10px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[24px]">
                <p className="text-[24px] font-[700] mb-5">
                  You’re most welcome in...
                </p>
                <InputWithLable
                  className="w-full h-[52px] mt-2"
                  placeholder="Enter Email"
                  {...register("email")}
                />
                {errors.email && (
                  <ErrorMessage message={errors.email.message as string} />
                )}
                <PasswordInput
                  className="w-full h-[52px] mt-2"
                  placeholder="Password"
                  validationHandler={register("password")}
                />
                {errors.password && (
                  <ErrorMessage message={errors.password.message as string} />
                )}
                <ul className="mt-[24px]">
                  <li>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </li>
                </ul>
                <button
                  type="submit"
                  className="primary-background rounded sm:w-[370px] w-full sm:h-[48px] h-[44px] secondary-text mt-[32px] text-lg !font-abhaya font-semibold"
                >
                  Login
                </button>

                {/* <div className="w-full flex items-center justify-center">
                  <div className="w-1/3 h-px bg-[#DCDCDC]"></div>
                  <div className="px-4 text-[#898989]">or</div>
                  <div className="w-1/3 h-px bg-[#DCDCDC]"></div>
                </div> */}
                {/* <div className="flex items-center justify-center gap-4 mt-[24px]">
                  <button className="relative w-[173px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] text-color">
                    <img
                      className="absolute left-[35px] top-1/2 -translate-y-1/2"
                      src="../assets/img/googlelogo.png"
                    />
                    Google
                  </button>
                  <button className="relative w-[173px] h-[48px] rounded-[6px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] text-color">
                    <img
                      className="absolute left-[30px] top-1/2 -translate-y-1/2"
                      src="../assets/img/fblogo.png"
                    />
                    Facebook
                  </button>
                </div> */}
              </div>
            </form>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <ul className="max-w-[370px] mx-auto h-[30px] text-[12px] font-[400] ">
                <li className="text-[#898989] text-center">
                  Protected by reCAPTCHA and subject to the Skillnet
                  <Link
                    to="/privacypolicy"
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
                </li>
              </ul>
            </div>
          </div>
          <Loading isLoading={loginPanding} />
        </div>
      </div>
      <HomeFooter />
    </>
  );
}

export default Auth;
