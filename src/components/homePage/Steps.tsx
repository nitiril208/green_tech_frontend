import stepImage5 from "@/assets/images/LightOn.png";
import stepImage4 from "@/assets/images/Morales.png";
import stepImage2 from "@/assets/images/Neighbour.png";
import stepImage6 from "@/assets/images/PathSteps.png";
import stepImage1 from "@/assets/images/TreePlanting.png";
import stepImage3 from "@/assets/images/WeakFinancialGrowth.png";
import { RegisterContext } from "@/context/RegisterContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Steps = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useContext(RegisterContext);
  const step = [
    {
      image: stepImage1,
      title: "Drive Down Costs",
      desc: "Benefit from sustainability’s hallmarks for improving efficiency and reducing consumed resources",
    },
    {
      image: stepImage2,
      title: "Keep Top Talent",
      desc: "Retain mindful top talent that are increasingly looking to advance their careers with companies that align with their values",
    },
    {
      image: stepImage3,
      title: "Win Loyal Customers",
      desc: "As more and more customers seek out responsible partners, be at the forefront of their minds with your sustainability initiatives",
    },
    {
      image: stepImage4,
      title: "Attract Investment",
      desc: "Because ESG has gone from a “nice-to-have” to a “must-have” for many investors and strategic partners",
    },
    {
      image: stepImage5,
      title: "Secure Government Bids",
      desc: "Gain standards of social and environmental responsibility that position you in favour of government contracts",
    },
    {
      image: stepImage6,
      title: "Distinguish Your Brand",
      desc: "Adding the dimension of sustainability firmly distinguishes your brand from competition and uplifts what you offer",
    },
  ];
  return (
    <div className="xl:mb-[54px] sm:mb-[54px] mb-[30px]">
      <h3 className="md:text-4xl sm:text-3xl text-2xl leading-tight font-UniNeue text-center font-bold tracking-tighter xl:mb-[54px] md:mb-[50px] mb-[30px]">
        Step by Step
        <br />
        <span className="font-medium">To better days ahead of you.</span>
      </h3>
      <div className="grid grid-cols-9 max-w-[1913px] mx-auto">
        <div className="sm:col-span-2 col-span-9 bg-[#75BD43] flex justify-center items-center sm:h-[259px] h-[80px]">
          <p className="secondary-text xl:text-[28px] text-2xl font-Droid-Regular text-center font-bold">
            Why Go Sustainable
          </p>
        </div>
        <div className="sm:col-span-7 col-span-9">
          <div className="grid grid-cols-12">
            {step.map((steps, index: number) => {
              return (
                <div
                  key={index}
                  className="xl:col-span-2 sm:col-span-4 col-span-6 px-[15px] h-[268px] py-5 bg-gradient-to-l from-[#ebeaea] from-44% via-transparent via-30% to-white"
                >
                  <div className="h-[135px]">
                    <div className="h-[76px] mb-2.5">
                      <img src={steps.image} alt="" />
                    </div>
                    <h6 className="primary-text text-lg font-d-din-pro font-extrabold leading-5">
                      {steps.title}
                    </h6>
                  </div>
                  <p className="text-[15px] font-Droid-Regular leading-[18px] font-medium">
                    {steps.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="rounded-[4px] border border-solid flex justify-center items-center text-left gap-[10px] text-lg font-extrabold font-abhaya m-auto w-[249px] h-[59px] lg:mt-[30px] mt-6 bg-[#75BD43] secondary-text cursor-pointer"
        onClick={() => {
          setSelectedRole("company");
          navigate("/register");
        }}
      >
        <p className="leading-[normal]">
          Take Your First
          <br /> Step Now
        </p>
        <div>
          <img className="" src="../assets/img/Move Right.png" />
        </div>
      </div>
    </div>
  );
};

export default Steps;
