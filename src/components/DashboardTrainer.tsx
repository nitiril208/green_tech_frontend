/* eslint-disable @typescript-eslint/ban-ts-comment */
import Companies from "@/assets/images/companies.svg";
import Total_courses from "@/assets/images/total_courses.svg";
import Trainers from "@/assets/images/trainers.svg";
import { useState } from "react";

// import { getTraineeDashboardData } from "@/services/apiServices/dashboard";
import { getTrainerData } from "@/services/apiServices/dashboard";
import { TrainerEnrollDashboardResponse } from "@/types/dashboard";
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
import moment from "moment";
import * as XLSX from "xlsx";
import DashboardCard from "./comman/DashboardCard";
import { DataTable } from "./comman/DataTable";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

const DashboardTrainer = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [contentType, setContentType] = useState("today");

  const { data: smeDashboardData, isLoading } =
    useQuery<TrainerEnrollDashboardResponse>({
      queryKey: ["getTrainerDashboardData", { contentType }],
      queryFn: () =>
        getTrainerData({
          userId: userData?.query?.detailsid,
          contentType: contentType,
        }),
    });

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
      accessorKey: "CourseName",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Enroll Company
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-sm text-xs font-inter text-[#002A3A] xl:w-[80%] w-full line-clamp-2 leading-5">
            {row.original?.enrolledCompanies?.length}
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

  console.log("smeDashboardData", smeDashboardData);

  const openSupportTicket =
    smeDashboardData?.data?.supportTicketsCount?.open &&
    Object.values(smeDashboardData?.data?.supportTicketsCount?.open).reduce(
      // @ts-ignore
      (a: number, b: number) => a + b,
      0
    );

  const resolveSupportTicket =
    smeDashboardData?.data?.supportTicketsCount?.resolved &&
    Object.values(smeDashboardData?.data?.supportTicketsCount?.resolved).reduce(
      // @ts-ignore
      (a: number, b: number) => a + b,
      0
    );

  const handleExport = () => {
    const formattedData: any =
      smeDashboardData?.data?.enrollmentsRequestsFigures?.map((item: any) => {
        const { enrolledCompanies, ...rest } = item;
        return {
          ...rest?.course,
          EnrolledCompanies: enrolledCompanies!
            .map((company: any) => company.name)
            .join(", "),
          description: rest?.course?.description
            ?.replace(/<\/?[^>]+(>|$)/g, "")
            ?.replace(/\s+/g, " ")
            ?.trim(),
          keys: rest?.course?.keys
            ?.replace(/<\/?[^>]+(>|$)/g, "")
            ?.replace(/\s+/g, " ")
            ?.trim(),
          publishDate: moment(rest?.course?.publishDate).format("DD-MM-YYYY"),
          createdAt: moment(rest?.course?.createdAt).format("DD-MM-YYYY"),
          updatedAt: moment(rest?.course?.updatedAt).format("DD-MM-YYYY"),
        };
      });

    // Create a new workbook and add the data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

    // Generate buffer and download
    XLSX.writeFile(workbook, "courses_data.xlsx");
  };

  return (
    <div className="rounded-xl">
      <div className="mb-4 flex items-center justify-end">
        <Select value={contentType} onValueChange={(e) => setContentType(e)}>
          <SelectTrigger className="border sm:w-[264px] w-[200px] h-[42px] rounded mr-4 sm:my-0 my-3">
            <SelectValue placeholder="Pending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <DashboardCard
          isLoading={isLoading}
          icon={Trainers}
          value={smeDashboardData?.data?.publishedCoursesCount || 0}
          title="Total published courses"
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Total_courses}
          value={
            smeDashboardData?.data?.trainingProviderEnrollmentRequests || 0
          }
          title="Total enrollment requests"
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Companies}
          value={smeDashboardData?.data?.approvedEnrollmentRequests || 0}
          title="Total approved enrollments"
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Companies}
          value={smeDashboardData?.data?.trainersCount || 0}
          title="Total active trainers"
        />
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <DashboardCard
          isLoading={isLoading}
          icon={Trainers}
          value={smeDashboardData?.data?.courseContentApprovalRequest || 0}
          title="Total recently updated courses"
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Total_courses}
          value={
            smeDashboardData?.data?.trainerCompanyFeedbacksCount?.toFixed(2) ||
            0
          }
          title="Trainers feedback"
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Companies}
          value={smeDashboardData?.data?.courseFeedbacksCount?.toFixed(2) || 0}
          title="Courses feedback"
        />
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        <DashboardCard
          isLoading={isLoading}
          icon={Trainers}
          value={openSupportTicket + resolveSupportTicket || 0}
          title="Total support tickets"
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Total_courses}
          value={openSupportTicket || 0}
          title="Total open support tickets"
        />
        <DashboardCard
          isLoading={isLoading}
          icon={Companies}
          value={resolveSupportTicket || 0}
          title="Total resolved support tickets"
        />
      </div>
      <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
        <div className="col-span-1 bg-[#FFFFFF] rounded-xl shadow-sm">
          <div className="flex justify-between items-center px-5 py-6">
            <h5 className="  text-base font-nunito font-bold">
              Enrollment Request Figures
            </h5>
            <Button
              type="button"
              onClick={handleExport}
              className="bg-[#00778B] font-nunito h-8"
              disabled={isLoading}
            >
              Export
            </Button>
          </div>

          <div className="">
            {isLoading ? (
              <span className="flex justify-center py-[68px]">
                <Loader2 className="w-5 h-5 animate-spin" />
              </span>
            ) : (
              <div className="overflow-x-auto">
                <DataTable
                  columns={column}
                  data={
                    smeDashboardData?.data?.enrollmentsRequestsFigures || []
                  }
                  rounded={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTrainer;
