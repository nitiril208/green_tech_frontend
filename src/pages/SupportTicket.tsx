import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import HeaderCourse from "@/components/HeaderCourse";

import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbSelector } from "react-icons/tb";

function CoursesAllocate() {
  const employeeData = [
    {
      id: "#01",
      lastupdate: "22/05/2024",
      requestor: "Danila Raffel",
      subject: "How to customize the template",
      status: "Open",
      assignto: "Emilla",
      priority: "High",
    },
    {
      id: "#02",
      lastupdate: "22/05/2024",
      requestor: "Danila Raffel",
      subject: "How to customize the template",
      status: "Answered",
      assignto: "Emilla",
      priority: "Normal",
    },
    {
      id: "#03",
      lastupdate: "22/05/2024",
      requestor: "Danila Raffel",
      subject: "How to customize the template",
      status: "In Process",
      assignto: "Emilla",
      priority: "Poor",
    },

    // Add more employee data as needed
  ];

  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[760px]  overflow-hidden">
      <div className="">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col">
        <div className=" ">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[1469px] m-[12px] rounded-[10px]">
          <div className="  pt-[16px] pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px] flex items-center justify-between">
            <p className="text-[#000000] text-[Calibri] font-bold">
              Support Requests
            </p>
            <button className="bg-[#00778B] text-white px-4 py-2 rounded mr-[20px] mb-[13px] h-[40px] w-[153px]">
              Add New Ticket
            </button>
          </div>

          <div className="pt-2 pl-[20px] pb-5 flex gap-10">
            <div className="border border-solid border-[#D9D9D9] w-[267.4px] h-[108px] rounded-[5.06px] flex items-center p-3 mt-[5px]">
              <img
                src="../assets/img/ticket.png"
                alt="img"
                className="w-[72px] h-[52px] mr-3"
              />
              <div className="pl-[40px]">
                <span className="text-[32px] leading-[39.06px] font-bold">
                  +375
                </span>
                <h4 className="mb-1">Total Tickets</h4>
              </div>
            </div>

            <div className="border border-solid border-[#D9D9D9] w-[267.4px] h-[108px] rounded-[5.06px] flex items-center p-3 mt-[5px]">
              <img
                src="../assets/img/message.png"
                alt="img"
                className="w-[42px] h-[42px] mr-3"
              />
              <div className="pl-[60px]">
                <span className="text-[32px] leading-[39.06px] font-bold">
                  150
                </span>
                <h4 className="mb-1">Responded</h4>
              </div>
            </div>

            <div className="border border-solid border-[#D9D9D9] w-[267.4px] h-[108px] rounded-[5.06px] flex items-center p-3 mt-[5px]">
              <img
                src="../assets/img/thumb.png"
                alt="img"
                className="w-[46px] h-[42px] mr-3"
              />
              <div className="pl-[60px]">
                <span className="text-[32px] leading-[39.06px] font-bold">
                  100
                </span>
                <h4 className="mb-1">Resolved</h4>
              </div>
            </div>

            <div className="border border-solid border-[#D9D9D9] w-[267.4px] h-[108px] rounded-[5.06px] flex items-center p-3 mt-[5px]">
              <img
                src="../assets/img/ticket2.png"
                alt="img"
                className="w-[73px] h-[42px] mr-3"
              />
              <div className="pl-[60px]">
                <span className="text-[32px] leading-[39.06px] font-bold">
                  125
                </span>
                <h4 className="mb-1">Pending</h4>
              </div>
            </div>
          </div>

          <div className="flex pl-[20px] w-[1230px] h-[70px] bg-[#FFFFFF]  ">
            <div>
              <div className="flex mt-[9px]   items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-[550px] h-[52px] text-[#A3A3A3]">
                <BsSearch className="text-[#D9D9D9] mr-2" />

                <input
                  type="text"
                  placeholder="Search by pilier, level, recommended, course name etc."
                  className="flex-1 mr-2 focus: placeholder-[#A3A3A3] text-sm"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-[10px] ">
              <thead>
                <tr className="bg-[#F1F1F1] h-[50px]">
                  <th className=" ">
                    {" "}
                    <span className="flex ml-4 ">
                      ID{" "}
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" ">
                    <span className="flex ml-4">
                      Last Updated
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" ">
                    <span className="flex ml-4">
                      Requestor
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" ">
                    <span className="flex ml-4">
                      Subject
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" ">
                    <span className="flex ml-4">
                      Status
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" ">
                    <span className="flex ml-4">
                      Assign to
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" ">
                    <span className="flex ml-4">
                      Priority
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" ">
                    {" "}
                    <span className=" ml-4">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index: number) => (
                  <tr key={index}>
                    <td className=" border-b px-18 pl-4 py-2">
                      <span className="w-[110px]">{employee.id}</span>
                    </td>
                    <td className=" border-b px-18 py-4 ">
                      <span className="flex"> {employee.lastupdate}</span>{" "}
                    </td>
                    <td className=" border-b px-18 py-2">
                      {employee.requestor}
                    </td>
                    <td className="border-b px-18 pl-4 py-2">
                      {employee.subject}
                    </td>
                    <td className={`border-b px-18 py-2`}>
                      <button
                        className={`text-xs rounded ${
                          employee.status === "Open"
                            ? " text-[#FEA77C] font-semibold h-[32px] w-[80px]"
                            : employee.status === "In Process"
                            ? " text-[#58BA66] font-semibold h-[32px] w-[80px]"
                            : " text-[#0E9CFF] font-semibold h-[32px] w-[80px]"
                        }`}
                      >
                        {employee.status}
                      </button>
                    </td>

                    <td className="border-b px-18 pl-4 py-2">
                      {employee.assignto}
                    </td>

                    <td className={`border-b px-18 py-2`}>
                      <button
                        className={`text-xs rounded ${
                          employee.priority === "High"
                            ? "bg-[#FF5252] text-white h-[32px] w-[80px]"
                            : employee.priority === "Medium"
                            ? "bg-[#58BA66] text-white h-[32px] w-[80px]"
                            : "bg-[#FFD56A] text-white h-[32px] w-[80px]"
                        }`}
                      >
                        {employee.priority}
                      </button>
                    </td>
                    <td className={`border-b px-18 py-2 `}>
                      <RiDeleteBinLine className="text-[#A3A3A3] ml-[40px]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ml-[1000px] mt-[20px]">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#">2</PaginationLink>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          <div className="ml-[20px]">
            <p className="font-bold text-[10px] ">Showing 10/200 Records</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesAllocate;
