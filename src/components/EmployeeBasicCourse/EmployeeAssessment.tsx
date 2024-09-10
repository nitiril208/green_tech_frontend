import { QUERY_KEYS } from "@/lib/constants";
import {
  createEvalute,
  fetchAssesmentQuestion,
  fetchAssesmentSingleQuestion,
  fetchAssessmentScore,
} from "@/services/apiServices/assessment";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FieldValues, useForm } from "react-hook-form";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { z } from "zod";
import FormError from "../comman/FormError";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useToast } from "../ui/use-toast";

const schema = z.object({
  assesdmentAnswer: z.array(
    z.object({
      answer: z.union([
        z
          .string({ required_error: "Please select an answer" })
          .min(1, "Please select an answer"), // For single choice questions
        z
          .array(z.string({ required_error: "Please select an answer" }))
          .nonempty("Please select an answer"), // For multiple choice questions
      ]),
    })
  ),
});

type ValidationSchema = z.infer<typeof schema>;
const EmployeeAssessment = () => {
  const { toast } = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const search = window.location.search;
  const moduleId = new URLSearchParams(search).get("moduleId");
  const [showAssessmentScore, setShowAssessmentScore] = useState(false);
  const location = useLocation();
  console.log("location", location);

  useEffect(() => {
    if (location.state?.isCompleted) {
      setShowAssessmentScore(true);
    }
  }, [location.state?.isCompleted]);

  const {
    data: getAssessmentQuestion,
    isPending: getAssessmentQuestionPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.getAssessmentQuestion, assessmentId],
    queryFn: () => fetchAssesmentQuestion(assessmentId as string),
    enabled: !!assessmentId,
  });

  const {
    data: getAssessmentSingleQuestion,
    isPending: getAssessmentSingleQuestionPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.getAssessmentSingleQuestion, assessmentId],
    queryFn: () => fetchAssesmentSingleQuestion(assessmentId as string),
    enabled: !!assessmentId,
  });

  const { data: assessmentScoreData, isPending: fetchAssessmentScorePending } =
    useQuery({
      queryKey: [QUERY_KEYS.getAssessmentScore, assessmentId],
      queryFn: () =>
        fetchAssessmentScore(
          assessmentId as string,
          userData?.query?.detailsid as string
        ),
      enabled: !!assessmentId,
    });

  const assessmentScore = {
    labels: ["YourPercentage"],
    datasets: [
      {
        label: "TotalPercentage",
        data: [
          assessmentScoreData?.data?.YourPercentage,
          100 - Number(assessmentScoreData?.data?.YourPercentage),
        ],
        backgroundColor: ["#64A70B", "#E8E8E8"],
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: {
        render: "percentage",
        display: false,
      },
      labels: {
        render: "percentage",
        fontColor: ["black", "white"],
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed * 100) + "%";
            return label;
          },
        },
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 25px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${Math.round(data.datasets[0].data[0])}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.restore();
    },
  };

  const { mutate: createEvaluteFun, isPending } = useMutation({
    mutationFn: createEvalute,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getAssessmentScore],
      });
      setShowAssessmentScore(true);
      toast({
        variant: "success",
        title: data?.data?.message,
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });

  const assessmentQuestion = getAssessmentQuestion?.data;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      assesdmentAnswer: assessmentQuestion?.map(() => ({
        answer: [] || "",
      })),
    },
  });

  const handleCheckboxChange = (index: number, option: string) => {
    const currentAnswers =
      (watch(`assesdmentAnswer.${index}.answer`) as string[]) || [];
    const newAnswers: any = currentAnswers?.includes(option)
      ? currentAnswers?.filter((ans) => ans !== option)
      : [...currentAnswers, option];

    setValue(`assesdmentAnswer.${index}.answer`, newAnswers);
  };

  const onSubmit = async (data: FieldValues) => {
    const payload = assessmentQuestion?.map((item, i) => {
      return {
        quesId: item?.id,
        emp: userData?.query?.detailsid,
        module: moduleId,
        answer: data?.assesdmentAnswer[i]?.answer,
      };
    });
    createEvaluteFun(payload);
  };

  console.log("error::", errors);

  return getAssessmentSingleQuestionPending || getAssessmentQuestionPending ? (
    <span className="flex items-center justify-center py-10">
      <Loader2 className="w-5 h-5 animate-spin" />
    </span>
  ) : (
    <div className="lg:bg-white bg-transparent rounded-xl border border-[#D9D9D9] overflow-hidden">
      <div className="text-right">
        <Button variant={"ghost"} onClick={() => navigate(-1)} className="p-3">
          <HiOutlineArrowNarrowLeft className="w-5 h-5" /> Back
        </Button>
      </div>
      <div className="flex items-center justify-between sm:p-[18px] p-[15px] bg-[#F3F3F3] border-b border-[#D9D9D9]">
        <div>
          <h4 className="text-[20px] font-[Calibri] text-[#000000] mb-[6px]">
            <span className="text-[20px] font-[Calibri] text-[#606060] mr-1">
              Section :
            </span>
            {getAssessmentSingleQuestion?.data?.module?.title}
          </h4>
          <h5 className="text-[16px] font-[Calibri] text-[#000000] mb-2">
            <span className="text-[16px] font-[Calibri] text-[#606060] mr-1">
              Assessment :{" "}
            </span>
            {getAssessmentSingleQuestion?.data?.title}
          </h5>
          <h5 className="text-[16px] font-[Calibri] text-[#606060]">
            {assessmentQuestion?.length || 0}
            <span className="mr-1 ml-1">Questions | Duration : </span>
            {getAssessmentSingleQuestion?.data?.timeDuration?.hours
              ?.toString()
              ?.padStart(2, "0")}{" "}
            :{" "}
            {getAssessmentSingleQuestion?.data?.timeDuration?.minutes
              ?.toString()
              ?.padStart(2, "0")}{" "}
            :{" "}
            {getAssessmentSingleQuestion?.data?.timeDuration?.seconds
              ?.toString()
              ?.padStart(2, "0")}{" "}
            Second{" "}
          </h5>
        </div>
      </div>
      {showAssessmentScore ? (
        fetchAssessmentScorePending ? (
          <span className="flex items-center justify-center py-10">
            <Loader2 className="w-5 h-5 animate-spin" />
          </span>
        ) : (
          <div className="flex items-center justify-center flex-col py-[75px]">
            <div className="w-[206px] h-[206px] relative mb-[33px]">
              <Doughnut
                data={assessmentScore}
                options={options}
                plugins={[textCenter]}
              />
            </div>
            <div className="mb-[38px]">
              <h2 className="font-semibold mb-[5px]">
                Your Score : {assessmentScoreData?.data?.YourPercentage}%{" "}
                <span className="text-[#64A70B]">
                  ({assessmentScoreData?.data?.isPassed})
                </span>
              </h2>
              <p className="font-bold text-xs flex gap-[10px]">
                <span className="text-[#64A70B]">
                  Correct Answer :{" "}
                  {assessmentScoreData?.data?.totalCorrect?.questions}
                </span>
                <span className="text-[#FF5252]">
                  Incorrect Answer :{" "}
                  {Number(assessmentScoreData?.data?.total?.questions) -
                    Number(assessmentScoreData?.data?.totalCorrect?.questions)}
                </span>
              </p>
            </div>
            <p
              className="text-[#4285F4] cursor-pointer"
              onClick={() =>
                navigate(
                  `/employee/employee-basic-course/${state?.versionId}?courseId=${state?.courseId}&tab=1`
                )
              }
            >
              Go Back
            </p>
          </div>
        )
      ) : (
        <div className="grid sm:px-8 sm:py-5 p-[20px] bg-white mb-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {assessmentQuestion?.map((data, index) => {
                console.log("data++++", data.option);

                return (
                  <Fragment key={index}>
                    {data?.assessmentType === "Single Choice Question" &&
                      data?.option?.filter((i: any) => i.option)?.length >
                        0 && (
                        <div className="mb-10">
                          <div className="gap-5 flex items-center justify-between mb-[8px]">
                            <p className="w-[calc(100%_-_102px)]">
                              {index + 1}
                              {". "}
                              {data?.question}
                            </p>
                            <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                              {data?.point} Point
                            </span>
                          </div>
                          <RadioGroup
                            // value={watch(`assesdmentAnswer.${index}.answer`)}
                            {...register(`assesdmentAnswer.${index}.answer`)}
                            disabled={+userData?.query?.role !== 4}
                            onValueChange={(value) =>
                              setValue(
                                `assesdmentAnswer.${index}.answer`,
                                value
                              )
                            }
                            // value={watch(`assesdmentAnswer.${index}.answer` || "")}
                          >
                            {data?.option?.map((option: any) => (
                              <div
                                key={option.option}
                                className="flex items-center space-x-2 mb-3"
                              >
                                <RadioGroupItem
                                  value={option.option}
                                  id={`option-${index}-${option.option}`}
                                  className="border-[#9B9B9B] w-5 h-5"
                                />
                                <Label
                                  htmlFor={`option-${index}-${option.option}`}
                                  className="text-sm font-sans"
                                >
                                  {option.option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          {errors.assesdmentAnswer?.[index]?.answer && (
                            <FormError
                              className="font-calibri not-italic"
                              message={
                                errors.assesdmentAnswer[index].answer.message
                              }
                            />
                          )}
                        </div>
                      )}

                    {data?.assessmentType === "Free Text Response" && (
                      <div className="mb-10">
                        <div className="gap-5 flex items-center justify-between mb-[8px]">
                          <p className="w-[calc(100%_-_102px)]">
                            {index + 1}
                            {". "}
                            {data?.question}
                          </p>
                          <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                            {data?.point} Point
                          </span>
                        </div>
                        <textarea
                          placeholder="Keywords1, Keywords2, keywords3"
                          className="py-4 px-3 w-full border border-[#D9D9D9] shadow-none outline-none focus:border-[#4b4b4b] placeholder:text-neutral-400  rounded-md resize-none"
                          rows={8}
                          disabled={+userData?.query?.role !== 4}
                          {...register(`assesdmentAnswer.${index}.answer`)}
                        />
                        {errors.assesdmentAnswer?.[index]?.answer && (
                          <FormError
                            className="font-calibri not-italic"
                            message={
                              errors.assesdmentAnswer[index].answer.message
                            }
                          />
                        )}
                      </div>
                    )}

                    {data?.assessmentType === "Single Choice Question" &&
                      data?.option.filter((i: any) => i.option)?.length ===
                        0 && (
                        <div className="mb-10">
                          <div className="gap-5 flex items-center justify-between mb-[8px]">
                            <p className="w-[calc(100%_-_102px)]">
                              {index + 1}
                              {". "}
                              {data?.question}
                            </p>
                            <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                              {data?.point} Point
                            </span>
                          </div>
                          <RadioGroup
                            {...register(`assesdmentAnswer.${index}.answer`)}
                            disabled={+userData?.query?.role !== 4}
                            onValueChange={(value) =>
                              setValue(
                                `assesdmentAnswer.${index}.answer`,
                                value
                              )
                            }
                          >
                            <div className="flex items-center space-x-2 mb-3">
                              <RadioGroupItem
                                value="yes"
                                id={`option-${index}-yes`}
                                className="border-[#9B9B9B] w-5 h-5"
                                {...register(
                                  `assesdmentAnswer.${index}.answer`
                                )}
                              />
                              <Label
                                htmlFor={`option-${index}-yes`}
                                className="text-sm font-sans"
                              >
                                True
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <RadioGroupItem
                                value="no"
                                id={`option-${index}-no`}
                                className="border-[#9B9B9B] w-5 h-5"
                                {...register(
                                  `assesdmentAnswer.${index}.answer`
                                )}
                              />
                              <Label
                                htmlFor={`option-${index}-no`}
                                className="text-sm font-sans"
                              >
                                False
                              </Label>
                            </div>
                          </RadioGroup>
                          {errors.assesdmentAnswer?.[index]?.answer && (
                            <FormError
                              className="font-calibri not-italic"
                              message={
                                errors.assesdmentAnswer[index].answer.message
                              }
                            />
                          )}
                        </div>
                      )}

                    {data?.assessmentType === "Multiple Choice Question" && (
                      <div className="mb-10">
                        <div className="gap-5 flex items-center justify-between mb-[8px]">
                          <p className="w-[calc(100%_-_102px)]">
                            {index + 1}
                            {". "}
                            {data?.question}
                          </p>
                          <span className="px-[14px] py-[7px] bg-[#EAEBEA] text-[#000000] rounded-full w-[82px]">
                            {data?.point} Point
                          </span>
                        </div>
                        {data?.option?.map((option: any, i: number) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 mb-3"
                          >
                            <Checkbox
                              id={`checkbox-${index}-${option.option}`}
                              checked={watch(
                                `assesdmentAnswer.${index}.answer`
                              )?.includes(option.option)}
                              disabled={+userData?.query?.role !== 4}
                              onCheckedChange={() =>
                                handleCheckboxChange(index, option.option)
                              }
                              className="border-[#9B9B9B] w-5 h-5"
                            />
                            <Label
                              htmlFor={`checkbox-${data?.id}-${i}`}
                              className="text-sm font-sans"
                              {...register(`assesdmentAnswer.${index}.answer`)}
                            >
                              {option.option}
                            </Label>
                          </div>
                        ))}
                        {errors.assesdmentAnswer?.[index]?.answer && (
                          <FormError
                            className="font-calibri not-italic"
                            message={
                              errors.assesdmentAnswer[index].answer.message
                            }
                          />
                        )}
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
            {+userData?.query?.role === 4 && (
              <div className="mt-5 text-end">
                <Button
                  type="submit"
                  className="py-[10px] px-[30px] bg-[#58BA66] text-color rounded-sm"
                  disabled={isPending}
                >
                  {isPending && <Loader2 className="w-5 h-5 animate-spin" />}{" "}
                  Submit Assessment
                </Button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeAssessment;
