import feedback from "@/assets/images/feedback.png";
import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaFolderOpen, FaPrint, FaSave } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronDownSharp } from "react-icons/io5";
import { LuMenuSquare } from "react-icons/lu";
import { MdKeyboardArrowUp, MdZoomIn, MdZoomOut } from "react-icons/md";
import {
  PiArrowCircleDownFill,
  PiArrowCircleUpFill,
  PiBinocularsFill,
} from "react-icons/pi";
import {
  RiArrowDownSLine,
  RiCloseLine,
  RiGalleryLine,
  RiMenuLine,
} from "react-icons/ri";

function ModulePdfDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const chapters = [
    { name: "Chapter 1 - Intro", status: "Started", isActive: true },
    {
      name: "Chapter 2 - Required tools",
      status: "Not Started",
      isActive: false,
    },
    { name: "Chapter 3 - jcdjxcdm", status: "Not Started", isActive: false },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full md:w-[1510px] h-full md:h-[3080px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[3015px] mt-[20px] lg:ml-[20px] rounded-[10px] ">
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
                  / Social
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

        <div className="ml-6">
          <h1 className="text-[28px] font-semibold">
            Wind energy basic course
          </h1>
        </div>

        {/* tab */}

        <div className="mt-4">
          <div className="flex flex-col md:flex-row justify-between border-b">
            <div className="flex flex-col md:flex-row">
              <button
                className={`py-2 px-4 text-[14px] md:text-[16px] text-center border-b-2 ${
                  activeTab === "tab1"
                    ? "border-[#00778B] text-[#00778B]"
                    : "border-transparent"
                } focus:`}
                onClick={() => handleTabClick("tab1")}
              >
                Information
              </button>
              <button
                className={`py-2 px-4 text-[14px] md:text-[16px] text-center border-b-2 md:ml-4 ${
                  activeTab === "tab2"
                    ? "border-[#00778B] text-[#00778B]"
                    : "border-transparent"
                } focus:`}
                onClick={() => handleTabClick("tab2")}
              >
                Module
              </button>
            </div>
            <div className="relative mt-2 md:mt-0">
              <button className="flex items-center justify-center py-2 px-4 text-[14px] md:text-[16px] text-center border-b-2 md:mr-6 border-[#00778B] text-[#00778B] focus:">
                Modules Completed - 1/5
                <IoChevronDownSharp
                  className="ml-2 cursor-pointer"
                  onClick={handleIconClick}
                />
              </button>
              {isOpen && (
                <div className="absolute bg-white border rounded-lg shadow-sm w-full md:w-[240px] h-[200px]">
                  <div>
                    {chapters.map((chapter, index) => (
                      <div key={index} className="flex items-center">
                        <div className="relative">
                          {index !== chapters.length - 1 && (
                            <div className="absolute top-9 -translate-y-3 left-7 w-0.5 h-8 bg-[#D9D9D9]"></div>
                          )}
                          <div
                            className={`ml-4 w-6 h-6 rounded-full ${
                              chapter.isActive
                                ? "bg-white h-2 w-2 border-2 border-[#017285]"
                                : "bg-white"
                            } border-2 border-[#D9D9D9] flex items-center justify-center`}
                          >
                            {chapter.isActive && (
                              <div className="w-3 h-3 bg-[#017285] rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 mt-3">
                          <h3 className="text-[14px] text-[#000000]">
                            {chapter.name}
                          </h3>
                          <p className="text-[14px] text-[#606060]">
                            {chapter.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="">
            {activeTab === "tab1" && <p>A</p>}
            {activeTab === "tab2" && (
              <div className="">
                <div>
                  <button className="bg-[#05668A] md:w-[1205px] h-[65px] text-white font-bold rounded flex justify-start items-center px-4 mt-4 ml-4  ">
                    Doug's Story 3.pdf
                  </button>
                </div>
                <div className="flex flex-col md:flex-row border-b-2 border-[#D2D2D2] h-auto md:h-[81px]  bg-[#FAFAFA] ml-4 md:ml-4 overflow-x-auto md:w-[1205px]">
                  <div className="flex gap-6 ml-4 md:ml-4 border-r-2 border-[#D2D2D2]  md:w-[150px] h-auto md:h-[81px]">
                    <button className="flex flex-col items-center border-none cursor-pointer mt-4">
                      <div className="flex items-center">
                        <FaFolderOpen className="h-[16px] w-[19px] text-[#545454]" />
                      </div>
                      <span className="text-[10px] text-[#545454]">Open</span>
                    </button>
                    <div className="flex flex-col items-center border-none cursor-pointer mt-4">
                      <button className="flex flex-col items-center border-none cursor-pointer">
                        <div className="flex items-center">
                          <FaSave className="h-[16px] w-[19px] text-[#545454]" />
                        </div>
                        <span className="text-[10px] text-[#545454]">
                          Save As
                        </span>
                      </button>
                      <span className="text-sm text-gray-800 mt-2 text-[12px]">
                        File
                      </span>
                    </div>
                    <button className="flex flex-col items-center border-none cursor-pointer mt-4">
                      <div className="flex items-center">
                        <FaPrint className="h-[16px] w-[19px] text-[#545454]" />
                      </div>
                      <span className="text-[10px] text-[#545454]">Print</span>
                    </button>
                  </div>

                  <div className="ml-2 md:ml-0 border-r-2 border-[#D2D2D2] md:w-[50px]">
                    <button className="flex flex-col items-center border-none cursor-pointer mt-4">
                      <div className="flex items-center md:ml-3">
                        <PiBinocularsFill className="h-[16px] w-[19px] text-[#545454]" />
                      </div>
                      <span className="text-[10px]  md:ml-3 text-[#545454]">
                        Find
                      </span>
                    </button>
                    <span className="text-sm text-gray-800 mt-2 md:ml-3 md:text-[12px]">
                      Find
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 border-r-2 border-[#D2D2D2]  md:w-[200px]">
                    <button className="flex flex-col items-center border-none cursor-pointer mt-4 ml-2 md:ml-2">
                      <div className="flex items-center">
                        <PiArrowCircleDownFill className="h-[26px] w-[26px] text-[#A9A8A8]" />
                      </div>
                      <span className="text-[10px] text-[#A9A8A8]">
                        Previous
                      </span>
                    </button>
                    <button className="flex flex-col items-center border-none cursor-pointer mt-4 md:mt-4">
                      <div className="flex items-center">
                        <PiArrowCircleUpFill className="h-[26px] w-[26px] text-[#009E23]" />
                      </div>
                      <span className="text-[10px] text-[#545454]">Next</span>
                    </button>
                    <div className="mt-4 md:mt-4 mr-[170px]  flex flex-col items-end">
                      <input
                        type="text"
                        className="border-2 border-[#A0A0A0] bg-white rounded text-center w-[73px] h-[35px] py-1"
                        value="1"
                        readOnly
                      />
                      <span className="mr-6 text-[12px]">of 14</span>
                    </div>
                  </div>

                  <div className="border-r-2 border-[#D2D2D2]  md:w-[180px]">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
                      <div className="flex flex-col items-center cursor-pointer">
                        <div className="w-[20px] h-[20px] flex justify-center items-center">
                          <MdZoomIn className="text-gray-700 text-xl" />
                        </div>
                        <p className="text-[10px]">Zoom Out</p>
                      </div>
                      <div className="flex flex-col items-center cursor-pointer">
                        <div className="w-[20px] h-[20px] flex justify-center items-center">
                          <MdZoomOut className="text-gray-700 text-xl" />
                        </div>
                        <p className="text-[10px]">Zoom In</p>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#000000] md:ml-[70px] ml-[185px] mt-2">
                      Zoom In
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="">
                    <div className="flex ml-4 h-[40px]  md:w-[250px] bg-[#FAFAFA] border-b-2 border-r-2 border-[#D2D2D2]">
                      <button className="focus: ml-auto md:ml-16">
                        <LuMenuSquare className="h-6 w-6" />
                      </button>
                      <button className="focus: ml-auto md:ml-[80px] border-b-2 border-[#000000]">
                        <RiGalleryLine className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex ml-4 h-auto  md:w-[250px] bg-[#FAFAFA]">
                      <div className="mt-6 ml-auto md:ml-12">
                        <div>
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#000000] mx-auto"
                          />
                          <p className="text-center">1</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center">2</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center ">3</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center ">4</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center">5</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center">6</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center">7</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center">8</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center">9</p>
                        </div>
                        <div className="mt-4">
                          <img
                            src={feedback}
                            alt="feedback"
                            className="h-[201px] w-[156px] border-2 border-[#A6A6A6] mx-auto"
                          />
                          <p className="text-center">10</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" bg-[#F5F5F5]  md:w-[955px] h-auto md:h-[2590px]">
                    <div className="mt-8 ml-2">
                      <button className="bg-[#05668A]  md:w-[910px] h-[51px] text-white font-bold rounded flex justify-start items-center px-4 mt-4 ml-4 ">
                        Doug's Story 3.pdf
                      </button>
                    </div>
                    <div className=" ml-6  md:w-[910px]  md:h-[1200px] bg-[#FFFFFF]">
                      <div>
                        <div className="p-8">
                          <h1 className="text-2xl font-bold mb-4">
                            Course Syllabus
                          </h1>
                          <h2 className="text-xl font-semibold mt-6 mb-2">
                            Course Description
                          </h2>
                          <p className="mb-4 text-[15.5px]">
                            In today’s world, there is no shortage of data. But
                            the quantity of information means nothing without
                            the ability to understand it.
                          </p>
                          <p className="mb-4 text-[15.5px]">
                            This course covers basic statistical concepts and
                            methods that are essential for learning from data
                            and communicating insights. By the end of the
                            course, you will be able to perform exploratory data
                            analysis, understand the key principles of sampling,
                            and select appropriate tests of significance for
                            multiple contexts. You will gain the foundational
                            skills that prepare you to pursue more advanced
                            topics in statistical thinking, statistical
                            programming, machinelearning and more.
                          </p>
                          <p className="mb-4 text-[15.5px]">
                            This course will be delivered using the Coursera
                            platform.
                          </p>
                          <h2 className="text-xl font-semibold mt-6 mb-2">
                            Instructors
                          </h2>
                          <p>Guenther Walther,</p>
                          <p>PhD Professor of Statistics,</p>
                          <p>Stanford University</p>
                          <h2 className="text-xl font-semibold mt-6 mb-2">
                            Course Topics
                          </h2>
                          <ul className="list-disc pl-6 mb-4 text-[15.5px] w-[800px]">
                            <li className="mt-2">
                              <span className="font-semibold">
                                Module 1 – Introduction and Descriptive
                                Statistics for Exploring Data{" "}
                              </span>
                              This module provides an overview of the course and
                              a review of the main tools used in descriptive
                              statistics to visualize information.
                            </li>
                            <li className="mt-2">
                              <span className="font-semibold">
                                {" "}
                                Module 2 – Producing Data and Sampling{" "}
                              </span>
                              In this module, you will look at the main concepts
                              for sampling and designing experiments. You will
                              learn about curious pitfalls and how to evaluate
                              the effectiveness of such experiments.
                            </li>
                            <li className="mt-2">
                              <span className="font-semibold">
                                Module 3 – Probability{" "}
                              </span>
                              In this module, you will learn about the
                              definition of probability and the essential rules
                              of probability that you will need for solving both
                              simple and complex challenges. You will also learn
                              about examples of how simple rules of probability
                              are used to create solutions for real-life,
                              complex situations.
                            </li>
                            <li className="mt-2">
                              {" "}
                              <span className="font-semibold">
                                Module 4 – Normal Approximation and Binomial
                                Distribution{" "}
                              </span>
                              This module covers the empirical rule and normal
                              approximation for data, a technique that is used
                              in many statistical procedures. You will also
                              learn about the binomial distribution and the
                              basics of random variables.
                            </li>
                            <li className="mt-2">
                              {" "}
                              <span className="font-semibold">
                                Module 5 – Sampling Distributions and the
                                Central Limit Theorem{" "}
                              </span>
                              In this module, you will learn about the Law of
                              Large Numbers and the Central Limit Theorem. In
                              this module, you will learn about the Law of Large
                              Numbers and the Central Limit Theorem. You will
                              also learn how to differentiate between the
                              different types of histograms present in
                              statistical analysis.
                            </li>
                            <li className="mt-2">
                              <span className="font-semibold">
                                Module 6 – Regression{" "}
                              </span>{" "}
                              This module covers regression, arguably the most
                              important statistical technique based on its
                              versatility to solve different types of
                              statistical problems. You will learn about
                              inference, regression, and how to do regression
                              diagnostics.
                            </li>
                            <li className="mt-2">
                              {" "}
                              <span className="font-semibold">
                                Module 7 – Confidence Intervals
                              </span>{" "}
                              In this module, you will learn how to construct
                              and interpret confidence intervals in standard
                              situations.
                            </li>
                          </ul>
                          <h2 className="text-xl font-semibold mt-2 mb-2">
                            Course Requirements
                          </h2>
                          <p className="mb-4 text-[15.5px]">
                            Please watch all coursevideos and complete all
                            course exercises that can be found throughout the
                            course in each module. In order to get a
                            certificate, you will need to successfuly complete
                            and pass 80 % of the quizzes. Each quiz question
                            counts equally towards your completion.
                          </p>
                          <p className="text-[12px] ml-[800px] mt-[20px]">
                            Page l 1
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 ml-2">
                      <button className="bg-[#42A7C3]  md:w-[910px] h-[51px] text-white font-bold rounded flex justify-start items-center px-4 mt-4 ml-4 ">
                        Doug's Story 3.pdf
                      </button>
                    </div>
                    <div className=" ml-6  md:w-[910px] h-auto md:h-[1200px] bg-[#FFFFFF]">
                      <div>
                        <div className="p-8">
                          <h1 className="text-2xl font-bold mb-4">
                            Course Syllabus
                          </h1>
                          <h2 className="text-xl font-semibold mt-6 mb-2">
                            Course Description
                          </h2>
                          <p className="mb-4 text-[15.5px]">
                            In today’s world, there is no shortage of data. But
                            the quantity of information means nothing without
                            the ability to understand it.
                          </p>
                          <p className="mb-4 text-[15.5px]">
                            This course covers basic statistical concepts and
                            methods that are essential for learning from data
                            and communicating insights. By the end of the
                            course, you will be able to perform exploratory data
                            analysis, understand the key principles of sampling,
                            and select appropriate tests of significance for
                            multiple contexts. You will gain the foundational
                            skills that prepare you to pursue more advanced
                            topics in statistical thinking, statistical
                            programming, machinelearning and more.
                          </p>
                          <p className="mb-4 text-[15.5px]">
                            This course will be delivered using the Coursera
                            platform.
                          </p>
                          <h2 className="text-xl font-semibold mt-6 mb-2">
                            Instructors
                          </h2>
                          <p>Guenther Walther,</p>
                          <p>PhD Professor of Statistics,</p>
                          <p>Stanford University</p>
                          <h2 className="text-xl font-semibold mt-6 mb-2">
                            Course Topics
                          </h2>
                          <ul className="list-disc pl-6 mb-4 text-[15.5px] w-[800px]">
                            <li className="mt-2">
                              <span className="font-semibold">
                                Module 1 – Introduction and Descriptive
                                Statistics for Exploring Data{" "}
                              </span>
                              This module provides an overview of the course and
                              a review of the main tools used in descriptive
                              statistics to visualize information.
                            </li>
                            <li className="mt-2">
                              <span className="font-semibold">
                                {" "}
                                Module 2 – Producing Data and Sampling{" "}
                              </span>
                              In this module, you will look at the main concepts
                              for sampling and designing experiments. You will
                              learn about curious pitfalls and how to evaluate
                              the effectiveness of such experiments.
                            </li>
                            <li className="mt-2">
                              <span className="font-semibold">
                                Module 3 – Probability{" "}
                              </span>
                              In this module, you will learn about the
                              definition of probability and the essential rules
                              of probability that you will need for solving both
                              simple and complex challenges. You will also learn
                              about examples of how simple rules of probability
                              are used to create solutions for real-life,
                              complex situations.
                            </li>
                            <li className="mt-2">
                              {" "}
                              <span className="font-semibold">
                                Module 4 – Normal Approximation and Binomial
                                Distribution{" "}
                              </span>
                              This module covers the empirical rule and normal
                              approximation for data, a technique that is used
                              in many statistical procedures. You will also
                              learn about the binomial distribution and the
                              basics of random variables.
                            </li>
                            <li className="mt-2">
                              {" "}
                              <span className="font-semibold">
                                Module 5 – Sampling Distributions and the
                                Central Limit Theorem{" "}
                              </span>
                              In this module, you will learn about the Law of
                              Large Numbers and the Central Limit Theorem. In
                              this module, you will learn about the Law of Large
                              Numbers and the Central Limit Theorem. You will
                              also learn how to differentiate between the
                              different types of histograms present in
                              statistical analysis.
                            </li>
                            <li className="mt-2">
                              <span className="font-semibold">
                                Module 6 – Regression{" "}
                              </span>{" "}
                              This module covers regression, arguably the most
                              important statistical technique based on its
                              versatility to solve different types of
                              statistical problems. You will learn about
                              inference, regression, and how to do regression
                              diagnostics.
                            </li>
                            <li className="mt-2">
                              {" "}
                              <span className="font-semibold">
                                Module 7 – Confidence Intervals
                              </span>{" "}
                              In this module, you will learn how to construct
                              and interpret confidence intervals in standard
                              situations.
                            </li>
                          </ul>
                          <h2 className="text-xl font-semibold mt-2 mb-2">
                            Course Requirements
                          </h2>
                          <p className="mb-4 text-[15.5px]">
                            Please watch all coursevideos and complete all
                            course exercises that can be found throughout the
                            course in each module. In order to get a
                            certificate, you will need to successfuly complete
                            and pass 80 % of the quizzes. Each quiz question
                            counts equally towards your completion.
                          </p>
                          <p className="text-[12px] ml-[800px] mt-[20px]">
                            Page l 2
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center md:justify-start md:ml-[600px]">
                  <button className="bg-[#00778B] text-white font-semibold py-2 px-4 rounded-lg">
                    Mark as Complete
                  </button>
                </div>
                <div className="fixed bottom-14 right-4 md:absolute md:right-0 md:top-[2960px] md:bottom-0 md:left-[1155px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                  <img
                    src={person}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                    <span className="text-gray-900 font-semibold">
                      Messaging
                    </span>
                  </div>
                  <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModulePdfDetail;
