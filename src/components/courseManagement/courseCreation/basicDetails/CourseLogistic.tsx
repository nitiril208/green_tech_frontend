import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  createCourseTwoPage,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { CourseData } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const Time = [
  {
    label: "Full time",
    value: "0",
  },
  {
    label: "Part time",
    value: "1",
  },
];

const isOnlineType = [
  {
    label: "Online",
    value: "0",
  },
  {
    label: "Self-paced Online",
    value: "1",
  },
  {
    label: "In-Person",
    value: "2",
  },
  {
    label: "Hybrid",
    value: "3",
  },
  // {
  //   label: "Major",
  //   value: "4",
  // },
  // {
  //   label: "Self-paced Online",
  //   value: "5",
  // },
];

const durationType = [
  {
    label: "Days",
    value: "Days",
  },
  {
    label: "Weeks",
    value: "Weeks",
  },
  {
    label: "Months",
    value: "Months",
  },
  {
    label: "Year",
    value: "Year",
  },
];

const schema = zod
  .object({
    time: zod
      .string({ required_error: "Please select time" })
      .min(1, "Please select  time"),
    isOnline: zod
      .string({ required_error: "Please select type" })
      .min(1, "Please select type"),
    universityAddress: zod.string(),
    duration: zod
      .string()
      .min(1, "Please enter duration")
      .regex(/^[0-9]/, "The duration must contain only numbers")
      .refine((val) => {
        return !isNaN(parseFloat(val)) && parseFloat(val) > 0;
      }, "Duration should be greater than 0"),
    durationType: zod.string().min(2, "Please select duration type"),
  })
  .superRefine((data, ctx) => {
    if (data.isOnline === "2" && !data.universityAddress) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Please enter university location",
        path: ["universityAddress"],
      });
    }
  });

interface CourseLogisticProps {
  courseById: number | null;
}

