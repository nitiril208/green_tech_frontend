import { ConfirmModal } from "@/components/comman/ConfirmModal";
import Loading from "@/components/comman/Error/Loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileType, QUERY_KEYS } from "@/lib/constants";
import { getFileType } from "@/lib/utils";
import { deleteAssesment } from "@/services/apiServices/assessment";
import {
  deleteLiveSection,
  deleteSection,
} from "@/services/apiServices/moduleCreation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilePenLine, Info, Trash2 } from "lucide-react";
import { useState } from "react";

const CourseViewCardInnerList = ({
  data,
  handelEditSection,
}: {
  data: any;
  handelEditSection: (data: any) => void;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDelete, setIsDelete] = useState(false);
  const [isId, setIsId] = useState<{ id: string | number; type: string }>({
    id: "",
    type: "",
  });
  function formatReadingTime(readingTime: any) {
    if (!readingTime) {
      return "0sec";
    }
    const { hour, minute, second, hours, minutes, seconds } = readingTime;
    let formattedTime = "";

    if (hour || hours) {
      formattedTime += `${hour || hours}h `;
    }
    if (minute || minutes) {
      formattedTime += `${minute || minutes}min `;
    }
    if (second || seconds) {
      formattedTime += `${second || seconds}sec`;
    }

    if (!formattedTime) {
      formattedTime = "0sec";
    }

    return formattedTime.trim();
  }
  const FileTypeData =
    data.isLive === 0
      ? data?.passingPercentage
        ? FileType.AssessmentTest
        : getFileType(data.documentType)
      : FileType.Live;

  const { mutate: DeleteSection, isPending } = useMutation({
    mutationFn: (sectionId: number) => deleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      toast({
        variant: "success",
        title: "Section deleted successfully",
      });
      setIsDelete(false);
    },
  });

  const { mutate: DeleteLiveSection, isPending: isDeleteLiveSection } =
    useMutation({
      mutationFn: (sectionId: number) => deleteLiveSection(sectionId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourseModule],
        });
        toast({
          variant: "success",
          title: "Section deleted successfully",
        });
        setIsDelete(false);
      },
    });
  const { mutate: deleteAssesments, isPending: isDeleteAssesment } =
    useMutation({
      mutationFn: deleteAssesment,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourseModule],
        });
        toast({
          variant: "success",
          title: "Section deleted successfully",
        });
      },
    });

  const handleDeleteSection = (sectionID: number) => {
    if (isId?.type === "assesment") {
      deleteAssesments(sectionID);
    } else if (data.isLive === 0) {
      DeleteSection(sectionID);
    } else {
      DeleteLiveSection(sectionID);
    }
  };
  console.log("datadata", data);

  return (
    <div className="border-b border-[#D9D9D9] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-3">
          {FileTypeData ? (
            <img
              src={FileTypeData && FileTypeData?.listIcon}
              alt="document icon"
            />
          ) : (
            <Info className="w-[30px] h-[30px] text-[#696969]" />
          )}
        </div>
        <div className="">
          <h5 className="text-sm text-black font-inter pb-2">
            {data.isLive == 1 || !data?.isLive ? data.title : data.liveSecTitle}
          </h5>
          <div className="">
            <h6 className="text-[#747474] text-xs font-inter">
              {data?.type ? (
                <>
                  Duration:{" "}
                  <span className="text-black">
                    {data?.isLive == 1
                      ? formatReadingTime(data?.readingTime)
                      : formatReadingTime(data?.timeDuration)}
                  </span>{" "}
                  <span className="ml-2">
                    Passing Percentage:{" "}
                    <span className="text-[#000] font-semibold">
                      {data.passingPercentage}%
                    </span>
                  </span>
                </>
              ) : (
                <>
                  {data?.timeDuration
                    ? ""
                    : FileTypeData?.name && FileTypeData?.name + " |"}{" "}
                  Duration:{" "}
                  <span className="text-black">
                    {data.readingTime
                      ? formatReadingTime(data.readingTime)
                      : data?.timeDuration
                      ? formatReadingTime(data?.timeDuration)
                      : formatReadingTime(data.sectionTime)}
                  </span>
                </>
              )}
            </h6>
          </div>
        </div>
      </div>
      <div
        className="flex gap-3 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => handelEditSection(data)}
        >
          <FilePenLine width={18} className="text-[#575757] cursor-pointer" />
        </Button>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => {
            setIsDelete(true);
            setIsId({
              id: data?.id,
              type: data?.readingTime ? "" : "assesment",
            });
          }}
        >
          <Trash2 width={18} className="text-[#575757] cursor-pointer" />
        </Button>
      </div>
      <ConfirmModal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={() => handleDeleteSection(+isId?.id)}
        value={data?.title || ""}
        isLoading={isPending || isDeleteLiveSection || isDeleteAssesment}
      />
      <Loading isLoading={isDeleteAssesment || isPending} />
    </div>
  );
};

export default CourseViewCardInnerList;
