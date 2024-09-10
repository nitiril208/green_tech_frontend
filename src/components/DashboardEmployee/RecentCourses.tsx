import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllEmployeeCourseList } from "@/services/apiServices/courseManagement";
import { MyCourseResponse } from "@/types/courseManagement";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CustomCarousel from "../comman/CustomCarousel";
import Loader from "../comman/Loader";
import NoDataText from "../comman/NoDataText";
import { Button } from "../ui/button";
import RecentCoursesItems from "./RecentCoursesItems";

const RecentCourses = () => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const userID = CompanyId
    ? CompanyId
    : userData?.query
    ? userData?.query?.detailsid
    : userData?.detailsid;

  const { data, isLoading } = useQuery<MyCourseResponse>({
    queryKey: [
      QUERY_KEYS?.myCourses,
      {
        id: userID,
      },
    ],
    queryFn: () =>
      getAllEmployeeCourseList({
        id: userID,
        status: "In Progress",
        categories: "",
      }),
  });

  return (
    <div className="mb-8">
      <div className="mb-5 flex justify-between items-center">
        <h3 className="font-bold font-nunito xl:text-[22px] text-lg border-b-2 inline-block border-[#75BD43] relative pb-1">
          Recent Courses
          {/* <div className="bg-[#75BD43] w-[115px] h-[2px] absolute left-0 bottom-0"></div> */}
        </h3>
        {data?.data?.courseAlloted && data?.data?.courseAlloted.length > 2 && (
          <Button
            type="button"
            onClick={() => {
              navigate(`${location?.pathname?.split("/")[1]}/mycourses`);
            }}
            className="bg-transparent text-base font-bold hover:bg-transparent text-[#00778B] font-nunito"
          >
            View all
          </Button>
        )}
      </div>
      <div className="sm:block hidden">
        <div
          className={`grid gap-6 ${
            isLoading ? "grid-cols-1" : "xl:grid-cols-2 grid-cols-1"
          }`}
        >
          {isLoading ? (
            <span className="py-14 flex justify-center">
              <Loader />
            </span>
          ) : data?.data?.courseAlloted &&
            data?.data?.courseAlloted?.length < 0 ? (
            data?.data?.courseAlloted?.splice(0, 2)?.map((data, index) => {
              return <RecentCoursesItems data={data} key={index} />;
            })
          ) : (
            <NoDataText message="No records found" />
          )}
        </div>
      </div>

      <div className="sm:hidden block">
        {isLoading ? (
          <span className="py-14 flex justify-center">
            <Loader />
          </span>
        ) : data?.data?.courseAlloted &&
          data?.data?.courseAlloted?.length > 0 ? (
          <CustomCarousel containerClassName="">
            {data?.data?.courseAlloted?.splice(0, 2)?.map((data, index) => {
              return <RecentCoursesItems data={data} key={index} />;
            }) || []}
          </CustomCarousel>
        ) : (
          <NoDataText message="No records found" />
        )}
      </div>
    </div>
  );
};

export default RecentCourses;
