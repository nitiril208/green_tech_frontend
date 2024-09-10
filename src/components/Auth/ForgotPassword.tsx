import { ForgetPassword } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import InputWithLabel from "../comman/InputWithLabel";
import Loader from "../comman/Loader";
import HomeHeader from "../homePage/HomeHeader";
import { toast } from "../ui/use-toast";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter email")
    .email("Please enter valid email"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const url = window.location.origin;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ForgetPassword,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });

      reset();
      navigate("/auth");
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutate({ email: data?.email, baseurl: url });
  };

  return (
    <>
      <HomeHeader />
      <div className="mainContailner">
        <div className="flex mt-[26px]">
          <div className="relative">
            <img
              className="max-w-full lg:block hidden"
              src="../assets/img/Image.png"
            />

            <img
              className="absolute top-[137px] left-1/2 -translate-x-1/2 max-h-[365px] h-auto"
              src="../assets/img/pngwing.png"
            />
            <h2 className="absolute xl:bottom-[90px] bottom-[40px] left-1/2 -translate-x-1/2 text-white xl:text-[36px] text-[26px] xl:max-w-[505px] max-w-[400px] xl:leading-[46px] leading-[36px] w-full lg:block hidden">
              <span className="text-[#73AF26]">Empower</span> your potential
              through our comprehensive training programs, where knowledge meets
              innovation
            </h2>
          </div>

          <div className="w-full 2xl:px-0 px-5 max-w-[515px] mx-auto relative">
            {/* <div className="flex justify-end text-[#000]">
              <label>
                Already have an account?{" "}
                <Link to={"/auth"} className="font-[700] text-[#042937]">
                  Sign In
                </Link>
              </label>
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative max-w-[418px] lg:h-auto md:h-[400px] sm:h-[350px] h-[330px] mx-auto md:mt-[80px] sm:mt-[50px] mt-[20px]">
                <p className="text-[24px] font-[700] mb-4 text-color">
                  Forgot Password
                </p>
                <InputWithLabel
                  className="w-full h-[52px] secondary-background mt-1"
                  label="Email"
                  labelClassName="text-[16px] text-[#3A3A3A] font-bold font-calibri"
                  type="email"
                  placeholder="Enter Email"
                  {...register("email")}
                  error={errors.email?.message as string}
                />
                <button
                  type="submit"
                  className="primary-background rounded w-full h-[48px] secondary-text mt-[32px] text-sm !font-abhaya font-semibold"
                >
                  {isPending ? <Loader containerClassName="h-auto" /> : "Send"}
                </button>
              </div>
            </form>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <ul className="sm:max-w-[370px] w-full mx-auto h-[30px] text-[12px] font-[400] ">
                <li className="text-[#898989]">
                  Protected by reCAPTCHA and subject to the Skillnet
                  <Link
                    to="/privacypolicy"
                    className="text-color font-bold mx-1"
                  >
                    Privacy Policy
                  </Link>
                  and
                  <Link
                    to={"/termsofservices"}
                    className="text-color font-bold mx-1"
                  >
                    Terms of Service.
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
