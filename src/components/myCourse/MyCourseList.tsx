import ClockImage from "@/assets/images/Clock.png";
import GraduationCapImage from "@/assets/images/Graduationcap.png";
import InternetImage from "@/assets/images/Internet.png";
import SpeedImage from "@/assets/images/Speed.png";
import TimesheetImage from "@/assets/images/Timesheet.png";
import UniversityImage from "@/assets/images/University.png";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { CourseTime, IsOnline } from "@/types/allcourses";
import { CourseAllotedEntity } from "@/types/courseManagement";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

type myPagesListProps = {
  list: CourseAllotedEntity;
  selectFilterByCategory: string;
};

const MyCourseList = ({ list, selectFilterByCategory }: myPagesListProps) => {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  console.log("listlist", list);

  return (
    <Link
      to={`/employee/employee-basic-course/${list?.course?.versionId}?courseId=${list?.course?.id}`}
      onClick={() =>
        dispatch(
          setPath([
            {
              label: "My Course",
              link: `/${Role}/mycourses`,
            },
            {
              label: "Course Details",
              link: null,
            },
          ])
        )
      }
    >
      <div className="border border-solid gap-1 border-[#D9D9D9] rounded-lg group flex items-end sm:justify-between justify-center xl:p-5 sm:p-4 p-0 mb-5 xl:flex-nowrap flex-wrap">
        <div className="flex sm:flex-nowrap flex-wrap sm:justify-start justify-center items-center xl:gap-5 gap-3">
          <div className="overflow-hidden rounded-lg sm:min-h-[152px] sm:min-w-[152px] sm:w-[152px] sm:h-[152px] w-full">
            <img
              src={list.course?.bannerImage}
              alt=""
              className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
            />
          </div>
          <div className="w-full sm:p-0 px-4">
            <p className="sm:text-base text-sm font-medium font-inter leading-6 mb-[10px] line-clamp-1">
              {list.course?.title}
            </p>
            <div className="flex flex-wrap md:gap-5 sm:gap-2 gap-1 pb-[10px]">
              {list?.course?.courseData?.map((item) => {
                const bgColor = item?.fetchMaturity?.color;
                return (
                  <Badge
                    className={`bg-[${bgColor}] text-[#3A3A3A] font-normal rounded-full font-Poppins text-xs leading-4 py-[4px] px-[10px] my-1 mx-[2px] hover:text-white h-auto`}
                  >
                    {item?.fetchPillar?.pillarName}
                  </Badge>
                );
              })}
            </div>
            <div className="flex items-center justify-between pb-[6px]">
              <div className="text-xl font-calibri leading-6 text-[#00778B] font-bold">
                {Number(list?.course?.courseProgress).toFixed(0)}%
              </div>
              <div className="text-xs font-normal font-calibri leading-4">
                {list?.course?.completedModule} of {list?.course?.totalmodules}{" "}
                Completed
              </div>
            </div>
            <Progress
              color="#00778B"
              value={
                list?.course?.courseProgress
                  ? +Number(list?.course?.courseProgress).toFixed(0)
                  : 0
              }
              className="rounded-full w-full h-[6px]"
            />
            <div className="flex flex-wrap items-center 2xl:gap-6 sm:gap-3 gap-2 pt-[10px]">
              <div className="flex items-center">
                <img src={SpeedImage} alt="" className="h-[16] w-[18px]" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  Level-{" "}
                  {
                    list?.course?.courseData?.find(
                      (item) =>
                        item?.fetchPillar?.pillarName === selectFilterByCategory
                    )?.fetchMaturity?.maturityLevelName
                  }
                </p>
              </div>
              <div className="flex items-center">
                <img src={GraduationCapImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  {list?.course?.otherInstitutionName}
                </p>
              </div>
              <div className="flex items-center">
                <img src={ClockImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1 sm:line-clamp-2 line-clamp-1">
                  {list?.course?.time === CourseTime.FullTime && (
                    <span>Full-time</span>
                  )}
                  {list?.course?.time === CourseTime.PartTime && (
                    <span>Part-time</span>
                  )}
                </p>
              </div>
              <div className="flex items-center">
                <img src={InternetImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  {list?.course?.isOnline === IsOnline.Online && (
                    <span>Online</span>
                  )}
                  {list?.course?.isOnline === IsOnline.InPerson && (
                    <span>InPerson</span>
                  )}
                  {list?.course?.isOnline === IsOnline.Hybrid && (
                    <span>Hybrid</span>
                  )}
                </p>
              </div>
              <div className="flex items-center">
                <img src={TimesheetImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  {list?.course?.duration}
                </p>
              </div>
              <div className="flex items-center">
                <img src={UniversityImage} alt="" />
                <p className="text-xs font-calibri font-normal text-[#3A3A3A] leading-6 pl-1">
                  {list?.course?.institute}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-0 ml-auto sm:mb-0 mb-4">
          <Button className="bg-[#00778B] text-white font-bold font-calibri sm:me-0 me-4 sm:text-base text-sm rounded-md shadow py-[12px] px-[24px] h-auto">
            {+Number(list?.course?.courseProgress).toFixed(0) === 100
              ? "view certificate"
              : "Continue"}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default MyCourseList;
