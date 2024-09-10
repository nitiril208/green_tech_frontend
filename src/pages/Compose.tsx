import HeaderCourse from "@/components/HeaderCourse";

import { MdOutlineAttachFile } from "react-icons/md";

import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import { TbPhoto } from "react-icons/tb";

function Compose() {
  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[740px]  overflow-hidden">
      <div className="">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col  ">
        <div className="">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[590px] m-[12px] rounded-[10px]">
          <div className="  pt-[16px] pl-[17px] w-[1250px] h-[82px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px] ">
            <div className="flex gap-4">
              <div className="flex items-center p-4 border border-[#D9D9D9] rounded w-[190px] h-[58px] hover:border-[#00778B]">
                <div className="w-10 h-10 flex justify-center items-center bg-[#0077A2] text-white rounded-full">
                  HR
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Honey Risher</div>
                  <div className="text-sm text-[#A3A3A3]">Admin</div>
                </div>
              </div>

              <div className="flex items-center p-4 border border-[#D9D9D9] rounded w-[190px] h-[58px] hover:border-[#00778B]">
                <div className="w-10 h-10 flex justify-center items-center bg-[#0077A2] text-white rounded-full">
                  TR
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Trainer Name</div>
                  <div className="text-sm text-[#A3A3A3]">Trainer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 ">
            <div className="mt-">
              <label htmlFor="ticketSubject" className="block mb-2">
                To
              </label>
              <input
                type="text"
                id="ticketSubject"
                className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                placeholder="Select Recipient"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="ticketSubject" className="block mb-2">
                Select Template
              </label>
              <input
                type="text"
                id="ticketSubject"
                className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                placeholder="Select Template"
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="description" className="block mb-2">
                Message
              </label>
              <textarea
                id="description"
                className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9]"
                placeholder="Enter Message"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between bg-[#FFFFFF] mr-[10px]  ">
              <div className="flex items-center">
                <div className="  flex items-center justify-center h-16 w-16 ">
                  <TbPhoto size={30} />
                </div>
                <div className="  flex items-center justify-center h-16 w-16 ">
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

export default Compose;
