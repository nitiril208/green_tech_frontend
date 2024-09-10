import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import RegisterBanner from "@/components/RegisterTrainee/RegisterBanner";
import RegisterTraineeForm from "@/components/RegisterTrainee/RegisterTraineeForm";
import { useEffect } from "react";

const RegisterTrainee = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <HomeHeader />
      <div className="display flex xl:gap-[50px] gap-[25px] xl:pr-4 mainContailner !my-4">
        <RegisterBanner />
        <div className="lg:max-w-[509px] w-full 2xl:mx-auto relative xl:mr-0 lg:mr-5 lg:px-0 px-5">
          <RegisterTraineeForm />
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default RegisterTrainee;
