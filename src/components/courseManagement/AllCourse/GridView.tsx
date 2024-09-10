import Course_image from "@/assets/images/Course_image.png";
import StarImage from "@/assets/images/Vector.png";
import { ConfirmModal } from "@/components/comman/ConfirmModal";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { PermissionContext } from "@/context/PermissionContext";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { RootState } from "@/redux/store";
import {
  copyCourse,
  createNewVersion,
  deleteCourse,
  publishCourse,
  updateVersion,
} from "@/services/apiServices/courseManagement";
import { PublishCourseType } from "@/types/course";
import { AllCoursesResult, CourseDataEntity } from "@/types/courseManagement";
import { ErrorType } from "@/types/Errors";
import { UserRole } from "@/types/UserRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Combine, Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AllocatedCertificateModal } from "./AllocatedCertificateModal";
import CohortModal from "./CohortModal";
import ConfirmationModel from "./ConfirmationModel";

const GridView = ({
  list,
  isLoading,
}: {
  list: AllCoursesResult[];
  isLoading?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { permissions } = useContext(PermissionContext);
  const { toast } = useToast();
  const { UserId } = useSelector((state: RootState) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [cohort, setCohort] = useState(false);
  const [isOpen, setIsOpen] = useState<string>("");
  const [open, setOpen] = useState<string>("");
  const [isDelete, setIsDelete] = useState(false);
  const [singleCourse, setSingleCourse] = useState<AllCoursesResult | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] = useState<AllCoursesResult | null>(
    null
  );
  const [course, setCourse] = useState<string | number>("");
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const Role = location?.pathname?.split("/")?.[1];
  const pathName = location?.pathname?.split("/")?.[2];
  console.log("🚀 ~ pathName:", pathName);
  const handleCohort = (e: Event, id: number) => {
    e.preventDefault();
    setCohort(true);
    setCourse(id);
  };
  useEffect(() => {
    if (!cohort) {
      setCourse("");
    }
  }, [cohort]);

  const { mutate: updateVersionFun, isPending: updateVersionPending } =
    useMutation({
      mutationFn: updateVersion,
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: [QUERY_KEYS.fetchAllCourse] });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: publishCourseFun, isPending: publishCoursePending } =
    useMutation({
      mutationFn: (data: PublishCourseType) => publishCourse(data),
      onSuccess: (data) => {
        setIsStatusLoading(false);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourse],
        });
        setCourse("");

        if (data?.data?.data?.status === "UNPUBLISHED") {
          toast({
            title: "Success",
            description: "Course unplished successfully",
            variant: "success",
          });
        } else {
          toast({
            title: "Success",
            description: "Course published successfully",
            variant: "success",
          });
        }

        setOpen("");
      },
      onError: (error: ErrorType) => {
        setIsStatusLoading(false);
        setCourse("");
        toast({
          title: "Error",
          description: error?.data?.message,
          variant: "destructive",
        });
      },
    });
  const { mutate: copyCourseFun, isPending: copyCoursePending } = useMutation({
    mutationFn: copyCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchAllCourse] });
      toast({
        title: "Success",
        description: "Course Copied Successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteCourseFun, isPending: deleteCoursePending } =
    useMutation({
      mutationFn: (id: number) => deleteCourse(id),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.fetchAllCourse],
        });
        setIsDelete(false);
        setSingleCourse(null);
        toast({
          title: "Success",
          description: data?.data?.message,
          variant: "success",
        });
      },
      onError: (error: ErrorType) => {
        toast({
          title: "Error",
          description: error.data.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: createNewVersionFun, isPending: createNewVersionPending } =
    useMutation({
      mutationFn: createNewVersion,
      onSuccess: (data) => {
        navigate(
          `/${Role}/create_course/${
            data?.data?.id
          }?tab=${0}&step=${0}&version=${data?.data?.currentVersion?.id}`
        );
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const handleChangeVersion = (versionId: string, item: AllCoursesResult) => {
    const payload = {
      mainCourseId: item?.currentVersion?.mainCourse?.id,
      versionId: +versionId,
      userId: +UserId,
    };
    updateVersionFun(payload);
  };

  console.log(list);

  const handlePublish = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const payload = {
      status: userData?.query?.role === "3" ? "READYTOPUBLISH" : "PUBLISHED",
      id: +id,
    };
    const cohortCount =
      list?.find((item) => item?.currentVersion?.id === (+id || 0))
        ?.currentVersion?.cohortGroup?.length || 0;

    if (
      +userData?.query?.role === UserRole?.Trainee ||
      (cohortCount > 0 && +userData?.query?.role === UserRole?.Trainer)
    ) {
      publishCourseFun(payload);
    } else {
      const singleCourse = list?.find(
        (item) => item?.currentVersion?.id === +id
      );
      if (singleCourse?.isOnline === 1) {
        publishCourseFun(payload);
      } else {
        toast({
          title: "Please Create Cohort Group",
          variant: "destructive",
        });
      }
    }
  };

  const handleCopy = (e: Event, id: number) => {
    e.stopPropagation();
    copyCourseFun({ id, userId: userData?.query?.id });
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: AllCoursesResult,
    type?: string
  ) => {
    e.stopPropagation();
    if (item?.status === "DRAFT" || item?.status === "PUBLISHED") {
      if (type === "editminor") {
        if (+item?.step === 5) {
          navigate(
            `/${Role}/create_course/${item?.id}?tab=${
              +item?.tab === 4 ? 0 : item?.tab
            }&version=${item?.currentVersion?.id}&type=${type}`
          );
        } else {
          navigate(
            `/${Role}/create_course/${item?.id}?tab=${
              +item?.tab === 4 ? 0 : item?.tab
            }&step=${+item?.step === 5 ? 0 : item?.step}&version=${
              item?.currentVersion?.id
            }&type=${type}`
          );
        }
      }

      if (type === "edit") {
        navigate(
          `/${Role}/create_course/${item?.id}?tab=${
            +item?.tab === 4 ? 0 : item?.tab
          }&step=${+item?.step === 5 ? 0 : item?.step}&version=${
            item?.currentVersion?.id
          }&type=${type}`
        );
      }

      if (type === "editWithNew") {
        createNewVersionFun({
          courseId: item?.id,
          version: item?.currentVersion?.version || 0,
          userId: +userData?.query?.id,
        });
      }
    } else {
      if (item?.trainerId?.id) {
        toast({
          title: "First Course make DRAFT Status then You Can Edit",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCourse = () => {
    deleteCourseFun(singleCourse ? singleCourse?.id : 0);
  };

  const handleChangeStatus = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: AllCoursesResult
  ) => {
    e.stopPropagation();
    setIsStatusLoading(true);
    const payload = {
      status: item?.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED",
      id: +item?.currentVersion?.id,
    };
    publishCourseFun(payload);
  };
  console.log("listlistlist", list);

  return list?.length > 0 && list ? (
    <>
      <AllocatedCertificateModal
        isOpen={!!isOpen}
        onClose={() => setIsOpen("")}
        courseId={+isOpen}
        selectedCourse={selectedCourse}
      />
      <ConfirmationModel
        open={open}
        setOpen={setOpen}
        handleSubmit={(e, id) => handlePublish(e, id)}
        isLoader={publishCoursePending}
      />
      <CohortModal open={cohort} setOpen={setCohort} id={+course || 0} />
      {(isLoading || updateVersionPending) && (
        <div className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center bg-[#00000033]">
          <Loader className="h-10 w-10" />
        </div>
      )}
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {list?.map((item: any, i: number) => {
          const update =
            +userData?.query?.role === UserRole?.Trainer
              ? true
              : // : item?.trainerId?.id === +userData?.query?.detailsid
                // ? true
                permissions?.updateCourse;
          // const versionOption =
          //   item?.version &&
          //   item?.version.map((itm: any) => {
          //     return {
          //       label: `V-${itm?.version}`,
          //       value: itm?.id.toString() || "",
          //     };
          //   });
          const isTrainee = +userData?.query?.role === UserRole?.Trainee;
          const isMyCoursesPath = pathName === "mycourses";
          const CoursesPath =
            pathName === "mycourses" ? "My Courses" : pathName;
          const isPublished = item?.status === "PUBLISHED";

          const versionOption =
            item?.version &&
            item?.version
              .filter((itm: any) => {
                if (isTrainee && isMyCoursesPath && isPublished) {
                  return itm.version === item?.currentVersion?.version;
                }
                return true;
              })
              .map((itm: any) => ({
                label: `V-${itm?.version}`,
                value: itm?.id.toString() || "",
              }));

          // const editOption =
          //   item?.trainerId?.id === +userData?.query?.detailsid
          //     ? (userData?.editCourses &&
          //         +userData?.query?.role !== UserRole.Trainee) ||
          //       item?.trainerId?.id === +userData?.query?.detailsid
          //     : userData?.editCourses ||
          //       +userData?.query?.role !== UserRole.Trainee;

          return (
            <Link
              to={`/${Role}/employee-basic-course/${item?.currentVersion?.id}`}
              onClick={() =>
                dispatch(
                  setPath([
                    { label: "Course Management", link: null },
                    { label: `${CoursesPath}`, link: `/${Role}/${pathName}` },
                    { label: "Employee Basic Course", link: null },
                  ])
                )
              }
              key={i}
              className="border border-[#ddd] rounded-[10px] overflow-hidden"
            >
              <div className="relative min-h-[170px] h-[170px] overflow-hidden">
                <img
                  src={item?.bannerImage || Course_image}
                  alt={"bannerImage"}
                  className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
                />
                <Badge className="absolute right-2 bottom-2 bg-white text-black hover:bg-[#eee] font-calibri text-base font-normal px-2 py-0">
                  {item?.status === "READYTOPUBLISH"
                    ? "Ready to Publish"
                    : item?.status || item?.status}
                </Badge>
              </div>
              <div className="p-2 h-[calc(100%-220px)]">
                <h5 className="text-base font-bold font-inter text-[#1D2026] sm:mb-[19px] mb-2.5 min-h-[48px] line-clamp-2">
                  {item?.title}
                </h5>
                <div className="flex items-center justify-between sm:mb-[11px] mb-5">
                  <div>
                    <h6 className="text-sm leading-5 font-normal font-nunito capitalize">
                      Created By :{" "}
                      {item?.trainerId
                        ? (item?.trainerId?.contactFirstName || "") +
                            " " +
                            item?.trainerId?.contactSurname ||
                          item?.trainerId?.email?.split("@")[0]
                        : (item?.trainerCompanyId?.contactFirstName || "") +
                            " " +
                            item?.trainerCompanyId?.contactSurname ||
                          item?.trainerCompanyId?.email?.split("@")[0]}
                    </h6>
                  </div>
                  <div className="flex items-center text-[14px] leading-3 gap-1 font-nunito">
                    <img src={StarImage} alt="" className="pb-1" />
                    {item?.feedBack?.avgRate || 0}/5
                  </div>
                </div>
                <div className="flex justify-between items-center mb-[11px]">
                  <h5 className="text-[14px] font-nunito">
                    Module : {item?.module?.length || 0}
                  </h5>
                  <p className="text-[14px] font-nunito min-w-[108px]">
                    Duration : {item?.duration || "00"}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {item?.courseData?.map((item: CourseDataEntity) => {
                    return (
                      <Badge
                        variant="outline"
                        key={item?.pillarId}
                        className={`bg-[${item?.fetchMaturity?.color}] border-[#EDF0F4] p-1 px-3 text-[#3A3A3A] text-xs font-Poppins font-normal`}
                      >
                        {item?.fetchPillar?.pillarName}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between gap-[7px] 2xl:px-[13px] xl:px-[8px] p-2.5 border-t">
                <Button
                  disabled={
                    item?.status === "PUBLISHED" ||
                    item?.status === "EXPIRED" ||
                    (+userData?.query?.role === UserRole?.Trainee &&
                      item?.status === "READYTOPUBLISH")
                  }
                  className="py-[6px] font-Poppins bg-[#58BA66] hover:bg-[#58BA66] h-auto"
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault();
                    setOpen(item?.currentVersion?.id);
                    setCourse(item?.id);
                  }}
                >
                  {item?.status === "PUBLISHED"
                    ? "Published"
                    : item?.status === "READYTOPUBLISH"
                    ? userData?.query?.role === "2"
                      ? "Publish"
                      : "Ready to Publish"
                    : "Publish"}
                </Button>

                {Role !== "trainee" && (
                  <Button
                    disabled={!update}
                    onClick={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCohort(e, item?.currentVersion?.id as number);
                    }}
                    className="2xl:max-w-[80px] md:max-w-[90px] sm:max-w-[80px] max-w-[88px] py-[6px] font-Poppins bg-[#000000] hover:bg-[#000000] h-auto w-full"
                  >
                    + Cohort
                  </Button>
                )}
                {!(Role === "trainee" && pathName === "allcourse") && (
                  <div className="">
                    <SelectMenu
                      option={versionOption || []}
                      setValue={(data: string) =>
                        handleChangeVersion(data, item)
                      }
                      value={item?.currentVersion?.id?.toString() || ""}
                      defaultValue={item?.currentVersion?.id?.toString() || ""}
                      containClassName="max-w-[62px]"
                      className="md:max-w-[62px] sm:max-w-[56px] max-w-[65px] h-auto py-[5px] px-2 font- w-full bg-[#00778B] text-white"
                      placeholder="V-01"
                    />
                  </div>
                )}
                {!(
                  (item?.status === "PUBLISHED" || pathName === "allcourse") &&
                  +userData?.query?.role === UserRole.Trainee
                ) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none">
                      <EllipsisVertical className="w-8" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-30">
                      <DropdownMenuGroup>
                        {(+userData?.query?.role === UserRole.Trainee
                          ? // ? item?.trainerId?.id === +userData?.query?.detailsid
                            //   ? true
                            permissions?.createCourse
                          : true) && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-nunito"
                            onClick={(e: any) =>
                              handleCopy(e, item?.currentVersion?.id)
                            }
                          >
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </DropdownMenuItem>
                        )}
                        {(item?.trainerId?.id === +userData?.query?.detailsid ||
                          +userData?.query?.role !== UserRole.Trainee) &&
                          (item?.status === "PUBLISHED" ||
                            item?.status === "UNPUBLISHED") && (
                            <DropdownMenuItem
                              className="flex items-center gap-2 font-nunito"
                              onClick={(e) => handleChangeStatus(e, item)}
                            >
                              <Pencil className="w-4 h-4" />
                              <span>
                                {item?.status === "UNPUBLISHED"
                                  ? "Re-Publish"
                                  : "Un-Publish"}
                              </span>
                            </DropdownMenuItem>
                          )}
                        {+userData?.query?.role !== UserRole.Trainee && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 font-nunito"
                            onClick={(e) =>
                              handleEdit(
                                e,
                                item,
                                item?.status === "DRAFT" ? "edit" : "editminor"
                              )
                            }
                          >
                            <Pencil className="w-4 h-4" />
                            <span>
                              {item?.status === "DRAFT" ? "Edit" : "Edit minor"}
                            </span>
                          </DropdownMenuItem>
                        )}
                        {+userData?.query?.role === UserRole.Trainee &&
                          item?.status === "DRAFT" && (
                            <DropdownMenuItem
                              className="flex items-center gap-2 font-nunito"
                              onClick={(e) => handleEdit(e, item, "edit")}
                            >
                              <Pencil className="w-4 h-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          )}
                        {item?.status !== "EXPIRED" &&
                          item?.status !== "DRAFT" &&
                          (+userData?.query?.role === UserRole.Trainee
                            ? true
                            : update) && (
                            <>
                              <DropdownMenuItem
                                className="flex items-center gap-2 font-nunito"
                                onClick={(e) =>
                                  handleEdit(e, item, "editWithNew")
                                }
                              >
                                <Pencil className="w-4 h-4" />
                                <span>Edit new versions</span>
                              </DropdownMenuItem>
                            </>
                          )}
                        {+userData?.query?.role !== UserRole.Trainee && (
                          <DropdownMenuItem
                            className={`flex items-center gap-2 font-nunito ${
                              +userData?.query?.role === UserRole.Trainee
                                ? "hidden"
                                : "flex"
                            }`}
                            disabled={item?.status !== "PUBLISHED"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(item?.currentVersion?.mainCourse?.id);
                              setSelectedCourse(item);
                            }}
                          >
                            <Combine className="w-4 h-4" />
                            <span>Allocate</span>
                          </DropdownMenuItem>
                        )}
                        {(item?.trainerId?.id === +userData?.query?.detailsid ||
                          +userData?.query?.role !== UserRole.Trainee) &&
                          ["DRAFT", "READYTOPUBLISH"].includes(
                            item?.status
                          ) && (
                            <DropdownMenuItem
                              className={`items-center gap-2 font-nunito ${
                                pathName === "trainee" &&
                                item?.trainerId?.id ===
                                  +userData?.query?.detailsid
                                  ? "flex"
                                  : ""
                              }`}
                              onClick={(e: any) => {
                                e.stopPropagation();
                                setIsDelete(true);
                                setSingleCourse(item);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          )}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <Loading isLoading={createNewVersionPending || isStatusLoading} />
      <ConfirmModal
        open={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={handleDeleteCourse}
        value={singleCourse?.title || ""}
        isLoading={deleteCoursePending}
        message={`Do you want to delete ${
          singleCourse?.title || "this course"
        }?`}
      />
      {publishCoursePending ||
        (copyCoursePending && (
          <div className="fixed w-full top-0 left-0 h-full z-50 flex justify-center items-center bg-[#00000050]">
            <Loader className="w-10 h-10 text-primary" />
          </div>
        ))}
    </>
  ) : (
    <span className="py-10 block text-center">No data found</span>
  );
};

export default GridView;
