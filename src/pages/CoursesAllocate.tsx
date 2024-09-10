/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FaStar } from "react-icons/fa";
import { MdOutlineGroup } from "react-icons/md";
// import { Course } from "@/types/Course";
// import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

import CoursesViewAllocatePopup from "./CoursesViewAllocatePopup";
// import { RootState } from "@/redux/store";
import speed from "@/assets/images/Speed.png";
import courseIcon from "@/assets/svgs/cource.svg";
import duration from "@/assets/svgs/duration.svg";
import institute from "@/assets/svgs/institute.svg";
import online from "@/assets/svgs/online.svg";
import time from "@/assets/svgs/time.svg";
import Loader from "@/components/comman/Loader";
import NoDataText from "@/components/comman/NoDataText";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/hooks/use-redux";
import { getImages } from "@/lib/utils";
import { fetchAllocatedCourse } from "@/services/apiServices/allocatedcourse";
import {
  CourseTime,
  EnrollmentRequestsResponse,
  IsOnline,
} from "@/types/allocatedcourses";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";

function CoursesAllocate() {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const { clientId } = useAppSelector((state) => state?.user);
  const [openId, setOpenId] = useState<number | null>(null);
  const { data: course, isFetching: isPending } =
    useQuery<EnrollmentRequestsResponse>({
      queryKey: [QUERY_KEYS.fetchbycourseallocate, { statusFilter }],
      queryFn: () =>
        fetchAllocatedCourse(
          userData?.query?.id,
          statusFilter === "all" ? "" : statusFilter,
          clientId
        ),
    });

  const handleCheckUpcomingData = (slotStartDate: any) => {
    if (!slotStartDate) return;
    const { date, month, year } = slotStartDate;
    const newDate = new Date(`${year}-${month}-${date}`);

    const now = new Date();
    const currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const isUpcomingDate = newDate > currentDate;

    return !isUpcomingDate;
  };

  return (
    <div className="bg-[#f5f3ff]">
      <div className="">
        <div className="bg-[#FFFFFF] h-full rounded-[10px] overflow-auto">
          <div className="pt-[10px] sm:pl-[30px] pl-[15px] sm:h-[60px] h-auto bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px]">
            <div className="sm:flex block items-center justify-between ">
              <h1 className="text-[16px] font-semibold">Course Allocation</h1>
              <div className="flex items-center">
                <label htmlFor="filter" className="mr-2">
                  Filter by:
                </label>
                <Select
                  value={statusFilter}
                  onValueChange={(e) => setStatusFilter(e)}
                >
                  <SelectTrigger className="border sm:w-[264px] w-[200px] h-[42px] rounded mr-4 sm:my-0 my-3">
                    <SelectValue placeholder="Pending" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="1">Completed</SelectItem>
                    <SelectItem value="3">In Progress</SelectItem>
                    <SelectItem value="0">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isPending ? (
            <Loader />
          ) : course?.data?.courseAlloted &&
            course?.data?.courseAlloted?.length > 0 ? (
            course?.data?.courseAlloted?.map((courseallocate) => {
              const isRead =
                +courseallocate?.employee?.length ===
                  +courseallocate?.numberOfEmployee ||
                handleCheckUpcomingData(
                  // @ts-ignore
                  courseallocate?.cohortGroup?.slotStartDate
                );

              return (
                <>
                  <div key={courseallocate.id} className="p-4">
                    <div className="sm:p-5 p-[15px] bg-[#FFFFFF] border [&:not(:last-child)]:mb-5 border-[#D9D9D9] rounded-md shadow-sm grid grid-cols-12 items-center">
                      <div className="sm:flex block gap-[17px] xl:col-span-10 col-span-12">
                        <div className="overflow-hidden rounded sm:min-w-[152px] sm:w-[152px] sm:min-h-[152px] sm:h-[152px] w-full">
                          <img
                            src={courseallocate?.course?.bannerImage}
                            alt="img"
                            className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
                          />
                        </div>

                        <div className="flex flex-col">
                          <div>
                            <div className="flex 2xl:flex-nowrap flex-wrap items-center mt-[10px] ml-[2px] 2xl:gap-7 xl:gap-4 gap-2">
                              <div className="flex items-center gap-2">
                                <FaStar className="text-[#FD8E1F]" />
                                <span className="text-[#8C94A3] font-semibold leading-[22px] text-sm mt-0.5 ml-1">
                                  {courseallocate?.courseReconmendedStatus}
                                </span>
                              </div>
                              {courseallocate?.course?.courseData?.map(
                                (item: any) => {
                                  return (
                                    <p className="flex items-center gap-3">
                                      <img
                                        className="w-[18px]"
                                        src={getImages(
                                          item?.fetchPillar?.pillarName,
                                          false
                                        )}
                                        alt="Image Alt Text"
                                      />
                                      {item?.fetchPillar?.pillarName}
                                    </p>
                                  );
                                }
                              )}
                              <div className="flex items-center gap-3">
                                <FaStar className="text-[#FBBC04] w-[12px] h-[11px]" />
                                <span className="text-[black] font-bold text-sm mt-0.5">
                                  {
                                    courseallocate?.course?.avgRating
                                      ?.avgcourseRate
                                  }
                                  /5
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <MdOutlineGroup />
                                <p className="text-[#A3A3A3] text-[13px]">
                                  {courseallocate?.employee?.length || 0}{" "}
                                  Employee
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="xl:mt-[18px] mt-3 font-inter sm:text-base text-sm font-medium leading-[22px] text-left">
                            <h1>{courseallocate?.course?.title}</h1>
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  courseallocate?.course?.description || "",
                              }}
                              className="line-clamp-1"
                            ></span>
                          </div>

                          <div className="flex flex-wrap items-center sm:gap-4 gap-2 sm:mt-[17px] mt-3">
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={speed}
                                alt="Course"
                              />
                              <p className="text-xs">
                                Level- {courseallocate?.courseReconmendedStatus}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px] text-black"
                                src={courseIcon}
                                alt="Course"
                              />
                              <p className="text-xs">
                                {courseallocate?.course?.otherInstitutionName}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={time}
                                alt="time"
                              />
                              <p className="text-xs">
                                {courseallocate?.course?.time ===
                                  CourseTime?.FullTime && (
                                  <span>Full-time</span>
                                )}
                                {courseallocate?.course?.time ===
                                  CourseTime?.PartTime && (
                                  <span>Part-time</span>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={online}
                                alt="type"
                              />
                              <p className="text-xs">
                                {courseallocate?.course.isOnline ===
                                  IsOnline.Online && <span>Online</span>}
                                {courseallocate?.course.isOnline ===
                                  IsOnline.InPerson && <span>InPerson</span>}
                                {courseallocate?.course.isOnline ===
                                  IsOnline.Hybrid && <span>Hybrid</span>}
                                {courseallocate?.course.isOnline ===
                                  IsOnline.Major && <span>Major</span>}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={duration}
                                alt="Duration"
                              />
                              <p className="text-xs">
                                {courseallocate?.course?.duration}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <img
                                className=" h-[16] w-[18px]"
                                src={institute}
                                alt="institute"
                              />
                              <p className="text-xs">
                                {courseallocate?.course?.institute}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-[-10px] mt-[15px]">
                            {courseallocate?.employee &&
                              courseallocate?.employee?.length > 0 &&
                              courseallocate?.employee
                                ?.slice(0, 5)
                                ?.map((avatar, index: number) => {
                                  const color = [
                                    "#cbd5e1",
                                    "#bae6fd",
                                    "#9ca3af",
                                    "#bae6fd",
                                    "#9ca3af",
                                  ];
                                  return (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Avatar key={index}>
                                            <AvatarImage
                                              src={
                                                avatar?.profileImage as string
                                              }
                                              alt="Avatar"
                                            />
                                            <AvatarFallback
                                              delayMs={600}
                                              className="uppercase"
                                              style={{
                                                backgroundColor: color[index],
                                              }}
                                            >
                                              {avatar?.name?.charAt(0) ||
                                                avatar?.email
                                                  ?.split("@")[0]
                                                  ?.charAt(0)}
                                            </AvatarFallback>
                                          </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{avatar?.name}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  );
                                })}
                            {courseallocate?.employee &&
                              courseallocate?.employee?.length > 3 && (
                                <div className="w-10 h-10 rounded-full bg-[#00778B] flex justify-center items-center text-[white]">
                                  +
                                  {Math.max(
                                    0,
                                    courseallocate?.employee?.length - 5
                                  )}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      {courseallocate?.enroll === 1 && (
                        <div className="xl:col-span-2 col-span-12 ml-auto mr-0">
                          <Button
                            className="bg-[#64A70B] sm:w-[120px] w-[110px] sm:h-[42px] h-[38px] sm:text-base text-sm"
                            onClick={() => {
                              setPopupOpen(true);
                              setOpenId(courseallocate?.id);
                              setIsReadOnly(!!isRead);
                            }}
                          >
                            View Allocation
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* {totalPages > 1 && (
                      <div className="ml-[1000px] mt-[20px]">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() =>
                                  handlePaginationChange(currentPage - 1)
                                }
                              />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  onClick={() =>
                                    handlePaginationChange(index + 1)
                                  }
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationNext
                                onClick={() =>
                                  handlePaginationChange(currentPage + 1)
                                }
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )} */}
                </>
              );
            })
          ) : (
            <NoDataText message="No data found" />
          )}
        </div>
      </div>
      <CoursesViewAllocatePopup
        isOpen={isPopupOpen}
        onClose={() => {
          setPopupOpen(false);
          setOpenId(null);
        }}
        openId={openId}
        isReadOnly={isReadOnly}
      />
    </div>
  );
}
export default CoursesAllocate;
