import lightIcon from "@/assets/images/light.png";
import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

function EmployeeRodemap() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  interface ProgressCardProps {
    title: string;
    progress: number;
    progressText: string;
    imageSrc: string;
  }

  const ProgressCard: React.FC<ProgressCardProps> = ({
    title,
    progress,
    progressText,
    imageSrc,
  }) => (
    <div className="h-[95px] w-[190px] shadow-sm rounded-lg bg-[#EDF0F4]">
      <div className="flex items-center mt-2 ml-4">
        <div className=" text-gray-900  ">
          <img src={imageSrc} className="w-[32px] h-[39px]" />
        </div>
        <div className="ml-4  h-[34px] w-[100px] flex-grow">
          <h3 className="text-[16px]">{title}</h3>
          <p className="text-[12px] text-[#848181]">{progressText}</p>
        </div>
      </div>
      <div className="ml-4 text-[16px] mt-2">{progress}%</div>
      <div className=" ml-4 w-[145px] bg-[#D9D9D9] rounded-full h-[2.54px] ">
        <div
          className="bg-[#64A70B] h-[2.54px] rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row bg-[#EDEFF9] w-full h-full md:h-[1990px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full h-auto lg:h-[1950px] m-5 rounded-[10px] ">
        <div className="p-4">
          <div className="pb-4 w-full lg:w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <RiMenuLine
                className="h-6 w-6 lg:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
              <span className="text-[18px] ml-1 font-semibold">
                Retake Assessment
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative  md:w-[250px]">
                <div className="hidden md:flex mt-[2px] mr-2 items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-full md:w-[240px] h-[50px] text-[#A3A3A3]">
                  <BsSearch className="text-[#D9D9D9] mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 mr-2 focus: placeholder-[#A3A3A3] text-sm focus:border focus:border-[#4b4b4b] shadow-none outline-none"
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

        <div className="flex flex-wrap gap-2 p-4 bg-[#E7E7E8]">
          <ProgressCard
            title="Environmental"
            progress={0}
            progressText="My Progress 0/5"
            imageSrc="../assets/img/Tree Planting.png"
          />
          <ProgressCard
            title="Social"
            progress={20}
            progressText="My Progress 1/5"
            imageSrc="../assets/img/Neighbour.png"
          />
          <ProgressCard
            title="Economic"
            progress={40}
            progressText="My Progress 2/5"
            imageSrc="../assets/img/Weak Financial Growth.png"
          />
          <ProgressCard
            title="Governance"
            progress={60}
            progressText="My Progress 3/5"
            imageSrc="../assets/img/Morale.png"
          />
          <ProgressCard
            title="Technology & Innovation"
            progress={80}
            progressText="My Progress 4/5"
            imageSrc="../assets/img/Light On.png"
          />
          <ProgressCard
            title="Strategic Integration"
            progress={100}
            progressText="My Progress 5/5"
            imageSrc="../assets/img/Path Steps.png"
          />
        </div>

        <div className="flex justify-between">
          <div className="m-6">
            <div className="h-[321px] bg-white rounded-lg shadow">
              <div className="flex">
                <div className="relative w-[208px] h-[53px] bg-[#00778B] rounded-br-[150px] flex items-center pl-4">
                  <span className="text-white font-bold">
                    Environmental 1/5
                  </span>
                </div>
                <div>
                  <img
                    src={lightIcon}
                    alt="lightIcon"
                    className="w-[24px] h-[24px] mt-[10px] ml-[530px]"
                  />
                </div>
              </div>
              <div className="text-[15px] font-semibold mt-6 w-[775px] h-[52px] bg-[#EEF9FD]">
                <p className="w-[550px] ml-8">
                  1. How aware is your organisation of the concept and
                  importance of achieving Net Zero emissions by 2050.
                </p>
              </div>
              <div className="ml-8 mt-6">
                <div className=" flex block h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3  text-[14px] ">
                    Not aware, or aware but taking no action
                  </div>
                </div>
                <div className="flex block w-[773px] h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    Moderately aware and proactive, but with some knowledge gaps
                    and steps taken towards implementation of a plan
                  </div>
                </div>
                <div className=" flex block  h-[30px] w-[620px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm"></div>
                  <div className="ml-3 text-[14px] ">
                    Very aware and proactive, with a good understanding of Net
                    Zero goals and a well-executed action plan
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-6 w-[775px] h-[321px] bg-white rounded-lg shadow">
              <div className="flex">
                <div className="relative w-[208px] h-[53px] bg-[#00778B] rounded-br-[150px] flex items-center pl-4">
                  <span className="text-white font-bold">
                    Environmental 2/5
                  </span>
                </div>
              </div>
              <div className="text-[15px] font-semibold mt-6 w-[775px] h-[52px] bg-[#EEF9FD]">
                <p className="w-[550px] ml-8">
                  2. How does your organisation approach energy management and
                  conduct energy assessments
                </p>
              </div>
              <div className="ml-8 mt-6">
                <div className=" flex block h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    1. We do not monitor energy consumption or focus on energy
                    efficiency, and we have not conducted
                  </div>
                </div>
                <div className=" flex block w-[773px] h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    2. We monitor energy consumption and implement energy-saving
                    measures
                  </div>
                </div>
                <div className=" flex block  h-[30px] w-[600px]">
                  <div className="bg-[#EAE5E5]  h-4 w-8 rounded-full shadow-sm"></div>
                  <div className="ml-3 text-[14px] ">
                    3. We systematically track and optimise energy consumption
                    and efficiency, complemented by regular energy assessments
                    and audits to identify, and capitalise on energy-saving
                    opportunities.
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-6 w-[775px] h-[321px] bg-white rounded-lg shadow">
              <div className="flex">
                <div className="relative w-[208px] h-[53px] bg-[#00778B] rounded-br-[150px] flex items-center pl-4">
                  <span className="text-white font-bold">
                    Environmental 3/5
                  </span>
                </div>
              </div>
              <div className="text-[15px] font-semibold mt-6 w-[775px] h-[52px] bg-[#EEF9FD]">
                <p className="w-[550px] ml-8">
                  3. A. How does your business approach waste management to
                  reduce environmental impact and promote sustainability
                </p>
              </div>
              <div className="ml-8 mt-6">
                <div className=" flex block h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    1. We have no specific waste management policy or practices
                    in place
                  </div>
                </div>
                <div className=" flex block w-[773px] h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    2. We actively manage waste, recycling, across various
                    processes, but there is room for improvement
                  </div>
                </div>
                <div className=" flex block  h-[30px] w-[620px]">
                  <div className="bg-[#EAE5E5] h-4 w-7 rounded-full shadow-sm"></div>
                  <div className="ml-3 text-[14px] ">
                    3. We have a comprehensive waste management policy and plan
                    with a focus on minimising waste generation, promoting
                    recycling, and implementing circular economy practices.
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-6 w-[775px] h-[321px] bg-white rounded-lg shadow">
              <div className="flex">
                <div className="relative w-[208px] h-[53px] bg-[#00778B] rounded-br-[150px] flex items-center pl-4">
                  <span className="text-white font-bold">
                    Environmental 4/5
                  </span>
                </div>
              </div>
              <div className="text-[15px] font-semibold mt-6 w-[775px] h-[52px] bg-[#EEF9FD]">
                <p className="w-[550px] ml-8">
                  4. To what extent has your organisation evaluated and acted
                  upon incorporating renewable energy systems
                </p>
              </div>
              <div className="ml-8 mt-6">
                <div className=" flex block h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    1. We have not yet considered or explored the possibility of
                    incorporating renewable energy into our business
                  </div>
                </div>
                <div className=" flex block w-[773px] h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    2. We have started to assess the potential of renewable
                    energy systems but have not made any definitive plans
                  </div>
                </div>
                <div className=" flex block  h-[30px] w-[620px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm"></div>
                  <div className="ml-3 text-[14px] ">
                    3. We have extensively incorporated renewable energy systems
                    into our business
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-6 w-[775px] h-[321px] bg-white rounded-lg shadow">
              <div className="flex">
                <div className="relative w-[208px] h-[53px] bg-[#00778B] rounded-br-[150px] flex items-center pl-4">
                  <span className="text-white font-bold">
                    Environmental 5/5
                  </span>
                </div>
              </div>
              <div className="text-[15px] font-semibold mt-6 w-[775px] h-[52px] bg-[#EEF9FD]">
                <p className="w-[550px] ml-8">
                  1.How do you manage transportation and logistics to minimise
                  environmental impacts, track and report emissions
                </p>
              </div>
              <div className="ml-8 mt-6">
                <div className=" flex block h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    1. We do not consider environmental impacts or track
                    emissions of our transportation and logistics
                  </div>
                </div>
                <div className=" flex block w-[773px] h-[30px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm">
                    {" "}
                  </div>
                  <div className="ml-3 text-[14px] ">
                    2. We make some efforts to track and report transportation
                    and logistics, to optimise and reduce emissions
                  </div>
                </div>
                <div className=" flex block  h-[30px] w-[620px]">
                  <div className="bg-[#EAE5E5] h-4 w-4 rounded-full shadow-sm"></div>
                  <div className="ml-3 text-[14px] ">
                    3. We have a comprehensive optimisation strategy to minimise
                    environmental and social impact.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[420px] border ">
            <div className="ml-1">
              <div className="relative bg-[#00778B] rounded-bl-[25px] flex items-center pl-6">
                <span className="text-white font-semibold text-[18px]">
                  Current Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRodemap;