const CourseLogistic = ({ courseById }: CourseLogisticProps) => {
  type ValidationSchema = zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      time: "",
      isOnline: "",
      universityAddress: "",
      duration: "",
      durationType: "",
    },
  });
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const paramsType = new URLSearchParams(search).get("type");
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];
  const [selectBoxValue, setSelectBoxValue] = useState<any>({
    time: "",
    isOnline: "",
    durationType: "",
  });
  const {
    data: getSingleCourse,
    isFetching: getSingleCourseFetching,
    isRefetching,
  } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, courseById }],
    queryFn: () => fetchSingleCourseById(String(paramsversion)),
    enabled: !!paramsversion,
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCourseTwoPage,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      navigate(
        `/${pathName}/create_course?tab=${data?.data?.data?.tab}&step=${data?.data?.data?.step}&id=${params}&version=${paramsversion}`,
        {
          replace: true,
        }
      );
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error.data?.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (
      getSingleCourse &&
      getSingleCourse?.data?.course &&
      // @ts-ignore
      +getSingleCourse?.data?.course?.step !== 2 &&
      !isRefetching
    ) {
      const data: CourseData | any = getSingleCourse?.data?.course;

      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key] || "");
        setValue("time", getSingleCourse?.data?.course?.time?.toString());
        setValue(
          "isOnline",
          getSingleCourse?.data?.course?.isOnline?.toString()
        );
        setSelectBoxValue((prev: any) => ({
          ...prev,
          durationType: data?.duration?.split(" ")?.[1]?.toString(),
          time: getSingleCourse?.data?.course?.time?.toString(),
          isOnline: getSingleCourse?.data?.course?.isOnline?.toString(),
        }));
        setValue("durationType", data?.duration?.split(" ")?.[1]?.toString());
      });
    } else {
      setValue("time", "");
      setValue("isOnline", "");
      setSelectBoxValue((prev: any) => ({
        ...prev,
        time: "",
        isOnline: "",
        durationType: "",
      }));
    }
  }, [getSingleCourse, setValue, isRefetching]);

  const { mutate: updateCourseFun, isPending: isUpdatePending } = useMutation({
    mutationFn: (e: any) => updateCourse(e),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      navigate(
        `/${pathName}/create_course/${
          +courseId ? courseId : params
        }?tab=0&step=3&version=${paramsversion}${
          paramsType ? `&type=${paramsType}` : ""
        }`,
        {
          replace: true,
        }
      );
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error.data?.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    const durationTime =
      data?.duration.split(" ")?.[0] + " " + data?.durationType;
    const payload = {
      time: +data?.time,
      isOnline: +data?.isOnline,
      universityAddress: data?.universityAddress,
      duration: durationTime,
      tab: "0",
      step: "3",
    };

    if (
      isDirty ||
      getSingleCourse?.data?.course?.time !== +data?.time ||
      getSingleCourse?.data?.course?.isOnline !== +data?.isOnline ||
      getSingleCourse?.data?.course?.duration !== durationTime
    ) {
      if (+courseId) {
        updateCourseFun({
          payload,
          id: getSingleCourse?.data?.course?.id,
          version: getSingleCourse?.data?.version,
        });
      } else {
        mutate({
          data: payload,
          id: params || "",
          paramsversion: getSingleCourse?.data?.version?.toString() || "",
        });
      }
    } else {
      navigate(
        `/${pathName}/create_course/${
          getSingleCourse?.data?.course?.id
        }?tab=${0}&step=${3}&version=${getSingleCourse?.data?.id}${
          paramsType ? `&type=${paramsType}` : ""
        }`,
        {
          replace: true,
        }
      );
    }
  };

  console.log("selectBoxValue+++", selectBoxValue);

  return (
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Logistics
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              Is this course offered on a full-time or part-time basis?
            </h6>
            <div className="sm:mb-[18px] mb-[15px]">
              <SelectMenu
                // {...register("time")}
                option={Time}
                setValue={(data: string) => {
                  setSelectBoxValue((prev: any) => ({ ...prev, time: data }));
                  setValue("time", data);
                  // @ts-ignore
                  setError("time", "");
                }}
                value={selectBoxValue?.time || ""}
                placeholder="Select course offering mode"
                className="bg-[#FFF] text-foreground font-calibri font-normal text-base sm:py-4 sm:px-[15px] p-[10px] h-auto"
              />
              {!errors?.time?.ref?.value && (
                <ErrorMessage message={errors?.time?.message as string} />
              )}
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              How is this course delivered? (e.g., Online, In-person, Hybrid)
            </h6>
            <div className="sm:mb-[18px] mb-[15px]">
              <SelectMenu
                // {...register("isOnline")}
                option={isOnlineType}
                setValue={(data: string) => {
                  setSelectBoxValue((prev: any) => ({
                    ...prev,
                    isOnline: data,
                  }));
                  setValue("isOnline", data);
                  // @ts-ignore
                  setError("isOnline", "");
                }}
                value={selectBoxValue?.isOnline || ""}
                placeholder="Select delivery mode"
                className="bg-[#FFF] text-foreground font-calibri font-normal text-base sm:py-4 sm:px-[15px] p-[10px] h-auto"
              />
              {!errors?.isOnline?.ref?.value && (
                <ErrorMessage message={errors?.isOnline?.message as string} />
              )}
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              Where is this course physically located? (if applicable)
            </h6>
            <div className="sm:mb-[18px] mb-[15px] w-full">
              <InputWithLabel
                type="text"
                placeholder="Enter address (if the course is physically delivered)"
                className="sm:py-4 sm:px-[15px] p-[10px] !text-[#000] placeholder:text-black rounded-md text-base font-calibri"
                {...register("universityAddress")}
                value={watch("universityAddress")}
                error={errors.universityAddress?.message as string}
              />
            </div>
          </div>
          <div className="">
            <h6 className="text-base text-[#515151] font-calibri sm:pb-3 pb-2">
              What is the duration of the course? ( in days, weeks, months or
              years )
            </h6>
            <div className="flex sm:mb-5 mb-[15px] gap-5">
              <div>
                <InputWithLabel
                  type="text"
                  placeholder={`Enter number / Select duration`}
                  className="border-[#D9D9D9] placeholder:text-black border rounded-md font-calibri sm:text-base text-sm sm:px-3 sm:py-[14px] py-2.5"
                  {...register("duration")}
                  value={watch("duration")?.split(" ")[0]}
                  error={errors.duration?.message as string}
                />
              </div>
              <div className="">
                <SelectMenu
                  option={durationType}
                  setValue={(data: string) => {
                    setSelectBoxValue((prev: any) => ({
                      ...prev,
                      durationType: data,
                    }));
                    setValue("durationType", data);
                    // @ts-ignore
                    setError("durationType", "");
                  }}
                  value={selectBoxValue?.durationType || ""}
                  className="sm:w-[150px] w-[110px] border font-calibri border-[#D9D9D9] rounded-md sm:py-[16px] py-2.5 h-auto"
                  itemClassName="text-[#1D2026] font-calibri"
                  placeholder="Select duration type"
                />
                {!errors?.durationType?.ref?.value && (
                  <ErrorMessage
                    message={errors?.durationType?.message as string}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="sm:text-right text-center">
            <Button
              type="submit"
              className=" text-base font-inter text-white bg-[#58BA66] sm:w-[120px] sm:h-[52px] w-[100px] h-[36px]"
              disabled={isPending || isUpdatePending}
            >
              {isPending || isUpdatePending ? (
                <Loader containerClassName="max-h-auto" />
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </form>
        <Loading isLoading={getSingleCourseFetching} />
      </div>
    </>
  );
};

export default CourseLogistic;
