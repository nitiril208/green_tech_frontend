import infoIcon from "@/assets/svgs/infoIcon.svg";
import liveSection from "@/assets/svgs/liveSection.svg";
import { Button } from "../ui/button";

import { QUERY_KEYS } from "@/lib/constants";
import { documentIcon, documentType } from "@/lib/utils";
import { updateEmployeeWiseCourseStatus } from "@/services/apiServices/courseSlider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, MoveLeft } from "lucide-react";
import { useState } from "react";
import LiveSession from "./LiveSession";
import ViewSession from "./ViewSession";

type moduleCourseCardListProps = {
  list: {
    image: string;
    moduleName: string;
    durationType: string;
    duration: string;
    date: string;
    time: string;
    status: string;
  };
};

const ModuleCourseViewCardItems = ({
  list,
  data,
  enrollData,
}: moduleCourseCardListProps | any) => {
  const queryclient = useQueryClient();
  const [viewDocument, setViewDocument] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [documentFile, setDocumentFile] = useState("");
  // const docs = [{ uri: documentFile, fileType: documentType(documentFile) }];

  const { mutate, isPending } = useMutation({
    mutationFn: updateEmployeeWiseCourseStatus,
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      await queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchEmployeeSingeCourse],
      });
      setViewDocument(true);
      setDocumentFile(list?.url ? list?.url : list?.uploadContent);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const handleStatusChanges = (status: number, id: number) => {
    const payload = {
      employeeid: userData?.query?.detailsid,
      status: status,
    };
    mutate({ data: payload, courseId: id });
  };

  const getTime = () => {
    const time = list?.readingTime;
    return (
      <>
        {time?.hour?.toString()?.padStart(2, "0")}:{" "}
        {time?.minute?.toString()?.padStart(2, "0")}:{" "}
        {time?.second?.toString()?.padStart(2, "0")}
      </>
    );
  };

  console.log("++++++++++++++++", data);
  console.log("list?.prevStatus", list?.isStatus);

  return !viewDocument ? (
    <div className="ml-6 border-b border-[#D9D9D9] px-0 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-3">
          <img
            src={
              list?.isLive === 1
                ? liveSection
                : list?.uploadContent === ""
                ? infoIcon
                : documentIcon(list?.uploadContent)
            }
            alt="documentIcon"
            className="max-w-[32px] w-auto h-auto"
          />
        </div>
        <div className="">
          <h5
            className={`${
              +userData?.query?.role === 4
                ? (list?.prevStatus || list?.isStatus) &&
                  list?.prevStatus !== "Completed"
                  ? "pointer-events-none"
                  : list?.isStatus === "Started"
                  ? "pointer-events-none"
                  : userData?.query?.role === "1"
                  ? "pointer-events-none"
                  : list?.url
                  ? "pointer-events-auto"
                  : list?.uploadContent === ""
                  ? "pointer-events-none"
                  : "pointer-events-auto"
                : "pointer-events-auto"
            } sm:text-base text-sm text-black font-nunito pb-2 cursor-pointer inline-block`}
            onClick={() => {
              if (list?.isLive !== 1) {
                setViewDocument(true);
                setDocumentFile(list?.url ? list?.url : list?.uploadContent);
              } else {
                setViewDocument(true);
                setDocumentFile(list?.url ? list?.url : list?.uploadContent);
              }
            }}
          >
            {list?.title}
          </h5>
          {/* <div className="pb-1">
            <h6 className="text-[#747474] text-xs font-nunito">
              {list.durationType} 
              {list.duration}
            </h6>
          </div> */}
          <div className="sm:flex block items-center">
            {list?.url && (
              <>
                <h6 className="text-[#747474] text-xs uppercase font-nunito sm:pe-3 pe-2 sm:me-3 me-2 border-e border-[#747474]">
                  {list?.isLive === 0
                    ? documentType(list?.url ? "url" : list?.uploadContent)
                    : "Live Section"}
                </h6>
              </>
            )}
            <h6 className="text-[#747474] text-xs font-nunito">
              Duration : {getTime()}
            </h6>
          </div>
          {/* <div className="sm:flex block items-center">
            <h6 className="text-[#747474] text-xs font-nunito sm:pe-3 pe-2 sm:me-3 me-2 border-e border-[#747474]">
              Date : {list.date}
            </h6>
            <h6 className="text-[#747474] text-xs font-nunito">
              Time : {list.time}
            </h6>
          </div> */}
        </div>
      </div>
      <div className="">
        {+list.isLive === 1 && list?.isStatus === "Started" && (
          <Button
            className="bg-[#00778B] xl:h-12 sm:h-9 h-8 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
            // onClick={() => navigate("/employee/live-session")}
            onClick={() => handleStatusChanges(1, list?.id)}
            isLoading={isPending}
            disabled={list?.prevStatus === "Completed" ? false : true}
          >
            Join
          </Button>
        )}
        {list?.isStatus === "Completed" && (
          <Button className="bg-transparent text-[#58BA66] sm:text-base text-sm font-nunito font-semibold flex items-center sm:px-2.5 px-0">
            <CircleCheck width={20} /> Completed
          </Button>
        )}
        {list?.isStatus === "Progress" && (
          <Button
            type="button"
            onClick={() => {
              setViewDocument(true);
              setDocumentFile(list?.url ? list?.url : list?.uploadContent);
            }}
            className="bg-[#FFD56A] text-black xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
          >
            In Progress
          </Button>
        )}
        {list?.isStatus === "Started" && +list?.isLive !== 1 && (
          <Button
            type="button"
            onClick={() => handleStatusChanges(1, list?.id)}
            isLoading={isPending}
            className="bg-[#00778B] xl:h-12 h-9 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm"
            disabled={list?.prevStatus === "Completed" ? false : true}
          >
            Start
          </Button>
        )}
      </div>
    </div>
  ) : (
    <div className="absolute top-0 left-0 w-full bg-white z-50">
      <div className="flex justify-end items-center text-[#64748b] px-4">
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => setViewDocument(false)}
          className="cursor-pointer hover:bg-transparent text-base font-semibold hover:text-[#64748b]"
        >
          <MoveLeft />
          Back
        </Button>
      </div>
      {list?.isLive === 1 ? (
        <LiveSession list={list} />
      ) : (
        <ViewSession
          documentFile={documentFile}
          setDocumentFile={setDocumentFile}
          setViewDocument={setViewDocument}
          list={list}
          data={data}
          enrollData={enrollData}
        />
      )}
    </div>
  );
};

export default ModuleCourseViewCardItems;
