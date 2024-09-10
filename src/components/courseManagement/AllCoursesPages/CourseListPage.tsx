/* eslint-disable @typescript-eslint/ban-ts-comment */
import lightOn from "@/assets/images/LightOn.png";
import neighbour from "@/assets/images/Neighbour.png";
import speed from "@/assets/images/Speed.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Modal from "@/components/comman/Modal";
import NoDataText from "@/components/comman/NoDataText";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchCourseDiscountEnroll } from "@/services/apiServices/enroll";
import {
  AllCourse,
  CourseTime,
  IsOnline,
  Pillarcourse,
} from "@/types/allcourses";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CohortModel from "./CohortModel";

type dataGridProps = {
  data: AllCourse[];
  selectedCourse: Pillarcourse | null;
};

const CourseListPage = ({ data, selectedCourse }: dataGridProps) => {
  const [recommendedCoursesById, setRecommendedCoursesById] = useState<
    number | null
  >();
  const Role = location?.pathname?.split("/")[1];
  const navigate = useNavigate();
  const [isRecommendedCourseShow, setIsRecommendedCourseShow] = useState(false);
  const [isCohortShow, setIsCohortShow] = useState<null | AllCourse>(null);

  useEffect(() => {
    if (!isRecommendedCourseShow) {
      setRecommendedCoursesById(null);
    }
  }, [isRecommendedCourseShow]);

  const handleClose = () => {
    setIsRecommendedCourseShow(false);
    setRecommendedCoursesById(null);
  };

  const {
    data: fetchCourseDiscountEnrollFun,
    isPending: isPendingCourseDEnroll,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.fetchCourseDiscountEnroll,
      { recommendedCoursesById },
    ],
    queryFn: () => fetchCourseDiscountEnroll(recommendedCoursesById),
    enabled: !!recommendedCoursesById,
  });

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
          parseInt(slot?.slotStartDate?.year) > +formattedCurrentDate?.year ||
          (parseInt(slot?.slotStartDate?.year) ===
            +formattedCurrentDate?.year &&
            parseInt(slot.slotStartDate?.month) >
              +formattedCurrentDate?.month) ||
          (parseInt(slot.slotStartDate?.year) === +formattedCurrentDate?.year &&
            parseInt(slot.slotStartDate?.month) ===
              +formattedCurrentDate?.month &&
            parseInt(slot.slotStartDate?.date) > +formattedCurrentDate?.date)
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
      : cohortData?.isOnline === IsOnline.Offline
      ? {
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
        }
      : null;

    return (
      <div className="xl:col-span-5 col-span-7 sm:w-[300px] w-[270px]">
        {upcomingData !== null && (
          <div className="customeCohortShadow rounded-[6px] p-[7px] border border-[#B6D8DF] bg-[#E4FBFF]">
            <div className="flex items-center justify-between pb-[6px]">
              <p className="text-black text-xs">
                <span className="font-medium text-xs font-inter">
                  Cohort {findIndex ? findIndex : 1} :
                </span>{" "}
              </p>
              <p
                className="text-[#4285F4] text-[10px] font-inter font-medium cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCohortShow(cohortData);
                }}
              >
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
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        open={!!isCohortShow}
        onClose={() => setIsCohortShow(null)}
        className="w-[560px]"
      >
        <CohortModel isCohortShow={isCohortShow} />
      </Modal>

      <Modal
        open={isRecommendedCourseShow}
        onClose={handleClose}
        className={`md:py-[60px] sm:py-[40px] py-6 md:px-6 px-4 lg:max-w-[800px] md:max-w-[650px] sm:max-w-[580px] max-w-[335px] rounded-xl ${
          isPendingCourseDEnroll
            ? "h-[200px]"
            : fetchCourseDiscountEnrollFun?.data &&
              fetchCourseDiscountEnrollFun?.data?.length > 0
            ? " h-auto"
            : "h-[200px]"
        }`}
      >
        <RecommendedCoursesModel
          data={fetchCourseDiscountEnrollFun?.data || []}
          isLoading={isPendingCourseDEnroll}
          setOpen={setIsRecommendedCourseShow}
        />
      </Modal>

      {data?.length > 0 ? (
        data?.map((allcourse: AllCourse) => {
          const maturityLevel =
            selectedCourse &&
            allcourse?.courseData?.find(
              (item) =>
                item.fetchPillar?.pillarName === selectedCourse?.pillarName
            );
          return (
            <>
              <div
                className="border border-[#D9D9D9] rounded-lg overflow-hidden grid grid-cols-8  cursor-pointer items-center xl:gap-5 gap-4"
                onClick={() =>
                  navigate(
                    `/${Role}/employee-basic-course/${allcourse?.currentVersion?.id}`
                  )
                }
                key={allcourse.id}
              >
                <div className="xl:col-span-2 sm:col-span-3 col-span-8">
                  <div className="relative overflow-hidden sm:max-h-[221px] sm:max-w-[356px] w-full">
                    <img
                      className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
                      src={allcourse?.bannerImage}
                      alt="Course"
                    />
                    <input
                      type="checkbox"
                      className="absolute top-[10px] right-[10px] h-[24px] w-[24px] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                    />
                    <div className="flex items-center absolute bottom-[10px] left-5 w-30 bg-[#FFFFFF] rounded-full py-[6px] px-2">
                      <FaStar className="text-[#FD8E1F]" />
                      <span className="text-[#3A3A3A] font-normal font-Poppins text-xs mr-2 ml-1">
                        {allcourse?.courseReconmendedStatus ||
                          maturityLevel?.fetchMaturity?.maturityLevelName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="xl:col-span-6 sm:col-span-5 col-span-8 xl:flex xl:flex-row flex-col items-center xl:justify-between justify-center sm:py-3 pb-3 pt-0 sm:px-0 px-3">
                  <div className="">
                    <h4 className="sm:text-base text-sm font-medium font-inter xl:mb-3 line-clamp-3 text-[#1D2026] pb-3">
                      {allcourse.title}
                    </h4>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center flex-wrap gap-3">
                        <div className="flex items-center gap-1">
                          <img
                            className="inline-block w-[20px] h-[23px]"
                            src={lightOn}
                            alt="Image Alt Text"
                          />
                          <p className="text-[#918A8A] text-base font-normal font-calibri">
                            {
                              allcourse?.courseData?.[0]?.fetchPillar
                                ?.pillarName
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px] text-black"
                            src={diploma}
                            alt="Course"
                          />
                          <p className="text-xs leading-[22px] text-[#3A3A3A]">
                            {allcourse.otherInstitutionName}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
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
                        <div className="flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src={unversity}
                            alt="Course"
                          />
                          <p className="text-xs text-[#3A3A3A]">
                            Atlantic Technological University
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1">
                          <img
                            className="inline-block w-[18px] h-[24px]"
                            src={neighbour}
                            alt="Image Alt Text"
                          />
                          <p className="text-[#918A8A] text-base font-normal font-calibri">
                            Social
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <img
                            className="h-[16] w-[18px]"
                            src={speed}
                            alt="Course"
                          />
                          <p className="text-xs leading-[22px] text-[#3A3A3A]">
                            Level-
                            {
                              allcourse?.courseData?.[0]?.fetchMaturity
                                ?.maturityLevelName
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
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
                        <div className="flex items-center gap-1">
                          <img
                            className=" h-[16] w-[18px]"
                            src={time}
                            alt="Course"
                          />
                          <p className="text-xs leading-[22px] text-[#3A3A3A]">
                            {allcourse.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xl:py-[13px] pb-0 pt-[13px] xl:px-9 flex flex-col gap-3 px-0 xl:border-l xl:border-[#DDD]">
                    {getUpcommingCohort(allcourse)}
                    <div className="xl:text-right text-left">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsRecommendedCourseShow(true);
                          setRecommendedCoursesById(allcourse?.id);
                        }}
                        className="  bg-[#64A70B] hover:bg-[#64A70B] text-white px-4 py-2 rounded w-[100px]"
                        disabled={allcourse?.isOnline === 1 ? false :
                          allcourse?.enrolled ||
                          !getUpcommingCohort(allcourse)?.props?.children
                        }
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <NoDataText message="No Course Data Found" />
      )}
    </>
  );
};

export default CourseListPage;
