import Course_Completed from "@/assets/images/course_completed.png";
import Course_Progress from "@/assets/images/course_progress.png";
import Couse_Total from "@/assets/images/couse_total.png";
import { QUERY_KEYS } from "@/lib/constants";
import { getDashboardEmployeeCourse } from "@/services/apiServices/employee";
import { useQuery } from "@tanstack/react-query";
import MyCoursesItems from "./MyCoursesItems";

const MyCourses = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const { data, isLoading } = useQuery({
    queryKey: [
      QUERY_KEYS.getdashboardEmployeeCourse,
      { id: userData?.query?.detailsid },
    ],
    queryFn: () => getDashboardEmployeeCourse(userData?.query?.detailsid),
    enabled: !!userData?.query?.detailsid,
  });

  const coursesItems = [
    {
      image: Couse_Total,
      title: data?.myCourses?.totalCourses || 0,
      subTitle: "Assigned",
    },
    {
      image: Course_Completed,
      title: data?.myCourses?.inprogressCourses || 0,
      subTitle: "Open",
    },
    {
      image: Course_Progress,
      title:
        data?.myCourses?.totalCourses! -
          (data?.myCourses?.inprogressCourses! +
            data?.myCourses?.completedCourses!) || 0,
      subTitle: "Delayed",
    },
    {
      image: Course_Progress,
      title: data?.myCourses?.completedCourses || 0,
      subTitle: "Completed",
    },
  ];
  return (
    <div className="mb-8">
      <h5 className="sm:text-base text-lg text-black font-inter pb-4 sm:font-medium font-bold">
        My Courses
      </h5>
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-6 gap-4">
        {coursesItems.length ? (
          coursesItems.map((data, index) => {
            return (
              <MyCoursesItems data={data} key={index} isLoading={isLoading} />
            );
          })
        ) : (
          <p className="col-span-full flex items-center justify-center h-[300px]">
            No data
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
