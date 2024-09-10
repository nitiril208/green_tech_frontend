import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { certificateCourseList } from "@/services/apiServices/certificate";
import {
  createCourseTwoPage,
  fetchNfqlLevel,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { CourseData } from "@/types/course";
import { NfqlLevelResponse } from "@/types/nfql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod.object({
  // nfqLeval: zod.string().optional(),
  nfqLeval: zod
    .string({ required_error: "Please select NFQ level" })
    .min(1, "Please select NFQ level"),
  certificate: zod
    .string({ required_error: "Please select certificate" })
    .min(1, "Please select certificate"),
  ectsCredits: zod
    .string()
    .regex(/^([0-9].*|)$/, "The ECTS credit must contain only numbers")
    .optional(),
  fetCredits: zod
    .string()
    .regex(/^([0-9].*|)$/, "The FET credit must contain only numbers")
    .optional(),
});

interface CourseSpecificationsProps {
  courseById: number | null;
}

const CourseSpecifications = ({ courseById }: CourseSpecificationsProps) => {
  type ValidationSchema = zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const paramsType = new URLSearchParams(search).get("type");
  const navigate = useNavigate();
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];
  const [selectBoxValue, setSelectBoxValue] = useState({
    nfqLeval: "",
    certificate: "",
  });
  const queryClient = useQueryClient();

  console.log("🚀 ~ CourseSpecifications ~ selectBoxValue:", selectBoxValue);
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getcertificate],
    queryFn: () => certificateCourseList(),
  });

  const { data: nfql } = useQuery<NfqlLevelResponse>({
    queryKey: ["nfqllevel"],
    queryFn: () => fetchNfqlLevel(),
  });

  const { data: getSingleCourse, isFetching: getSingleCourseFetching } =
    useQuery({
      queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, courseById }],
      queryFn: () => fetchSingleCourseById(String(paramsversion)),
      enabled: !!paramsversion || !!courseById,
    });

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

  const certificateOption =
    data?.data?.length &&
    data?.data?.map((item: any) => {
      return {
        label: item,
        value: item?.toString(),
      };
    });

  console.log("data?.data", data?.data);

  const nfqlLevelOption =
    nfql?.data?.length &&
    nfql?.data?.map((item) => {
      return {
        value: item.id?.toString(),
        label: item.leval,
      };
    });

  useEffect(() => {
    console.log(
      "🚀 ~ useEffect ~ getSingleCourse?.data?.course:",
      getSingleCourse?.data?.course
    );
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key] || "");
      });
      setValue(
        "certificate",
        getSingleCourse?.data?.course?.certificate?.toString() || ""
      );
      setSelectBoxValue({
        nfqLeval: getSingleCourse?.data?.course?.nfqLeval?.id?.toString() || "",
        certificate:
          getSingleCourse?.data?.course?.certificate?.toString() || "",
      });
    }
  }, [getSingleCourse, setValue]);

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      setValue(
        "nfqLeval",
        getSingleCourse?.data?.course?.nfqLeval?.id?.toString()
      );
      setSelectBoxValue((prev) => ({
        ...prev,
        nfqLeval: getSingleCourse?.data?.course?.nfqLeval?.id?.toString() || "",
      }));
    }
  }, [getSingleCourse]);

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
        }?tab=0&step=2&version=${paramsversion}${
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
    const payload = {
      nfqLeval: data?.nfqLeval,
      ectsCredits: data?.ectsCredits,
      fetCredits: data?.fetCredits,
      certificate: data?.certificate,
      tab: "0",
      step: "2",
    };

    if (
      isDirty ||
      getSingleCourse?.data?.course?.nfqLeval?.id?.toString() !==
        data?.nfqLeval?.toString() ||
      getSingleCourse?.data?.course?.certificate?.toString() !==
        data?.certificate?.toString()
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
          paramsversion: "1" || "",
        });
      }
    } else {
      navigate(
        `/${pathName}/create_course/${
          getSingleCourse?.data?.course?.id
        }?tab=${0}&step=${2}&version=${getSingleCourse?.data?.id}${
          paramsType ? `&type=${paramsType}` : ""
        }`,
        {
          replace: true,
        }
      );
    }
  };

  return (
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Details & Specifications
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:mb-[18px] mb-[15px]">
            <Label className="font-primary font-[400] leading-normal font-calibri sm:text-base text-sm text-[#515151]">
              Specify the NFQ level for this course (if applicable).
            </Label>
            <SelectMenu
              {...register("nfqLeval")}
              option={nfqlLevelOption || []}
              setValue={(e: string) => {
                setSelectBoxValue({ ...selectBoxValue, nfqLeval: e });
                setValue("nfqLeval", e);
              }}
              value={selectBoxValue.nfqLeval}
              placeholder="Select NFQ level"
              className="border border-[#D9D9D9] rounded-md w-full  font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-[8px] sm:py-4 sm:px-[15px] p-[10px]"
            />
            {!errors?.nfqLeval?.ref?.value && (
              <ErrorMessage message={errors?.nfqLeval?.message as string} />
            )}
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="How many ECTS credits does this course offer? (Optional)"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Enter credits"
              className="border border-[#D9D9D9] rounded-md w-full  font-base font-calibri text-[#1D2026] mt-[9px] sm:py-4 sm:px-[15px] p-[10px]"
              {...register("ectsCredits")}
              error={errors.ectsCredits?.message as string}
            />
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="How many FET credits does this course offer? (Optional)"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Enter credits"
              className="border border-[#D9D9D9] rounded-md w-full  font-base font-calibri text-[#1D2026] mt-[9px] sm:py-4 sm:px-[15px] p-[10px]"
              {...register("fetCredits")}
              error={errors.fetCredits?.message as string}
            />
          </div>
          <div className="sm:mb-[20px] mb-[15px]">
            <Label className="font-primary font-[400] leading-normal font-calibri sm:text-base text-sm text-[#515151]">
              What type of certificate or award will the trainees receive upon
              course completion?
            </Label>
            <SelectMenu
              {...register("certificate")}
              option={certificateOption || []}
              setValue={(e: string) => {
                setSelectBoxValue({ ...selectBoxValue, certificate: e });
                setValue("certificate", e);
              }}
              value={selectBoxValue?.certificate}
              placeholder="Select certificate"
              className="border border-[#D9D9D9] rounded-md w-full px-4 py-3  font-base font-calibri text-[#1D2026] mt-[9px] sm:py-4 sm:px-[15px] p-[10px]"
            />
            {!errors?.certificate?.ref?.value && (
              <ErrorMessage message={errors?.certificate?.message as string} />
            )}
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

export default CourseSpecifications;
