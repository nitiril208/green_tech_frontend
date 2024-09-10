import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { liveSessionUpdate } from "@/services/apiServices/liveSession";
import {
  changeSectionPostion,
  createSection,
  updateSection,
} from "@/services/apiServices/moduleCreation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { intialSectionCreation } from "../moduleCreation/ModuleCreationPage";
import SectionForm from "../moduleCreation/SectionForm";
import AssessmentModal from "./AssessmentModal";
import CourseViewCardInnerList from "./CourseViewCardInnerList";

const CourseViewCardInner = ({
  CourseCardList,
  moduleId,
  assessments,
  moduleLength,
}: {
  CourseCardList: any;
  moduleId: string;
  assessments: any;
  moduleLength: number;
}) => {
  const [getCourseCardList, setGetCourseCardList] =
    useState<any[]>(CourseCardList);
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);
  const search = window.location.search;
  const paramsType = new URLSearchParams(search).get("type") || "";
  const [addsectionList, setAddSectionList] = useState<boolean>(false);
  const latestCourseCardList = useRef(getCourseCardList);
  const [isEditSection, setIsEditSection] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [urlError, setUrlError] = useState<string>("");
  const [informationError, setInformationError] = useState<string>("");

  useEffect(() => {
    if (CourseCardList?.length > 0) {
      console.log("🚀 ~ useEffect ~ CourseCardList:", CourseCardList);
      const updateCouresListSection = [...CourseCardList];

      CourseCardList?.map((item: any) => {
        if (item?.assessment?.length !== null) {
          return item.assessment?.map((itm: any) => {
            updateCouresListSection.push({
              ...itm,
              position: item.position,
              isLive: 0,
              type: "AssessmentTest",
            });
          });
        }

        return item;
      });
      setGetCourseCardList(updateCouresListSection);
    }
  }, [CourseCardList]);

  const schema = z
    .object({
      isLive: z.boolean(),
      sectionTitle: z
        .string()
        .min(1, "Please enter section title")
        .max(250, "You can not write section title more than 250 characters"),
      information: z
        .string()
        .min(500, "You must write at least 500 characters.")
        .max(5000, "You can not write information more than 5000 characters"),
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
      if (data.isLive) {
        if (
          !data.livesessionDuration?.hour &&
          !data.livesessionDuration?.minute &&
          !data.livesessionDuration?.second
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Live session duration is required when isLive is true",
            path: ["livesessionDuration.hour"],
          });
        }
      } else {
        // if (!data.uploadedContentUrl && !data.youtubeUrl) {
        //   ctx.addIssue({
        //     code: z.ZodIssueCode.custom,
        //     message:
        //       "Either uploaded content url and File or YouTube URL is required ",
        //     path: ["uploadedContentUrl", "uploadContentType", "youtubeUrl"],
        //   });
        // }
        if (
          !data.readingTime?.hour &&
          !data.readingTime?.minute &&
          !data.readingTime?.second
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Reading time is required",
            path: ["readingTime.hour"],
          });
        }
        if (!data.youtubeUrl && data.uploadContentType) {
          // if (!data.uploadContentType) {
          //   ctx.addIssue({
          //     code: z.ZodIssueCode.custom,
          //     message: "Upload content type is required when isLive is false",
          //     path: ["uploadContentType"],
          //   });
          // }
          if (!data.uploadedContentUrl) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Upload content url is required when isLive is false",
              path: ["uploadedContentUrl"],
            });
          }
        }
      }
    });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    getValues,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      isLive: false,
      sectionTitle: "",
      information: "",
      uploadContentType: 0,
      uploadedContentUrl: "",
      youtubeUrl: "",
      readingTime: { hour: 0, minute: 0, second: 0 },
      uploadDocument: "",
      livesessionDuration: { hour: 0, minute: 0, second: 0 },
    },
  });

  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);

  const { mutate: ChangeSectionPosition } = useMutation({
    mutationFn: (data: any) => changeSectionPostion(data, moduleId),
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  useEffect(() => {
    if (getCourseCardList && moduleLength > 1) {
      latestCourseCardList.current = getCourseCardList;
      handelSectionPosition();
    }
  }, [getCourseCardList, moduleLength]);

  const { mutate: CreateSection, isPending: createSectionPending } =
    useMutation({
      mutationFn: (data: any) => createSection(data, moduleId),
      onSuccess: (data: any) => {
        const newData = getCourseCardList.concat(data.data.data);
        setGetCourseCardList(newData);
        setAddSectionList(false);
        reset({ ...intialSectionCreation });
        toast({
          variant: "success",
          title: "Section added successfully",
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourseModule],
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    });

  const { mutate: EditSection, isPending: editSectionPending } = useMutation({
    mutationFn: (data: any) => updateSection(data, moduleId, isEditSection),
    onSuccess: () => {
      setIsEditSection(null);
      reset({ ...intialSectionCreation });
      toast({
        variant: "success",
        title: "Section updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const { mutate: EditLiveSection, isPending: editLiveSectionPending } =
    useMutation({
      mutationFn: (data: any) => liveSessionUpdate({ data, id: isEditSection }),
      onSuccess: () => {
        setIsEditSection(null);
        reset({ ...intialSectionCreation });
        toast({
          variant: "success",
          title: "Section updated successfully",
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourseModule],
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    });

  const handleSort = () => {
    const moduleListClone = [...getCourseCardList];

    const draggedElement = moduleListClone[dragPerson.current];
    moduleListClone.splice(dragPerson.current, 1);
    moduleListClone.splice(draggedOverPerson.current, 0, draggedElement);

    setGetCourseCardList(moduleListClone);
  };

  const handelSectionPosition = async () => {
    const payload = await getCourseCardList.map(
      (section: any, index: number) => {
        return {
          section: section.id,
          position: index + 1,
          isLive: section.isLive == 0 ? false : true,
        };
      }
    );
    ChangeSectionPosition(payload);
  };

  const handelEditSection = (data: any) => {
    if (data?.timeDuration) {
      const tab = searchParams.get("tab");
      const version = searchParams.get("version");
      const courseId = params?.courseId || searchParams.get("id");
      const pathName = window.location.pathname;
      const currentUser = pathName.split("/")[1];
      navigate(
        `/${currentUser}/add_assessment/${data?.id}?tab=${tab}&version=${version}&courseId=${courseId}&moduleId=${moduleId}`
      );
    } else {
      setIsEditSection(data.id);
      setValue("sectionTitle", data.isLive ? data.title : data.title);
      setValue(
        "information",
        data.isLive ? data.information : data.information
      );
      setValue(
        "uploadContentType",
        data.documentType === null
          ? 0
          : !data.url
          ? data.documentType
          : !data.url && data.documentType === 4
          ? data.documentType
          : 0
      );
      setValue("uploadedContentUrl", data?.uploadContent || "");
      setValue(
        "readingTime",
        data.readingTime || { hour: 0, minute: 0, second: 0 }
      );
      console.log(
        "data?.attachment",
        data.url,
        data?.attachment,
        data?.uploadContent,
        !data.documentType
      );

      setValue("youtubeUrl", data.isLive ? "" : data.url);
      setValue("uploadDocument", data?.attachment || "");
      setValue("isLive", data.isLive === 1 ? true : false);
      setValue(
        "livesessionDuration",
        data.isLive ? data.readingTime : { hour: 0, minute: 0, second: 0 }
      );
    }
  };

  const handleRemoveSection = () => {
    if (isEditSection) {
      reset({ ...intialSectionCreation });
      setIsEditSection(null);
    } else {
      reset({ ...intialSectionCreation });
      setAddSectionList(false);
    }
  };

  const onSubmit = (data: FieldValues) => {
    if (informationError !== "") return;
    const payload = [];
    setUrlError("");
    payload.push({
      ...data,
      uploadContentType:
        data.uploadContentType === 0 ? null : data.uploadContentType,
    });
    console.log("payload", payload);

    if (payload.length > 0) {
      CreateSection(payload);
    }
  };

  const onUpdate = (data: FieldValues) => {
    if (informationError !== "") return;
    const a = {
      isLive: true,
      title: data.sectionTitle,
      information: data.information,
      sectionTime: {
        hour: +data.livesessionDuration.hour,
        minute: +data.livesessionDuration.minute,
        second: +data.livesessionDuration.second,
      },
      module: moduleId,
    };
    if (data.isLive) {
      EditLiveSection(a);
    } else {
      EditSection({
        ...data,
        uploadContentType:
          data.uploadContentType === 0 ? null : data.uploadContentType,
      });
    }
  };

  return (
    <div
      className=""
      onDragStart={(e) => {
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
      }}
      onDragOver={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        {getCourseCardList.map((data: any, index: number) => {
          return (
            <>
              {isEditSection && isEditSection === data.id ? (
                <form onSubmit={handleSubmit(onUpdate)} key={index}>
                  <SectionForm
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    getValues={getValues}
                    sectionID={isEditSection}
                    handleRemoveSection={handleRemoveSection}
                    isLoading={editSectionPending || editLiveSectionPending}
                    urlError={urlError}
                    setUrlError={setUrlError}
                    informationError={informationError}
                    setInformationError={(e: string) => setInformationError(e)}
                  />
                </form>
              ) : (
                <div
                  key={index}
                  draggable={paramsType === "editminor" ? false : true}
                  onDragStart={() => (dragPerson.current = index)}
                  onDragEnter={() => (draggedOverPerson.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <CourseViewCardInnerList
                    key={index}
                    data={data}
                    handelEditSection={handelEditSection}
                  />
                </div>
              )}
            </>
          );
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
          {addsectionList && (
            <SectionForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              getValues={getValues}
              handleRemoveSection={handleRemoveSection}
              isLoading={createSectionPending}
              urlError={urlError}
              setUrlError={setUrlError}
              informationError={informationError}
              setInformationError={(e: string) => setInformationError(e)}
            />
          )}

          {!isEditSection && (
            <div className="flex sm:justify-end justify-center gap-4 sm:m-5 mx-4 my-2.5">
              {!addsectionList ? (
                <>
                  {/* <div
                    onClick={() => setAddSectionList(true)}
                    className="bg-[#42A7C3] sm:px-4 px-3 py-2 font-inter text-xs sm:h-[38px] h-9"
                    disabled={paramsType === "editminor"}
                  >
                    <CirclePlus width={18} /> Section
                  </div> */}
                  <Button
                    type="button"
                    onClick={() => setAddSectionList(true)}
                    className="bg-[#42A7C3] sm:px-4 px-3 py-2 font-inter text-xs sm:h-[38px] h-9 text-white w-auto flex gap-2 items-center rounded-[6px]"
                    disabled={paramsType === "editminor"}
                  >
                    <CirclePlus width={18} /> Section
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#42A7C3] sm:px-4 px-3 py-2 font-inter text-xs sm:h-[38px] h-9"
                    onClick={() => setIsOpenAssessmentModal(true)}
                    disabled={
                      paramsType === "editminor"
                        ? true
                        : assessments?.length === 1
                    }
                  >
                    <CirclePlus width={18} /> Add Assessment
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  // onClick={handleSectionSave}
                  className="bg-[#58BA66] px-5 py-3 font-inter text-md"
                  disabled={createSectionPending}
                >
                  {createSectionPending && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}{" "}
                  Save
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
      <Modal
        open={isOpenAssessmentModal}
        onClose={() => setIsOpenAssessmentModal(false)}
        className="xl:max-w-[737px] lg:max-w-[650px] sm:max-w-[550px] max-w-[335px] sm:p-5 p-4 rounded-xl"
      >
        <AssessmentModal
          setIsOpenAssessmentModal={setIsOpenAssessmentModal}
          moduleId={moduleId}
          sectionID={0}
        />
      </Modal>
    </div>
  );
};

export default CourseViewCardInner;
