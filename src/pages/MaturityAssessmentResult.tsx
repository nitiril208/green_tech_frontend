import EconomicsGray from "@/assets/images/EconomicsGray.png";
import EnvironmentalGray from "@/assets/images/Environmental.svg";
import GovernanceGray from "@/assets/images/GovernanceGray.png";
import SocialGray from "@/assets/images/SocialGray.png";
import StrategicIntegrationGray from "@/assets/images/StrategicIntegrationGray.png";
import TechInnovationGray from "@/assets/images/Tech&InnovationGray.png";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import HeaderCourse from "@/components/HeaderCourse";
import HomeFooter from "@/components/homePage/HomeFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { IoChevronDownSharp } from "react-icons/io5";

function MaturityAssessmentResult() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const data = {
    labels: ["Introductory", "Intermediate", "Advanced"],
    datasets: [
      {
        label: "Poll",
        data: [100],
        backgroundColor: ["#FFD56A", "green", "red"],
        borderColor: ["#FFD56A", "green", "red"],
      },
    ],
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 25px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${Math.round(data.datasets[0].data[0])}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.restore();
    },
  };
  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed * 100) + "%";
            return label;
          },
        },
      },
    },
  };

  const Labels = () => (
    <div className="absolute left-0 top-0 flex flex-col justify-center h-full mt-[60px]">
      {data.labels.map((label, index) => {
        let colorClass, opacityClass;
        if (index === 0) {
          colorClass =
            "bg-gradient-to-r from-red-500 via-red-500 to-transparent";
          opacityClass = "bg-opacity-25";
        } else if (index === 1) {
          colorClass =
            "bg-gradient-to-r from-yellow-500 via-yellow-500 to-transparent";
          opacityClass = "bg-opacity-50";
        } else {
          colorClass =
            "bg-gradient-to-r from-green-500 via-green-500 to-transparent";
          opacityClass = "bg-opacity-75";
        }
        return (
          <div
            key={index}
            className="text-sm flex flex-col items-center relative  mt-10 h-6"
          >
            <div
              className={`absolute left-0 top-0 h-full w-2/6 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none `}
            ></div>
            <div className="ml-2 pl-2 rounded-r-lg">{label}</div>
          </div>
        );
      })}
      <div className="mt-[20px] mb-[100px]">
        <p className="font-abhaya font-extrabold text-base leading-[18.88px]">
          Total Score-
          <span className="font-abhaya font-extrabold text-4xl leading-[49.55px]">
            57
          </span>
          <span className="font-abhaya font-extrabold text-base leading-[18.88px] text-[#64A70B]">
            /90
          </span>
        </p>
      </div>
    </div>
  );

  const [activeTab, setActiveTab] = useState("Assessment Result");

  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };

  // const handleExport = () => {
  //   // Handle export functionality here
  // };

  return (
    <div className="flex bg-[#EDEFF9] w-[1510px] h-[2200px]  overflow-hidden">
      <div className="">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col">
        <div className=" ">
          <HeaderCourse />
        </div>
        <div className="ml-[20px] mt-[15px] flex  ">
          <div>
            <h1 className="text-[16px] font-bold">Re Assessment 2</h1>
            <p className="text-[12px] text-[#606060]">
              Completed Date: 12/03/2024
            </p>
          </div>
          <div className="flex ml-[855px]">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-3 pl-4 pr-6 text-left gap-2 font-abhaya"
              >
                <span className="text-[12px] font-semibold">
                  Previous Assessment Details
                </span>
                <IoChevronDownSharp className="w-5 h-5 text-[#000000]" />
              </button>
              {isOpen && (
                <ul className="absolute w-[197px] h-[157px] bg-white shadow-lg rounded-lg">
                  <li className="pl-6 pr-2 text-sm text-[#000000] pt-2">
                    Baseline Self Assessment
                  </li>
                  <p className="ml-auto text-[#606060] text-[12px] pl-6">
                    08/03/2024
                  </p>
                  <li className="pl-6 pr-6 text-sm text-[#000000] pt-2">
                    Re-assessment 1
                  </li>
                  <p className="ml-auto text-[#606060] text-[12px] pl-6">
                    08/03/2024
                  </p>
                  <li className="pl-6 pr-6 text-sm text-[#000000] pt-2">
                    Re-assessment 2
                  </li>
                  <p className="ml-auto text-[#606060] text-[12px] pl-6">
                    08/03/2024
                  </p>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[1980px] m-[12px] rounded-[10px] ">
          <div className=" w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px]">
            <div className="pt-[10px]">
              <button
                className={`${
                  activeTab === "Assessment Result"
                    ? "  text-[#00778B]  font-semibold border-b border-[#00778B]"
                    : " text-[#000000] "
                }  py-2 px-4  text-[16px] h-[49px]  font-abhaya`}
                onClick={() => handleTabChange("Assessment Result")}
              >
                Assessment Result
              </button>
              <button
                className={`${
                  activeTab === "Roadmap"
                    ? "text-[#00778B]  font-semibold  border-b border-[#00778B]"
                    : " text-[#000000]"
                }  py-2 px-4  text-[16px] h-[49px] font-abhaya`}
                onClick={() => handleTabChange("Roadmap")}
              >
                Roadmap
              </button>
              <button className="bg-[#00778B] text-white font-semibold w-[78px]  h-[37px] rounded ml-[880px] font-abhaya">
                Export
              </button>
            </div>
            <div className="  ">
              {activeTab === "Assessment Result" && (
                <div>
                  <div className="flex ml-[20px] mr-[50px] mt-[50px] justify-between">
                    <div className="h-[369px] pt-[38px]">
                      <h3 className="max-w-[350.34px] text-2xl font-bold leading-[29.3px]">
                        How does "Company Name" measure up?
                      </h3>
                      <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
                      <div className="max-w-[640.78px]">
                        <p className="">
                          Congratulations! 🎉You've completed your
                          sustainability assessment, and now it's time to unveil
                          your results! Below, you'll find a comprehensive
                          breakdown of your sustainability score,
                        </p>
                        <p className="mt-5">
                          Along with personalized insights and recommendations
                          to further enhance your journey towards a greener
                          future. Dive in and explore how you can make a
                          meaningful impact on the planet while embracing
                          sustainable practices in your everyday life.
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className=" mt-0 mb-6 mr-18 ml-8   relative">
                        <Labels />
                        <div className="text-center mt-10 mb-0 mr-8 ml-20  relative">
                          <div className="w-40 h-40 mt-0 ml-16 relative">
                            <Doughnut
                              data={data}
                              options={options}
                              plugins={[textCenter]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-[60px]">
                        <p className="inline ml-[35px] ">
                          Your overall sustainability level -
                        </p>{" "}
                        <span className="font-poppins font-bold text-[#000000] leading-6">
                          Intermediate
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="border-2 border-solid border-[#D9D9D9] mt-[20px] mb-6" />
                  <div className="mr-[100px] ml-[20px] flex justify-between">
                    <h2 className="text-[24px] leading-9 font-bold">
                      How you fare across the Maturity levels
                    </h2>
                    {/* <Button className="w-[100px] h-10 rounded bg-teal text-[16px] leading-[18px]">
                                            Export
                                        </Button> */}
                  </div>
                  <div className="mr-[20px] ml-[20px] mt-10 flex flex-col gap-5">
                    <div className="border border-solid border-[#D9D9D9] rounded-[6px]">
                      <div className="flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
                        <Button className="bg-[#F63636] text-[16px] leading-5 w-[130px] font-bold">
                          Introductory
                        </Button>
                      </div>
                      <div className="pt-8 pl-[30px] pb-5 flex gap-5">
                        <div className="border border-solid border-[red] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#F63636]">
                          <img
                            src={StrategicIntegrationGray}
                            alt="img"
                            className="w-[52px] h-[52px]"
                          />
                          <h4 className="mt-3">Strategic Integration</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            35%
                          </span>
                        </div>
                        <div className="border border-solid border-[red] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#F63636]">
                          <img
                            src={TechInnovationGray}
                            alt="img"
                            className="w-[52px] h-[52px]"
                          />
                          <h4 className="mt-3">Tech & Innovation</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            33%
                          </span>
                        </div>
                        <div className="border border-solid border-[red] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#F63636]">
                          <img
                            src={EconomicsGray}
                            alt="img"
                            className="w-[52px] h-[52px]"
                          />
                          <h4 className="mt-3">Economics</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            30%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border border-solid border-[#D9D9D9] rounded-[6px]">
                      <div className="flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
                        <Button className="bg-[#FFD56A] text-[16px] leading-5 w-[130px] font-bold text-black">
                          Intermediate
                        </Button>
                      </div>
                      <div className="pt-8 pl-[30px] pb-5 flex gap-5">
                        <div className="border border-solid border-[#FFD56A] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#FFD56A]">
                          <img
                            src={GovernanceGray}
                            alt="img"
                            className="w-[52px] h-[52px]"
                          />
                          <h4 className="mt-3">Governance</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            56%
                          </span>
                        </div>
                        <div className="border border-solid border-[#FFD56A] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#FFD56A]">
                          <img
                            src={EnvironmentalGray}
                            alt="img"
                            className="w-[52px] h-[52px]"
                          />
                          <h4 className="mt-3">Environmental</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            33%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border border-solid border-[#D9D9D9] rounded-[6px]">
                      <div className="flex items-center pl-[17px] border-b-[#D9D9D9] border-b border-solid h-[62px]">
                        <Button className="bg-[#64A70B] text-[16px] leading-5 w-[130px] font-bold">
                          Advanced
                        </Button>
                      </div>
                      <div className="pt-8 pl-[30px] pb-5 flex gap-5">
                        <div className="border border-solid border-[green] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#64A70B]">
                          <img
                            src={SocialGray}
                            alt="img"
                            className="w-[52px] h-[52px]"
                          />
                          <h4 className="mt-3">Social</h4>
                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                            75%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <Button className="bg-[#64A70B] text-[16px] leading-5 w-[180px] font-bold ml-[550px]">
                      Set targets
                    </Button>
                  </div>
                  <div className="mt-[15px] ml-[260px] text-[#64A70B] mb-[30px]">
                    <p>
                      Keep up the fantastic work, and remember, every small step
                      counts towards a brighter and more sustainable world!{" "}
                    </p>
                  </div>
                  <div className="mb-240px">
                    <HomeFooter />
                  </div>
                </div>
              )}
              {activeTab === "Roadmap" && <div>Anurag </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaturityAssessmentResult;
