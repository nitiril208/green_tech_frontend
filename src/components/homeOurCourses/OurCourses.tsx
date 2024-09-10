import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { fetchCoursePublishAdminClient } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import Loader from "../comman/Loader";
import HomeFooter from "../homePage/HomeFooter";
import HomeHeader from "../homePage/HomeHeader";
import OurCourseList from "./OurCourseList";
const OurCourses = () => {
  const { clientId } = useAppSelector((state: RootState) => state.user);

  const { data: course, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.coursePublishAdminClient],
    queryFn: () => fetchCoursePublishAdminClient(+clientId),
  });
  return (
    <>
      <HomeHeader />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 md:px-3 px-4 py-7">
        {isLoading ? (
          <Loader containerClassName="col-span-full" />
        ) : (
          course?.data?.map((data: any, index: number) => {
            return <OurCourseList key={index} data={data} />;
          })
        )}
      </div>
      <HomeFooter />
    </>
  );
};

export default OurCourses;
