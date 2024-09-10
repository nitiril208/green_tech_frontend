import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PermissionContext } from "@/context/PermissionContext";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { RootState } from "@/redux/store";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CohortModal from "./CohortModal";
import GridView from "./GridView";
import ListView from "./listView";

const AllCourses = () => {
  const { permissions } = useContext(PermissionContext);
  const { UserId } = useSelector((state: RootState) => state.user);
  const [cohort, setCohort] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTrainee, setStatusTrainee] = useState("All");
  const search = window.location.search;
  const params = new URLSearchParams(search).get("list");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const dispatch = useAppDispatch();
  const changeList = (id: number) => {
    navigate(`${location?.pathname}?list=${id}`, { replace: true });
  };
  const Role = location.pathname.split("/")[1];

  const {
    data: fetchCourseAllCourseData,
    isLoading: fetchCourseAllCoursePending,
    isFetching: fetchCourseAllCourseFetching,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.fetchAllCourse,
      { searchKeyword, status, UserId, statusTrainee },
    ],
    queryFn: () =>
      fetchCourseAllCourse(
        searchKeyword,
        +UserId,
        status === "All" ? "" : status,
        statusTrainee === "All" ? "" : statusTrainee
      ),
    enabled: !!searchKeyword || !!status || !!UserId,
  });
  const getAllCourseList = fetchCourseAllCourseData?.data?.filter(
    (item) => item !== null
  );

  return (
    <div>
      <CohortModal open={cohort} setOpen={setCohort} id={0} />
      <div className="bg-[#FFFFFF] rounded-[10px] w-full">
        <div className="sm:flex block items-center justify-between border-b border-[#D9D9D9] sm:px-5 sm:py-3 p-[15px]">
          <div className="bg-white sm:pb-0 pb-3">
            <h3 className="text-[16px] font-semibold font-calibri mb-1">
              Course Management
            </h3>
            <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
              The full list of your courses, in snapshot view
            </p>
          </div>
          <div className="flex justify-between items-center">
            {(+userData?.query?.role === UserRole.Trainee
              ? permissions?.createCourse
              : true) && (
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    {
                      dispatch(
                        setPath([
                          {
                            label: "Course Management",
                            link: null,
                          },
                          {
                            label: "All Course",
                            link: `/${Role}/allcourse`,
                          },
                          {
                            label: "Create Course",
                            link: null,
                          },
                        ])
                      );
                      navigate(`/${Role}/create_course?tab=0&step=0&version=1`);
                    }
                  }}
                  className="sm:text-base text-sm font-semibold leading-5 font-sans bg-[#00778B] py-2.5 sm:px-5 px-3"
                >
                  ADD NEW COURSE
                </Button>
              </div>
            )}

            <div className="sm:hidden flex">
              <Button
                type="button"
                onClick={() => changeList(0)}
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
                onClick={() => changeList(1)}
                className="bg-transparent p-1 hover:bg-transparent"
              >
                <AiOutlineBars
                  className={`w-8 h-8 ml-2 ${
                    params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`${
            +userData?.query?.role !== UserRole.Trainee
              ? "lg:flex block"
              : "sm:flex block"
          } items-center justify-between sm:py-5 sm:px-[18px] p-[15px]`}
        >
          <div className="flex items-center rounded-md xl:w-[550px] sm:w-[430px] min-w-[290px] sm:h-[52px] h-[46px] relative">
            <BsSearch className="text-[#D9D9D9] mr-2 absolute left-4" />
            <Input
              type="search"
              placeholder="Search by course name, category, maturity level, course by..."
              className="flex-1 pr-4 pl-11 focus: text-sm placeholder-[#D9D9D9] h-full w-full"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div
            className={`flex items-center gap-4 ${
              +userData?.query?.role !== UserRole.Trainee
                ? "lg:pt-0 pt-4"
                : "pt-0"
            }`}
          >
            {+userData?.query?.role !== UserRole.Trainee && (
              <Select
                value={status}
                defaultValue="All"
                onValueChange={(e) => setStatus(e === "All" ? "" : e)}
              >
                <SelectTrigger className="sm:w-[150px] w-full">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Courses</SelectItem>
                  <SelectItem value="READYTOPUBLISH">
                    Ready To Publish
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
            {+userData?.query?.role === UserRole.Trainee && (
              <Select
                value={statusTrainee}
                defaultValue="All"
                onValueChange={(e) => setStatusTrainee(e === "All" ? "" : e)}
              >
                <SelectTrigger className="sm:w-[150px] w-full">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Courses</SelectItem>
                  <SelectItem value="MyCourse">My Courses</SelectItem>
                </SelectContent>
              </Select>
            )}
            <div className="sm:flex hidden">
              <Button
                type="button"
                onClick={() => changeList(0)}
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
                onClick={() => changeList(1)}
                className="bg-transparent p-1 hover:bg-transparent"
              >
                <AiOutlineBars
                  className={`w-8 h-8 ml-2 ${
                    params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="sm:px-[18px] sm:pb-[18px] px-[15px] pb-[15px]">
          {fetchCourseAllCoursePending || fetchCourseAllCourseFetching ? (
            <Loader />
          ) : params === "0" || !params ? (
            <GridView list={getAllCourseList || []} />
          ) : (
            <ListView list={getAllCourseList || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
