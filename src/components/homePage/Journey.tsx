import { RegisterContext } from "@/context/RegisterContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../comman/Button/CustomButton";

const Journey = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useContext(RegisterContext);
  return (
    <div className="lg:flex block items-center justify-center xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-6 relative xl:mt-[100px] lg:mt-[50px] mt-6 lg:h-[350px] h-auto xl:mb-[100px] lg:mb-[80px] mb-0">
      <div className="z-50">
        <img
          className="left-24 top-1/2 lg:-translate-y-1/2 xl:w-[400px] lg:w-[350px] sm:w-auto w-[240px] lg:absolute lg:mx-0 mx-auto"
          src="../assets/img/pngwing 3.png"
        />
      </div>
      <div className="flex items-center lg:justify-end justify-center w-full max-w-[1160px] mr-5 lg:my-0 sm:my-10 my-5">
        <div className="border border-solid border-[#B9B9B9] z-10 lg:pl-[300px] lg:pr-0 md:pr-36 sm:pr-20 lg:py-6 py-5 px-5 max-w-[843px]">
          <h3 className="md:text-[32px] text-[24px] font-semibold leading-9  font-UniNeue tracking-tighter xl:pr-28 lg:pr-20 pr-0">
            Because with
            <span className="primary-text"> direction</span>,
            <br /> you can purposefully journey there
          </h3>
          <SecondaryButton
            symbol={<img src="../assets/img/Move Right.png" />}
            name="Get Started Today"
            onClick={() => {
              navigate("/register");
              setSelectedRole("");
            }}
            className="w-[229px] h-[44px] rounded-[4px] md:mt-[36px] sm:mt-[28px] mt-[23px] lg:text-[20px] text-lg leading-5 font-abhaya font-bold flex items-center justify-center gap-[10px] bg-[#75BD43]"
          ></SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default Journey;
