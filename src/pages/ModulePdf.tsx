import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import {
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
  BsSearch,
} from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  MdKeyboardArrowUp,
  MdOutlineMessage,
  MdOutlineStar,
} from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import { VscFilePdf } from "react-icons/vsc";

function ModulePdf() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const chapters = [
    { name: "Chapter 1 - Intro", status: "Started", isActive: true },
    {
      name: "Chapter 2 - Required tools",
      status: "Not Started",
      isActive: false,
    },
    { name: "Chapter 3 - jcdjxcdm", status: "Not Started", isActive: false },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[780px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[750px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
        <div className="p-4">
          <div className="pb-4 w-full lg:w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <RiMenuLine
                className="h-6 w-6 lg:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
              <span className="text-[18px] ml-1 font-semibold">
                My Courses
                <span className="hidden md:inline text-[18px] font-semibold text-[#00778B]">
                  {" "}
                  / Social
                </span>
              </span>
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
                <div className="ml-2 ">
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

        <div className="ml-6">
          <h1 className="text-[28px] font-semibold">
            Wind energy basic course
          </h1>
        </div>

        {/* tab */}

        <div className="mt-4">
          <div className="flex flex-col md:flex-row justify-between border-b">
            <div className="flex flex-col md:flex-row">
              <button
                className={`py-2 px-4 text-[14px] md:text-[16px] text-center border-b-2 ${
                  activeTab === "tab1"
                    ? "border-[#00778B] text-[#00778B]"
                    : "border-transparent"
                } focus:`}
                onClick={() => handleTabClick("tab1")}
              >
                Information
              </button>
              <button
                className={`py-2 px-4 text-[14px] md:text-[16px] text-center border-b-2 md:ml-4 ${
                  activeTab === "tab2"
                    ? "border-[#00778B] text-[#00778B]"
                    : "border-transparent"
                } focus:`}
                onClick={() => handleTabClick("tab2")}
              >
                Module
              </button>
            </div>
            <div className="relative mt-2 md:mt-0">
              <button className="flex items-center justify-center py-2 px-4 text-[14px] md:text-[16px] text-center border-b-2 md:mr-6 border-[#00778B] text-[#00778B] focus:">
                Modules Completed - 1/5
                <IoChevronDownSharp
                  className="ml-2 cursor-pointer"
                  onClick={handleIconClick}
                />
              </button>
              {isOpen && (
                <div className="absolute bg-white border rounded-lg shadow-sm  md:w-[240px] h-[200px]">
                  <div>
                    {chapters.map((chapter, index) => (
                      <div key={index} className="flex items-center">
                        <div className="relative">
                          {index !== chapters.length - 1 && (
                            <div className="absolute top-9 -translate-y-3 left-7 w-0.5 h-8 bg-[#D9D9D9]"></div>
                          )}
                          <div
                            className={`ml-4 w-6 h-6 rounded-full ${
                              chapter.isActive
                                ? "bg-white h-2 w-2 border-2 border-[#017285]"
                                : "bg-white"
                            } border-2 border-[#D9D9D9] flex items-center justify-center`}
                          >
                            {chapter.isActive && (
                              <div className="w-3 h-3 bg-[#017285] rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 mt-3">
                          <h3 className="text-[14px] text-[#000000]">
                            {chapter.name}
                          </h3>
                          <p className="text-[14px] text-[#606060]">
                            {chapter.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="">
            {activeTab === "tab1" && <p>A</p>}
            {activeTab === "tab2" && (
              <div className="m-4">
                <div className="w-full md:w-[1200px] h-[100px] bg-[#F1F1F1] flex border border-[#D9D9D9] rounded-md">
                  <div className="flex items-center p-2 md:p-0">
                    <VscFilePdf className="h-[50px] w-[35px] mr-4 text-[#D9D9D9] ml-4" />
                    <div>
                      <h1 className="font-semibold text-[#000000] text-[14px] md:text-[16px]">
                        Doug's Story 3.pdf
                      </h1>
                      <p className="text-[#A3A3A3] text-[14px] md:text-[16px]">
                        PDF File
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[12px]">
                      Category:
                      <span className="text-[12px] text-[#00778B]">
                        Environment
                      </span>
                    </p>
                    <div className="flex items-center space-x-2">
                      <BsHandThumbsUpFill className="text-[#00778B]" />
                      <BsHandThumbsDownFill className="text-[#A3A3A3]" />
                    </div>
                  </div>
                </div>

                <h1 className="text-[18px] md:text-[20px] font-semibold text-[#000000] mt-2">
                  Doug's Story 3
                </h1>
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 bg-white">
                  <div className="flex items-center space-x-4">
                    <img
                      src={person}
                      alt="Emilia Anderson"
                      className="h-8 w-8 rounded-full border-[#D9D9D9] border-2"
                    />
                    <div className="ml-2">
                      <div className="text-[14px] md:text-[16px] font-medium text-gray-700">
                        Devon Lane
                      </div>
                      <div className="flex items-center space-x-1">
                        <p className="text-[14px] md:text-[16px] text-[#A3A3A3]">
                          Rating 4/5
                        </p>
                        <MdOutlineStar className="text-[#FFA25E]" />
                        <span className="text-[14px] md:text-[16px] text-[#A3A3A3]">
                          • 100 Views
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row space-x-0 space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                    <button className="p-2 border border-gray-300 rounded h-[42px] w-full md:w-[110px] flex items-center justify-center space-x-2">
                      <MdOutlineMessage className="h-[22px] w-[22px]" />
                      <span className="text-[12px]">Feedback</span>
                    </button>
                    <button className="p-2 border border-gray-300 rounded h-[42px] w-full md:w-[150px] flex items-center justify-center space-x-2">
                      <FiDownload className="h-[22px] w-[22px]" />
                      <span className="text-[12px]">Download Video</span>
                    </button>
                    <button className="pl-3 border border-gray-300 rounded h-[42px] w-full md:w-[50px]">
                      <PiShareFat className="h-[22px] w-[25px]" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 w-full md:w-[1170px] font-Inter text-[14px] md:text-[16px]">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                </div>
                <div className="mt-8 md:mt-16  flex justify-center">
                  <button className="bg-[#00778B] text-white rounded-md text-sm h-[37px] w-[137px]">
                    Mark as Complete
                  </button>
                </div>

                <div className="fixed  mt-2 right-4 md:absolute md:right-0 md:top-[690px] md:bottom-0 md:left-[1157px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModulePdf;
