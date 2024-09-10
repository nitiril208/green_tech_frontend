import EconomicsGray from "@/assets/images/EconomicsGray.png";
import EnvironmentalGray from "@/assets/images/Environmental.svg";
import GovernanceGray from "@/assets/images/GovernanceGray.png";
import SocialGray from "@/assets/images/SocialGray.png";
import StrategicIntegrationGray from "@/assets/images/StrategicIntegrationGray.png";
import TechInnovationGray from "@/assets/images/Tech&InnovationGray.png";
import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

function AssessmentResult() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  const [activeTab, setActiveTab] = useState("My Action Items");

  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[1650px] overflow-hidden relative">
      {sidebarOpen && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white ${
          sidebarOpen ? "block" : "hidden"
        } lg:relative lg:block lg:bg-transparent`}
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <span className="text-xl font-semibold">Menu</span>
          <RiCloseLine
            className="h-6 w-6 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <EmployeeSidebar />
      </div>

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[1620px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
        <div className="p-4">
          <div className="pb-4 w-full lg:w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <RiMenuLine
                className="h-6 w-6 lg:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
              <div className="text-[18px] ml-1 font-semibold">
                <span className="hidden md:inline text-[18px] font-semibold ">
                  Maturity Assessment /
                </span>{" "}
                <span className="md:text-[#00778B] text-[#000000]">
                  {" "}
                  Assessment Result
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative  md:w-[250px]">
                <div className="hidden md:flex mt-[2px] mr-2 items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-full md:w-[240px] h-[50px] text-[#A3A3A3]">
                  <BsSearch className="text-[#D9D9D9] mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 mr-2 focus: placeholder-[#A3A3A3] text-sm"
                  />
                </div>
                <div className="flex md:hidden justify-center items-center w-[50px] h-[50px] bg-[#F3F3F3] rounded-full text-gray-900">
                  <BsSearch />
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#F5F5F5] rounded-full h-[30px] w-[30px] p-1">
                  <IoMdNotificationsOutline className="h-6 w-6" />
                </div>
                <div className="absolute -top-2 -right-2 flex items-center justify-center h-[20px] w-[20px] bg-red-500 rounded-full text-white text-[10px]">
                  5
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={person}
                  alt="Emilia Anderson"
                  className="h-8 w-8 rounded-full border-[#D9D9D9] border-2"
                />
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-700">
                    Emilia Anderson
                  </div>
                  <div className="text-xs text-[#000000]">Team Member</div>
                </div>
                <RiArrowDownSLine className="h-5 w-5 ml-1 mb-3 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="ml-4 md:w-[200px]">
            <h1 className="text-[16px] font-bold">Re Assessment 2</h1>
            <p className="text-[12px] text-[#606060]">
              Completed Date: 12/03/2024
            </p>
          </div>
          <div className="flex md:ml-[790px]">
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
                <ul className="md:absolute md:w-[197px] h-[157px] bg-white shadow-md rounded-md">
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

        <div className="">
          <div className="md:h-[49px] bg-[#FFFFFF] border-b border-[#D9D9D9]">
            <div className="mt-[9px] flex flex-col md:flex-row">
              <button
                className={`${
                  activeTab === "Assessment Result"
                    ? "  text-[#00778B]  font-semibold border-b border-[#00778B]"
                    : " text-[#000000] "
                }  py-2 px-4  text-[16px] h-[49px] font-abhaya `}
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

              <button
                className={`${
                  activeTab === "My Action Items"
                    ? "text-[#00778B]  font-semibold  border-b border-[#00778B]"
                    : " text-[#000000]"
                }  py-2 px-4  text-[16px] h-[49px] font-abhaya`}
                onClick={() => handleTabChange("My Action Items")}
              >
                My Action Items
              </button>

              <button className="bg-[#00778B] text-white font-semibold w-[78px] font-abhaya h-[37px] rounded md:ml-[720px]">
                Export
              </button>
            </div>

            <div className="  ">
              {activeTab === "Assessment Result" && (
                <div>
                  <div className="ml-5 text-[15px] font-semibold mt-3">
                    <p>Self Assessment Details</p>
                  </div>

                  <div className="flex flex-col lg:flex-row ml-[20px] mr-[20px] lg:mr-[50px] mt-[40px] justify-between">
                    <div className="h-auto lg:h-[369px]">
                      <h3 className="max-w-full lg:max-w-[350.34px] text-2xl font-bold leading-[29.3px]">
                        How does "Company Name" measure up?
                      </h3>
                      <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
                      <div className="max-w-full lg:max-w-[640.78px]">
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
                    <div className="mt-10 lg:mt-0">
                      <div className="relative flex justify-center lg:justify-start mt-0 mb-6">
                        <Labels />
                        <div className="text-center mt-7 mb-0 relative">
                          <div className="w-40 h-40 md:ml-[200px] relative">
                            <Doughnut
                              data={data}
                              options={options}
                              plugins={[textCenter]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-[60px] text-center lg:text-left">
                        <p className="inline ml-[35px]">
                          Your overall sustainability level -
                        </p>{" "}
                        <span className="font-poppins font-bold text-[#000000] leading-6">
                          Intermediate
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-[20px]">
                    <h2 className="text-[20px] font-bold">
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
                      <div className="pt-8 pl-[30px] pb-5 flex flex-col lg:flex-row gap-5">
                        <div className="border border-solid border-[red] w-full lg:w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#F63636]">
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
                        <div className="border border-solid border-[red] w-full lg:w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#F63636]">
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
                        <div className="border border-solid border-[red] w-full lg:w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#F63636]">
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
                      <div className="pt-8 pl-[30px] pb-5 flex flex-col lg:flex-row gap-5">
                        <div className="border border-solid border-[#FFD56A] w-full lg:w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#FFD56A]">
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
                        <div className="border border-solid border-[#FFD56A] w-full lg:w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#FFD56A]">
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
                      <div className="pt-8 pl-[30px] pb-5 flex flex-col lg:flex-row gap-5">
                        <div className="border border-solid border-[green] w-full lg:w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3 bg-[#64A70B]">
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

                  <div className="md:ml-[895px] mt-2 bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                    <img
                      src={person}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                      <span className="text-gray-900 font-semibold">
                        Messaging
                      </span>
                    </div>
                    <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
              )}

              {activeTab === "Roadmap" && <div>Anurag </div>}

              {activeTab === "My Action Items" && <div>Golu</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentResult;
