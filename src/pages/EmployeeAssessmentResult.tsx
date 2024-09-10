import lightOnIcon from "@/assets/images/LightOn.png";
import moraleIcon from "@/assets/images/Morales.png";
import neighbourIcon from "@/assets/images/Neighbour.png";
import pathStepsIcon from "@/assets/images/PathSteps.png";
import person from "@/assets/images/person.png";
import weakFinancialGrowthIcon from "@/assets/images/WeakFinancialGrowth.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import {
  RiArrowDownSLine,
  RiArrowDropDownLine,
  RiCloseLine,
  RiMenuLine,
} from "react-icons/ri";

function EmployeeAssessmentResult() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [activeTab, setActiveTab] = useState("My Action Items");

  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };

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
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[1530px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[1490px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
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
                    className="flex-1 mr-2 focus: placeholder-[#A3A3A3] text-sm focus:border focus:border-[#4b4b4b] shadow-none outline-none"
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

        <div className="ml-[20px]">
          <h1 className="text-[16px] font-bold">Re Assessment 2</h1>
          <p className="text-[12px] text-[#606060]">
            Completed Date: 12/03/2024
          </p>
        </div>

        <div className="">
          <div className="md:h-[49px] bg-[#FFFFFF] border-b border-[#D9D9D9]">
            <div className="mt-[9px] flex flex-col md:flex-row">
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

              <button className="bg-[#00778B] text-white font-semibold w-[78px]  h-[37px] rounded md:ml-[720px] font-abhaya">
                Export
              </button>
            </div>

            <div className="  ">
              {activeTab === "Assessment Result" && <div> A </div>}

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
                      <div className="border border-solid border-[#D9D9D9]  md:w-[1150px]  md:h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                        <div className="flex h-8">
                          <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] md:w-[209px] items-start">
                            <h2 className="text-lg">
                              <span className="text-white">Your level - </span>
                              <span className="text-[#FFD56A] font-semibold">
                                {" "}
                                Intermediate
                              </span>
                            </h2>
                          </div>
                          <div
                            className={`ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
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
                        <div className="flex flex-col md:flex-row h-auto md:h-32">
                          <div className="flex flex-col items-center md:items-start">
                            <div className="bg-white rounded-full drop-shadow-md w-16 h-16 p-4 mt-4 ml-0 md:ml-11">
                              <img
                                src="public/assets/img/Tree Planting.png"
                                alt="Leaf Icon"
                              />
                            </div>
                            <div className="ml-0 md:ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-0 md:ml-20 mt-4 md:mt-0">
                            <div className="bg-white rounded-lg p-4 flex flex-col">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className="text-black-500 py-2 px-4 flex items-center justify-between border border-[#E9EAF0]">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-[543px] h-auto md:h-[110px] mt-4 md:mt-0">
                            <div className="bg-white rounded-full flex w-6 h-6">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2">
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
                          <div className="mt-4 md:mt-8">
                            <button className="bg-[#64A70B] font-abhaya text-white py-2 px-4 rounded-md flex justify-between h-[40px] w-[150px] items-center ml-4 md:ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] md:w-[1150px] h-auto md:h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px]  md:w-[209px] items-start">
                            <h2 className="text-lg">
                              <span className="text-[#414648]">
                                Your level -{" "}
                              </span>
                              <span className="text-[#FFD56A] font-semibold">
                                Intermediate
                              </span>
                            </h2>
                          </div>
                          <div
                            className={`ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
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
                        <div className="flex flex-col md:flex-row h-auto md:h-32">
                          <div className="flex flex-col items-center md:items-start">
                            <div className="bg-white rounded-full drop-shadow-md w-16 h-16 p-4 mt-4 ml-0 md:ml-11">
                              <img
                                src={weakFinancialGrowthIcon}
                                alt="Leaf Icon"
                              />
                            </div>
                            <div className="ml-0 md:ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-0 md:ml-20 mt-4 md:mt-0">
                            <div className="bg-white rounded-lg p-4 flex flex-col">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className="text-black-500 py-2 px-4 flex items-center justify-between border border-[#E9EAF0]">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-[543px] h-auto md:h-[110px] mt-4 md:mt-0">
                            <div className="bg-white rounded-full flex w-6 h-6">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2">
                                MEASURES
                              </div>
                            </div>
                            <div>
                              <ul className="list-disc ml-4 md:ml-6 md:text-[14px] text-[#8C94A3]">
                                <li>
                                  Systematically link sustainability efforts to
                                  economic outcomes, continuously tracking and
                                  optimizing impact.
                                </li>
                                <li>
                                  Integrate risk management into business
                                  strategy, assessing and mitigating economic
                                  implications comprehensively.
                                </li>
                                <a
                                  href="#"
                                  className="text-blue-500 text-[10px] md:text-[12px] hover:underline"
                                >
                                  View More
                                </a>
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-8">
                            <button className="bg-[#64A70B] font-abhaya text-white py-2 px-4 rounded-md flex justify-between h-[40px] w-[150px] items-center ml-4 md:ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-full md:w-[1150px] h-auto md:h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] md:w-[209px] items-start">
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
                            className={`ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
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
                        <div className="flex flex-col md:flex-row h-auto md:h-32">
                          <div className="flex flex-col items-center md:items-start">
                            <div className="bg-white rounded-full drop-shadow-md w-16 h-16 p-4 mt-4 ml-0 md:ml-11">
                              <img src={lightOnIcon} alt="Leaf Icon" />
                            </div>
                            <div className="ml-0 md:ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-0 md:ml-20 mt-4 md:mt-0">
                            <div className="bg-white rounded-lg p-4 flex flex-col">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className="text-black-500 py-2 px-4 flex items-center justify-between border border-[#E9EAF0]">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-[543px] h-auto md:h-[110px] mt-4 md:mt-0">
                            <div className="bg-white rounded-full flex w-6 h-6">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2">
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
                          <div className="mt-4 md:mt-8">
                            <button className="bg-[#64A70B] font-abhaya text-white py-2 px-4 rounded-md flex justify-between h-[40px] w-[150px] items-center ml-4 md:ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-full md:w-[1150px] h-auto md:h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px]  md:w-[209px] items-start">
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
                            className={`ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
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
                        <div className="flex flex-col md:flex-row h-auto md:h-32">
                          <div className="flex flex-col items-center md:items-start">
                            <div className="bg-white rounded-full drop-shadow-md w-16 h-16 p-4 mt-4 ml-0 md:ml-11">
                              <img src={neighbourIcon} alt="Leaf Icon" />
                            </div>
                            <div className="ml-0 md:ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-0 md:ml-20 mt-4 md:mt-0">
                            <div className="bg-white rounded-lg p-4 flex flex-col">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className="text-black-500 py-2 px-4 flex items-center justify-between border border-[#E9EAF0]">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-[543px] h-auto md:h-[110px] mt-4 md:mt-0">
                            <div className="bg-white rounded-full flex w-6 h-6">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2">
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
                          <div className="mt-4 md:mt-8">
                            <button className="bg-[#64A70B] font-abhaya text-white py-2 px-4 rounded-md flex justify-between h-[40px] w-[150px] items-center ml-4 md:ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="border border-solid border-[#D9D9D9] w-full md:w-[1150px] h-auto md:h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                        <div className="flex h-8">
                          <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px]  md:w-[209px] items-start">
                            <h2 className="text-lg">
                              <span className="text-white">Your level - </span>
                              <span className="text-[#FFD56A] font-semibold">
                                Intermediate
                              </span>
                            </h2>
                          </div>
                          <div
                            className={`ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
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
                        <div className="flex flex-col md:flex-row h-auto md:h-32">
                          <div className="flex flex-col items-center md:items-start">
                            <div className="bg-white rounded-full drop-shadow-md w-16 h-16 p-4 mt-4 ml-0 md:ml-11">
                              <img src={moraleIcon} alt="Leaf Icon" />
                            </div>
                            <div className="ml-0 md:ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-0 md:ml-20 mt-4 md:mt-0">
                            <div className="bg-white rounded-lg p-4 flex flex-col">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className="text-black-500 py-2 px-4 flex items-center justify-between border border-[#E9EAF0]">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-[543px] h-auto md:h-[110px] mt-4 md:mt-0">
                            <div className="bg-white rounded-full flex w-6 h-6">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2">
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
                          <div className="mt-4 md:mt-8">
                            <button className="bg-[#64A70B] font-abhaya text-white py-2 px-4 rounded-md flex justify-between h-[40px] w-[150px] items-center ml-4 md:ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="border border-solid border-[#D9D9D9] w-full md:w-[1150px] h-auto md:h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                        <div className="flex h-8">
                          <div className="bg-[#EDF0F4] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px]  md:w-[209px] items-start">
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
                            className={`ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${
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
                        <div className="flex flex-col md:flex-row h-auto md:h-32">
                          <div className="flex flex-col items-center md:items-start">
                            <div className="bg-white rounded-full drop-shadow-md w-16 h-16 p-4 mt-4 ml-0 md:ml-11">
                              <img src={pathStepsIcon} alt="Leaf Icon" />
                            </div>
                            <div className="ml-0 md:ml-8 mt-4 text-[#1D2026] font-Calibri">
                              Environmental
                            </div>
                          </div>
                          <div className="ml-0 md:ml-20 mt-4 md:mt-0">
                            <div className="bg-white rounded-lg p-4 flex flex-col">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500" />
                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                  RECOMMENDED
                                </p>
                              </div>
                              <div className="text-black-500 py-2 px-4 flex items-center justify-between border border-[#E9EAF0]">
                                <span>Advanced</span>
                                <div className="ml-12">
                                  <RiArrowDropDownLine className="text-3xl" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-[543px] h-auto md:h-[110px] mt-4 md:mt-0">
                            <div className="bg-white rounded-full flex w-6 h-6">
                              <img
                                src="public/assets/img/manu.png"
                                alt="Leaf Icon"
                              />
                              <div className="text-[#8C94A3] ml-2">
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
                          <div className="mt-4 md:mt-8">
                            <button className="bg-[#64A70B] font-abhaya text-white py-2 px-4 rounded-md flex justify-between h-[40px] w-[150px] items-center ml-4 md:ml-4">
                              <span className="font-Calibri text-xs">
                                Define Action Items
                              </span>
                            </button>
                          </div>
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

              {activeTab === "My Action Items" && <div>Golu</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAssessmentResult;
