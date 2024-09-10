import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { TbSelector } from "react-icons/tb";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  TimeScale,
  Legend,
  Tooltip
);

import couse_total from "@/assets/images/couse_total.png";
import usersIcon from "@/assets/images/users-icon.png";
import { useState } from "react";

function Dashbord() {
  const employeeData = [
    {
      ID: "#01",
      CourseName:
        "Greening the emerald isle: Ireland's journey to carbon neutrality",
      Category: "Economics",
      Level: "Intermediate ",
      Rating: "5/5 ",
    },
    {
      ID: "#02",
      CourseName:
        "Greening the emerald isle: Ireland's journey to carbon neutrality",
      Category: "Economics",
      Level: "Intermediate ",
      Rating: "5/5 ",
    },
    {
      ID: "#03",
      CourseName:
        "Greening the emerald isle: Ireland's journey to carbon neutrality",
      Category: "Economics",
      Level: "Intermediate ",
      Rating: "5/5 ",
    },
    {
      ID: "#04",
      CourseName:
        "Greening the emerald isle: Ireland's journey to carbon neutrality",
      Category: "Economics",
      Level: "Intermediate ",
      Rating: "5/5 ",
    },
    {
      ID: "#05",
      CourseName:
        "Greening the emerald isle: Ireland's journey to carbon neutrality",
      Category: "Economics",
      Level: "Intermediate ",
      Rating: "5/5 ",
    },
  ];

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [50, 25, 37, 50, 15, 75, 90, 60, 30, 40, 50, 20],
        fill: false,
        borderColor: "rgba(14, 156, 255, 1)",
        tension: 0.1,
      },
    ],
  };
  const config: any = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },

      layout: {
        padding: {
          top: 20,
          bottom: 230,
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 25,
          },
        },
      },
    },
  };

  //secont bar graph

  const data1 = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 25, 37, 50, 15, 75, 90, 60, 30, 20, 60, 30],
        backgroundColor: [
          "#0263FF",
          "#FF7723",
          "#8E30FF",

          "#A446AA",
          "#A98D46",
          "#7884FE",
          "#96E6E3",
          "#5EA9D6",
          "#4B16FF",
        ],
        borderColor: [
          "#0263FF",
          "#FF7723",
          "#8E30FF",
          "#A446AA",
          "#A98D46",
          "#7884FE",
          "#96E6E3",
          "#5EA9D6",
          "#4B16FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config1 = {
    type: "bar",
    data: data1,
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 25,
          },
        },
      },
    },
  };

  const [activeButton, setActiveButton] = useState(null);
  console.log(activeButton);
  const handleClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="bg-[#F5F7FF] p-5">
      <div className="flex gap-6 mb-5">
        <button
          className="py-[21px] h-[192px] w-[390px] bg-[#FFFFFF]  rounded-[10px] flex flex-col items-center font-abhaya"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[68px] h-[70px] rounded-full">
            <img
              src={usersIcon}
              alt=""
              className="px-[18px] pt-[15px] pb-[18px]"
            />
          </div>
          <h2 className="mt-[10px] text-[32px] font-bold">100</h2>
          <p className="text-[16px] mt-[4px]">Enrolled Employees</p>
        </button>

        <button
          className="py-[21px] h-[192px] w-[390px] bg-[#FFFFFF]  rounded-[10px] flex flex-col items-center font-abhaya"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[68px] h-[70px] rounded-full">
            <img
              src={couse_total}
              alt=""
              className="px-[18px] pt-[15px] pb-[18px]"
            />
          </div>
          <h2 className="mt-[10px] text-[32px] font-bold">15</h2>
          <p className="text-[16px] mt-[4px]">Total Employee</p>
        </button>

        <button
          className="py-[21px]  w-[370px] h-[192px] bg-[#FFFFFF]  rounded-[10px] flex flex-col items-center font-abhaya"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[68px] h-[70px] rounded-full">
            <img
              src={couse_total}
              alt=""
              className="px-[18px] pt-[15px] pb-[18px]"
            />
          </div>
          <h2 className="mt-[10px] text-[32px] font-bold">30</h2>
          <p className="text-[16px] mt-[4px]">Completed Courses</p>
        </button>
      </div>
      <div className="flex h-[430px] bg-[#FFFFFF] mb-5 rounded-[10px]">
        <div className="m-4 bg-[#FFFFFF]">
          <div className="flex justify-between">
            <div className="  font-semibold">Course Completion Trend</div>

            <button className="bg-[#00778B] text-white px-4 py-2 rounded-[3px] font-abhaya">
              EXPORT REPORT
            </button>
          </div>

          <div className="ml-[30px] ">
            <Line className="" data={data} options={config.options} />
          </div>
        </div>
      </div>
      <div className="flex gap-[22px]">
        <div className="p-4 flex h-[450px] w-[50%] bg-[#FFFFFF] rounded-[10px]">
          <div className="bg-[#FFFFFF] w-full">
            <div className="flex justify-between">
              <div className="  font-semibold">
                Course Enrollment Trends Over Time
              </div>

              <button className=" ml-[150px] bg-[#00778B] text-white px-2 py-2 rounded-[3px] font-abhaya">
                EXPORT REPORT
              </button>
            </div>

            <div className=" mt-[20px] ">
              <Bar data={data1} options={config1.options} />
            </div>
          </div>
        </div>
        <div className="flex h-[450px] w-[50%] bg-[#FFFFFF] rounded-[10px] overflow-hidden">
          <div className="bg-[#FFFFFF]">
            <div className="flex justify-between">
              <div className="  font-semibold m-4">Top 5 Courses</div>

              <p className="text-[#00778B] m-4">View All</p>
            </div>

            <div className="mt-2">
              <div className="overflow-x-auto">
                <table className="table-auto w-full  ">
                  <thead>
                    <tr className="bg-[#F1F1F1] h-[50px]">
                      <th className=" ">
                        {" "}
                        <span className="flex ml-2 ">
                          ID{" "}
                          <span className="mt-1">
                            <TbSelector className="text-[#A3A3A3]" />
                          </span>
                        </span>
                      </th>
                      <th className=" ">
                        <span className="flex ml-2">
                          Course Name
                          <span className="mt-1">
                            <TbSelector className="text-[#A3A3A3]" />
                          </span>
                        </span>
                      </th>
                      <th className=" ">
                        <span className="flex mr-6">
                          Category
                          <span className="mt-1">
                            <TbSelector className="text-[#A3A3A3]" />
                          </span>
                        </span>
                      </th>
                      <th className=" ">
                        <span className="flex">
                          Level
                          <span className="mt-1">
                            <TbSelector className="text-[#A3A3A3]" />
                          </span>
                        </span>
                      </th>
                      <th className=" ">
                        <span className="flex mr-2">
                          Rating
                          <span className="mt-1">
                            <TbSelector className="text-[#A3A3A3]" />
                          </span>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((employee) => (
                      <tr key={employee.ID}>
                        <td className=" border-b ps-2">
                          <span className="w-[110px]">{employee.ID}</span>
                        </td>
                        <td className=" border-b   ">
                          <span className="flex">{employee.CourseName}</span>
                        </td>
                        <td className=" border-b ">{employee.Category}</td>
                        <td className="flex items-center border-b  py-5">
                          <div className="flex w-4 h-4 bg-yellow-400 rounded"></div>
                          <span className="ml-1">{employee.Level}</span>
                        </td>

                        <td className=" border-b  px-4 ">{employee.Rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
