import Loader from "@/components/comman/Loader";
import CourseGridPage from "@/components/courseManagement/AllCoursesPages/CourseGridPage";
import CourseListPage from "@/components/courseManagement/AllCoursesPages/CourseListPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { fetchAllCourse, fetchPillar } from "@/services/apiServices/allcourse";
import { Pillarcourse } from "@/types/allcourses";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CoursesAllCourse() {
  const user = useSelector((state: RootState) => state.user);
  const [selectedCourse, setSelectedCourse] = useState<Pillarcourse | null>(
    null
  );
  const [search, setSearch] = useState("");
  const usersData = JSON.parse(localStorage.getItem("user") as string);
  const userID = user?.UserId
    ? +user?.UserId
    : usersData?.query
    ? usersData?.query?.id
    : usersData?.id;

  const { data: allcourse, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.fetchbycourse, { selectedCourse, search }],
    queryFn: () =>
      fetchAllCourse(
        selectedCourse?.id?.toString() || "",
        search,
        user?.clientId,
        userID,
        user?.CompanyId
      ),
    enabled: !!selectedCourse,
  });
  const searchUrl = window.location.search;
  const params = new URLSearchParams(searchUrl).get("view");
  const navigate = useNavigate();

  const changeCourseView = (id: number) => {
    navigate(`/company/allcourses?view=${id}`, { replace: true });
  };

  const { data: pillarcourse } = useQuery({
    queryKey: [QUERY_KEYS.fetchbypillarcource],
    queryFn: () => fetchPillar(user?.clientId),
  });

  const handleCourseClick = (course: Pillarcourse) => {
    setSelectedCourse(course);
  };

  useEffect(() => {
    if (pillarcourse?.data.data) {
      setSelectedCourse(pillarcourse?.data.data[0]);
    }
  }, [pillarcourse?.data.data]);
  return (
    <div className="bg-[#f5f3ff]">
      <div className="bg-[#FFFFFF] rounded-[10px]">
        <div className="md:flex block items-center justify-between bg-white border-b border-[#D9D9D9] rounded-t-[10px] p-[14px]">
          <div className="flex items-center justify-between md:pb-0 pb-3">
            <h4 className="text-[16px] text-[#000000] font-calibri font-semibold">
              All Course
            </h4>
            <div className="sm:hidden block">
              <div className="flex">
                <Button
                  type="button"
                  onClick={() => changeCourseView(0)}
                  className="bg-transparent p-1 hover:bg-transparent"
                >
                  <AiOutlineAppstore
                    className={`w-8 h-8 ${
                      params === "0" || !params
                        ? "text-[#00778B]"
                        : "text-[#A3A3A3]"
                    }`}
                  />
                </Button>
                <Button
                  type="button"
                  onClick={() => changeCourseView(1)}
                  className="bg-transparent p-1 hover:bg-transparent"
                >
                  <AiOutlineBars
                    className={`w-8 h-8 ${
                      params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>

          <div className="sm:flex block items-center gap-2">
            <div className="flex items-center xl:w-[550px] sm:w-[480px] w-[300px] sm:h-[52px] h-11 relative">
              <BsSearch className="text-[#D9D9D9] absolute left-4" />
              <Input
                type="search"
                placeholder="Search by course name etc."
                className="pr-4 pl-10 py-2 h-full text-sm placeholder-[#D9D9D9]"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>

            <div className="sm:flex sm:mt-0 mt-3 hidden">
              <Button
                type="button"
                onClick={() => changeCourseView(0)}
                className="bg-transparent p-1 hover:bg-transparent"
              >
                <AiOutlineAppstore
                  className={`w-8 h-8 ${
                    params === "0" || !params
                      ? "text-[#00778B]"
                      : "text-[#A3A3A3]"
                  }`}
                />
              </Button>
              <Button
                type="button"
                onClick={() => changeCourseView(1)}
                className="bg-transparent p-1 hover:bg-transparent"
              >
                <AiOutlineBars
                  className={`w-8 h-8 ${
                    params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>

        <div
          className="overflow-y-hidden overflow-x-auto bg-[#E7E7E8] flex xl:gap-8 gap-5 items-center py-4 xl:px-10 px-5 lg:w-[calc(100vw-305px)]"
          id="scrollStyle"
        >
          {pillarcourse?.data.data?.map((pillarcourse: Pillarcourse) => (
            <div
              className={`flex justify-center self-stretch py-2 gap-x-[10px] items-center min-w-[156px] w-[156px] rounded-[9px] px-2 shadow-b shadow-lg hover:bg-[#64A70B] ${
                selectedCourse === pillarcourse
                  ? "bg-[#64A70B] !text-white"
                  : "bg-[#EDF0F4] text-[#3A3A3A]"
              }`}
              key={pillarcourse.id}
              onClick={() => {
                handleCourseClick(pillarcourse);
              }}
            >
              <img
                className="w-[30px] transition duration-900 ease-in-out filter grayscale hover:brightness-900"
                src={getImages(
                  pillarcourse.pillarName,
                  selectedCourse !== pillarcourse
                )}
                alt={pillarcourse.pillarName} // Add alt text for accessibility
              />

              <p className="">{pillarcourse.pillarName}</p>
            </div>
          ))}
        </div>

        <>
          {isLoading ? (
            <Loader className="h-10 w-10" />
          ) : (
            <>
              {params === "0" || !params ? (
                <div className="grid gap-5 md:p-5 p-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                  <CourseGridPage
                    data={allcourse?.data?.data}
                    selectedCourse={selectedCourse}
                  />
                </div>
              ) : (
                <div className="md:p-5 p-4 flex flex-col gap-6">
                  <CourseListPage
                    data={allcourse?.data?.data}
                    selectedCourse={selectedCourse}
                  />
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default CoursesAllCourse;
