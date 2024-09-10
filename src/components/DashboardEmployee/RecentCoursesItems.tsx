import { CourseAllotedEntity } from "@/types/courseManagement";
import { Progress } from "../ui/progress";

type recentCourseItemProps = {
  data: CourseAllotedEntity;
};

const RecentCoursesItems = ({ data }: recentCourseItemProps) => {
  return (
    <div className="col-span-1 sm:p-5 p-0 shadow rounded-md lg:m-0 m-1">
      <div className="sm:flex block items-center w-full">
        <div className="rounded-md overflow-hidden sm:min-w-[200px] sm:min-h-[200px] sm:w-[200px] w-full sm:h-[200px] sm:m-0 m-auto">
          <img
            src={data?.course?.bannerImage}
            alt="img"
            className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
          />
        </div>
        <div className="sm:ps-5 sm:p-0 p-4 w-full">
          <h6 className="text-base text-[#1D2026] font-inter pb-2 font-normal">
            {data?.course?.courseData?.map((item) => {
              return item?.fetchPillar?.pillarName + " | ";
            })}{" "}
            {data?.course?.module?.length} Modules
          </h6>
          <h5 className="text-base font-medium text-black font-inter pb-2">
            {data?.course?.title}
          </h5>
          <span className="text-[#00778B] font-semibold text-[26px] font-abhaya">
            {data?.course?.courseProgress}%
          </span>
          <Progress
            color="#00778B"
            value={+Number(data?.course?.courseProgress)?.toFixed(0)}
            className="h-[8px] w-full rounded-full mb-2"
          />
          <p className="text-base font-nunito text-black font-normal">
            {data?.course?.completedModule} of {data?.course?.totalmodules}{" "}
            Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentCoursesItems;
