import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import {
  RiArrowDownSLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiMenuLine,
} from "react-icons/ri";
import { TbSelector } from "react-icons/tb";

function EmployeeSupportRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
  ];
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
          <div className=" m-4 flex flex-col md:flex-row gap-10">
            <div className="border border-solid border-[#D9D9D9] w-full md:w-[370px] h-[108px] rounded-[5.06px] flex items-center p-3 ">
              <img
                src="../assets/img/ticket.png"
                alt="img"
                className="w-[72px] h-[52px] mr-3"
              />
              <div className="pl-[30px]">
                <span className="text-[32px] leading-[39.06px] font-bold">
                  375
                </span>
                <h4 className="mb-1">Total Tickets</h4>
              </div>
            </div>

            <div className="border border-solid border-[#D9D9D9] w-full md:w-[370px] h-[108px] rounded-[5.06px] flex items-center p-3 ">
              <img
                src="../assets/img/thumb.png"
                alt="img"
                className="w-[46px] h-[42px] mr-3"
              />
              <div className="pl-[30px]">
                <span className="text-[32px] leading-[39.06px] font-bold">
                  100
                </span>
                <h4 className="mb-1">Resolved</h4>
              </div>
            </div>

            <div className="border border-solid border-[#D9D9D9] w-full md:w-[370px] h-[108px] rounded-[5.06px] flex items-center p-3 ">
              <img
                src="../assets/img/ticket2.png"
                alt="img"
                className="w-[73px] h-[42px] mr-3"
              />
              <div className="pl-[30px]">
                <span className="text-[32px] leading-[39.06px] font-bold">
                  125
                </span>
                <h4 className="mb-1">Pending</h4>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row m-4 h-auto md:h-[70px]">
            <div className="flex flex-1 items-center mb-2 md:mb-0">
              <div className="flex mt-[9px] items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-full md:w-[550px] h-[52px] text-[#A3A3A3]">
                <BsSearch className="text-[#D9D9D9] mr-2" />
                <input
                  type="text"
                  placeholder="Search by pilier, level, recommended, course name etc."
                  className="flex-1 mr-2 focus: placeholder-[#A3A3A3] text-sm"
                />
              </div>
            </div>
            <div className="mr-[10px] mt-[10px] md:mt-[15px] h-[40px] w-full md:w-[153px]">
              <button className="bg-[#00778B] text-white px-4 py-2 rounded w-full md:w-auto font-abhaya">
                Add New Ticket
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full mt-[20px] ">
              <thead>
                <tr className="bg-[#F1F1F1]  h-[50px]">
                  <th className=" ">
                    <span className="flex ml-4 ">
                      ID
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className=" md:table-cell">
                    <span className="flex ml-4">
                      Last Updated
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className="md:table-cell">
                    <span className="flex ml-4">
                      Requestor
                      <span className="mt-1">
                        <TbSelector />
                      </span>
                    </span>
                  </th>
                  <th className="lg:table-cell">
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
                  <th className=" md:table-cell">
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
                    <span className=" ml-4">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index}>
                    <td className="border-b px-4 py-2">
                      <span className="w-[110px]">{employee.id}</span>
                    </td>
                    <td className="border-b px-4 py-2  md:table-cell">
                      <span className="flex">{employee.lastupdate}</span>
                    </td>
                    <td className="border-b px-4 py-2  md:table-cell">
                      {employee.requestor}
                    </td>
                    <td className="border-b px-4 py-2 lg:table-cell">
                      {employee.subject}
                    </td>
                    <td className="border-b px-4 py-2">
                      <button
                        className={`text-xs rounded font-abhaya ${
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
                    <td className="border-b px-4 py-2  md:table-cell">
                      {employee.assignto}
                    </td>
                    <td className="border-b px-4 py-2">
                      <button
                        className={`text-xs rounded font-abhaya ${
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
                    <td className="border-b px-4 py-2">
                      <RiDeleteBinLine className="text-[#A3A3A3] ml-[40px]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center md:ml-[1000px] mt-[10px]">
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

          <div className="flex flex-col md:flex-row justify-between items-center mt-[40px] mx-[10px]">
            <div className="mb-4 md:mb-0">
              <p className="font-bold text-[10px]">Showing 10/200 Records</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-full max-w-[332px]">
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

export default EmployeeSupportRequest;
