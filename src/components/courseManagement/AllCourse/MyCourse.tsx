import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
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
import { getCourseByTrainee } from "@/services/apiServices/courseManagement";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import CohortModal from "./CohortModal";
import GridView from "./GridView";
import ListView from "./listView";

const MyCourse = () => {
  const dispatch = useAppDispatch();
  const { permissions } = useContext(PermissionContext);
  const [cohort, setCohort] = useState(false);
  const [status, setStatus] = useState("All");
  const search = window.location.search;
  const params = new URLSearchParams(search).get("list");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const Role = location.pathname.split("/")[1];
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const changeList = (id: number) => {
    navigate(`${location?.pathname}?list=${id}`, { replace: true });
  };

  const {
    data: fetchCourseAllCourseData,
    isPending: fetchCourseAllCoursePending,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourse, { searchKeyword, status }],
    queryFn: () =>
      getCourseByTrainee(
        userData?.query?.detailsid,
        status === "All" ? "" : status,
        searchKeyword
      ),
  });

  return (
    <div>
      <CohortModal open={cohort} setOpen={setCohort} id={0} />
      <div className="bg-[#FFFFFF] rounded-[10px] w-full">
        <div className="sm:flex block items-center justify-between border-b border-[#D9D9D9] px-5 py-3">
          <div className="bg-white sm:pb-0 pb-3">
            <h3 className="text-[16px] font-semibold font-calibri mb-1">
              My Course
            </h3>
            <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
              The full list of your courses, in snapshot view
            </p>
          </div>
          {(+userData?.query?.role === UserRole.Trainee
            ? permissions?.createCourse
            : true) && (
            <div>
              <Button
                type="button"
                onClick={() => {
                  dispatch(
                    setPath([
                      {
                        label: "Course Management",
                        link: null,
                      },
                      {
                        label: "My Course",
                        link: `/${Role}/mycourses`,
                      },
                      {
                        label: "Create Course",
                        link: `/${Role}/create_course?tab=0&step=0&version=1`,
                      },
                    ])
                  );
                }}
                className="text-base font-semibold leading-5 font-sans bg-[#00778B]"
              >
                ADD NEW COURSE
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-5 px-[18px]">
          <div className="flex items-center border border-[#D9D9D9] rounded-md px-2 w-[550px] sm:h-[52px] h-[46px]">
            <BsSearch className="text-[#D9D9D9] mr-2" />
            <input
              type="search"
              placeholder="Search by course name, category, maturity level, course by..."
              className="flex-1 focus: text-sm placeholder-[#D9D9D9] shadow-none outline-none"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            {+userData?.query?.role !== UserRole.Trainer && (
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
                  <SelectItem value="assign">Assign Courses</SelectItem>
                </SelectContent>
              </Select>
            )}
            <div className="flex sm:ml-6 ml-2 sm:gap-2 gap-0">
              <Button
                type="button"
                onClick={() => changeList(0)}
                className="bg-transparent p-1 hover:bg-transparent"
              >
                <AiOutlineAppstore
                  className={`sm:w-8 sm:h-8 w-6 h-6 ${
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
                  className={`sm:w-8 sm:h-8 w-6 h-6 ${
                    params === "1" ? "text-[#00778B]" : "text-[#A3A3A3]"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="px-[18px] pb-[18px]">
          {fetchCourseAllCoursePending ? (
            <Loader />
          ) : fetchCourseAllCourseData?.data?.length === 0 ? (
            <p className="flex justify-center items-center py-10 text-[18px]">
              No course
            </p>
          ) : params === "0" || !params ? (
            <GridView list={fetchCourseAllCourseData?.data || []} />
          ) : (
            <ListView list={fetchCourseAllCourseData?.data || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
