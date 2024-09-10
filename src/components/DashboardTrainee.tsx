import Companies from "@/assets/images/companies.svg";
import Total_courses from "@/assets/images/total_courses.svg";
import Trainers from "@/assets/images/trainers.svg";
import { useState } from "react";

import { DataTable } from "@/components/comman/DataTable";
// import { getTraineeDashboardData } from "@/services/apiServices/dashboard";
import { cn } from "@/lib/utils";
import { getTraineeData } from "@/services/apiServices/dashboard";
import { TraineeEnrollDashboardResponse } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
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
import { Loader2 } from "lucide-react";
import CustomCarousel from "./comman/CustomCarousel";
import LiveSessionsItems from "./DashboardEmployee/LiveSessionsItems";

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

const employeeData = [
  {
    ID: 1,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 2,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 3,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 4,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
  {
    ID: 5,
    CourseName:
      "Greening the emerald isle: Ireland's journey to carbon neutrality",
    Category: "Economics",
    Level: "Intermediate ",
    Rating: "5/5 ",
  },
];

const DashboardTrainee = () => {
  const [page, setPage] = useState(0);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  console.log("+++", page);
  const column1: ColumnDef<any>[] = [
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
            {row.original?.title}
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
            {row.original?.duration}
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
            {row.original?.status}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];

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
            {row.original?.title}
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
            {row.original?.duration}
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
            {row.original?.status}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];

  const { data: smeDashboardData, isPending: isSmeDashboardPending } =
    useQuery<TraineeEnrollDashboardResponse>({
      queryKey: ["getTraineeDashboardData"],
      queryFn: () => getTraineeData({ userId: userData?.query?.detailsid }),
    });

  const DashboardTotalListCard = ({
    isLoading,
    icon,
    value,
    title,
    className,
  }: {
    isLoading: boolean;
    icon: string;
    value: number;
    title: string;
    className?: string;
  }) => {
    return (
      <div
        className={cn(
          "col-span-1 xl:p-5 p-3 bg-[#FFFFFF] rounded-xl",
          className
        )}
      >
        {isLoading ? (
          <span className="flex justify-center py-[68px]">
            <Loader2 className="w-6 h-6 animate-spin" />
          </span>
        ) : (
          <>
            <div className="bg-[#F5F7FF] w-[74px] h-[74px] rounded-full flex items-center justify-center mx-auto xl:mb-3 mb-2">
              <img src={icon} alt="" />
            </div>
            <h2 className="xl:pb-2.5 pb-1 xl:text-[32px] text-center text-2xl xl:leading-10 leading-8 font-bold">
              {value}
            </h2>
            <p className="text-base text-black font-calibri text-center">
              {title}
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-xl">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <DashboardTotalListCard
          isLoading={isSmeDashboardPending}
          icon={Trainers}
          value={smeDashboardData?.trainerCourseCount || 0}
          title="Total Assigned Courses"
        />
        <DashboardTotalListCard
          isLoading={isSmeDashboardPending}
          icon={Total_courses}
          value={smeDashboardData?.discussionForumActivity?.posts || 0}
          title="Total Posts"
        />
        <DashboardTotalListCard
          isLoading={isSmeDashboardPending}
          icon={Companies}
          value={smeDashboardData?.discussionForumActivity?.replies || 0}
          title="Total Replies"
        />
        <DashboardTotalListCard
          isLoading={isSmeDashboardPending}
          icon={Companies}
          value={smeDashboardData?.discussionForumActivity?.activeUsers || 0}
          title="Total Active Users"
        />
      </div>

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="flex justify-between items-center px-5 py-6">
            <h5 className="  text-base font-nunito font-bold">
              Top 5 Ongoing Courses
            </h5>
            {/* <Button className="text-[#00778B] bg-transparent font-nunito hover:bg-transparent p-0 h-6">
              View All
            </Button> */}
          </div>

          <div className="">
            {isSmeDashboardPending ? (
              <span className="flex justify-center items-center h-[300px]">
                <Loader2 className="w-6 h-6 animate-spin" />
              </span>
            ) : (
              <div className="overflow-x-auto">
                <DataTable
                  columns={column}
                  data={
                    smeDashboardData?.trainerEnrollCourse?.slice(0, 5) || []
                  }
                  totalPages={employeeData?.length}
                  setPage={setPage}
                  rounded={false}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="flex justify-between items-center px-5 py-6">
            <h5 className="  text-base font-nunito font-bold">
              Top 5 Upcoming Courses
            </h5>
            {/* <Button className="text-[#00778B] bg-transparent font-nunito hover:bg-transparent p-0 h-6">
              View All
            </Button> */}
          </div>

          <div className="">
            {isSmeDashboardPending ? (
              <span className="flex justify-center items-center h-[300px]">
                <Loader2 className="w-6 h-6 animate-spin" />
              </span>
            ) : (
              <div className="overflow-x-auto">
                <DataTable
                  columns={column1}
                  data={
                    smeDashboardData?.trainerUpcommingCourse?.slice(0, 5) || []
                  }
                  totalPages={employeeData?.length}
                  setPage={setPage}
                  rounded={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <h3 className="text-[22px] font-calibri font-[500] mb-2">
        Upcoming Live Session
      </h3>
      <div className="sm:block hidden bg-white p-5 rounded">
        <div
          className={`grid gap-6 xl:min-h-[150px] items-center ${
            isSmeDashboardPending
              ? "grid-cols-1"
              : "xl:grid-cols-3 sm:grid-cols-2 grid-cols-1"
          }`}
        >
          {isSmeDashboardPending ? (
            <span className="flex justify-center items-center h-[300px]">
              <Loader2 className="w-6 h-6 animate-spin" />
            </span>
          ) : smeDashboardData?.UpcomingSessions &&
            smeDashboardData?.UpcomingSessions?.length > 0 ? (
            smeDashboardData?.UpcomingSessions!.map((data, index) => {
              return <LiveSessionsItems data={data} key={index} />;
            })
          ) : (
            <p className="text-base text-black font-calibri col-span-full text-center">
              No Data
            </p>
          )}
        </div>
      </div>
      <div className="sm:hidden block bg-white p-5 rounded">
        <CustomCarousel containerClassName="">
          {(smeDashboardData?.UpcomingSessions || [])?.map((data, index) => {
            return <LiveSessionsItems data={data} key={index} />;
          })}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default DashboardTrainee;
