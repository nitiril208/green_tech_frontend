/* eslint-disable @typescript-eslint/ban-ts-comment */
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import TextAreaWithLabel from "@/components/comman/TextAreaWithLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { chatDPColor } from "@/lib/utils";
import { trainerAllocateCourse } from "@/services/apiServices/allocatedcourse";
import {
  getTrainerByCompanyId,
  trainerInvitation,
} from "@/services/apiServices/trainer";
import { AllCoursesResult } from "@/types/courseManagement";
import { AllocatedTraineeListResponse } from "@/types/Trainee";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as zod from "zod";

interface CourseViewAllocatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  selectedCourse: AllCoursesResult | null;
}

const schema = zod.object({
  fname: zod.string().min(1, { message: "First name is required" }),
  lname: zod.string().min(1, { message: "Last name is required" }),
  email: zod.string().email({ message: "Please enter valid email" }),
  message: zod.string().optional(),
});

export function AllocatedCertificateModal({
  isOpen,
  onClose,
  courseId,
  selectedCourse,
}: CourseViewAllocatePopupProps) {
  const [isInvite, setIsInvite] = useState(false);
  const [selectFilter, setSelectFilter] = useState<number[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const id = userData?.query?.detailsid;
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<AllocatedTraineeListResponse>({
    queryKey: ["trainer", { id }],
    queryFn: () => getTrainerByCompanyId({ id, courseId: courseId.toString() }),
    enabled: !!id && !!courseId,
  });

  const courseData = data?.data && data?.data?.trainer;

  useEffect(() => {
    if (data?.data?.trainer) {
      data?.data?.trainer?.map((item) => {
        if (item?.courseAllocated?.find((itm) => itm?.id === courseId)) {
          setSelectFilter((prev) => [...prev, item.id]);
        } else {
          setSelectFilter((prev) => [...prev]);
        }
      });
    }
  }, [data?.data?.trainer, courseId]);

  const showInviteForm = () => {
    setIsInvite(true);
  };

  const { mutate: allocate, isPending: isLoadingAllocate } = useMutation({
    mutationFn: trainerAllocateCourse,
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Course allocated successfully",
      });
      handleClose();
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const handleAllocate = () => {
    const payload = {
      courseId: +courseId as number,
      traineeId: selectFilter || [],
    };

    allocate(payload);
  };

  const filterCourseData = courseData?.filter(
    (item) => item?.id !== selectedCourse?.trainerId?.id
  );
  const handleAllCheckboxChange = () => {
    if (selectFilter?.length === filterCourseData?.length) {
      setSelectFilter([]);
    } else {
      setSelectFilter(
        (filterCourseData &&
          filterCourseData?.map((item) => item?.id as number)) ||
          []
      );
    }
  };

  const handleEmployeeCheckboxChange = (employeeId: number) => {
    setSelectFilter((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const isAllSelected =
    filterCourseData &&
    filterCourseData?.length > 0 &&
    selectFilter?.length === filterCourseData?.length;

  const handleClose = () => {
    onClose();
    setIsInvite(false);
    reset();
  };

  const { mutate, isPending: isInvitePending } = useMutation({
    mutationFn: trainerInvitation,
    onSuccess: (data) => {
      if (data?.data?.trainerExist?.length > 0) {
        toast({
          title: "Error",
          description: "Trainer invitation already send.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: data?.message,
          variant: "success",
        });
      }
      queryClient?.invalidateQueries({
        queryKey: ["trainer", { id }],
      });
      reset();
      setIsInvite(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInvite = (data: FieldValues) => {
    const payload = {
      name: data?.fname,
      surname: data?.lname,
      email: [data?.email],
      invitationDetails: data?.details,
      TrainerCompanyId: id,
    };

    mutate(payload);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className="lg:max-w-[800px] md:max-w-[700px] sm:max-w-[580px] max-w-[350px] w-full overflow-y-auto max-h-full rounded-lg sm:p-[22px] p-[15px]"
    >
      {isPending ? (
        <Loader />
      ) : (
        <ScrollArea className="h-[500px]">
          <div>
            {isInvite ? (
              <div className="pt-[10px]">
                <div className="mb-3 flex items-end justify-between">
                  <div className="">
                    <h5 className="text-[16px] font-calibri font-bold leading-5 pb-[6px]">
                      Invite Team Member
                    </h5>
                    <p className="text-[15px] text-[#606060] font-semibold">
                      Drop them an invite so they can join with their sleeves
                      rolled
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setIsInvite(false)}
                    className="p-0 h-auto hover:bg-transparent text-black"
                  >
                    <MoveLeft /> Back
                  </Button>
                </div>
                <form onSubmit={handleSubmit(handleInvite)}>
                  <div className="grid grid-cols-2 gap-x-[29px] gap-y-[18px]">
                    <div className="sm:col-span-1 col-span-2">
                      <InputWithLabel
                        type="text"
                        label="First Name"
                        className="font-nunito mt-[8px] text-[#000000] sm:text-[16px] text-[14px] sm:h-[52px] h-[45px]"
                        placeholder="Enter First Name"
                        labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                        {...register("fname")}
                        error={errors?.fname?.message as string}
                      />
                    </div>
                    <div className="sm:col-span-1 col-span-2">
                      <InputWithLabel
                        type="text"
                        label="Last Name"
                        placeholder="Enter Last Name"
                        className="font-nunito mt-[8px] text-[#000000] sm:text-[16px] text-[14px] sm:h-[52px] h-[45px]"
                        labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                        {...register("lname")}
                        error={errors?.lname?.message as string}
                      />
                    </div>
                    <div className="col-span-2">
                      <InputWithLabel
                        type="text"
                        label="Team Member Email"
                        placeholder="Enter email id"
                        className="font-nunito mt-[8px] text-[#000000] sm:text-[16px] text-[14px] sm:h-[52px] h-[45px]"
                        labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                        {...register("email")}
                        error={errors?.email?.message as string}
                      />
                    </div>
                    <div className="col-span-2">
                      <TextAreaWithLabel
                        label="Invitation Details"
                        placeholder="Enter Details"
                        className="font-nunito text-[#000000] sm:text-[16px] text-[14px]"
                        labelClassName="text-[#000000] !text-[16px] font-nunito leading-[22px]"
                        isLength={false}
                        {...register("message")}
                        error={errors?.message?.message as string}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-end mt-[20px]">
                    <Button
                      type="submit"
                      className="bg-[#58BA66] text-white w-[100px] sm:h-[52px] h-[45px] rounded mt-[5px] text-base"
                    >
                      {isInvitePending ? (
                        <Loader containerClassName="h-auto" />
                      ) : (
                        "Send Invite"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 pb-0">
                  <h2 className="text-base font-bold">Trainee</h2>
                  <div className="flex items-center">
                    <label className="font-bold mr-[10px]">Select All</label>
                    <input
                      type="checkbox"
                      name="all"
                      className="h-[18px] w-[18px] rounded focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                      checked={isAllSelected}
                      onChange={handleAllCheckboxChange}
                    />
                  </div>
                </div>
                <div className="p-4 min-h-[390px] h-full max-h-[360px] overflow-auto">
                  {courseData && courseData?.length > 0 ? (
                    courseData?.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center justify-between mb-2 border-b pb-2 border-[#D9D9D9]"
                      >
                        <div className="flex items-center gap-[15px]">
                          <Avatar>
                            <AvatarImage src={employee.profileImage || ""} />
                            <AvatarFallback
                              style={{ background: chatDPColor(employee?.id) }}
                            >
                              {employee.name?.charAt(0) ||
                                employee.email?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {employee.name || employee.email.split("@")?.[0]}
                          </span>
                        </div>
                        <input
                          key={employee?.id}
                          type="checkbox"
                          name={`employee-${employee?.id}`}
                          className="h-[18px] w-[18px] rounded focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                          disabled={
                            selectedCourse?.trainerId?.id === employee?.id
                          }
                          checked={selectFilter?.includes(employee?.id)}
                          onChange={() =>
                            handleEmployeeCheckboxChange(employee?.id)
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center min-h-[350px] h-full flex items-center justify-center">
                      No data found
                    </div>
                  )}
                </div>
                <div className="w-full flex items-center justify-between mt-2">
                  <Button
                    type="button"
                    className="bg-[#00778B] text-white lg:w-[137px] w-[130px] lg:h-[52px] h-[45px] rounded mt-[5px] text-base"
                    onClick={showInviteForm}
                  >
                    Invite Member
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#58BA66] text-white lg:w-[137px] w-[130px] lg:h-[52px] h-[45px] rounded mt-[5px] text-base"
                    onClick={handleAllocate}
                  >
                    {isLoadingAllocate ? (
                      <Loader containerClassName="h-auto" />
                    ) : (
                      "Edit Allocation"
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      )}
    </Modal>
  );
}
