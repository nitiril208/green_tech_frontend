import moralesIcon from "@/assets/images/Morales.png";
import person from "@/assets/images/person.png";
import treePlantingIcon from "@/assets/images/TreePlanting.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import { BiCheckCircle, BiShow } from "react-icons/bi";
import { BsPencilFill, BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowUp, MdOutlineCalendarMonth } from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

function EmployeeAssessmentResultFirst() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [activeTab, setActiveTab] = useState("My Action Items");

  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[1470px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[1420px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
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

        <div className="ml-[20px] flex">
          <div className="">
            <h1 className="text-[16px] font-bold">Re Assessment 2</h1>
            <p className="text-[12px] text-[#606060]">
              Completed Date: 12/03/2024
            </p>
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
                }  py-2 px-4  text-[16px] h-[49px] `}
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
                <div className="">
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

                  <div className=" md:h-[390px] md:w-[1200px] m-4 mt-14">
                    <div className="w-full  md:h-[74px] border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                      <div className="pb-2 pt-2 flex flex-col md:flex-row gap-5  md:h-[74px] md:w-[1200px]">
                        <div className="flex flex-col md:flex-row ">
                          <div className="ml-4 flex bg-white rounded-full drop-shadow-md w-14 h-14 p-4 mb-2">
                            <img src={treePlantingIcon} alt="Leaf Icon" />
                            <div className="ml-8 text-[#1D2026] font-Calibri font-bold">
                              Environmental
                            </div>
                          </div>

                          <div className="bg-[#E3E5F5] h-[20px]  md:w-[511px] rounded-full md:ml-[160px] mt-5">
                            <div
                              className="h-[20px] bg-[#FFD56A] text-white rounded-full text-[14px] text-center"
                              style={{ width: "25%" }}
                            >
                              25%
                            </div>
                          </div>

                          <div className="flex relative ml-[20px] mt-5 md:mt-0">
                            <div className="ml-[60px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#FFD56A] h-[30px] w-[107px] flex items-center justify-center">
                              Intermediate
                            </div>
                            <div className="absolute md:top-8 ml-[167px] border-2 border-dashed border-[#A6A6A6] w-40 mt-8 md:mt-0">
                              <svg
                                className="absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-700 mt-7"
                                xmlns="http://www.w3.org/2000/svg"
                                width="85"
                                height="85"
                                viewBox="0 0 256 256"
                                fill="#85B6FF"
                              >
                                <path d="M 87.85 41.551 L 5.545 1.167 C 2.414 -0.369 -0.979 2.725 0.263 5.984 l 14.342 37.648 c 0.336 0.881 0.336 1.854 0 2.735 L 0.263 84.016 c -1.241 3.259 2.152 6.353 5.282 4.817 L 87.85 48.449 C 90.717 47.043 90.717 42.957 87.85 41.551 z" />
                              </svg>
                            </div>
                            <div className="text-white mt-4 text-center font-sans rounded-full bg-[#2C9367] bg-opacity-70 h-8 w-24 flex items-center justify-center ml-[160px]">
                              Advanced
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full h-auto md:h-[90px] border-b border-l border-r border-solid border-[#D9D9D9]">
                      <div className="flex h-auto md:h-[90px] w-full md:w-[900px] pt-4 md:pt-8 pl-4">
                        <p className="pl-3 font-Calibri text-[#000000]">
                          Lead in energy efficiency through continuous
                          optimization and strategic energy management.
                        </p>
                      </div>

                      <div className="ml-0 md:ml-[130px] mt-4 md:mt-6 flex flex-col md:flex-row gap-2 md:gap-2 items-start md:items-center">
                        <a
                          href="#"
                          className="text-[#4285F4] px-4 py-1 text-sm underline underline-[#4285F4]"
                        >
                          History
                        </a>
                        <button className="bg-[#00778B] text-white rounded-[5px] px-4 py-1 text-sm h-[35px] font-abhaya">
                          Assign
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full h-auto md:h-[112px] border-b border-l border-r border-solid border-[#D9D9D9]">
                      <div className="h-auto md:h-[112px] w-full md:w-[900px] pl-4 flex">
                        <div className="flex flex-col w-full">
                          <div>
                            <p className="pt-2 text-[#000000] pl-3">
                              Lead in energy efficiency through continuous
                              optimization and strategic energy management.
                            </p>
                          </div>
                          <div className="flex gap-2 pl-3 mt-2">
                            <div>
                              <img
                                src={person}
                                className="w-[24px] h-[24px] rounded-full mr-2"
                              />
                            </div>
                            <div>
                              <p className="text-gray-800 font-semibold pt-1">
                                Employee Name
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 pl-3 pt-2">
                            <div>
                              <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />
                            </div>
                            <div>
                              <p className="text-sm text-[#666666]">
                                Date:{" "}
                                <span className="text-black">
                                  2nd March, 2024 - 2nd March, 2024
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-center md:ml-[200px] gap-2 mt-4 md:mt-6">
                        <button className="bg-[#FFD56A] w-[75px] h-[28px] text-black rounded-full px-4 py-1 text-xs font-abhaya">
                          On time
                        </button>
                        <button className="bg-[#00778B] text-white rounded text-sm h-[32px] w-[75px] flex items-center font-abhaya">
                          <BsPencilFill className="ml-4 mr-2" />
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full h-auto md:h-[112px] border-b border-l border-r border-solid border-[#D9D9D9]">
                      <div className="h-auto md:h-[112px] w-full md:w-[900px] pl-4">
                        <div className="flex flex-col">
                          <div>
                            <p className="pt-2 text-[#000000] pl-3">
                              Lead in energy efficiency through continuous
                              optimization and strategic energy management.
                            </p>
                          </div>
                          <div className="flex gap-2 pl-3 mt-2">
                            <div>
                              <img
                                src={person}
                                className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px]"
                              />
                            </div>
                            <div>
                              <p className="text-gray-800 font-semibold pt-2">
                                Employee Name
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 pl-3 pt-2">
                            <div>
                              <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />
                            </div>
                            <div>
                              <p className="text-sm text-[#666666]">
                                Date:{" "}
                                <span className="text-black">
                                  2nd March, 2024 - 2nd March, 2024
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ml-0 md:ml-[200px] flex flex-col gap-2 mt-4 md:mt-6 items-start md:items-center">
                        <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs font-abhaya">
                          Dealy
                        </button>
                        <button className="bg-[#00778B] text-white rounded text-sm h-[32px] w-[75px] flex items-center font-abhaya">
                          <BsPencilFill className="ml-4 mr-2" />
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-auto md:h-[112px] border-b border-l border-r border-[#D9D9D9] rounded-bl-lg rounded-br-lg flex flex-col md:flex-row">
                      <div className="w-full md:w-[900px] h-auto md:h-[112px]">
                        <div className="h-auto md:h-[112px] w-full pl-4 flex flex-col md:flex-row">
                          <div className="flex flex-col">
                            <div>
                              <p className="pt-2 text-[#000000] pl-3">
                                Lead in energy efficiency through continuous
                                optimization and strategic energy management.
                              </p>
                            </div>
                            <div className="flex gap-2 pl-3 mt-2 md:mt-0">
                              <div>
                                <img
                                  src={person}
                                  className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px]"
                                />
                              </div>
                              <div>
                                <p className="text-gray-800 font-semibold pt-2">
                                  Employee Name
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 pl-3 pt-2">
                              <div>
                                <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />
                              </div>
                              <div>
                                <p className="text-sm text-[#666666]">
                                  Date:{" "}
                                  <span className="text-black">
                                    2nd March, 2024 - 2nd March, 2024
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row ml-0 md:ml-[40px] gap-2 md:gap-16 mt-4 md:mt-6 items-start md:items-center">
                        <button className="bg-[#00778B] text-white rounded gap-2 text-sm h-[32px] w-[75px] flex mt-8 md:mt-8 font-abhaya items-center justify-center">
                          <BiShow className="mr-1" />
                          Edit
                        </button>
                        <div className="flex flex-col items-start md:items-center">
                          <button className="bg-[#F63636] w-[75px] h-[28px] font-abhaya text-white rounded-full px-4 py-1 text-xs">
                            Dealy
                          </button>
                          <div className="flex text-green-500 mt-3 mr-4 items-center">
                            <BiCheckCircle className="mr-1" />
                            completed
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:h-[390px] md:w-[1200px] mt-4">
                      <div className="w-full  md:h-[74px] border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                        <div className="pb-2 pt-2 flex flex-col md:flex-row gap-5  md:h-[74px] md:w-[1200px]">
                          <div className="flex flex-col md:flex-row ">
                            <div className="ml-4 flex bg-white rounded-full drop-shadow-md w-14 h-14 p-4 mb-2">
                              <img src={moralesIcon} alt="Leaf Icon" />
                              <div className="ml-8 text-[#1D2026] font-Calibri font-bold">
                                Governance
                              </div>
                            </div>

                            <div className="bg-[#E3E5F5] h-[20px]  md:w-[511px] rounded-full md:ml-[160px] mt-5">
                              <div
                                className="h-[20px] bg-[#FFD56A] text-white rounded-full text-[14px] text-center"
                                style={{ width: "25%" }}
                              >
                                25%
                              </div>
                            </div>

                            <div className="flex relative ml-[20px] mt-5 md:mt-0">
                              <div className="ml-[60px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#FFD56A] h-[30px] w-[107px] flex items-center justify-center">
                                Intermediate
                              </div>
                              <div className="absolute md:top-8 ml-[167px] border-2 border-dashed border-[#A6A6A6] w-40 mt-8 md:mt-0">
                                <svg
                                  className="absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-700 mt-7"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="85"
                                  height="85"
                                  viewBox="0 0 256 256"
                                  fill="#85B6FF"
                                >
                                  <path d="M 87.85 41.551 L 5.545 1.167 C 2.414 -0.369 -0.979 2.725 0.263 5.984 l 14.342 37.648 c 0.336 0.881 0.336 1.854 0 2.735 L 0.263 84.016 c -1.241 3.259 2.152 6.353 5.282 4.817 L 87.85 48.449 C 90.717 47.043 90.717 42.957 87.85 41.551 z" />
                                </svg>
                              </div>
                              <div className="text-white mt-4 text-center font-sans rounded-full bg-[#2C9367] bg-opacity-70 h-8 w-24 flex items-center justify-center ml-[160px]">
                                Advanced
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row w-full h-auto md:h-[90px] border-b border-l border-r border-solid border-[#D9D9D9]">
                        <div className="flex h-auto md:h-[90px] w-full md:w-[900px] pt-4 md:pt-8 pl-4">
                          <p className="pl-3 font-Calibri text-[#000000]">
                            Lead in energy efficiency through continuous
                            optimization and strategic energy management.
                          </p>
                        </div>

                        <div className="ml-0 md:ml-[130px] mt-4 md:mt-6 flex flex-col md:flex-row gap-2 md:gap-2 items-start md:items-center">
                          <a
                            href="#"
                            className="text-[#4285F4] px-4 py-1 text-sm underline underline-[#4285F4]"
                          >
                            History
                          </a>
                          <button className="bg-[#00778B] text-white font-abhaya rounded-[5px] px-4 py-1 text-sm h-[35px]">
                            Assign
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row w-full h-auto md:h-[112px] border-b border-l border-r border-solid border-[#D9D9D9]">
                        <div className="h-auto md:h-[112px] w-full md:w-[900px] pl-4 flex">
                          <div className="flex flex-col w-full">
                            <div>
                              <p className="pt-2 text-[#000000] pl-3">
                                Lead in energy efficiency through continuous
                                optimization and strategic energy management.
                              </p>
                            </div>
                            <div className="flex gap-2 pl-3 mt-2">
                              <div>
                                <img
                                  src={person}
                                  className="w-[24px] h-[24px] rounded-full mr-2"
                                />
                              </div>
                              <div>
                                <p className="text-gray-800 font-semibold pt-1">
                                  Employee Name
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 pl-3 pt-2">
                              <div>
                                <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />
                              </div>
                              <div>
                                <p className="text-sm text-[#666666]">
                                  Date:{" "}
                                  <span className="text-black">
                                    2nd March, 2024 - 2nd March, 2024
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-center md:ml-[200px] gap-2 mt-4 md:mt-6">
                          <button className="bg-[#FFD56A] w-[75px] h-[28px] text-black rounded-full px-4 py-1 text-xs font-abhaya">
                            On time
                          </button>
                          <button className="bg-[#00778B] text-white rounded text-sm h-[32px] w-[75px] flex items-center font-abhaya">
                            <BsPencilFill className="ml-4 mr-2" />
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row w-full h-auto md:h-[112px] border-b border-l border-r border-solid border-[#D9D9D9]">
                        <div className="h-auto md:h-[112px] w-full md:w-[900px] pl-4">
                          <div className="flex flex-col">
                            <div>
                              <p className="pt-2 text-[#000000] pl-3">
                                Lead in energy efficiency through continuous
                                optimization and strategic energy management.
                              </p>
                            </div>
                            <div className="flex gap-2 pl-3 mt-2">
                              <div>
                                <img
                                  src={person}
                                  className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px]"
                                />
                              </div>
                              <div>
                                <p className="text-gray-800 font-semibold pt-2">
                                  Employee Name
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 pl-3 pt-2">
                              <div>
                                <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />
                              </div>
                              <div>
                                <p className="text-sm text-[#666666]">
                                  Date:{" "}
                                  <span className="text-black">
                                    2nd March, 2024 - 2nd March, 2024
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="ml-0 md:ml-[200px] flex flex-col gap-2 mt-4 md:mt-6 items-start md:items-center">
                          <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs font-abhaya">
                            Dealy
                          </button>
                          <button className="bg-[#00778B] text-white rounded text-sm h-[32px] w-[75px] flex items-center font-abhaya">
                            <BsPencilFill className="ml-4 mr-2" />
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="w-full h-auto md:h-[112px] border-b border-l border-r border-[#D9D9D9] rounded-bl-lg rounded-br-lg flex flex-col md:flex-row">
                        <div className="w-full md:w-[900px] h-auto md:h-[112px]">
                          <div className="h-auto md:h-[112px] w-full pl-4 flex flex-col md:flex-row">
                            <div className="flex flex-col">
                              <div>
                                <p className="pt-2 text-[#000000] pl-3">
                                  Lead in energy efficiency through continuous
                                  optimization and strategic energy management.
                                </p>
                              </div>
                              <div className="flex gap-2 pl-3 mt-2 md:mt-0">
                                <div>
                                  <img
                                    src={person}
                                    className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px]"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-800 font-semibold pt-2">
                                    Employee Name
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 pl-3 pt-2">
                                <div>
                                  <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />
                                </div>
                                <div>
                                  <p className="text-sm text-[#666666]">
                                    Date:{" "}
                                    <span className="text-black">
                                      2nd March, 2024 - 2nd March, 2024
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row ml-0 md:ml-[40px] gap-2 md:gap-16 mt-4 md:mt-6 items-start md:items-center">
                          <button className="bg-[#00778B] text-white rounded gap-2 text-sm h-[32px] w-[75px] flex mt-8 md:mt-8 font-abhaya items-center justify-center">
                            <BiShow className="mr-1" />
                            Edit
                          </button>
                          <div className="flex flex-col items-start md:items-center">
                            <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs font-abhaya">
                              Dealy
                            </button>
                            <div className="flex text-green-500 mt-3 mr-4 items-center">
                              <BiCheckCircle className="mr-1" />
                              completed
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center mt-4">
                        <div className="w-full md:w-auto md:ml-[500px] mb-4 md:mb-0">
                          <button className="bg-[#E5F1F3] text-[#00778B] text-[16px] py-2 rounded h-[48px] w-full md:w-[223px] font-abhaya">
                            Retake Assessment
                          </button>
                        </div>
                        <div className=" md:ml-auto bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] md:w-[332px]">
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
                    </div>
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

export default EmployeeAssessmentResultFirst;
