import CloseIcon from "@/assets/images/close_img.png";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchSingleCourseById } from "@/services/apiServices/courseManagement";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import {
  fetchClientwisePillarList,
  pillarLimit,
  pillarMaturity,
} from "@/services/apiServices/pillar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoursePathwayPageItems from "./CoursePathwayPageItems";

interface SelectedData {
  pillarId: string;
  maturityId: string;
}

const CoursePathwayPage = () => {
  const { clientId, CompanyId } = useAppSelector((state) => state.user);
  const [selectedData, setSelectedData] = useState<SelectedData[]>([]);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  const paramsversion = new URLSearchParams(search).get("version");
  const paramsId = new URLSearchParams(search).get("id");
  const pathName = location?.pathname?.split("/")[1];
  const courseId = location?.pathname?.split("/")[3];
  const queryClient = useQueryClient();

  const { data: clientMaturityLevel, isPending: isClientMaturityLevel } =
    useQuery({
      queryKey: [QUERY_KEYS.maturityLevel, clientId],
      queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
      enabled: !!clientId,
    });

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.clientwisePillarList, clientId],
    queryFn: () => fetchClientwisePillarList(clientId as string),
    enabled: !!clientId,
  });

  const { data: selectTargetPillarLimit } = useQuery({
    queryKey: [QUERY_KEYS.selectTargetPillarLimit, CompanyId],
    queryFn: () => pillarLimit(CompanyId as string),
    enabled: !!CompanyId,
  });

  const { mutate: pillarMaturityFun, isPending: pillarMaturityLoading } =
    useMutation({
      mutationFn: (e: any) => pillarMaturity(e),
      onSuccess: (data) => {
        setIsError(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.getSingleCourse],
        });
        const updatedData = data?.data;
        if (+courseId) {
          navigate(
            `/${pathName}/create_course/${courseId}?tab=2&version=${paramsversion}`
          );
        } else {
          navigate(
            `/${pathName}/create_course?tab=${
              updatedData?.creationCompleted ? "2" : updatedData?.tab
            }&id=${paramsId}&version=${paramsversion}`
          );
        }
        toast({
          title: "Success",
          description: `Course Pathway ${
            +courseId ? "updated" : "created"
          } successfully`,
          variant: "success",
        });
      },
    });

  const handleSelected = (pillarId: number, levelId: number) => {
    setIsError(false);
    setSelectedData((prevSelected: any) => {
      const index: any = prevSelected.findIndex(
        (item: any) => item.pillarId === pillarId
      );
      if (index !== -1) {
        if (prevSelected[index].maturityId === levelId) {
          return prevSelected.filter((item: any) => item.pillarId !== pillarId);
        } else {
          const updatedLevels = [...prevSelected];
          updatedLevels[index] = { maturityId: levelId, pillarId };
          return updatedLevels;
        }
      } else {
        if (
          Object.keys(prevSelected).length >=
          selectTargetPillarLimit?.data?.pillarLimit
        ) {
          setIsError(true);
          return prevSelected;
        }
        return [...prevSelected, { maturityId: levelId, pillarId }];
      }
    });
  };

  const { data: getSingleCourse, isFetching: getSingleCourseFetching } =
    useQuery({
      queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion }],
      queryFn: () => fetchSingleCourseById(String(paramsversion)),
      enabled: +courseId ? !!paramsversion : false,
    });

  useEffect(() => {
    if (getSingleCourse) {
      const data: any = getSingleCourse?.data?.course?.courseData;
      setSelectedData(data);
    }
  }, [getSingleCourse]);

  const updateedPillar = (selectedData: any, pillarLimit: any) => {
    if (selectedData?.length !== pillarLimit?.length) return false;
    return JSON.stringify(selectedData) === JSON.stringify(pillarLimit);
  };
  const getPillarLimit = getSingleCourse?.data?.course?.courseData || [];

  const handleSubmit = () => {
    if (selectedData?.length > 0) {
      if (selectedData.length <= +selectTargetPillarLimit?.data?.pillarLimit) {
        if (updateedPillar(selectedData, getPillarLimit)) {
          if (+courseId) {
            navigate(
              `/${pathName}/create_course/${courseId}?tab=2&version=${paramsversion}`
            );
          } else {
            navigate(
              `/${pathName}/create_course?tab=2&id=${paramsId}&version=${paramsversion}`
            );
          }
        } else {
          const payload = {
            courseData: selectedData,
            id: +courseId ? +courseId : paramsId,
            version: +courseId ? getSingleCourse?.data?.version : paramsversion,
            tab: "2",
          };
          pillarMaturityFun(payload);
        }
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h4 className="text-[16px] text-black pb-4 flex flex-wrap items-center gap-[15px]">
          <span className="font-nunito font-bold">
            Target areas / pillars(Select applicable pillars)
          </span>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
            Which sustainability pillars does your course apply to? And for
            which level?
          </p>
        </h4>
        <Button
          type="button"
          variant={"ghost"}
          className="p-0 hover:bg-transparent h-auto underline text-[#000] text-[15px] font-nunito font-[600] leading-[16px]"
          onClick={() => setSelectedData([])}
        >
          Reset
        </Button>
      </div>
      {isClientMaturityLevel || isPending ? (
        <Loader />
      ) : (
        data?.data?.data?.map((item, index) => {
          return (
            <CoursePathwayPageItems
              key={index}
              data={item}
              lavelData={clientMaturityLevel?.data || []}
              handleSelected={(pillarId: number, maturityId: number) =>
                handleSelected(pillarId, maturityId)
              }
              selectedData={selectedData}
            />
          );
        })
      )}

      {isError && (
        <div className="w-full bg-[#F8D7DA] sm:p-4 p-3 flex rounded-md gap-3 xl:items-center items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <img src={CloseIcon} alt="close" />
            <span className="text-[#842029] text-base font-calibri">
              You can tag up to {selectTargetPillarLimit?.data?.pillarLimit}{" "}
              pillars per course. If your course targets additional pillars,
              please reach out to your Skillnet admin to request more tags.
            </span>
          </div>
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => setIsError(false)}
            className="p-0 h-auto hover:bg-transparent"
          >
            <CircleX className="text-right text-[#842029]" width={20} />
          </Button>
        </div>
      )}

      <div className="sm:text-right text-center">
        <Button
          type="button"
          onClick={handleSubmit}
          className=" text-base font-inter text-white bg-[#58BA66] sm:py-6 py-4 px-8"
          disabled={pillarMaturityLoading}
        >
          {pillarMaturityLoading ? (
            <Loader containerClassName="max-h-auto" />
          ) : (
            "Next"
          )}
        </Button>
      </div>
      <Loading isLoading={getSingleCourseFetching} />
    </div>
  );
};

export default CoursePathwayPage;
