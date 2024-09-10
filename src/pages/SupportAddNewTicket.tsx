import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import Loading from "@/components/comman/Error/Loading";
import FileUpload from "@/components/comman/FileUpload";
import { Button } from "@/components/ui/button";
import { InputWithLable } from "@/components/ui/inputwithlable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  createSupportTicket,
  fetchAssigToUser,
} from "@/services/apiServices/supportRequestServices";
import { SubmitPayload } from "@/types/SupportRequest";
import { UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FiImage, FiVideo } from "react-icons/fi";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { z } from "zod";

function SupportAddNewTicket() {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { UserId } = useSelector((state: any) => state.user);
  const [selectAssignTo, setSelectAssignTo] = useState("");
  const [selectTicketPriority, setSelectTicketPriority] = useState("");
  const [selectTicketType, setSelectTicketType] = useState("");
  const [file, setFile] = useState("");
  const [video, setVideo] = useState<any>(undefined);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const schema = z.object({
    assignTo: z.string({ required_error: "Please select assigned to" }),
    ticketPriority: z.string({
      required_error: "Please select ticket priority",
    }),
    ticketType: z.string({
      required_error: "Please select ticket type",
    }),
    ticketSubject: z
      .string({ required_error: "Please enter ticket subject" })
      .min(1, { message: "Please enter ticket subject" })
      .max(200, { message: "Ticket subject cannot exceed 200 characters" }),
    description: z
      .string({ required_error: "Please enter description" })
      .min(1, { message: "Please enter description" }),
    uploadDocument: z
      .string({ required_error: "Please upload document" })
      .optional(),
    uploadVideo: z.string({ required_error: "Please upload video" }).optional(),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { data: fetchAssigToUserList, isPending: assigToUserListPending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchAssigToUserList],
      queryFn: () => fetchAssigToUser(UserId),
      enabled: !!UserId,
    });
  const assigToUserList = fetchAssigToUserList?.data?.filter(
    (item) => item !== null
  );

  const { mutate: createSupportRequestTicket, isPending: createPanding } =
    useMutation({
      mutationFn: (e: SubmitPayload) => createSupportTicket(e),
      onSuccess: () => {
        reset();
        setFile("");
        setVideo(undefined);
        setSelectAssignTo("");
        setSelectTicketPriority("");
        toast({ title: "Ticket Created Successfully", variant: "default" });
        dispatch(
          setPath([
            {
              label: "Support Ticket",
              link: `/${Role}/support-request`,
            },
          ])
        );
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.supportTicketList],
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      },
    });

  const onSubmit = (data: FieldValues) => {
    const payload: SubmitPayload = {
      assignTo: +data.assignTo,
      priority: data.ticketPriority,
      type: data.ticketType,
      subject: data.ticketSubject,
      description: data.description,
      documentUrl: data.uploadDocument ? data.uploadDocument : "",
      videoUrl: data.uploadVideo ? data.uploadVideo : "",
      openBy: user?.query?.id,
      email: user?.query?.email,
    };

    createSupportRequestTicket(payload);
  };

  return (
    <div className="h-full bg-[white] rounded-[10px] font-nunitoSans overflow-auto">
      <div className="border-b-2 border-solid gray flex justify-between items-center p-[16px] ">
        <div>
          <h2 className="font-[700] text-[16px]">Add New Ticket</h2>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(
                setPath([
                  {
                    label: "Support",
                    link: null,
                  },
                  {
                    label: "Support Request",
                    link: `/${Role}/support-request`,
                  },
                ])
              );
            }}
            className="text-[16px] font-[600] flex items-center gap-[15px]"
          >
            <HiOutlineArrowNarrowLeft />
            Back
          </button>
        </div>
      </div>
      <div className="sm:p-5 p-[15px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-[36px] gap-0 mb-5">
            <div className="col-span-1 w-full">
              <Select
                onValueChange={(e) => {
                  setValue("assignTo", e);
                  setSelectAssignTo(e as string);
                }}
                value={selectAssignTo}
                {...register("assignTo")}
              >
                <SelectGroup>
                  <SelectLabel className="mb-[11px] text-base p-0 font-[600]">
                    Assigned To <span className="text-red-400">*</span>
                  </SelectLabel>
                  <SelectTrigger
                    className={`w-full px-[15px] py-4 h-[52px] placeholder:text-neutral-400 `}
                  >
                    <SelectValue placeholder={`Select Name`} />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent className="min-w-full w-full max-w-full max-h-[300px]">
                  {assigToUserListPending ? (
                    <span className="flex justify-center py-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </span>
                  ) : assigToUserList && assigToUserList?.length > 0 ? (
                    assigToUserList?.map((item: any) => {
                      return (
                        <>
                          <SelectItem
                            key={item.id}
                            value={String(item?.userDetails?.id)}
                            className="w-full"
                          >
                            <div className="flex items-center sm:gap-5 gap-2">
                              <p className="text-left">
                                {item?.userDetails?.role === UserRole?.Employee
                                  ? "Employee"
                                  : item?.userDetails?.role ===
                                    UserRole?.Company
                                  ? "SME Company"
                                  : item?.userDetails?.role ===
                                    UserRole?.Trainer
                                  ? "Trainer Provider"
                                  : item?.userDetails?.role ===
                                    UserRole?.Trainee
                                  ? "Trainer"
                                  : "Client Admin"}
                              </p>{" "}
                              <p className="text-neutral-400">--</p>{" "}
                              <p className="max-w-[220px] break-all	">
                                {item?.userDetails?.role === UserRole?.Trainer
                                  ? item?.providerName
                                  : item?.name || item?.email?.split("@")?.[0]}
                              </p>
                            </div>
                            {/* {!!item?.userDetails
                              ? item?.userDetails?.name ||
                                item?.userDetails?.email?.split("@")?.[0]
                              : item?.clientDetails?.name ||
                                item?.clientDetails?.email?.split("@")?.[0]} */}
                          </SelectItem>
                        </>
                      );
                    })
                  ) : (
                    <span>No data found</span>
                  )}
                </SelectContent>
              </Select>
              {!errors?.assignTo?.ref?.value && (
                <ErrorMessage message={errors?.assignTo?.message as string} />
              )}
            </div>
            <div className="col-span-1 w-full">
              <Select
                onValueChange={(e) => {
                  setValue("ticketPriority", e);
                  setSelectTicketPriority(e);
                }}
                value={selectTicketPriority}
                {...register("ticketPriority")}
              >
                <SelectGroup>
                  <SelectLabel className="mb-[11px] text-base p-0 font-[600]">
                    Ticket Priority <span className="text-red-400">*</span>
                  </SelectLabel>
                  <SelectTrigger
                    className={`w-full px-[15px] py-4 h-[52px] placeholder:text-neutral-400 `}
                  >
                    <SelectValue placeholder={`Select ticket prority`} />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent>
                  <SelectItem value={"Low"}>Low</SelectItem>
                  <SelectItem value={"Medium"}>Medium</SelectItem>
                  <SelectItem value={"High"}>High</SelectItem>
                </SelectContent>
              </Select>
              {!errors?.ticketPriority?.ref?.value && (
                <ErrorMessage
                  message={errors?.ticketPriority?.message as string}
                />
              )}
            </div>
            <div className="col-span-1 w-full">
              <Select
                onValueChange={(e) => {
                  setValue("ticketType", e);
                  setSelectTicketType(e);
                }}
                value={selectTicketType}
                {...register("ticketType")}
              >
                <SelectGroup>
                  <SelectLabel className="mb-[11px] text-base p-0 font-[600]">
                    Ticket Type <span className="text-red-400">*</span>
                  </SelectLabel>
                  <SelectTrigger
                    className={`w-full px-[15px] py-4 h-[52px] placeholder:text-neutral-400 `}
                  >
                    <SelectValue placeholder={`Select Ticket Type`} />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent>
                  <SelectItem value={"Technical"}>Technical</SelectItem>
                  <SelectItem value={"Feature Request"}>
                    Feature Request
                  </SelectItem>
                  <SelectItem value={"Suggestion"}>Suggestion</SelectItem>
                  <SelectItem value={"Data Actraction"}>
                    Data Actraction
                  </SelectItem>
                  <SelectItem value={"Bug Report"}>Bug Report</SelectItem>
                  <SelectItem value={"General Inquiry"}>
                    General Inquiry
                  </SelectItem>
                </SelectContent>
              </Select>
              {!errors?.ticketType?.ref?.value && (
                <ErrorMessage message={errors?.ticketType?.message as string} />
              )}
            </div>
          </div>
          <InputWithLable
            label="Ticket Subject"
            type="text"
            placeholder="Enter ticket subject"
            className={`text-[16px] h-[52px] bg-white px-5 py-[15px]`}
            isMendatory
            {...register("ticketSubject")}
          />
          {errors?.ticketSubject && (
            <ErrorMessage message={errors?.ticketSubject?.message as string} />
          )}
          <div className="mt-5">
            <Label className="mb-[10px] text-base p-0 font-[600] block">
              Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              className="px-[13px] py-21px] shadow-none outline-none focus:border-[#4b4b4b] resize-none bg-white border border-solid border-[#d9d9d9]"
              placeholder="Enter details"
              rows={8}
              {...register("description")}
            />
            {errors?.description && (
              <ErrorMessage message={errors?.description?.message as string} />
            )}
          </div>
          <div className="sm:flex block justify-between mt-[34px]">
            <div className="sm:flex block gap-[32px]">
              <FileUpload
                handleDrop={(e) => {
                  setValue("uploadDocument", e);
                  setFile(e);
                }}
                className="border-none cursor-pointer !p-0 w-[200px]"
                acceptType=".pdf"
              >
                <div className="flex items-center justify-between sm:mb-0 mb-3">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
                      <FiImage className="w-6 h-6" />
                    </div>
                    <span>Upload Document</span>
                  </div>
                  {file && (
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="p-0 h-auto hover:bg-transparent"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile("");
                      }}
                    >
                      <X />
                    </Button>
                  )}
                </div>
                {file && (
                  <a
                    href={file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 w-full overflow-hidden text-ellipsis bg-[#E3E5F5] p-3 rounded-sm"
                  >
                    View
                  </a>
                )}
              </FileUpload>
              <FileUpload
                handleDrop={(e) => {
                  setValue("uploadVideo", e);
                  setVideo(e);
                }}
                className="border-none cursor-pointer !p-0 w-[200px]"
                acceptType=".mp4"
              >
                <div className="flex items-center justify-between sm:mb-0 mb-3">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
                      <FiVideo className="w-6 h-6" />
                    </div>
                    <span>Upload Video</span>
                  </div>
                  {video && (
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="p-0 h-auto hover:bg-transparent"
                      onClick={(e) => {
                        e.preventDefault();
                        setVideo(null);
                      }}
                    >
                      <X />
                    </Button>
                  )}
                </div>
                {video && (
                  <a
                    href={video}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 w-full overflow-hidden text-ellipsis bg-[#E3E5F5] p-3 rounded-sm"
                  >
                    View
                  </a>
                )}
              </FileUpload>
            </div>
            <div>
              <Button className="py-[15px] px-[30px] bg-primary-button">
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Loading isLoading={createPanding} />
    </div>
  );
}

export default SupportAddNewTicket;
