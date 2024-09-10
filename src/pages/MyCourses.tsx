import diplomaIcon from "@/assets/images/diploma.png";
import fulltimeIcon from "@/assets/images/fulltime.png";
import nature from "@/assets/images/nature.png";
import onlineIcon from "@/assets/images/online.png";
import person from "@/assets/images/person.png";
import speedIcon from "@/assets/images/Speed.png";
import timeIcon from "@/assets/images/time.png";
import unversityIcon from "@/assets/images/unversity.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

function MyCourses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[1270px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[1230px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
        <div className="p-4">
          <div className="pb-4 w-full lg:w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <RiMenuLine
                className="h-6 w-6 lg:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
              <span className="text-[24px] font-semibold ml-2">Dashboard</span>
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
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center h-auto md:h-[92px] w-full bg-[#F3F3F3] p-4">
          <div className="flex flex-row flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="w-full md:w-auto">
              <label
                htmlFor="environment"
                className="block text-sm font-medium text-gray-700"
              >
                Filter by
              </label>
              <select
                id="environment"
                name="environment"
                className="mt-1 block pl-3 pr-10 py-2 text-base border border-[#A3A3A3] rounded shadow-sm bg-[#F3F3F3]   md:w-[248px]"
                defaultValue="Environment"
              >
                <option>Environment</option>
                <option>Social</option>
                <option>Economics</option>
                <option>Governance</option>
                <option>Technology & Innovation</option>
                <option>Strategic Integration</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Filter by
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block pl-3 pr-10 py-2 text-base border border-[#A3A3A3] rounded shadow-sm bg-[#F3F3F3]  md:w-[176px]"
                defaultValue="In Progress"
              >
                <option>In Progress</option>
                <option>Completed</option>
                <option>Upcoming courses</option>
              </select>
            </div>
          </div>
          <div className="flex mt-4 md:mt-0 gap-2 md:gap-4 md:ml-4">
            <AiOutlineAppstore className="text-[#00778B] w-8 h-8" />
            <AiOutlineBars className="text-[#A3A3A3] w-8 h-8" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center  ">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="m-3 w-full md:w-[386px] border border-solid border-[#D9D9D9] rounded"
            >
              <div className="relative overflow-hidden rounded">
                <img
                  className="w-full h-[231px] rounded object-cover object-center"
                  src={nature}
                  alt="nature"
                />
                <div className="flex items-center absolute bottom-0 left-[220px] w-30 rounded-full py-1 px-2 mb-4 ml-8">
                  <button className="bg-[#00778B] text-white font-medium py-2 px-4 rounded-lg shadow h-[50px] w-[105px]">
                    Continue
                  </button>
                </div>
              </div>
              <div className="w-full mt-[5px] ml-[15px]">
                <p className="text-[16px] font-semibold">
                  Certificate in the Sustainable...
                </p>
              </div>
              <div className="flex mt-2">
                <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">
                  {30}%
                </div>
                <div className="text-[12px] ml-[175px] mt-2">
                  1 of 5 Completed
                </div>
              </div>
              <div className="w-[90%] lg:w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">
                <div
                  className="h-[8px] bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                  style={{ width: "25%" }}
                />
              </div>
              <div className="flex flex-wrap gap-6 p-4">
                <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[110px]">
                  Environmental
                </button>
                <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[95px]">
                  Governance
                </button>
                <button className="bg-[#D6F5AC] text-[#3A3A3A] rounded-full h-[28px] w-[54px]">
                  Social
                </button>
              </div>
              <div className="flex flex-wrap gap-2 p-2">
                <div className="flex items-center gap-1">
                  <img
                    className="h-[16px] w-[18px]"
                    src={speedIcon}
                    alt="speedIcon"
                  />
                  <p className="text-xs">Level- Advanced</p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <img
                    className="h-[16px] w-[18px]"
                    src={diplomaIcon}
                    alt="diplomaIcon"
                  />
                  <p className="text-xs">Post Graduate Diploma</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-2">
                <div className="flex items-center gap-1">
                  <img
                    className="h-[16px] w-[18px]"
                    src={fulltimeIcon}
                    alt="fulltimeIcon"
                  />
                  <p className="text-xs">Full Time</p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <img
                    className="h-[16px] w-[18px]"
                    src={onlineIcon}
                    alt="onlineIcon"
                  />
                  <p className="text-xs">Online</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-2">
                <div className="flex items-center gap-1">
                  <img
                    className="h-[16px] w-[18px]"
                    src={timeIcon}
                    alt="timeIcon"
                  />
                  <p className="text-xs">2 Years</p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <img
                    className="h-[16px] w-[18px]"
                    src={unversityIcon}
                    alt="unversityIcon"
                  />
                  <p className="text-xs">Atlantic Technological University</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-0 mr-2 lg:top-[1178px] bottom-0 lg:left-[1150px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-full lg:w-[332px] max-w-[332px]">
          <img src={person} alt="Profile" className="h-8 w-8 rounded-full" />
          <div className="flex-grow ml-2 flex flex-col items-start justify-center">
            <span className="text-gray-900 font-semibold text-sm md:text-base lg:text-lg">
              Messaging
            </span>
          </div>
          <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
