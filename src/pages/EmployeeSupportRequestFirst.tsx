import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiFile } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import { VscFilePdf } from "react-icons/vsc";

function EmployeeSupportRequestFirst() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [ticketReply, setTicketReply] = useState<string>("");

  const handleTicketReplyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTicketReply(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[850px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[795px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
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
                  / Support request
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

        <div className="">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex p-4">
              <img
                src={person}
                alt="Employee Name"
                className="w-[32px] h-[32px] rounded-full mr-4 mt-[5px]"
              />
              <div className="flex flex-col">
                <span className="text-[16px] text-[#000000]">
                  Danila Raffel
                </span>
                <span className="text-[12px] text-[#A3A3A3]">Client</span>
              </div>
            </div>

            <div className="flex flex-col m-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 ">
                <div className="flex items-center">
                  <h1 className="text-[16px]">Status:</h1>
                  <div className="bg-[#0E9CFF] text-xs text-white py-2 h-[25px] w-[71px] px-4 rounded-full flex items-center justify-center ml-2">
                    Answered
                  </div>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <h1 className="text-[16px]">Priority:</h1>
                  <div className="bg-[#FF5252] text-xs text-white py-2 h-[25px] w-[43px] px-4 rounded-full flex items-center justify-center ml-2">
                    High
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 border  md:w-[1190px] m-5 rounded">
            <div className="text-[16px] text-[#A3A3A3] font-semibold">
              Category
            </div>
            <div className="text-black">System Issues</div>

            <div className="text-[16px] font-semibold text-[#A3A3A3]">
              Ticket Details
            </div>
            <div className="text-black text-[15.4px]">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a
                gallery of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center mt-[10px]">
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full">
                  <VscFilePdf className="w-6 h-6" />
                </div>
                <div className="text-gray-700 ml-[20px]">
                  pdf file attachment.pdf
                </div>
              </div>
              <div className="ml-0 md:ml-[20px] mt-2 md:mt-0">
                <button className="bg-[#00778B] text-white px-3 py-1 rounded font-abhaya">
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>

          <div className="ml-4 mr-4 rounded-lg">
            <label
              htmlFor="ticketReply"
              className="block text-sm font-medium text-gray-700"
            >
              Ticket Reply
            </label>
            <textarea
              id="ticketReply"
              name="ticketReply"
              value={ticketReply}
              onChange={handleTicketReplyChange}
              placeholder="Enter details"
              className="mt-1 block w-full md:w-[1195px] h-32 py-2 px-3 border border-[#D9D9D9] placeholder-[#A3A3A3] rounded"
            ></textarea>
          </div>

          <div>
            <div className="flex flex-col md:flex-row items-center p-4">
              <label
                htmlFor="upload-document"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input type="file" id="upload-document" className="hidden" />
                <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full">
                  <FiFile className="w-6 h-6" />
                </div>
                <span>Upload Document </span>
              </label>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4 md:mt-0 md:ml-auto font-abhaya">
                SUBMIT
              </button>
            </div>

            <div className="mt-4 md:mt-0 md:ml-[895px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-full md:w-[332px]">
              <img
                src={person}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                <span className="text-gray-900 font-semibold">Messaging</span>
              </div>
              <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSupportRequestFirst;
