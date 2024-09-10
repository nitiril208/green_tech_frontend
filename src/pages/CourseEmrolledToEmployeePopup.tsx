import face2 from "@/assets/images/face2.jpg";
import face3 from "@/assets/images/face3.jpg";
import lightOn from "@/assets/images/LightOn.png";
import nature from "@/assets/images/nature.png";
import neighbour from "@/assets/images/Neighbour.png";
import person from "@/assets/images/person.png";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";
function CourseEmrolledToEmployeePopup() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Employee Name1",
      selected: false,
      imageUrl: person,
    },
    {
      id: 2,
      name: "Employee Name2",
      selected: false,
      imageUrl: face2,
    },
    {
      id: 3,
      name: "Employee Name3",
      selected: false,
      imageUrl: face3,
    },
    {
      id: 4,
      name: "Employee Name4",
      selected: false,
      imageUrl: person,
    },
    {
      id: 5,
      name: "Employee Name5",
      selected: false,
      imageUrl: face2,
    },
  ]);

  const handleSelectAll = () => {
    const updatedEmployees = employees.map((employee) => ({
      ...employee,
      selected: true,
    }));
    setEmployees(updatedEmployees);
  };

  const handleSelectEmployee = (id: number) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? { ...employee, selected: !employee.selected }
        : employee
    );
    setEmployees(updatedEmployees);
  };

  const handleInviteEmployee = () => {
    // Logic to invite selected employees
  };

  const handleAllocate = () => {
    // Logic to allocate selected employees
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <Card className="bg-white rounded-lg p-6 h-[640px] w-[800px] ">
        <div className=" border-b-2 pb-[10px]">
          <div className="flex overflow-hidden rounded">
            <img
              className="w-[204px] h-[189px] rounded object-cover object-center"
              src={nature}
              alt="Course"
            />

            <div className="flex flex-col ml-[15px]">
              <div className="flex items-center justify-between">
                <span className="text-[#1D2026] text-xl font-bold">
                  Certificate in the Sustainable Development Goals, Partnership,
                  People, Planet and Prosperit
                </span>
                <IoCloseCircleOutline className=" cursor-pointer h-[50px] w-[50px] pb-[20px] ml-[15px]" />
              </div>

              <div className="flex items-center mt-[10px] ml-[2px]">
                <FaStar className="text-[#FD8E1F]" />
                <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">
                  RECOMMENDED
                </span>
                <p className="ml-[10px]">
                  <img
                    className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                    src={neighbour}
                    alt="Image Alt Text"
                  />
                  Social
                </p>
                <p className="ml-[10px]">
                  <img
                    className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                    src={lightOn}
                    alt="Image Alt Text"
                  />
                  Technology & Innovation
                </p>
              </div>

              <div className="flex items-center mt-[10px] ml-[2px]">
                <FaStar className="text-[#FBBC04] w-[12px] h-[11px]" />
                <span className="text-[black] font-bold text-sm mr-2 ml-1">
                  4.5
                </span>
                <MdOutlineGroup className="w-[12px] h-[11px] ml-[20px]" />
                <p className="ml-[10px] text-[#A3A3A3] text-[13px]">
                  15 Employee
                </p>
              </div>

              <div className="flex mt-[15px]">
                <div className="h-[22px] w-[129px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/timer.png"
                    alt="Course"
                  />
                  <p className="text-xs">Level- Advanced</p>
                </div>

                <div className="h-[22px] w-[160px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px] text-black"
                    src="public/assets/img/diploma.png"
                    alt="Course"
                  />
                  <p className="text-xs">Post Graduate Diploma</p>
                </div>

                <div className="h-[22px] w-[80px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/fulltime.png"
                    alt="Course"
                  />
                  <p className="text-xs">Full Time</p>
                </div>

                <div className="h-[22px] w-[75px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/online.png"
                    alt="Course"
                  />
                  <p className="text-xs">Online</p>
                </div>

                <div className="h-[22px] w-[80px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/time.png"
                    alt="Course"
                  />
                  <p className="text-xs">2 Years</p>
                </div>
              </div>

              <div className=" mt-[15px]">
                <div className="h-[22px] w-[200px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/unversity.png"
                    alt="Course"
                  />
                  <p className="text-xs">Atlantic Technological University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-[20px]">
          <h2 className="text-[15px] mb-2 ml-[10px] font-bold">Team Members</h2>
          <div className="flex items-center ml-[510px]">
            <label className="font-bold mr-[5px]">Select All</label>
            <input
              type="checkbox"
              className="h-[18px] w-[18px] rounded ml-[5px] mr-[5px] "
              onChange={handleSelectAll}
            />
          </div>
        </div>
        <ScrollArea className="h-[300px] w-[755px] rounded-md ">
          <div className="p-4 ">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center mb-2 border-b pb-2 border-[#D9D9D9]"
              >
                <img
                  src={employee.imageUrl}
                  className="w-10 h-10 rounded-full border-[#D9D9D9]  border-2 mr-2 "
                />
                <span>{employee.name}</span>
                <input
                  type="checkbox"
                  checked={employee.selected}
                  onChange={() => handleSelectEmployee(employee.id)}
                  className="ml-[520px]  h-[18px] w-[18px] rounded"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
        <button
          className="bg-[#00778B] text-white px-4 py-2 rounded mr-[495px] mt-[5px] font-abhaya"
          onClick={handleInviteEmployee}
        >
          Invite Employee
        </button>
        <button
          className="bg-[#58BA66] text-white px-4  rounded w-[100px] h-[40px] font-abhaya"
          onClick={handleAllocate}
        >
          Allocate
        </button>
      </Card>
    </div>
  );
}

export default CourseEmrolledToEmployeePopup;
