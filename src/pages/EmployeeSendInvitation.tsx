import HeaderCourse from "@/components/HeaderCourse";

import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { LuMoveLeft } from "react-icons/lu";

function EmployeeSendInvitation() {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic
    }
  };

  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[760px]  overflow-hidden">
      <div className=" ">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col  ">
        <div className=" ">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF]  w-[1250px] h-[1469px] m-[12px] rounded-[10px]">
          <div className=" pl-[30px]  w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] flex ">
            <div className="flex justify-between items-center mt-[15px] w-full">
              <p
                className="text-black font-bold text-[16px]"
                style={{ fontFamily: "Calibri" }}
              >
                Send Invitation
              </p>
              <button
                className="flex items-center mr-4 rounded gap-2 font-abhaya"
                onClick={() =>
                  dispatch(
                    setPath([
                      { label: "Team Management", link: null },
                      { label: "Team List", link: `/${Role}/employeelist` },
                      {
                        label: "Send Invitation",
                        link: null,
                      },
                    ])
                  )
                }
              >
                <LuMoveLeft />
                <h1 className="text-black font-bold ">Back</h1>
              </button>
            </div>
          </div>

          <div className=" p-6">
            <h2 className="text-[16px]  mb-4 ">Enter Team Member Email ID </h2>
            <input
              type="text"
              placeholder="Enter email id"
              className="border border-[#D9D9D9] rounded-sm px-4 py-2 mb-4 w-full h-[60px] placeholder-[#A3A3A3] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
            />
            <div className="flex items-center mb-4">
              <p>OR</p>
              <a
                href="#"
                className="text-[#0E9CFF] ml-2 underline underline-[#0E9CFF] underline-2"
              >
                Download Sample File
              </a>
            </div>
            <p className="text-[16px] font-semibold">
              Invite a list of users to get your community going quickly.
              Prepare a <span className="text-[#0E9CFF]"> CSV file </span>{" "}
              containing at least one row per email address of users you want to
              invite.
            </p>
            <p className="text-[16px] font-semibold">
              Every email address in your uploaded CSV file will be send an
              invitation, and you will be able to manage it later.
            </p>
          </div>

          <div className="p-4 ml-[10px] flex">
            <label
              htmlFor="upload"
              className="cursor-pointer bg-[#00778B] text-white py-2 px-4 rounded-sm mr-2"
            >
              Upload CSV File
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              accept=".csv"
              onChange={handleFileUpload}
            />
            <p className="mt-[5px]">invites.csv</p>
          </div>
          <div className="p-2  ml-[15px]">
            <label htmlFor="description" className="block mb-2">
              Invitation Details
            </label>
            <textarea
              id="description"
              className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9]"
              placeholder="Enter details"
              rows={4}
            />

            <div className="flex justify-end">
              <button className="bg-[#58BA66] hover:bg-[#58BA66] text-white  py-2 px-4 rounded font-abhaya">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSendInvitation;
