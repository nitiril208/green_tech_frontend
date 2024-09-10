import Loading from "@/components/comman/Error/Loading";
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
// import { urlRegex } from "@/lib/constants";
import { fetchClientById } from "@/services/apiServices/client";
import {
  createCourse,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { ResponseError } from "@/types/Errors";
import { ClientResponse } from "@/types/client";
import { CourseData } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod
  .object({
    title: zod
      .string()
      .min(1, "Please enter title")
      .max(250, "You can not write title more than 250 characters"),
    institute: zod
      .string()
      .min(1, "Please enter institute name")
      .max(250, "You can not write institute more than 250 characters"),
    instituteWebsite: zod
      .string()
      .regex(
        /^(\s*|https?:\/\/[^\s/$.?#].[^\s]*)$/,
        "Please enter a valid website URL starting with http:// or https://"
      )
      .optional(),
    freeCourse: zod.boolean().optional(),
    instituteWebsite2: zod
      .string()
      .regex(
        /^(\s*|https?:\/\/[^\s/$.?#].[^\s]*)$/,
        "Please enter a valid website URL starting with http:// or https://"
      )
      .optional(),
    price: zod
      .string({
        errorMap: () => ({ message: "Please enter valid course price" }),
      })
      .refine(
        (val: string | any) => val === undefined || val === "" || !isNaN(val),
        "Please enter valid course price"
      ),
    discountApplicable: zod.number().optional(),
    discountProvider: zod
      .string({ required_error: "Please select discount provider" })
      .min(1, "Please select a discount provider")
      .optional(),
  })
  .refine(
    (data) => {
      const { freeCourse, price } = data;
      if (freeCourse === false && (price === undefined || price === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Course price is required",
      path: ["price", "freeCourse"],
    }
  )
  .superRefine((data, ctx) => {
    console.log("data.discountApplicable", data.discountApplicable);

    if (data.freeCourse && data.discountApplicable === undefined) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Please select a discount provider",
        path: ["discountProvider"],
      });
    }
    console.log("data.freeCourse", !data.freeCourse);

    if (!data.freeCourse) {
      if (data.price === undefined || data.price === "") {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "Course price is required",
          path: ["price"],
        });
      }
    }
  });

type FormData = zod.infer<typeof schema>;
interface CourseInformationProps {
  courseById: number | null;
  setCourseById: (e: number) => void;
}

const CourseInformation = ({
  courseById,
  setCourseById,
}: CourseInformationProps) => {
  console.log("courseById", courseById);
  const [isFreeCourse, setIsFreeCourse] = React.useState(false);
  const [provideDisc, setProvideDisc] = React.useState(false);
  const [discount, setDiscount] = React.useState("");
  const [discountProvider, setDiscountProvider] = React.useState("");

  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    clearErrors,
    setError,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      freeCourse: false,
    },
  });
  console.log("errors", errors);

  const search = window.location.search;
  const paramsId = new URLSearchParams(search).get("id");
  const paramsVersion = new URLSearchParams(search).get("version");
  const paramsType = new URLSearchParams(search).get("type");
  const coursePrise = watch("price") || "0";
  const pathName: string = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];
  const { data } = useQuery<ClientResponse>({
    queryKey: ["price", { clientId }],
    queryFn: () => fetchClientById(clientId),
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      setCourseById(data?.data?.data?.id);
      navigate(
        `/${pathName}/create_course?tab=${data?.data?.data?.course?.tab}&step=${data?.data?.data?.course?.step}&id=${data?.data?.data?.course?.id}&version=${data?.data?.data?.id}`,
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
    if (isFreeCourse) {
      setValue("price", "");
      setDiscount("");
      setProvideDisc(false);
    }
  }, [isFreeCourse]);

  useEffect(() => {
    if (isFreeCourse) {
      setValue("discountApplicable", data?.data?.id);
    }
  }, [isFreeCourse, data]);

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
      const updatedData = data?.data?.data;
      navigate(
        `/${pathName}/create_course/${
          +courseId ? courseId : updatedData?.id
        }?tab=0&step=1&version=${updatedData?.currentVersion?.id}${
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

  const { data: getSingleCourse, isFetching: getSingleCourseFetching } =
    useQuery({
      queryKey: [QUERY_KEYS.getSingleCourse, { paramsVersion, paramsId }],
      queryFn: () => fetchSingleCourseById(String(paramsVersion)),
      enabled: !!paramsVersion,
    });

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key]);
        setValue("freeCourse", data.freeCourse === 1 ? true : false);
        setValue("price", String(data?.price));
      });
      setDiscount(data?.discountApplicable);
      setIsFreeCourse(data.freeCourse === 1 ? true : false);
      setProvideDisc(data.discout === 1 ? true : false);
      setDiscountProvider(data?.providerName?.id);
    } else {
      setDiscountProvider(data?.data?.id?.toString() || "");
      setValue("discountProvider", data?.data?.id?.toString() || "");
    }
  }, [getSingleCourse, setValue, data?.data]);

  const onSubmit = (formdata: FieldValues) => {
    if (provideDisc && discount === "") {
      toast({
        title: "Error",
        description: "Please enter discount price",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      title: formdata?.title,
      institute: formdata?.institute,
      instituteWebsite: formdata?.instituteWebsite,
      instituteWebsite2: formdata?.instituteWebsite2,
      freeCourse: isFreeCourse ? "1" : "0",
      price: formdata?.price ? formdata?.price?.toString() : "0",
      discountApplicable: discount ? discount?.toString() : "0",
      discout: provideDisc ? "1" : "0",
      providerName: isFreeCourse ? null : +discountProvider || 0,
      clientId: data?.data?.id || 0,
      userId: userID,
      tab: "0",
      step: "1",
    };

    if (
      isDirty ||
      provideDisc !==
        (getSingleCourse?.data?.course?.discout === 1 ? true : false) ||
      isFreeCourse !==
        (getSingleCourse?.data?.course?.freeCourse === 1 ? true : false) ||
      getSingleCourse?.data?.course?.price?.toString() !==
        formdata?.price?.toString() ||
      getSingleCourse?.data?.course?.discountApplicable?.toString() !==
        discount?.toString()
    ) {
      if (+courseId || getSingleCourse?.data?.course?.id) {
        updateCourseFun({
          payload,
          id: getSingleCourse?.data?.course?.id,
          version: getSingleCourse?.data?.version,
        });
      } else {
        mutate(payload);
      }
    } else {
      navigate(
        `/${pathName}/create_course/${
          getSingleCourse?.data?.course?.id
        }?tab=${0}&step=${1}&version=${getSingleCourse?.data?.id}${
          paramsType ? `&type=${paramsType}` : ""
        }`,
        {
          replace: true,
        }
      );
    }
  };

  useEffect(() => {
    if (isFreeCourse) {
      clearErrors("price");
    }
  }, [isFreeCourse, clearErrors]);

  return (
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Information
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="What is the title of the course you're offering?"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Enter course name or title"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("title")}
              error={errors.title?.message as string}
            />
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="Please enter the name of the institute providing this course."
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Enter institute name (Training provider name should be auto populated)"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("institute")}
              error={errors.institute?.message as string}
            />
          </div>
          <div className="sm:mb-[18px] mb-[15px]">
            <InputWithLabel
              label="Provide a direct link to the course details on your institute's website. (Optional)"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Enter URL"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("instituteWebsite")}
              error={errors.instituteWebsite?.message as string}
            />
          </div>
          <div className="sm:mb-[13px] mb-[15px]">
            <InputWithLabel
              label="Do you have any additional links for course materials or resources? (Optional)"
              labelClassName="font-calibri sm:text-base text-sm text-[#515151]"
              placeholder="Enter URL"
              className="border border-[#D9D9D9] rounded-md w-full sm:px-4 sm:py-3 p-[10px] outline-none font-base font-calibri text-[#1D2026] sm:mt-[9px] mt-2"
              {...register("instituteWebsite2")}
              error={errors.instituteWebsite2?.message as string}
            />
          </div>
          <div className="md:flex block items-center gap-10 sm:pb-6 pb-[15px]">
            <div className="flex md:flex-col flex-row md:gap-[50px] gap-[10px] md:pb-0 pb-[21px]">
              <div className="flex items-center">
                <span className="pe-3 font-calibri md:text-base sm:text-sm text-xs text-black">
                  Free Course?
                </span>
                <Switch
                  checked={isFreeCourse}
                  onCheckedChange={() => {
                    setIsFreeCourse(!isFreeCourse);
                    setValue("freeCourse", !isFreeCourse);
                  }}
                  className="w-8 h-5"
                  switchClassName="w-4 h-4 data-[state=checked]:translate-x-3"
                />
              </div>
              <div className="flex items-center">
                <span className="pe-3 font-calibri md:text-base sm:text-sm text-xs text-black">
                  Discount provided?
                </span>
                <Switch
                  disabled={isFreeCourse}
                  checked={provideDisc}
                  onCheckedChange={() => setProvideDisc(!provideDisc)}
                  className="w-8 h-5"
                  switchClassName="w-4 h-4 data-[state=checked]:translate-x-3"
                />
              </div>
            </div>

            <div className="flex flex-col md:gap-[25px] gap-[15px]">
              <div className="flex items-center">
                <span className="pe-3 font-calibri sm:text-base text-sm text-[#515151] xl:w-[130px]">
                  Course Price
                </span>
                <InputWithLabel
                  placeholder="Enter price (€)"
                  className="sm:w-[190px] w-[170px] pl-6 pr-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
                  disabled={isFreeCourse}
                  // {...register("price")}
                  onChange={(e: any) => {
                    const { value } = e.target;

                    if (value.match(/^[0-9]*$/)) {
                      setValue("price", value);
                      // @ts-ignore
                      setError("price", "");
                    } else {
                      return;
                    }
                  }}
                  value={watch("price") || ""}
                  error={
                    !errors?.price?.ref?.value
                      ? (errors?.price?.message as string)
                      : ""
                  }
                  alterText={"€"}
                />
              </div>
              <div className="flex items-center">
                <span className="pe-3 font-calibri sm:text-base text-sm text-[#515151] xl:w-[130px]">
                  Discounted Price
                </span>
                <InputWithLabel
                  placeholder="Enter price (€)"
                  className="sm:w-[190px] w-[150px] pl-6 pr-4 py-3 border border-[#D9D9D9] rounded-md outline-none"
                  disabled={!provideDisc || isFreeCourse}
                  value={discount}
                  onChange={(e: any) => {
                    const { value } = e.target;

                    if (value === "" || value.match(/^[1-9][0-9]*$/)) {
                      setDiscount(value);
                    } else {
                      return;
                    }
                  }}
                  error={
                    +discount > +coursePrise
                      ? "Discount is greater than course price"
                      : ""
                  }
                  alterText={"€"}
                />
              </div>
            </div>
          </div>

          {!watch("freeCourse") && (
            <div className="md:pb-8 sm:pb-6 pb-[15px]">
              <h6 className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-[400] md:text-[14px] font-calibri sm:text-base text-sm text-[#515151]">
                Discount provided by
              </h6>
              <Select
                value={discountProvider}
                onValueChange={(e) => {
                  setDiscountProvider(e);
                  setValue("discountProvider", e);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Skillnet" />
                </SelectTrigger>
                <SelectContent>
                  {data?.data && (
                    <SelectItem value={data?.data?.id?.toString() || ""}>
                      {data?.data?.name}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <span className="font-primary font-calibri text-sm text-red-400 undefined">
                {errors?.discountProvider?.message}
              </span>
            </div>
          )}

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

export default CourseInformation;
