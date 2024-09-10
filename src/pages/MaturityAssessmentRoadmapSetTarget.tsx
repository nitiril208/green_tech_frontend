import HeaderCourse from "@/components/HeaderCourse";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import HomeFooter from "@/components/homePage/HomeFooter";
import weakFinancialGrowthIcon from "@/assets/images/WeakFinancialGrowth.png"
import lightOnIcon from "@/assets/images/LightOn.png"
import neighbourIcon from "@/assets/images/Neighbour.png"
import moralesIcon from "@/assets/images/Morales.png"
import pathStepsIcon from "@/assets/images/PathSteps.png"

function MaturityAssessmentRoadmapSetTarget() {
  const [activeTab, setActiveTab] = useState("Assessment Result");

  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };

  // const handleExport = () => {
  //   // Handle export functionality here
  // };

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const [isChecked1, setIsChecked1] = useState(false);

  const toggleCheckbox1 = () => {
    setIsChecked1(!isChecked1);
  };

  const [isChecked2, setIsChecked2] = useState(false);

  const toggleCheckbox2 = () => {
    setIsChecked2(!isChecked2);
  };
  const [isChecked3, setIsChecked3] = useState(false);

  const toggleCheckbox3 = () => {
    setIsChecked3(!isChecked3);
  };
  const [isChecked4, setIsChecked4] = useState(false);

  const toggleCheckbox4 = () => {
    setIsChecked4(!isChecked4);
  };
  const [isChecked5, setIsChecked5] = useState(false);

  const toggleCheckbox5 = () => {
    setIsChecked5(!isChecked5);
  };

  return (
    <div className="flex bg-[#EDEFF9] w-[1510px] h-[2050px] overflow-hidden">
      <div className="">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col">
        <div className=" ">
          <HeaderCourse />
        </div>
        <div className="ml-[20px] mt-[15px]">
          <h1 className="text-[16px] font-bold">Re Assessment 2</h1>
          <p className="text-[12px] text-[#606060]">
            Completed Date: 12/03/2024
          </p>
        </div>
        <div className="bg-[#FFFFFF] w-[1250px] h-[2010px] m-[12px] rounded-[10px] ">
          <div className=" w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px]">
            <div className="pt-[10px]">
              <button
                className={`${
                  activeTab === "Assessment Result"
                    ? "  text-[#00778B]  font-semibold border-b-2 border-[#00778B]"
                    : " text-[#000000] "
                }  py-2 px-4  text-[16px] h-[49px]  `}
                onClick={() => handleTabChange("Assessment Result")}
              >
                Assessment Result
              </button>
              <button
                className={`${
                  activeTab === "Roadmap"
                    ? "text-[#00778B]  font-semibold  border-b-2 border-[#00778B]"
                    : " text-[#000000]"
                }  py-2 px-4  text-[16px] h-[49px] `}
                onClick={() => handleTabChange("Roadmap")}
              >
                Roadmap
              </button>
              <button className="bg-[#00778B] text-white font-semibold w-[78px]  h-[37px] rounded ml-[880px] ">
                Export
              </button>
            </div>
            <div className=" p-4 ">
              {activeTab === "Assessment Result" && <div>Anurag</div>}
              {activeTab === "Roadmap" && (
                <div className="flex flex-col">
                  <div className=" mt-6 flex items-center">
                    <div className="flex items-center text-white relative ml-4">
                      <div className="rounded-full h-[32px] w-[32px] py-1 bg-[#D9D9D9]">
                        <div className="text-[16px] ml-[10px] text-black">
                          1
                        </div>
                      </div>
                      <div className="absolute top-0 md:ml-[-50px] text-center mt-8 md:w-[300px] text-[16px] font-medium text-[#000000]">
                        Set Target
                        <span className="hidden md:inline text-[12px] text-[#D9D9D9] ">
                          {" "}
                          (select the required pillars)
                        </span>
                      </div>
                    </div>
                    <div className="flex-auto border-t-2  border-[#D9D9D9]"></div>
                    <div className="flex items-center text-gray-500 relative">
                      <div className="rounded-full h-[32px] w-[32px] py-1 bg-[#D9D9D9]">
                        <div className="text-[16px] ml-[10px] text-black">
                          2
                        </div>
                      </div>
                      <div className="absolute top-0 ml-[-50px] text-center mt-8 w-40 text-[16px] font-medium text-[#000000] ">
                        Define Action Item
                      </div>
                    </div>
                    <div className="flex-auto border-t-2 border-[#D9D9D9]"></div>
                    <div className="flex items-center relative mr-4">
                      <div className="rounded-full h-[32px] w-[32px] py-1 bg-[#D9D9D9]">
                        <div className="text-[16px] ml-[10px] text-black">
                          3
                        </div>
                      </div>
                      <div className="absolute top-0 ml-[-10px] text-center mt-8  text-[16px] font-medium text-[#000000]">
                        Assign
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center h-full w-full mt-12">
                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                        <div className="flex h-8">
                          <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                            <h2 className="text-lg">
                              <span className="text-white">Your level - </span>
                              <span className="text-[#FFD56A] font-semibold">
                                Intermediate
                              </span>
                            </h2>
                          </div>

                          <div
                            className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
                              isChecked
                                ? "bg-[#64A70B]"
                                : "bg-white border border-[#B9B9B9]"
                            }`}
                            onClick={toggleCheckbox}
                          >
                            {isChecked && (
                              <span className="text-white text-sm">
                                &#10003;
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex h-32">
                          <div>
                            <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                              <img
                                src="public/assets/img/Tree Planting.png"
                                alt="Leaf Icon"
                              />
                            </div>
                            <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>

                          <div className="ml-20">
                            <div className="bg-white rounded-lg  p-4 flex flex-col ">
                              <div className="flex items-center ">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  {" "}
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl " />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[543px] h-[110px]">
                            <div className="bg-white rounded-full   flex w-6 h-6 ">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2 ">
                                MEASURES
                              </div>
                            </div>
                            <div>
                              <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                <li>
                                  Enhance and execute your Net Zero strategy
                                  with clear goals and comprehensive actions.
                                </li>
                                <li>
                                  Lead in energy efficiency through continuous
                                  optimization and strategic energy management.
                                </li>

                                <a
                                  href="#"
                                  className="text-blue-500 text-[12px] hover:underline"
                                >
                                  View More
                                </a>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4 ">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                            <h2 className="text-lg ">
                              <span className="text-[#414648]">
                                Your level -{" "}
                              </span>
                              <span className="text-[#FFD56A] font-semibold">
                                Intermediate
                              </span>
                            </h2>
                          </div>
                          <div
                            className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
                              isChecked1
                                ? "bg-[#64A70B]"
                                : "bg-white border border-[#B9B9B9]"
                            }`}
                            onClick={toggleCheckbox1}
                          >
                            {isChecked1 && (
                              <span className="text-white text-sm">
                                &#10003;
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex h-32">
                          <div>
                            <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                              <img
                                src={weakFinancialGrowthIcon}
                                alt="weakFinancialGrowthIcon"
                              />
                            </div>

                            <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-20">
                            <div className="bg-white rounded-lg  p-4 flex flex-col ">
                              <div className="flex items-center ">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  {" "}
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl " />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[543px] h-[110px]">
                            <div className="bg-white rounded-full   flex  w-6 h-6 ">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2 ">
                                MEASURES
                              </div>
                            </div>
                            <div>
                              <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                <li>
                                  Systematically link sustainability efforts to
                                  economic outcomes, continuously tracking and
                                  optimising impact.
                                </li>
                                <li>
                                  Integrate risk management into business
                                  strategy, assessing and mitigating economic
                                  implications comprehensively.
                                </li>
                                <a
                                  href="#"
                                  className="text-blue-500 text-[12px] hover:underline"
                                >
                                  View More
                                </a>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                            <h2 className="text-lg ">
                              <span className="text-[#414648]">
                                Your level -{" "}
                              </span>
                              <span className="text-[#F63636] font-semibold">
                                Introductory
                              </span>
                            </h2>
                          </div>
                          <div
                            className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
                              isChecked2
                                ? "bg-[#64A70B]"
                                : "bg-white border border-[#B9B9B9]"
                            }`}
                            onClick={toggleCheckbox2}
                          >
                            {isChecked2 && (
                              <span className="text-white text-sm">
                                &#10003;
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex h-32">
                          <div>
                            <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                              <img
                                src={lightOnIcon}
                                alt="lightOnIcon"
                              />
                            </div>

                            <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-20">
                            <div className="bg-white rounded-lg  p-4 flex flex-col ">
                              <div className="flex items-center ">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  {" "}
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl " />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[543px] h-[110px]">
                            <div className="bg-white rounded-full   flex  w-6 h-6 ">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2 ">
                                MEASURES
                              </div>
                            </div>
                            <div>
                              <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                <li>
                                  Expand R&D investments to include long-term
                                  projects aimed at sustainable technologies.
                                </li>
                                <li>
                                  Implement circular economy initiatives in
                                  specific areas, working towards full
                                  integration.
                                </li>
                                <a
                                  href="#"
                                  className="text-blue-500 text-[12px] hover:underline"
                                >
                                  View More
                                </a>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                            <h2 className="text-lg">
                              <span className="text-[#414648]">
                                Your level -{" "}
                              </span>
                              <span className="text-[#F63636] font-semibold">
                                Introductory
                              </span>
                            </h2>
                          </div>
                          <div
                            className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
                              isChecked3
                                ? "bg-[#64A70B]"
                                : "bg-white border border-[#B9B9B9]"
                            }`}
                            onClick={toggleCheckbox3}
                          >
                            {isChecked3 && (
                              <span className="text-white text-sm">
                                &#10003;
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex h-32">
                          <div>
                            <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                              <img
                                src={neighbourIcon}
                                alt="neighbourIcon"
                              />
                            </div>
                            <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-20">
                            <div className="bg-white rounded-lg  p-4 flex flex-col ">
                              <div className="flex items-center ">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  {" "}
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl " />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[543px] h-[110px]">
                            <div className="bg-white rounded-full   flex  w-6 h-6">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2 ">
                                MEASURES
                              </div>
                            </div>
                            <div>
                              <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                <li>
                                  Enhance and execute your Net Zero strategy
                                  with clear goals and comprehensive actions.
                                </li>
                                <li>
                                  Lead in energy efficiency through continuous
                                  optimization and strategic energy management.
                                </li>
                                <a
                                  href="#"
                                  className="text-blue-500 text-[12px] hover:underline"
                                >
                                  View More
                                </a>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                        <div className="flex h-8">
                          <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                            <h2 className="text-lg">
                              <span className="text-white">Your level - </span>
                              <span className="text-[#FFD56A] font-semibold">
                                Intermediate
                              </span>
                            </h2>
                          </div>
                          <div
                            className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
                              isChecked4
                                ? "bg-[#64A70B]"
                                : "bg-white border border-[#B9B9B9]"
                            }`}
                            onClick={toggleCheckbox4}
                          >
                            {isChecked4 && (
                              <span className="text-white text-sm">
                                &#10003;
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex h-32">
                          <div>
                            <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                              <img
                                src={moralesIcon}
                                alt="moralesIcon"
                              />
                            </div>

                            <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-20">
                            <div className="bg-white rounded-lg  p-4 flex flex-col ">
                              <div className="flex items-center ">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  {" "}
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl " />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[543px] h-[110px]">
                            <div className="bg-white rounded-full   flex w-6 h-6 ">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2 ">
                                MEASURES
                              </div>
                            </div>
                            <div>
                              <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                <li>
                                  Enhance and execute your Net Zero strategy
                                  with clear goals and comprehensive actions.
                                </li>
                                <li>
                                  Lead in energy efficiency through continuous
                                  optimization and strategic energy management.
                                </li>
                                <a
                                  href="#"
                                  className="text-blue-500 text-[12px] hover:underline"
                                >
                                  View More
                                </a>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                            <h2 className="text-lg">
                              <span className="text-[#414648]">
                                Your level -{" "}
                              </span>
                              <span className="text-[#64A70B] font-semibold">
                                Advanced
                              </span>
                            </h2>
                          </div>
                          <div
                            className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
                              isChecked5
                                ? "bg-[#64A70B]"
                                : "bg-white border border-[#B9B9B9]"
                            }`}
                            onClick={toggleCheckbox5}
                          >
                            {isChecked5 && (
                              <span className="text-white text-sm">
                                &#10003;
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex h-32">
                          <div>
                            <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                              <img
                                src={pathStepsIcon}
                                alt="pathStepsIcon"
                              />
                            </div>

                            <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-20">
                            <div className="bg-white rounded-lg  p-4 flex flex-col ">
                              <div className="flex items-center ">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  {" "}
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl " />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[543px] h-[110px]">
                            <div className="bg-white rounded-full   flex  w-6 h-6 ">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2 ">
                                MEASURES
                              </div>
                            </div>
                            <div>
                              <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                <li>
                                  Drive and influence systemic changes by
                                  leading collaborative sustainability efforts.
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#64A70B] text-[white] w-[223px] h-[48px] rounded mt-7 text-center py-3 text-Abhaya Libre ExtraBold ">
                      BUILD
                    </div>
                    <p className="mt-4 text-[#64A70B]">
                      Keep up the fantastic work, and remember, every small step
                      counts towards a brighter and more sustainable world!{" "}
                    </p>
                  </div>
                  <div className="mt-3 h-[264px]">
                    <HomeFooter />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaturityAssessmentRoadmapSetTarget;
