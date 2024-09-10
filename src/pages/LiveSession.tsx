import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegClock, FaVideo } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

function LiveSession() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[810px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[780px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
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

        <div className="p-4">
          <div className="bg-white flex flex-col md:flex-row items-center justify-between w-full border-b-2 border-t-2 pb-6 pt-6 border-[#D9D9D9]">
            <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
              <div className="p-2 border-2 bg-[#B3B3B3] rounded-full">
                <FaVideo className="text-lg text-[#FFFFFF]" />
              </div>
              <div className="ml-4">
                <h2 className="font-semibold text-[16px]">
                  Live Session (session title)
                </h2>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex items-center text-[#666666]">
                    <LuCalendarDays className="mr-2" />
                    <p className="text-[12px]">
                      Date:{" "}
                      <span className="text-[#000000]">29th March, 2024</span>
                    </p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaRegClock className="mr-2" />
                    <p className="text-[12px]">
                      Time:{" "}
                      <span className="text-[#000000]">9:10AM to 12:15AM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right text-[12px] w-full md:w-auto">
              <p className="text-gray-600">
                Assign date:{" "}
                <span className="text-[#000000]">25th March, 2024</span>
              </p>
              <p className="text-gray-600">
                Planned completed date:{" "}
                <span className="text-[#000000]">20th April, 2024</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center h-[447px]   md:w-[1200px] bg-[#00778B1A]  md:ml-[15px] rounded-[10px]">
          <div className="text-center p-4 md:p-0">
            <p className="mb-4 text-gray-700 w-full md:w-[320px]">
              The meeting link will be enabled 15 minutes before the scheduled
              time.
            </p>
            <button className="bg-[#00778B] h-[42px] w-[110px] text-white py-2 px-4 rounded font-abhaya">
              Join
            </button>
          </div>
        </div>

        <div className=" md:ml-[885px] mt-2 bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] md:w-[332px]">
          <img src={person} alt="Profile" className="h-8 w-8 rounded-full" />
          <div className="flex-grow ml-2 flex flex-col items-start justify-center">
            <span className="text-gray-900 font-semibold">Messaging</span>
          </div>
          <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default LiveSession;
