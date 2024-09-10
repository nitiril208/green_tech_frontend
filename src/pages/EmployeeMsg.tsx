import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAttachFile } from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import { TbPhoto } from "react-icons/tb";

function EmployeeMsg() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[740px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
        <div className=" m-4 ">
          <div className="pb-4 w-full lg:w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <RiMenuLine
                className="h-6 w-6 lg:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
              <span className="text-[18px] ml-1 font-semibold">Message</span>
            </div>
            <div className="flex items-center space-x-4">
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

        <div className="flex flex-col md:flex-row">
          <div className=" md:w-[325px] h-[655px] border-r border-[#D9D9D9]">
            <div className=" md:w-[325px] h-[60px] border-b border-[#D9D9D9]">
              <div className="relative mt-4 m-2 ml-3">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus: focus:border-[#4b4b4b] w-full md:w-[298px] placeholder-[#D9D9D9]"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BsSearch className="text-[#D9D9D9]" />
                </div>
              </div>
            </div>

            <div className=" md:w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
              <div className="flex">
                <div>
                  <div className="h-[42px] w-[43px] rounded-full bg-[#0E9CFF] flex items-center justify-center mr-4 mt-2 text-white">
                    LR
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="text-[16px] font-semibold">
                      Honey Risher
                    </div>
                    <div className="text-gray-600 text-xs ml-auto">
                      11:57 AM
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs text-[#A3A3A3]">company</div>
                    <div className="text-sm overflow-hidden  md:w-[226px] whitespace-nowrap overflow-ellipsis mt-1">
                      Inquiry Subject Sample — Regarding Inquiry Subject Sample
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" md:w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
              <div className="flex">
                <div>
                  <div className="h-[42px] w-[43px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4 mt-2 text-white">
                    HR
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="text-[16px] font-semibold">
                      Honey Risher
                    </div>
                    <div className="text-gray-600 text-xs ml-auto">
                      11:57 AM
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs text-[#A3A3A3]">company</div>
                    <div className="text-sm overflow-hidden  md:w-[226px] whitespace-nowrap overflow-ellipsis mt-1">
                      Inquiry Subject Sample — Regarding Inquiry Subject Sample
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
              <div className="flex">
                <div>
                  <div className="h-[42px] w-[43px] rounded-full bg-[#64A70B] flex items-center justify-center mr-4 mt-2 text-white">
                    CR
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="text-[16px] font-semibold">
                      Honey Risher
                    </div>
                    <div className="text-gray-600 text-xs ml-auto">
                      11:57 AM
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs text-[#A3A3A3]">company</div>
                    <div className="text-sm overflow-hidden  md:w-[226px] whitespace-nowrap overflow-ellipsis mt-1">
                      Inquiry Subject Sample — Regarding Inquiry Subject Sample
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
              <div className="flex">
                <div>
                  <div className="h-[42px] w-[43px] rounded-full bg-[#1FA8DC] flex items-center justify-center mr-4 mt-2 text-white">
                    EJ
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="text-[16px] font-semibold">
                      Honey Risher
                    </div>
                    <div className="text-gray-600 text-xs ml-auto">
                      11:57 AM
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs text-[#A3A3A3]">company</div>
                    <div className="text-sm overflow-hidden  md:w-[226px] whitespace-nowrap overflow-ellipsis mt-1">
                      Inquiry Subject Sample — Regarding Inquiry Subject Sample
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
              <div className="flex">
                <div>
                  <div className="h-[42px] w-[43px] rounded-full bg-[#FD9372] flex items-center justify-center mr-4 mt-2 text-white">
                    JD
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="text-[16px] font-semibold">
                      Honey Risher
                    </div>
                    <div className="text-gray-600 text-xs ml-auto">
                      11:57 AM
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs text-[#A3A3A3]">company</div>
                    <div className="text-sm overflow-hidden  md:w-[226px] whitespace-nowrap overflow-ellipsis mt-1">
                      Inquiry Subject Sample — Regarding Inquiry Subject Sample
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" md:w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
              <div className="flex">
                <div>
                  <div className="h-[42px] w-[43px] rounded-full bg-[#A81F58] flex items-center justify-center mr-4 mt-2 text-white">
                    LR
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="text-[16px] font-semibold">
                      Honey Risher
                    </div>
                    <div className="text-gray-600 text-xs ml-auto">
                      11:57 AM
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs text-[#A3A3A3]">company</div>
                    <div className="text-sm overflow-hidden md:w-[226px] whitespace-nowrap overflow-ellipsis mt-1">
                      Inquiry Subject Sample — Regarding Inquiry Subject Sample
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* second */}

          <div className=" md:w-[890px] mt-4 rounded">
            <div className="h-[60px] w-full flex border-b border-[#D9D9D9]">
              <div className="flex ml-4">
                <div>
                  <div className="h-[42px] w-[43px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4 text-[white]">
                    LR
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[14px] font-semibold">Honey Risher</div>
                  <div className="text-[#A3A3A3] text-xs">company</div>
                </div>
              </div>
            </div>

            <div>
              <ScrollArea className="md:h-[380px] rounded-md p-4">
                <div className="md:h-[200px]">
                  <div className="flex pt-8">
                    <div>
                      <div className="h-[32px] w-[32px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4 mt-2 text-[white]">
                        LR
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[16px] font-semibold">
                        Honey Risher
                      </div>
                      <div className="text-gray-600 text-xs">11:57 AM</div>
                    </div>
                  </div>

                  <div className="md:h-[100px] ml-12 mt-2 bg-[#FFFFFF] md:w-[800px]">
                    <div className="md:h-[100px]  md:w-[780px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit.
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="border-t border-[#D9D9D9] flex-grow"></div>
                    <div className="mx-4 text-[#D9D9D9]">22 March 2024</div>
                    <div className="border-t border-[#D9D9D9] flex-grow"></div>
                  </div>
                </div>

                <div className="md:h-[170px]">
                  <div className="flex">
                    <div>
                      <div className="h-[32px] w-[32px] rounded-full bg-[#4285F4] flex items-center justify-center mr-4 mt-2 text-[white]">
                        EV
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[16px] font-semibold">
                        Honey Risher
                      </div>
                      <div className="text-gray-600 text-xs">11:55 AM</div>
                    </div>
                  </div>

                  <div className="md:h-[100px]  ml-12 mt-2 bg-[#FFFFFF] md:w-[800px]">
                    <div className="md:h-[100px]  md:w-[780px] text-[16px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit.
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="border-t border-[#D9D9D9] flex-grow"></div>
                    <div className="mx-4 text-[#D9D9D9]">22 March 2024</div>
                    <div className="border-t border-[#D9D9D9] flex-grow"></div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            <div className=" md:w-[850px] ml-7 mr-4">
              <textarea
                id="description"
                className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9]"
                placeholder="Enter message"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between mr-[18px] mt-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-16 w-16">
                  <TbPhoto size={30} />
                </div>
                <div className="flex items-center justify-center h-16 w-16">
                  <MdOutlineAttachFile size={30} />
                </div>
              </div>
              <button className="bg-[#58BA66] text-[#FFFFFF] px-6 py-3 rounded-md border border-[#58BA66] font-abhaya">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeMsg;
