/* eslint-disable @typescript-eslint/ban-ts-comment */
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import speed from "@/assets/images/Speed.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { AllCourse, CourseTime, IsOnline } from "@/types/allcourses";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Dispatch } from "react";
import { FaStar } from "react-icons/fa6";

type dataGridProps = {
  allcourse: AllCourse;
  setIsCohortShow: Dispatch<React.SetStateAction<AllCourse | null>>;
  maturityLevel:
    | {
        pillarId: number;
        maturityId: number;
        fetchMaturity: {
          id: number;
          maturityLevelName: string;
          rangeStart: number;
          rangeEnd: number;
          color: string;
        };
        fetchPillar: {
          id: number;
          pillarName: string;
          checked: number;
        };
      }
    | null
    | undefined;
};

const GridCard = ({
  allcourse,
  setIsCohortShow,
  maturityLevel,
}: dataGridProps) => {
  const user = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { mutate: enrollRequest, isPending } = useMutation({
    mutationFn: fetchEnroll,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchbyrecommendedcourse],
      });
      toast({
        variant: "success",
        title: data?.data?.message,
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });
  const handleEnroll = (id: number) => {
    enrollRequest({
      versionId: id,
      companyId: +user?.CompanyId,
    });
  };
  const getUpcommingCohort = (cohortData: AllCourse) => {
    const currentDate = new Date();
    const formattedCurrentDate = {
      date: String(currentDate.getDate()).padStart(2, "0"),
      month: String(currentDate.getMonth() + 1).padStart(2, "0"),
      year: String(currentDate.getFullYear()),
    };

    const duration = cohortData?.duration?.split(" ");
    const number = parseInt(duration?.[0]) || 0;
    const unit = duration?.[1] || "days";
    // @ts-ignore
    const courseEndDate = moment(currentDate).add(number, unit);

    const matchingSlot =
      cohortData?.cohortGroups?.length > 0 &&
      cohortData?.cohortGroups?.find(
        (slot) =>
          parseInt(slot.slotStartDate.year) > +formattedCurrentDate.year ||
          (parseInt(slot.slotStartDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotStartDate.month) > +formattedCurrentDate.month) ||
          (parseInt(slot.slotStartDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotStartDate.month) ===
              +formattedCurrentDate.month &&
            parseInt(slot.slotStartDate.date) > +formattedCurrentDate.date)
      );

    const findIndex =
      matchingSlot &&
      cohortData?.cohortGroups?.findIndex(
        (slot) =>
          slot.slotStartDate.year === matchingSlot.slotStartDate.year &&
          slot.slotStartDate.month === matchingSlot.slotStartDate.month &&
          slot.slotStartDate.date === matchingSlot.slotStartDate.date
      );

    const upcomingData = matchingSlot
      ? matchingSlot
      : {
          slotStartDate: {
            date: moment(currentDate).format("DD"),
            month: moment(currentDate).format("MM"),
            year: moment(currentDate).format("YYYY"),
          },
          slotEndDate: {
            date: moment(courseEndDate).format("DD"),
            month: moment(courseEndDate).format("MM"),
            year: moment(courseEndDate).format("YYYY"),
          },
        };

    return (
      <div
        className="xl:col-span-5 col-span-7 customeCohortShadow rounded-[6px] p-[7px] xl:mr-[7px] mr-0 border border-[#B6D8DF] bg-[#E4FBFF]"
        onClick={() => setIsCohortShow(cohortData)}
      >
        <div className="flex items-center justify-between pb-[6px]">
          <p className="text-black text-xs">
            <span className="font-medium text-xs font-inter">
              Cohort {findIndex ? findIndex : 1} :
            </span>{" "}
          </p>
          <p className="text-[#4285F4] text-[10px] font-inter font-medium">
            Show all cohort
          </p>
        </div>
        <div className="font-inter text-[10px] leading-3 text-[#000000] font-normal">
          <span>Start Date : </span>
          <span>
            {`${upcomingData.slotStartDate.date
              .toString()
              .padStart(2, "0")}/${upcomingData?.slotStartDate?.month
              .toString()
              .padStart(2, "0")}/${upcomingData?.slotStartDate?.year}`}{" "}
          </span>
          <span>End Date : </span>
          <span>{`${upcomingData.slotEndDate.date
            .toString()
            .padStart(2, "0")}/${upcomingData?.slotEndDate?.month
            .toString()
            .padStart(2, "0")}/${upcomingData?.slotEndDate?.year}`}</span>
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        className="h-full w-full border border-solid border-[#D9D9D9] rounded col-span-1"
        key={allcourse.id}
      >
        <div className="relative overflow-hidden h-[231px]">
          <img
            className="w-full object-cover object-center"
            src={allcourse?.bannerImage}
            alt="Course"
          />
          <input
            type="checkbox"
            className="absolute top-0 right-0 mt-2 mr-2 h-[23px] w-[24px] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
          />
          <div className="flex items-center absolute bottom-[10px] left-5 w-30 bg-[#FFFFFF] rounded-full py-[6px] px-2">
            <FaStar className="text-[#FD8E1F]" />
            <span className="text-[#3A3A3A] font-normal font-Poppins text-xs mr-2 ml-1">
              {maturityLevel?.fetchMaturity?.maturityLevelName}
            </span>
          </div>
        </div>

        <div className="">
          <div className="px-3 py-[14px] h-[calc(100%-78px)] flex flex-col justify-between">
            <p className="text-base font-medium font-inter mb-3 line-clamp-3 text-[#1D2026]">
              {allcourse.title}
            </p>

            <div>
              <div className="mb-3">
                <div className="flex items-center gap-y-2 flex-wrap leading-[22px]">
                  {allcourse?.courseData?.map((item) => {
                    return (
                      <div className="flex gap-2 items-center w-1/2">
                        <img
                          className="inline-block w-[18px] h-[24px]"
                          src={getImages(item?.fetchPillar?.pillarName, true)}
                          alt="Image Alt Text"
                        />
                        <p className="text-[#918A8A] text-base font-normal font-calibri leading-[22px]">
                          {item?.fetchPillar?.pillarName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-5">
                <div className="gap-2 mb-2 col-span-2">
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img className="h-[16] w-[18px]" src={speed} alt="Course" />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      Level-
                      {allcourse?.courseData?.[0]?.fetchMaturity
                        ?.maturityLevelName || "--"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={fulltime}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {allcourse.time === CourseTime.FullTime && (
                        <span>Full-time</span>
                      )}
                      {allcourse.time === CourseTime.PartTime && (
                        <span>Part-time</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img className=" h-[16] w-[18px]" src={time} alt="Course" />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {allcourse.duration || "--"}
                    </p>
                  </div>
                </div>

                <div className="gap-2 mb-2 col-span-3">
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px] text-black"
                      src={diploma}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {allcourse.otherInstitutionName || "--"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={online}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      {allcourse.isOnline === IsOnline.Online && (
                        <span>Online</span>
                      )}
                      {allcourse.isOnline === IsOnline.InPerson && (
                        <span>InPerson</span>
                      )}
                      {allcourse.isOnline === IsOnline.Hybrid && (
                        <span>Hybrid</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-[2px]">
                    <img
                      className=" h-[16] w-[18px]"
                      src={unversity}
                      alt="Course"
                    />
                    <p className="text-xs leading-[22px] text-[#3A3A3A]">
                      Atlantic Technological University
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t py-[13px] px-[8px] grid grid-cols-7 xl:items-center items-start xl:gap-0 gap-3">
            {getUpcommingCohort(allcourse)}
            <div className="xl:col-span-2 col-span-5 xl:mr-0 xl:ml-auto m-0">
              <Button
                // disabled={
                //   reCommendedCourses?.some((item) => item?.id === allcourse?.id)
                //     ? true
                //     : false
                // }
                onClick={() => handleEnroll(allcourse?.currentVersion?.id)}
                className="2xl:px-[14px] px-[10px] group py-[10px] bg-[#64A70B] text-white rounded hover:bg-gray-400 focus: focus:bg-gray-400 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#64A70B]"
                isLoading={isPending}
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridCard;
