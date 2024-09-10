import { useState } from "react";
import { BsTicketPerforated } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { LuMapPin } from "react-icons/lu";
import { PiEnvelopeThin } from "react-icons/pi";
import { RiShutDownLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TfiBook } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { AlertLogOutDialog } from "./Models/AlertLogOut";
import sidebarlogo from "/assets/img/sidebarlogo.png";
import Cookies from "js-cookie";

const EmployeeListSidebar = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
    setIsOpen3(false);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
    setIsOpen3(false);
  };

  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
    setIsOpen1(false);
    setIsOpen2(false);
  };

  return (
    <>
      <div className="top-0 left-0 lg:flex flex-col justify-between w-60 duration-500 bg-[#FFFFFF] overflow-hidden">
        <div className="w-[235px] h-screen">
          <div className="ml-[40px] mt-[20px]">
            <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            <Link
              to="/dashboard"
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[#606060]  text-[16px] font-[Calibri]"
            >
              <RxDashboard size={22} />
              <h2>Dashboard</h2>
            </Link>
            <Link
              to="/maturityassessmentroadmap"
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060]"
            >
              <LuMapPin size={22} />
              <h2>Maturity Assessment</h2>
            </Link>
            <Link
              to=""
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] "
              onClick={toggleDropdown1}
            >
              <TfiBook size={22} />
              <h2>Course Management</h2>
              {isOpen1 ? <HiChevronDown /> : <HiChevronRight />}
            </Link>

            {isOpen1 && (
              <ul className="absolute left-0 right-0 bg-white rounded-md mt-[160px] list-disc pl-6 w-[245px] h-[90px]">
                <li className="ml-[20px] mt-2 font-calibri text-base">
                  <Link to="/allocatedcourses">Allocated Courses</Link>
                </li>

                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/coursesrecommended">Recommended Courses</Link>
                </li>
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/allcourses">All courses</Link>
                </li>
              </ul>
            )}

            <Link
              to=""
              className={`group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] ${
                isOpen1 ? "mt-[85px]" : ""
              }`}
              onClick={toggleDropdown2}
            >
              <FaUserGroup size={22} />
              <h2>Team Management</h2>
              {isOpen2 ? <HiChevronDown /> : <HiChevronRight />}
            </Link>
            {isOpen2 && (
              <ul className="absolute left-0 right-0 bg-white rounded-md mt-[200px] list-disc pl-6 w-[245px] h-[90px]">
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/employeelist">Team List</Link>
                </li>
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/employeeprogress">Team Progress</Link>
                </li>
              </ul>
            )}

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
                  <Link to="/faqslist">FAQ's</Link>
                </li>
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/trainingdocument">User Manual</Link>
                </li>
                <li className="ml-[20px] text-xs mt-2">
                  <Link to="/supportticket">Support Request</Link>
                </li>
              </ul>
            )}
            <Link
              to="/employeepermission"
              className={`group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] ${
                isOpen3 ? "mt-[75px]" : ""
              }`}
            >
              <FiSettings size={22} />
              <h2>Setting</h2>
            </Link>
            <Link
              to="/messaging"
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060]"
            >
              <PiEnvelopeThin size={22} />
              <h2>Message</h2>
            </Link>
            <Link
              to="/"
              onClick={() => setIsAlertOpen(true)}
              className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060]"
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
        onConfirm={() => {localStorage.clear(); Cookies.remove('accessToken');}}
      />
    </>
  );
};

export default EmployeeListSidebar;
