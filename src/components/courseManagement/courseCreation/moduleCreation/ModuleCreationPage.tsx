import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  changeModulePostion,
  createModule,
  createSection,
  getModuleData,
} from "@/services/apiServices/moduleCreation";
import { ModuleCreation, SectionCreation } from "@/types/modulecreation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CourseViewPage from "../courseView/CourseViewPage";
import ModuleCreationItems from "./ModuleCreationItems";

export const intialSectionCreation: SectionCreation | any = {
  sectionTitle: "",
  information: "",
  uploadContentType: 0 || null || undefined,
  uploadedContentUrl: "",
  readingTime: {
    hour: 0,
    minute: 0,
    second: 0,
  },
  youtubeUrl: "",
  uploadDocument: "",
  isLive: false,
  livesessionDuration: {
    hour: 0,
    minute: 0,
    second: 0,
  },
};

export const intialModuleCreation: ModuleCreation | any = {
  moduleTitle: "",
  section: [intialSectionCreation],
};

const ModuleCreationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab") || "";
  const courseID = new URLSearchParams(search).get("id") || "";
  const paramsType = new URLSearchParams(search).get("type") || "";
  const paramsVersion = new URLSearchParams(search).get("version") || "";
  const [moduleList, setModuleList] = useState<any>([]);
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);
  const latestModuleList = useRef(moduleList);
  const courseEditId: string = location?.pathname?.split("/")[3];
  const [urlError, setUrlError] = useState<string>("");
  const pathName = location?.pathname?.split("/")[1];
  const [informationError, setInformationError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const schema = z.object({
    modules: z.array(
      z.object({
        moduleTitle: z
          .string()
          .min(1, "Please enter module title")
          .max(250, "You can not write module title more than 250 characters"),
        section: z.array(
          z
            .object({
              isLive: z.boolean(),
              sectionTitle: z
                .string()
                .min(1, "Please enter section title")
                .max(
                  250,
                  "You can not write section title more than 250 characters"
                ),
              information: z
                .string()
                .min(500, "You must write at least 500 characters.")
                .max(5000, "You can not write more than 5000 characters"),
              uploadContentType: z
                .number()
                // .min(1, "Upload content type is required")
                .optional(),
              uploadedContentUrl: z.string().optional(),
              youtubeUrl: z.string().optional(),
              readingTime: z
                .object({
                  hour: z.number().min(0).max(23),
                  minute: z.number().min(0).max(59),
                  second: z.number().min(0).max(59),
                })
                .optional(),
              uploadDocument: z.string().optional(),
              livesessionDuration: z
                .object({
                  hour: z.number().min(0).max(23),
                  minute: z.number().min(0).max(59),
                  second: z.number().min(0).max(59),
                })
                .optional(),
            })
            .superRefine((data, ctx) => {
              // if(!data.youtubeUrl?.match(/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=[\w-]+|youtu\.be\/[\w-]+(\?si=[\w-]+)?)$/)){
              //   ctx.addIssue({
              //     code: z.ZodIssueCode.custom,
              //     message: "Please enter valid youtube url",
              //     path: ["youtubeUrl"],
              //   });
              // }
              if (data.isLive) {
                if (
                  !data.livesessionDuration?.hour &&
                  !data.livesessionDuration?.minute &&
                  !data.livesessionDuration?.second
                ) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                      "Live session duration is required when isLive is true",
                    path: ["livesessionDuration.hour"],
                  });
                }
              } else {
                if (
                  data?.uploadContentType &&
                  !data.uploadedContentUrl &&
                  !data.youtubeUrl
                ) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                      "Please enter uploaded Content URL or file or youTube URL ",
                    path: ["uploadedContentUrl", "uploadContentType"],
                  });
                }
                if (
                  !data.readingTime?.hour &&
                  !data.readingTime?.minute &&
                  !data.readingTime?.second
                ) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Please enter reading time",
                    path: ["readingTime.hour"],
                  });
                }
                // if (!data.youtubeUrl && data.uploadContentType) {
                //   if (!data.uploadContentType) {
                //     ctx.addIssue({
                //       code: z.ZodIssueCode.custom,
                //       message: "Please select upload content type",
                //       path: ["uploadContentType"],
                //     });
                //   }
                //   if (!data.uploadedContentUrl) {
                //     ctx.addIssue({
                //       code: z.ZodIssueCode.custom,
                //       message: "Please enter upload content url",
                //       path: ["uploadedContentUrl"],
                //     });
                //   }
                // }
                // if (!data.youtubeUrl && !data.uploadContentType) {
                //   ctx.addIssue({
                //     code: z.ZodIssueCode.custom,
                //     message: "Please select upload content type",
                //     path: ["uploadContentType"],
                //   });
                // }
              }
            })
          // .refine(data => data.isLive ? false : true, { message: "Section is required", path: ["uploadContentType"] })
        ),
      })
    ),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      modules: [],
    },
  });

  const {
    fields: moduleCreationItem,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    name: "modules",
    control,
  });
  // const userData = JSON.parse(localStorage.getItem("userData") as string);

  useEffect(() => {
    if (moduleList?.length > 0) {
      latestModuleList.current = moduleList; // update ref to latest state
      if (+paramsVersion) {
        handleModulePosition();
      }
      reset({ modules: [] });
    }
  }, [moduleList]);

  const CreateModuleAsync = useMutation({
    mutationFn: async (data: ModuleCreation) =>
      createModule(data, courseID || courseEditId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
    },
  });

  const createSectionAsync = useMutation({
    mutationFn: async (data: {
      moduleId: number;
      sections: SectionCreation[];
    }) => createSection(data.sections, data.moduleId),
  });

  const { mutate: ChangeModulePosition } = useMutation({
    mutationFn: (data: any) =>
      changeModulePostion(data, courseEditId || courseID),
  });

  console.log("courseEditId || courseID", courseEditId, courseID);

  const { data: CourseModule, isFetching: courseLoading } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourseModule, paramsVersion],
    queryFn: () => getModuleData(+courseEditId || +courseID),
    enabled: !!courseID || !!courseEditId,
  });

  useEffect(() => {
    if (CourseModule?.data?.data?.length) {
      console.log("CourseModule?.data.data", CourseModule?.data.data);

      setModuleList(CourseModule?.data.data);
    }
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.getSingleCourse],
    });
  }, [CourseModule]);

  const handleModuleSave = async (data: any) => {
    if (informationError !== "") return;
    try {
      const promises = data.modules.map(async (module: ModuleCreation) => {
        const response = await CreateModuleAsync.mutateAsync(module);
        const moduleId = response.data.data.id;

        if (moduleId) {
          await createSectionAsync.mutateAsync({
            moduleId,
            sections: module.section.map((item) => {
              const { uploadContentType, ...rest } = item;
              const youtubeUrl =
                item?.uploadContentType && +item?.uploadContentType > 0
                  ? ""
                  : item?.youtubeUrl;

              console.log("itemitemitem", item);
              // const documentType = +item?.uploadDocument === 0 ? null : item?.uploadDocument;
              return uploadContentType === 0
                ? { ...rest, youtubeUrl: youtubeUrl, uploadContentType: null }
                : { ...item, youtubeUrl: youtubeUrl };
            }),
          });
        }
      });
      if (+courseEditId) {
        navigate(
          `/${pathName}/create_course/${courseEditId}?tab=${paramsTab}&version=${paramsVersion}${
            paramsType ? `&type=${paramsType}` : ""
          }`
        );
      } else {
        navigate(
          `/${pathName}/create_course?tab=${paramsTab}&id=${courseID}&version=${paramsVersion}`
        );
      }
      await Promise.all(promises);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      reset({ modules: [] });
      toast({
        variant: "success",
        title: "All modules and sections saved successfully",
      });
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Error in saving process",
      });
    }
  };

  const handleModulePosition = async () => {
    const payload = moduleList.map((module: any, index: number) => {
      return {
        Module: module.id,
        position: index + 1,
      };
    });

    ChangeModulePosition(payload);
  };

  const handleSort = () => {
    const moduleListClone = [...moduleList];

    const draggedElement = moduleListClone[dragPerson.current];
    moduleListClone.splice(dragPerson.current, 1);
    moduleListClone.splice(draggedOverPerson.current, 0, draggedElement);

    setModuleList(moduleListClone);
  };

  return (
    <div className="">
      <div className="flex sm:flex-row flex-col justify-between sm:gap-0 gap-3 items-center sm:pb-10 pb-5">
        {/* <p className="text-[#606060] text-[15px] inline-block">
          Please fill in all the learning material for this course, as you see
          fit
        </p> */}
        <div className="">
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px] sm:text-left text-center">
            {moduleCreationItem.length > 0
              ? "Please fill in all the learning material for this course, as you see fit"
              : "All the modules and chapters currently included in this course"}
          </p>
        </div>
        <Button
          type="button"
          onClick={() => appendModule({ ...intialModuleCreation })}
          disabled={
            paramsType === "editminor"
              ? true
              : moduleList?.length > 0 && moduleCreationItem.length > 0
          }
          className="bg-[#42A7C3] sm:px-4 px-3 py-2 font-inter text-xs sm:h-10 h-9"
        >
          <CirclePlus width={18} /> Add Module
        </Button>
      </div>

      {courseLoading ? (
        <Loader />
      ) : (
        <>
          {moduleList?.length > 0
            ? moduleList.map((data: any, index: number) => {
                return (
                  <div
                    key={index}
                    draggable={paramsType === "editminor" ? false : true}
                    onDragStart={() => (dragPerson.current = index)}
                    onDragEnter={() => (draggedOverPerson.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <CourseViewPage
                      data={data}
                      currIndex={index}
                      moduleLength={moduleList.length}
                    />
                  </div>
                );
              })
            : moduleCreationItem.length === 0 && (
                <p className="text-[#606060] text-[15px] min-h-[200px] flex items-center justify-center">
                  No Modules Data
                </p>
              )}
        </>
      )}
      <form onSubmit={handleSubmit(handleModuleSave)}>
        {moduleCreationItem.map((_, index) => {
          return (
            <ModuleCreationItems
              errors={errors}
              register={register}
              setValue={setValue}
              watch={watch}
              control={control}
              removeModule={removeModule}
              key={`module${index}`}
              moduleListlength={moduleList?.length}
              index={index}
              setUrlError={setUrlError}
              urlError={urlError}
              informationError={informationError}
              setInformationError={(e: string) => setInformationError(e)}
              setIsUploading={setIsUploading}
            />
          );
        })}

        {moduleCreationItem.length !== 0 && (
          <div className="text-right">
            <Button
              isLoading={CreateModuleAsync?.isPending}
              className=" text-base font-inter text-white bg-[#58BA66] py-6 px-8"
              disabled={isUploading}
            >
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ModuleCreationPage;
