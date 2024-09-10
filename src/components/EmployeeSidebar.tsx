import Cookies from "js-cookie";
import { useState } from "react";
import { BsTicketPerforated } from "react-icons/bs";
import { GrCertificate } from "react-icons/gr";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TfiBook } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { AlertLogOutDialog } from "./Models/AlertLogOut";

const EmployeeSidebar = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
    setIsOpen1(false);
    setIsOpen2(false);
  };

  return (
    <>
      <div className=" lg:flex flex-col justify-between w-60 duration-500 bg-[#FFFFFF] overflow-hidden ">
        <div className=" w-[235px] h-[780px]">
          <div className="ml-[20px] mt-[20px]">
            <h1 className="text-[28px] text-[#000000] font-semibold">
              Product Logo
            </h1>

            <div className="absolute mt-[60px] -top-2 -right-[14px] flex items-center justify-center  ">
              <button className=" h-[30px] w-[30px] bg-[#FFFFFF] border border-[#E5E7EE] rounded-full  inline-flex items-center justify-center font-abhaya">
                <MdOutlineKeyboardArrowLeft className="h-[20px] w-[20px] text-[#606060]" />
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 relative">
            <Link
              to="/dashboard"
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[#606060]  text-[16px] font-[Calibri]"
            >
              <RxDashboard size={22} />
              <h2>Dashboard</h2>
            </Link>
            <Link
              to="/company-management"
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060]"
            >
              <TfiBook size={22} />
              <h2>My Courses</h2>
            </Link>
            <Link
              to=""
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] "
            >
              <LuMapPin size={22} />
              <h2>Our Maturity Journey</h2>
            </Link>

            <Link
              to=""
              className={`group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] ${
                isOpen1 ? "mt-[85px]" : ""
              }`}
            >
              <GrCertificate size={22} />
              <h2>Certifications</h2>
            </Link>

            <Link
              to=""
              className={`group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] ${
                isOpen2 ? "mt-[75px]" : ""
              }`}
              onClick={toggleDropdown3}
            >
              <BsTicketPerforated size={22} />
              <h2>Support</h2>
              {isOpen3 ? <HiChevronDown /> : <HiChevronRight />}
            </Link>
            {isOpen3 && (
              <ul className="absolute left-0 right-0 bg-white rounded-md mt-[260px] list-disc pl-6 w-[245px] h-[90px]">
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/employee-list">FAQ's</Link>
                </li>
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/employee-progress">User Manual</Link>
                </li>
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/employee-progress">Support Request</Link>
                </li>
              </ul>
            )}

            <Link
              to="/"
              onClick={() => setIsAlertOpen(true)}
              className={`group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] ${
                isOpen3 ? "mt-[75px]" : ""
              }`}
            >
              <RiShutDownLine size={22} />
              <h2>Logout</h2>
            </Link>
          </div>
        </div>
      </div>
      <AlertLogOutDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          localStorage.clear();
          Cookies.remove("accessToken");
        }}
      />
    </>
  );
};

export default EmployeeSidebar;
