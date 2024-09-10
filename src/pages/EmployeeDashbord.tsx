import action_assignedIcon from "@/assets/images/action_assigned.png";
import action_completedIcon from "@/assets/images/action_completed.png";
import action_displayIcon from "@/assets/images/action_display.png";
import action_openIcon from "@/assets/images/action_open.png";
import course_completedIcon from "@/assets/images/course_completed.png";
import course_progressIcon from "@/assets/images/course_progress.png";
import couse_totalIcon from "@/assets/images/couse_total.png";
import nature from "@/assets/images/nature.png";
import person from "@/assets/images/person.png";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { MdKeyboardArrowUp, MdOutlineWatchLater } from "react-icons/md";
import { RiArrowDownSLine, RiCloseLine, RiMenuLine } from "react-icons/ri";

function EmployeeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const data = {
    labels: ["Introductory", "Intermediate", "Advanced"],
    datasets: [
      {
        label: "Poll",
        data: [100],
        backgroundColor: ["#FFD56A", "green", "red"],
        borderColor: ["#FFD56A", "green", "red"],
      },
    ],
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 25px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${Math.round(data.datasets[0].data[0])}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.restore();
    },
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed * 100) + "%";
            return label;
          },
        },
      },
    },
  };

  const Labels = () => (
    <div className="flex gap-8">
      {data.labels.map((label, index) => {
        let colorClass, opacityClass;
        if (index === 0) {
          colorClass =
            "bg-gradient-to-r from-red-600 via-red-300 to-transparent";
          opacityClass = "bg-opacity-40";
        } else if (index === 1) {
          colorClass =
            "bg-gradient-to-r from-yellow-400 via-yellow-300 to-transparent";
          opacityClass = "bg-opacity-50";
        } else {
          colorClass =
            "bg-gradient-to-r from-green-400 via-green-300 to-transparent";
          opacityClass = "bg-opacity-75";
        }
        return (
          <div
            key={index}
            className="text-sm flex flex-col items-center relative mt-10 h-6"
          >
            <div
              className={`absolute left-0 top-0 h-full w-2/6 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none`}
            ></div>
            <div className="ml-2 pl-2 rounded-r-lg">{label}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row bg-[#EDEFF9] w-full lg:w-[1510px] h-auto lg:h-[1430px] overflow-hidden relative">
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

      <div className="bg-[#FFFFFF] w-full lg:w-[1230px] h-auto lg:h-[1378px] mt-[20px] lg:ml-[20px] rounded-[10px] p-4">
        <div className="pb-4 w-full lg:w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
          <div className="flex items-center">
            <RiMenuLine
              className="h-6 w-6 lg:hidden cursor-pointer"
              onClick={toggleSidebar}
            />
            <span className="text-[24px] font-semibold ml-2">Dashboard</span>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <div className="bg-[#F5F5F5] rounded-full h-[30px] w-[30px] p-1">
                <IoMdNotificationsOutline className="h-6 w-6" />
              </div>
              <div className="absolute -top-2 -right-2 flex items-center justify-center h-[20px] w-[20px] bg-red-500 rounded-full text-white text-[10px]">
                5
              </div>
            </div>
            <div className="flex items-center ml-4">
              <img
                src={person}
                alt="person"
                className="h-8 w-8 rounded-full border-[#D9D9D9] border-2"
              />
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-700">
                  Emilia Anderson
                </div>
                <div className="text-xs text-[#000000]">Team Member</div>
              </div>
              <RiArrowDownSLine className="h-5 w-5 ml-1 mb-3 text-gray-700" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[1200px] h-auto lg:h-[265px] px-4">
          <div className="m-3">
            <h3 className="max-w-full lg:max-w-[290.34px] text-[22px] font-bold leading-[29.3px]">
              Our Maturity Level
            </h3>
            <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex justify-center lg:justify-start">
              <div className="w-[200px] h-[200px] relative">
                <Doughnut
                  data={data}
                  options={options}
                  plugins={[textCenter]}
                />
              </div>
            </div>
            <div className="border border-solid border-[#D9D9D9] rounded-[10px] w-full lg:w-[940px] h-auto lg:h-[206px] lg:ml-[60px] shadow-sm mt-6 lg:mt-0">
              <div className="mt-[30px] lg:mt-[50px] ml-[15px]">
                <p className="inline ml-0 lg:ml-[35px]">
                  Your overall sustainability level -
                </p>
                <span className="font-poppins font-bold text-[#000000] leading-6">
                  Intermediate
                </span>
              </div>
              <div className="ml-[15px] lg:ml-[50px] mt-4 lg:mt-0">
                <Labels />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[16px] font-semibold mt-[10px]">My Action Items</p>
        </div>
        <div className="pt-2 flex flex-col lg:flex-row gap-12">
          <div className="border border-solid border-[#D9D9D9] w-full lg:w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
            <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">
              <img
                src={action_assignedIcon}
                alt="action_assignedIcon"
                className="w-[23px] h-[25px]"
              />
            </div>
            <div className="pl-[20px]">
              <span className="text-[32px] leading-[39.06px] font-bold">
                09
              </span>
              <h4 className="mb-1">Assigned</h4>
            </div>
          </div>

          <div className="border border-solid border-[#D9D9D9] w-full lg:w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
            <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">
              <img
                src={action_openIcon}
                alt="action_openIcon"
                className="w-[23px] h-[25px]"
              />
            </div>
            <div className="pl-[20px]">
              <span className="text-[32px] leading-[39.06px] font-bold">
                04
              </span>
              <h4 className="mb-1">Open</h4>
            </div>
          </div>

          <div className="border border-solid border-[#D9D9D9] w-full lg:w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
            <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">
              <img
                src={action_displayIcon}
                alt="action_displayIcon"
                className="w-[23px] h-[25px]"
              />
            </div>
            <div className="pl-[20px]">
              <span className="text-[32px] leading-[39.06px] font-bold">
                03
              </span>
              <h4 className="mb-1">Delayed</h4>
            </div>
          </div>

          <div className="border border-solid border-[#D9D9D9] w-full lg:w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
            <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">
              <img
                src={action_completedIcon}
                alt="action_completedIcon"
                className="w-[23px] h-[25px]"
              />
            </div>
            <div className="pl-[20px]">
              <span className="text-[32px] leading-[39.06px] font-bold">
                02
              </span>
              <h4 className="mb-1">Completed</h4>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[16px] font-semibold mt-[10px]">My Courses</p>
        </div>
        <div className="pt-2 flex flex-col lg:flex-row gap-12">
          <div className="border border-solid border-[#D9D9D9] w-full lg:w-[370px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
            <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">
              <img
                src={couse_totalIcon}
                alt="couse_totalIcon"
                className="w-[23px] h-[25px]"
              />
            </div>
            <div className="pl-[20px]">
              <span className="text-[32px] leading-[39.06px] font-bold">
                09
              </span>
              <h4 className="mb-1">Open</h4>
            </div>
          </div>

          <div className="border border-solid border-[#D9D9D9] w-full lg:w-[370px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
            <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">
              <img
                src={course_progressIcon}
                alt="course_progressIcon"
                className="w-[23px] h-[25px]"
              />
            </div>
            <div className="pl-[20px]">
              <span className="text-[32px] leading-[39.06px] font-bold">
                04
              </span>
              <h4 className="mb-1">In Progress</h4>
            </div>
          </div>

          <div className="border border-solid border-[#D9D9D9] w-full lg:w-[370px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
            <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">
              <img
                src={course_completedIcon}
                alt="course_completedIcon"
                className="w-[23px] h-[25px]"
              />
            </div>
            <div className="pl-[20px]">
              <span className="text-[32px] leading-[39.06px] font-bold">
                03
              </span>
              <h4 className="mb-1">Completed</h4>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-[10px]">
          <div>
            <p className="text-[22px] font-semibold">Recent Courses</p>
            <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
          </div>
          <div className="mt-[10px]">
            <p className="text-[18px] text-[#00778B]">View all</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-[590px] h-auto lg:h-[240px] border rounded-[10px] border-[#D9D9D9] mt-4 shadow-sm">
            <div className="flex flex-col lg:flex-row">
              <div className="overflow-hidden rounded m-5 w-full lg:w-[240px]">
                <img
                  className="lg:w-[240px] h-[200px] rounded-[10px] object-cover object-center"
                  src={nature}
                  alt="nature"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[280px] gap-2 mt-4">
                <div className="text-[16px]">Social | 5 modules</div>
                <h2 className="text-[16px] font-semibold">
                  Certificate in the Sustainable Development Goals, Partnership,
                  People, Planet and Prosperity
                </h2>
                <div className="text-[26px] text-[#00778B] font-bold">30%</div>
                <div className="lg:w-[250px] h-[8px] bg-[#E8E8E8] rounded-lg mr-4">
                  <div
                    className="h-[8px] bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <div className="text-[16px]">1 of 5 Completed</div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[590px] h-auto lg:h-[240px] border rounded-[10px] border-[#D9D9D9] mt-4 shadow-sm">
            <div className="flex flex-col lg:flex-row">
              <div className="overflow-hidden rounded m-5 w-full lg:w-[240px]">
                <img
                  className="lg:w-[240px] h-[200px] rounded-[10px] object-cover object-center"
                  src={nature}
                  alt="nature"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[280px] gap-2 mt-4">
                <div className="text-[16px]">Social | 5 modules</div>
                <h2 className="text-[16px] font-semibold">
                  Certificate in the Sustainable Development Goals, Partnership,
                  People, Planet and Prosperity
                </h2>
                <div className="text-[26px] text-[#00778B] font-bold">30%</div>
                <div className=" lg:w-[250px] h-[8px] bg-[#E8E8E8] rounded-lg mr-2">
                  <div
                    className="h-[8px] bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <div className="text-[16px]">1 of 5 Completed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-[10px]">
          <div>
            <p className="text-[22px] font-semibold">Upcoming live sessions</p>
            <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
          </div>
          <div className="mt-[10px]">
            <p className="text-[18px] text-[#00778B]">View all</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[385px] h-auto lg:h-[150px] border rounded-[10px] border-[#D9D9D9] mt-4 shadow-sm">
            <div className="flex flex-col lg:flex-row">
              <div className="overflow-hidden rounded m-5 w-full lg:w-[90px]">
                <img
                  className="lg:w-[80px] h-[80px] rounded-[10px] object-cover object-center"
                  src={nature}
                  alt="nature"
                />
                <div>
                  <button className="mt-[10px] text-[#00778B] font-bold rounded inline-flex items-center gap-2 font-abhaya">
                    <span>JOIN</span>
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-[280px] gap-2 mt-4">
                <div className="text-[16px] text-[#1D2026] font-inter">
                  Live Session (session title)
                </div>
                <h2 className="text-[14px] font-semibold">
                  Certificate in the Sustainable...
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center mt-2">
                    <LuCalendarDays className="h-5 w-5 text-gray-900" />
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      Date: 29th March, 2024
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineWatchLater className="h-5 w-5 text-gray-900" />
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      Time: 9:10AM to 12:15AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[385px] h-auto lg:h-[150px] border rounded-[10px] border-[#D9D9D9] mt-4 shadow-sm">
            <div className="flex flex-col lg:flex-row">
              <div className="overflow-hidden rounded m-5 w-full lg:w-[90px]">
                <img
                  className="lg:w-[80px] h-[80px] rounded-[10px] object-cover object-center"
                  src={nature}
                  alt="nature"
                />
                <div>
                  <button className="mt-[10px] text-[#00778B] font-bold rounded inline-flex items-center gap-2 font-abhaya">
                    <span>JOIN</span>
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-[280px] gap-2 mt-4">
                <div className="text-[16px] text-[#1D2026] font-inter">
                  Live Session (session title)
                </div>
                <h2 className="text-[14px] font-semibold">
                  Certificate in the Sustainable...
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center mt-2">
                    <LuCalendarDays className="h-5 w-5 text-gray-900" />
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      Date: 29th March, 2024
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineWatchLater className="h-5 w-5 text-gray-900" />
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      Time: 9:10AM to 12:15AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[385px] h-auto lg:h-[150px] border rounded-[10px] border-[#D9D9D9] mt-4 shadow-sm">
            <div className="flex flex-col lg:flex-row">
              <div className="overflow-hidden rounded m-5 w-full lg:w-[90px]">
                <img
                  className="lg:w-[80px] h-[80px] rounded-[10px] object-cover object-center"
                  src={nature}
                  alt="nature"
                />
                <div>
                  <button className="mt-[10px] text-[#00778B] font-bold rounded inline-flex items-center gap-2 font-abhaya">
                    <span>JOIN</span>
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-[280px] gap-2 mt-4">
                <div className="text-[16px] text-[#1D2026] font-inter">
                  Live Session (session title)
                </div>
                <h2 className="text-[14px] font-semibold">
                  Certificate in the Sustainable...
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center mt-2">
                    <LuCalendarDays className="h-5 w-5 text-gray-900" />
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      Date: 29th March, 2024
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineWatchLater className="h-5 w-5 text-gray-900" />
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      Time: 9:10AM to 12:15AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-auto md:ml-[865px] mt-2 bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-full md:w-[332px]">
          <img src={person} alt="Profile" className="h-8 w-8 rounded-full" />
          <div className="flex-grow ml-2 flex flex-col items-start justify-center">
            <span className="text-gray-900 font-semibold">Messaging</span>
          </div>
          <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
