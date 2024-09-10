import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createEvaluationScore } from "@/services/apiServices/enroll";
import { EvaluteDataEntity } from "@/types/enroll";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import EvaluateQuestionsDetailsItem from "./EvaluateQuestionsDetailsItem";
import { QUERY_KEYS } from "@/lib/constants";

type evaluteModalProps = {
  data: EvaluteDataEntity;
  index: number;
  courseId: number;
  employeeId: number;
};
const EvaluateModalDetailsItem = ({
  data,
  index,
  courseId,
  employeeId,
}: evaluteModalProps) => {
  const { toast } = useToast();
  const [addTotalPoints, setAddTotalPoints] = useState<string>("");
  const [moduleId, setModuleId] = useState<string | number>("");
  const [errors, setErrors] = useState<{ type: boolean; message: string }>({
    type: true,
    message: "",
  });
  const totalPoints = data?.evaluations?.reduce((sum: any, evaluation: any) => {
    return sum + evaluation?.question?.point;
  }, 0);
  const queryClient = useQueryClient();

  const handleAddPoints = (value: string) => {
    if (!value?.match(/^[0-9]*$/)) {
      setErrors({ type: true, message: "Please enter valid number" });
    } else if (value > totalPoints) {
      setErrors({
        type: true,
        message: `Points should not be greater than total ${totalPoints} points`,
      });
    } else if (value === "") {
      setErrors({ type: true, message: `please enter points` });
    } else {
      setAddTotalPoints(value);
      setErrors({ type: false, message: "" });
    }
  };
  // api/v1/evaluationScore/create
  const { mutate: createEvaluationScoreFun, isPending } = useMutation({
    mutationFn: createEvaluationScore,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      setModuleId("");
      setAddTotalPoints("");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchEvalute],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (mId: number) => {
    const payload = {
      data: [
        {
          moduleId: mId,
          courseId: courseId,
          total: totalPoints as string,
          score: addTotalPoints,
        },
      ],
      employeeId: employeeId,
    };
    createEvaluationScoreFun(payload);
  };

  return (
    data?.evaluations &&
    data?.evaluations?.length > 0 && (
      <div className="sm:p-5 p-4 border-b border-[#D9D9D9]">
        <div className="">
          <div className="flex items-center pb-3">
            <h5 className="sm:text-base text-sm font-calibri font-bold pe-5">
              Module :<span className="ml-1">{index + 1}</span>
            </h5>
            {/* <h5 className="sm:text-base text-sm font-calibri font-bold">
            Session :<span>{data.sessionId}</span>
          </h5> */}
          </div>
          {/* <h5 className="sm:text-base text-sm font-calibri font-bold pb-3">
          Assessment :<span>{data.assessmentId}</span>
        </h5> */}

          <div className="space-y-6">
            {data?.evaluations?.map((item, index: number) => {
              return (
                <EvaluateQuestionsDetailsItem
                  key={index}
                  item={item || null}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-5 flex sm:flex-row flex-col items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="w-[62px] h-[58px] border border-solid rounded-sm border-[#D9D9D9] text-[#1D2026] font-calibri sm:text-4xl text-[26px]">
              {/* {data.page1} */}
              <input
                type="text"
                className="w-full h-full px-3 py-2 rounded-sm focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                disabled={data?.score ? true : false}
                defaultValue={data?.score}
                onChange={(e) => handleAddPoints(e?.target?.value)}
              />
            </p>
            <span className="text-[#1D2026] font-bold font-calibri sm:text-4xl text-[26px] cursor-pointer">
              /{totalPoints}
            </span>
          </div>
          <div className="">
            <Button
              className=" sm:text-base text-sm font-calibri text-white bg-[#58BA66] py-6 px-8 sm:h-[52px] h-10 sm:w-[137px] w-[154px]"
              disabled={!!errors?.message || isPending || !!data?.score}
              onClick={() => {
                onSubmit(data?.id);
                setModuleId(data?.id);
              }}
            >
              {isPending && data?.id === moduleId && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}{" "}
              Submit
            </Button>
          </div>
        </div>
        {errors?.type && <p className="text-red-500">{errors?.message}</p>}
      </div>
    )
  );
};

export default EvaluateModalDetailsItem;
