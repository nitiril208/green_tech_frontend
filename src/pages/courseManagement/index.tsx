import Loading from "@/components/comman/Error/Loading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { fetchSingleCourseById } from "@/services/apiServices/courseManagement";
import { pillarLimit } from "@/services/apiServices/pillar";
import { useQuery } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import BasicDetails from "./basicDetails";
import CoursePathway from "./CoursePathway";
import Forum from "./Forum";
import ModuleCreation from "./ModuleCreation";
import React, { useEffect } from "react";

const CourseManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab") || "";
  const step = new URLSearchParams(search).get("step") || "";
  const paramsId = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const paramsType = new URLSearchParams(search).get("type");
  const pathName = location?.pathname?.split("/")[1];
  const courseId = +location?.pathname?.split("/")[3];
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [currentTab, setCurrentTab] = React.useState<string>("0");

  // useEffect(() => {
  //   if (+courseId) {
  //     navigate(
  //       `/${pathName}/create_course/${courseId}?tab=${currentTab}&step=${step}&version=${paramsversion}`
  //     );
  //     if (courseId && currentTab === "0") {
  //       navigate(
  //         `/${pathName}/create_course/${courseId}?tab=${currentTab}&step=${step}&version=${paramsversion}`
  //       );
  //     } else {
  //       navigate(
  //         `/${pathName}/create_course/${courseId}?tab=${currentTab}&version=${paramsversion}`
  //       );
  //     }
  //   } else if (currentTab === "0") {
  //     if (currentTab === "0" && paramsId) {
  //       navigate(
  //         `/${pathName}/create_course?tab=${currentTab}&step=${step}&id=${paramsId}&version=1`
  //       );
  //     } else {
  //       navigate(
  //         `/${pathName}/create_course?tab=${currentTab}&step=${step}&version=1`
  //       );
  //     }
  //   }else {
  //     navigate(
  //       `/${pathName}/create_course?tab=${currentTab}&step=${step}&id=${paramsId}&version=1`
  //     );
  //   }
  // }, [currentTab]);

  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, courseId }],
    queryFn: () => fetchSingleCourseById(String(paramsversion)),
    enabled: !!paramsversion,
  });

  const handleChangeTab = (tab: string) => {
    if (getSingleCourse && +getSingleCourse?.data?.course?.tab >= +tab) {
      if (!+courseId) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("tab", tab);
        navigate(`/${pathName}/create_course?${searchParams.toString()}`, {
          replace: true,
        });
      } else {
        if (+courseId) {
          navigate(
            `/${pathName}/create_course/${courseId}?tab=${tab}&version=${paramsversion}${paramsType ? `&type=${paramsType}` : ""}`,
            {
              replace: true,
            }
          );
        } else if (paramsId) {
          if (paramsTab < tab) {
            return null;
          } else {
            navigate(
              `/${pathName}/create_course?tab=${tab}&step=${step}&id=${paramsId}&version=${paramsversion}`,
              { replace: true }
            );
            // setCurrentTab(tab);
          }
        }
      }
    }
  };

  const { data: selectTargetPillarLimit, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.selectTargetPillarLimit, userData],
    queryFn: () => pillarLimit(userData?.query?.detailsid as string),
    enabled: !!userData,
  });

  useEffect(() => {
    if (paramsTab) {
      if (+selectTargetPillarLimit?.data?.LMSaccess !== 0) {
        setCurrentTab(paramsTab);
      } else {
        const tab = +paramsTab === 2 ? "1" : paramsTab;
        setCurrentTab(tab);
      }
    }
  }, [paramsTab, selectTargetPillarLimit?.data?.LMSaccess]);

  console.log("errors+++", +selectTargetPillarLimit?.data?.LMSaccess === 0);

  return (
    <div className="bg-white p-0">
      <Tabs
        defaultValue={currentTab}
        value={currentTab}
        className=""
        onValueChange={(e) => handleChangeTab(e)}
      >
        <div className="border-b flex md:flex-row flex-col justify-between md:items-center items-start">
          <TabsList className="w-full h-auto p-0 md:order-1 order-2 flex justify-start">
            <TabsTrigger
              value="0"
              className={`data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold font-calibri text-[#000] sm:py-5 py-2 sm:px-5 px-2 ${
                getSingleCourse && +getSingleCourse?.data?.course?.tab >= 0
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >
              Basic Details
            </TabsTrigger>
            <TabsTrigger
              value="1"
              className={`data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold font-calibri text-[#000] sm:py-5 py-2 sm:px-5 px-2 ${
                getSingleCourse && +getSingleCourse?.data?.course?.tab >= 1
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >
              Course Pathway
            </TabsTrigger>
            {+selectTargetPillarLimit?.data?.LMSaccess !== 0 && (
              <TabsTrigger
                value="2"
                className={`data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold font-calibri text-[#000] sm:py-5 py-2 sm:px-5 px-2 ${
                  getSingleCourse && +getSingleCourse?.data?.course?.tab >= 2
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
              >
                Module Creation
              </TabsTrigger>
            )}
            <TabsTrigger
              value="3"
              className={`data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent sm:text-base text-xs font-bold font-calibri text-[#000] sm:py-5 py-2 sm:px-5 px-2 ${
                getSingleCourse && +getSingleCourse?.data?.course?.tab >= 3
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >
              Forum
            </TabsTrigger>
          </TabsList>
          <Button
            className="flex cursor-pointer md:order-2 order-1 bg-transparent text-black"
            onClick={() => {
              dispatch(
                setPath([
                  { label: "Course Management", link: null },
                  { label: "All Course", link: `/${pathName}/allcourse` },
                ])
              );
            }}
          >
            <MoveLeft />
            <span className="text-base font-semibold pl-4">Back</span>
          </Button>
        </div>
        <TabsContent value="0" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <BasicDetails courseData={getSingleCourse?.data || null} />
        </TabsContent>
        <TabsContent value="1" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <CoursePathway />
        </TabsContent>
        <TabsContent value="2" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <ModuleCreation />
        </TabsContent>
        <TabsContent value="3" className="xl:p-[30px] sm:p-5 p-4 mt-0">
          <Forum />
        </TabsContent>
      </Tabs>
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default CourseManagement;
