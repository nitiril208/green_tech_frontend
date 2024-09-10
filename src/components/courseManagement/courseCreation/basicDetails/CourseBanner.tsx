import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import CKEditorComponent from "@/components/comman/JoditEditor";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  createCourseTwoPage,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
import { uploadImage } from "@/services/apiServices/upload";
import { ResponseError } from "@/types/Errors";
import { CourseData } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

interface CourseBannerProps {
  courseById: number | null;
}

const CourseBanner = ({ courseById }: CourseBannerProps) => {
  const [editorData, setEditorData] = React.useState("");
  const [keyData, setKeyData] = React.useState("");
  const [image, setImage] = React.useState("");
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");
  const paramsType = new URLSearchParams(search).get("type");
  const pathName = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];
  const [selectBoxValue, setSelectBoxValue] = useState<any>({
    description: "",
    bannerImage: "",
    keys: "",
  });
  const queryClient = useQueryClient();

  const schema = zod.object({
    description: zod
      .string()
      .min(1, "Information is required")
      .max(1000, "You can not write description more than 1000 characters")
      .nonempty("Description is required"),
    bannerImage: zod
      .string({ required_error: "Banner Image is required" })
      .min(1, "Banner image is required"),
    keys: zod
      .string({ required_error: "Key outcomes is required" })
      .min(1, "Key outcomes is required")
      .max(1000, "You can not write description more than 1000 characters"),
  });
  type FormData = zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      description: "",
      bannerImage: "",
      keys: "",
    },
  });

  const { data: getSingleCourse, isFetching: getSingleCourseFetching } =
    useQuery({
      queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, courseById }],
      queryFn: () => fetchSingleCourseById(String(paramsversion)),
      enabled: !!paramsversion,
    });

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key] || "");
        setEditorData(data?.description || "");
        setKeyData(data?.keys || "");
        setImage(data?.bannerImage);
      });
      setSelectBoxValue({
        description: data?.description || "",
        bannerImage: data?.bannerImage || "",
        keys: data?.keys || "",
      });
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
        }?tab=1&version=${paramsversion}${
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

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.data?.data?.image);
      setValue("bannerImage", data?.data?.data?.image);
      setSelectBoxValue({
        ...selectBoxValue,
        bannerImage: data?.data?.data?.image,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: create, isPending } = useMutation({
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
        `/${pathName}/create_course?tab=${data?.data?.data?.tab}&id=${params}&version=${paramsversion}`
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg"].includes(file.type)) {
      toast({
        title: "File must be in JPG or JPEG format.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 500 * 1024) {
      // 500KB
      toast({
        title: "File size must be less than 500KB.",
        variant: "destructive",
      });
      return;
    }
    createImageBitmap(file).then((imageBitmap) => {
      const { width, height } = imageBitmap;
      console.log("width, height ,", width, height);
      if (width >= 1024 || height >= 768) {
        toast({
          variant: "destructive",
          title: `Image dimensions must be 1024x768 pixels`,
        });
      } else {
        const formData = new FormData();
        formData.append("image", file);
        mutate(formData);
      }
    });
  };

  const onSubmit = () => {
    const payload = {
      description: editorData,
      bannerImage: image,
      keys: keyData,
      tab: "1",
      step: "5",
    };

    if (
      isDirty ||
      String(getSingleCourse?.data?.course?.description) !== editorData ||
      getSingleCourse?.data?.course?.bannerImage !== image ||
      String(getSingleCourse?.data?.course?.keys) !== keyData
    ) {
      if (+courseId) {
        updateCourseFun({
          payload,
          id: getSingleCourse?.data?.course?.id,
          version: getSingleCourse?.data?.version,
        });
      } else {
        create({
          data: payload,
          id: params || "",
          paramsversion: "1" || "",
        });
      }
    } else {
      navigate(
        `/${pathName}/create_course/${
          getSingleCourse?.data?.course?.id
        }?tab=${1}&version=${getSingleCourse?.data?.id}${
          paramsType ? `&type=${paramsType}` : ""
        }`,
        {
          replace: true,
        }
      );
    }
  };
  console.log("editorData", editorData);

  return (
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Banner
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:pb-5 pb-[15px]">
              <h6 className="text-[#515151] font-calibri text-base pb-3">
                Information
              </h6>
              <CKEditorComponent
                value={editorData}
                onChange={(e, data) => {
                  setSelectBoxValue({ ...selectBoxValue, description: e });
                  setEditorData(data.getData());
                  setValue("description", data.getData());
                }}
                className="bannerTextEditor h-[186px] w-full"
              />
              {/* {!errors?.description?.ref?.value && <ErrorMessage message={errors?.description?.message as string} />} */}
              {errors?.description && (
                <ErrorMessage
                  message={errors?.description?.message as string}
                />
              )}
            </div>
            <div className="sm:pb-5 pb-[15px]">
              <h6 className="text-[#515151] font-calibri text-base pb-3">
                Banner Image
              </h6>
              <div className="border flex items-center border-[#D9D9D9] sm:p-4 p-[10px] rounded-md">
                <div className="">
                  <div className="md:w-[270px] md:h-[190px] sm:w-[200px] sm:h-[150px] w-[100px] h-[100px] rounded-md bg-[#F3F3F3] flex justify-center items-center cursor-pointer aspect-video bg-[color:var(--base5-56)] relative overflow-hidden">
                    {isUploading ? (
                      <Loader />
                    ) : image ? (
                      <img
                        src={image}
                        alt="banner"
                        className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%];"
                      />
                    ) : (
                      <span className="flex sm:flex-row flex-col items-center text-[#9E9E9E] gap-2 sm:text-base text-sm">
                        <Image /> Upload Image
                      </span>
                    )}
                  </div>
                </div>
                <div className="xl:w-[40%] sm:text-center text-left sm:ps-4 ps-[10px] xl:ps-0">
                  <h6 className="sm:text-base text-sm font-calibri sm:pb-3 pb-2">
                    Size: 1024x768 pixels Max size 500KB
                  </h6>
                  <h6 className="sm:text-base text-sm font-calibri pb-3">
                    File Support: jpg, .jpeg
                  </h6>
                  <div>
                    <label
                      htmlFor="file_1"
                      className="cursor-pointer inline-block"
                    >
                      <div className="flex items-center justify-center sm:w-[140px] w-[130px] sm:h-[42px] h-[38px] mx-auto rounded-[5px] text-white bg-[#42A7C3] sm:text-base text-sm">
                        <Image className="sm:me-1 me-[6px] sm:w-auto w-[14px]" />
                        Upload Photo
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        id="file_1"
                        accept=".jpeg, .jpg"
                        {...register("bannerImage")}
                        onChange={handleUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
              {image === "" ||
                (errors?.bannerImage && (
                  <ErrorMessage message={"Banner image is required"} />
                ))}
            </div>
            <div className="">
              <h6 className="text-[#515151] font-calibri text-base pb-3">
                Key Outcomes
              </h6>
              <CKEditorComponent
                value={keyData}
                {...register("keys")}
                onChange={(e, data) => {
                  setSelectBoxValue({ ...selectBoxValue, keys: e });
                  setKeyData(data.getData());
                  setValue("keys", data.getData());
                }}
                className="bannerTextEditor h-[186px] w-full"
              />
              {errors?.keys && (
                <ErrorMessage message={errors?.keys?.message as string} />
              )}
            </div>
            <div className="text-right mt-5">
              <Button
                type="submit"
                className=" text-base font-inter text-white bg-[#58BA66] sm:w-[120px] sm:h-[52px] w-[100px] h-[36px]"
                disabled={isPending || isUpdatePending}
              >
                {isPending || isUpdatePending ? (
                  <Loader containerClassName="h-auto" />
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </form>
        </div>
        <Loading isLoading={getSingleCourseFetching} />
      </div>
    </>
  );
};

export default CourseBanner;
