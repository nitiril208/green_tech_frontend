import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

function EmployeeFqs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[730px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[690px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
        <div className="p-4">
          <div className="pb-4 w-full lg:w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <RiMenuLine
                className="h-6 w-6 lg:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
              <div className="text-[18px] ml-1 font-semibold">
                <span className="hidden md:inline text-[18px] font-semibold ">
                  Supports /
                </span>{" "}
                <span className="md:text-[#00778B] text-[#000000]">FAQ’s</span>
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
                  alt="person"
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

        <div className="mr-[10px] ml-[10px] mt-[10px] ">
          <div className=" flex justify-between p-4 border border-[#D9D9D9] ">
            <div className="font-bold">How to create an FAQ page</div>
            <div className=" text-6xl mt-[3px] ">
              <MdKeyboardArrowDown className="  h-[16px] w-[16px]" />
            </div>
          </div>
          <div className="p-4 border-b border-l border-r border-[#D9D9D9]">
            <div className="font-semibold text-[15.7px]">
              If you want to make an FAQ section that resonates with your
              customers, don’t just slap some ordinary questions and answers on
              a site page. Carefully think about what questions to include,
              consider who will answer (and how), and offer next-step solutions
              for when FAQs aren’t enough. If you want to make an FAQ section
              that resonates with your customers, don’t just slap some ordinary
              questions and answers on a site page. Carefully think about what
              questions to include, consider who will answer (and how), and
              offer next-step solutions for when FAQs aren’t enough.
            </div>
          </div>
          <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
            <div className="font-bold">How to create an FAQ page</div>
            <div className=" text-6xl mt-[3px] ">
              <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
            </div>
          </div>
          <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
            <div className="font-bold">How to create an FAQ page</div>
            <div className=" text-6xl mt-[3px] ">
              <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
            </div>
          </div>
          <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
            <div className="font-bold">How to create an FAQ page</div>
            <div className=" text-6xl mt-[3px] ">
              <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
            </div>
          </div>
          <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
            <div className="font-bold">How to create an FAQ page</div>
            <div className=" text-6xl mt-[3px] ">
              <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
            </div>
          </div>

          <div className="   lg:ml-[880px] mt-2 bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] lg:w-[332px]">
            <img src={person} alt="Profile" className="h-8 w-8 rounded-full" />
            <div className="flex-grow ml-2 flex flex-col items-start justify-center">
              <span className="text-gray-900 font-semibold">Messaging</span>
            </div>
            <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeFqs;
