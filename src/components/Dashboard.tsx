/* eslint-disable @typescript-eslint/ban-ts-comment */
import Companies from "@/assets/images/companies.svg";
import Total_courses from "@/assets/images/total_courses.svg";
import Trainers from "@/assets/images/trainers.svg";
import { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { DataTable } from "@/components/comman/DataTable";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import {
  fetchTopCourseList,
  getCourseCompletionData,
  getDashbooardSme3,
  getEnrolledCourses,
  getFirstInfirgraphicChart,
  getSmeDashboardData,
} from "@/services/apiServices/dashboard";
import {
  AssesmentDashboardData,
  DashboardData,
  SMEDashboard3Response,
  SMEEnrollDashboardResponse,
} from "@/types/dashboard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArcElement,
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
import { Loader2 } from "lucide-react";
import CourseEnrollmentChart from "./CourseEnrollmentChart";
import DashboardCard from "./comman/DashboardCard";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  TimeScale,
  Legend,
  Tooltip,
  ArcElement
);

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { clientId } = useAppSelector((state) => state.user);
  console.log("+++", page);
  const column: ColumnDef<any>[] = [
    {
      accessorKey: "ID",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-inter text-black">
            {row.index + 1}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "CourseName",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Course Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-sm text-xs font-inter text-[#002A3A] xl:w-[80%] w-full line-clamp-2 leading-5">
            {row.original?.course?.title}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "duration",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Course Duration
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-inter text-black">
            {row.original?.course?.duration}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Status
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="text-xs font-inter text-black">
            {row.original?.course?.status}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];

  const { data: firstInfirgraphicChart, isLoading } =
    useQuery<AssesmentDashboardData>({
      queryKey: ["getFirstInfirgraphicChart"],
      queryFn: () =>
        getFirstInfirgraphicChart({
          userId: userData?.query?.id,
          clientId: clientId,
        }),
    });

  const { data: smeDashboardData, isLoading: smeLoading } =
    useQuery<DashboardData>({
      queryKey: ["getSmeDashboardData"],
      queryFn: () => getSmeDashboardData({ userId: userData?.company?.id }),
    });

  const {
    data: fetchCourseCompletionData,
    isPending: isCourseCompletionPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.courseCompletion],
    queryFn: () => getCourseCompletionData(userData?.query?.id),
  });

  const { data: getTopCourseList, isPending: isTopCoursePending } = useQuery({
    queryKey: [QUERY_KEYS.topCourses],
    queryFn: fetchTopCourseList,
  });

  const { data: smeDashboardData3, isPending: smeLoading3 } =
    useQuery<SMEDashboard3Response>({
      queryKey: ["getDashbooardSme3"],
      // queryFn: () => getDashbooardSme3({ userId: 441 }),
      queryFn: () => getDashbooardSme3({ userId: userData?.company?.id }),
    });

  const { data: getEnrolledCoursesData, isLoading: smeLoading4 } =
    useQuery<SMEEnrollDashboardResponse>({
      queryKey: ["getEnrolledCourses"],
      // queryFn: () => getDashbooardSme3({ userId: 441 }),
      queryFn: () => getEnrolledCourses(),
    });

  // const { data: getCourseCompletion } = useQuery({
  //   queryKey: ["courseCompletion"],
  //   queryFn: () => getCourseCompletionData(userData?.query?.id),
  // });

  const currentYear = new Date().getFullYear();
  const currentYearData = getEnrolledCoursesData?.data
    ?.filter((item) => item.month.startsWith(currentYear.toString()))
    .map((item) => item.enrollmentsCount);

  console.log("smeDashboardData", currentYearData);
  const months = [
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
  ];

  const data = {
    labels: months,
    datasets: [
      {
        data: fetchCourseCompletionData?.data,
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
          display: false,
        },
      },

      layout: {
        padding: {
          top: 20,
          bottom: 0,
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
    labels: months,
    datasets: [
      {
        label: "Enrolled Courses",
        data: currentYearData,
        backgroundColor: [
          "#0263FF",
          "#0263FF",
          "#0263FF",

          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
        ],
        borderColor: [
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
          "#0263FF",
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

  const data3 = {
    labels: ["Total Course", "Total Completed Course"],
    datasets: [
      {
        label: "Poll",
        data: [
          smeDashboardData3?.data?.overView?.completedCourse,
          // @ts-ignore
          100 - smeDashboardData3?.data?.overView?.completedCourse,
        ],
        backgroundColor: ["#63B32E", "#E8E8E8"],
      },
    ],
  };

  const data4 = {
    labels: ["Total Course", "Total Completed Course"],
    datasets: [
      {
        label: "Poll",
        data: [
          smeDashboardData3?.data?.employeePerformanceOverview
            ?.coursesCompletion,
          100 -
            // @ts-ignore
            smeDashboardData3?.data?.employeePerformanceOverview
              ?.coursesCompletion,
        ],
        backgroundColor: ["#63B32E", "#E8E8E8"],
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
        enabled: false,
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed) + "%";
            return label;
          },
        },
      },
    },
  };

  const openSupportTicket =
    smeDashboardData?.data?.supportTickets?.open &&
    Object.values(smeDashboardData?.data?.supportTickets?.open).reduce(
      (a: number, b: number) => a + b,
      0
    );

  const resolveSupportTicket =
    smeDashboardData?.data?.supportTickets?.resolved &&
    Object.values(smeDashboardData?.data?.supportTickets?.resolved).reduce(
      (a: number, b: number) => a + b,
      0
    );

  const enrollCoursesData = {
    labels: months,
    datasets: currentYearData,
  };
  const completionCoursesData = {
    labels: months,
    datasets: months.map((label) => fetchCourseCompletionData?.data[label]),
  };

  return (
    <div className="rounded-xl">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-6">
        <DashboardCard
          isLoading={isLoading}
          icon={Trainers}
          title="Total points"
          value={`${firstInfirgraphicChart?.data?.avTotalpoints || 0}/
          ${firstInfirgraphicChart?.data?.avTotalmaxpoint || 0}`}
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Total_courses}
          title="Total questions"
          value={`${
            firstInfirgraphicChart?.data?.avTotalquestionsattempted || 0
          }/
          ${firstInfirgraphicChart?.data?.avTotalquestionsavailable || 0}`}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Companies}
          title="Upcoming courses"
          value={smeDashboardData?.data?.upcomingCourses || 0}
        />
        {/* <button
          className="col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl"
          onClick={() => handleClick("companies")}
        >
          <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
            <img src={Companies} alt="" />
          </div>
          <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-2xl xl:leading-10 leading-8 font-bold">
            30
          </h2>
          <p className="text-base text-black font-calibri">Completed Courses</p>
        </button> */}
      </div>
      <h3 className="text-[22px] font-calibri font-[500] mb-2">
        Total action items
      </h3>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <DashboardCard
          isLoading={smeLoading}
          icon={Trainers}
          title="Total action items"
          value={smeDashboardData?.data?.totalActionItems?.metric || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Total_courses}
          title="Total pending action items"
          value={smeDashboardData?.data?.pendingActionItems || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Companies}
          title="Total delayed action items"
          value={smeDashboardData?.data?.totalActionItems?.report?.delayed || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Companies}
          title="Total completed action items"
          value={
            smeDashboardData?.data?.totalActionItems?.report?.completed || 0
          }
        />
      </div>
      <h3 className="text-[22px] font-calibri font-[500] mb-2">
        Support Tickets
      </h3>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <DashboardCard
          isLoading={smeLoading}
          icon={Trainers}
          title="Total support tickets"
          value={openSupportTicket + resolveSupportTicket || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Total_courses}
          title="Total open support tickets"
          value={openSupportTicket || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Companies}
          title="Total resolved support tickets"
          value={resolveSupportTicket || 0}
        />
      </div>
      {/* <h3 className="text-[22px] font-calibri font-[500] mb-2">
        Course Overview
      </h3>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <DashboardCard
          isLoading={smeLoading}
          icon={Trainers}
          title="Total courses"
          value={smeDashboardData3?.data?.overView?.totalCourse || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Total_courses}
          title="Total ongoing courses"
          value={smeDashboardData3?.data?.overView?.onGoingCourse || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Companies}
          title="Total completed courses"
          value={smeDashboardData3?.data?.overView?.completedCourse || 0}
        />
      </div> */}
      <h3 className="text-[22px] font-calibri font-[500] mb-2">
        Overview of Employee Performance
      </h3>
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <div className="col-span-2 bg-[#FFFFFF] rounded-lg shadow-sm p-5 flex items-center justify-around">
          <div className="w-60 text-center">
            <p className="text-[16px] font-nunito font-bold mb-4">
              Course Completion Rate
            </p>
            <div className="w-40 h-40 mt-0 relative mx-auto">
              {smeLoading3 ? (
                <span className="flex justify-center items-center h-[160px]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </span>
              ) : (
                <Doughnut
                  data={data3}
                  options={options}
                  plugins={[textCenter]}
                />
              )}
            </div>
            <div className="flex items-center gap-6 justify-center mt-4">
              <div className="text-center">
                <h3>{smeDashboardData3?.data?.overView?.totalCourse}</h3>
                <p className="font-nunito font-bold text-slate-600">Courses</p>
              </div>
              <div className="text-center">
                <h3>{smeDashboardData3?.data?.overView?.completedCourse}</h3>
                <p className="font-nunito font-bold text-slate-600">
                  Completions
                </p>
              </div>
            </div>
          </div>
          <div className="w-60 text-center">
            <p className="text-[16px] font-nunito font-bold mb-4">
              Employee Completion Rate
            </p>
            <div className="w-40 h-40 mt-0 relative mx-auto">
              {smeLoading3 ? (
                <span className="flex justify-center items-center h-[160px]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </span>
              ) : (
                <Doughnut
                  data={data4}
                  options={options}
                  plugins={[textCenter]}
                />
              )}
            </div>
            <div className="flex items-center gap-6 justify-center mt-4">
              <div className="text-center">
                <h3>
                  {smeDashboardData3?.data?.employeePerformanceOverview
                    ?.totalCourse || 0}
                </h3>
                <p className="font-nunito font-bold text-slate-600">Courses</p>
              </div>
              <div className="text-center">
                <h3>
                  {smeDashboardData3?.data?.employeePerformanceOverview
                    ?.coursesCompletion || 0}
                </h3>
                <p className="font-nunito font-bold text-slate-600">
                  Completions
                </p>
              </div>
            </div>
          </div>
        </div>

        <DashboardCard
          isLoading={smeLoading}
          icon={Trainers}
          title="Total Courses"
          className="flex items-center justify-center flex-col"
          value={smeDashboardData3?.data?.overView?.totalCourse || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Total_courses}
          title="Total Ongoing Courses"
          className="flex items-center justify-center flex-col"
          value={smeDashboardData3?.data?.overView?.onGoingCourse || 0}
        />
        <DashboardCard
          isLoading={smeLoading}
          icon={Companies}
          title="Total Completed Courses"
          className="flex items-center justify-center flex-col"
          value={smeDashboardData3?.data?.overView?.completedCourse || 0}
        />
      </div>

      <div className="mb-10 bg-[#FFFFFF] rounded-lg shadow-sm">
        <div className="flex w-full">
          <div className=" w-full  m-4 bg-[#FFFFFF]">
            <div className="sm:flex block justify-between items-center">
              <h5 className="text-base font-nunito font-bold sm:pb-0 pb-3">
                Course Completion Trend
              </h5>
              <Button
                className="font-nunito font-semibold px-4 text-white bg-[#00778B] uppercase xl:h-12 h-10 xl:text-base text-sm"
                disabled={isCourseCompletionPending}
              >
                <PDFDownloadLink
                  document={
                    <CourseEnrollmentChart data={completionCoursesData} />
                  }
                  fileName="completion-course-report.pdf"
                >
                  {({ loading }: any) =>
                    loading ? "Loading document..." : "Export Report"
                  }
                </PDFDownloadLink>
              </Button>
            </div>

            <div className="">
              {isCourseCompletionPending ? (
                <span className="flex justify-center items-center h-[300px]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </span>
              ) : (
                <Line
                  className="!h-auto"
                  data={data}
                  options={config.options}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="pt-6 px-4 pb-4">
            <div className="sm:flex block justify-between items-center">
              <h5 className="text-base font-nunito font-bold sm:pb-0 pb-3">
                Course Enrollment Trend Over Time
              </h5>
              <Button
                className="font-nunito font-semibold px-4 text-white bg-[#00778B] uppercase xl:h-12 h-10 xl:text-base text-sm"
                disabled={smeLoading4}
              >
                <PDFDownloadLink
                  document={<CourseEnrollmentChart data={enrollCoursesData} />}
                  fileName="Enroll-course-report.pdf"
                >
                  {({ loading }: any) =>
                    loading ? "Loading document..." : "Export Report"
                  }
                </PDFDownloadLink>
              </Button>
            </div>

            <div className=" mt-[20px] ">
              {smeLoading4 ? (
                <span className="flex justify-center items-center h-[300px]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </span>
              ) : (
                <Bar data={data1} options={config1.options} />
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="flex justify-between items-center px-5 py-6">
            <h5 className="  text-base font-nunito font-bold">Top 5 Courses</h5>
            {/* <Button className="text-[#00778B] bg-transparent font-nunito hover:bg-transparent p-0 h-6">
              View All
            </Button> */}
          </div>

          <div className="">
            {isTopCoursePending ? (
              <span className="flex justify-center items-center h-[300px]">
                <Loader2 className="w-5 h-5 animate-spin" />
              </span>
            ) : getTopCourseList?.data?.length > 0 ? (
              <div className="overflow-x-auto">
                <DataTable
                  columns={column}
                  data={getTopCourseList?.data || []}
                  setPage={setPage}
                  rounded={false}
                />
              </div>
            ) : (
              <span className="flex justify-center items-center h-[300px]">
                No Data Found
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
