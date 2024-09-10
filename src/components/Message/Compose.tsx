import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { fetchMessageRoles } from "@/lib/utils";
import { setPath } from "@/redux/reducer/PathReducer";
import { sendMessage } from "@/services/apiServices/chatServices";
import { getTargetUserby } from "@/services/apiServices/clientServices";
import { fetchEmails } from "@/services/apiServices/emailTemplate";
import { uploadFile } from "@/services/apiServices/upload";
import { ErrorType } from "@/types/Errors";
import { EmailTemplateType } from "@/types/message";
import { MessageUserRole, UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa6";
import { IoIosArrowRoundBack, IoIosDocument } from "react-icons/io";
import { MdClose, MdOutlineAttachFile } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { z } from "zod";
import Loading from "../comman/Error/Loading";
import { TrainerStatus } from "@/types/Trainer";

interface SendMessagePayload {
  senderId: string;
  receiverId: string;
  message?: string;
  images?: string[];
}

const Compose = () => {
  const navigate = useNavigate();

  const { targetAudienceId } = useSelector((state: any) => state.user);

  const { role, UserId } = useSelector((state: any) => state.user);

  const { toast } = useToast();
  const [client, setClient] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [selectTab, setSelectTab] = useState<number>(
    role === UserRole?.Trainer ? 1 : 5
  );
  const [isActive, setIsActive] = useState(
    role === UserRole?.Employee ? "company" : "client"
  );

  // const [userRole, setUserRole] = useState<number>(role === UserRole?.Trainer ? 2 : 6);
  const [images, setImages] = useState<string[]>([]);
  const [selectToValue, setSelectToValue] = useState<any>();
  const [emailTemplateMessage, setEmailTemplateMessage] =
    useState<EmailTemplateType>({} as EmailTemplateType);
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (role === UserRole?.Trainer) {
      setSelectTab(
        isActive === "client"
          ? MessageUserRole?.Client
          : isActive === "employee"
          ? MessageUserRole.Employee
          : isActive === "trainee"
          ? MessageUserRole.Trainee
          : MessageUserRole.Company
      );
    } else if (role === UserRole?.Company) {
      setSelectTab(
        isActive === "client"
          ? MessageUserRole?.Client
          : isActive === "employee"
          ? MessageUserRole.Employee
          : isActive === "trainee"
          ? MessageUserRole.Trainee
          : MessageUserRole.Trainer
      );
    } else if (role === UserRole?.Trainee) {
      setSelectTab(
        isActive === "client"
          ? MessageUserRole?.Trainer
          : isActive === "company"
          ? MessageUserRole?.Company
          : MessageUserRole?.Employee
      );
    } else if (role === UserRole?.Employee) {
      setSelectTab(
        isActive === "company"
          ? MessageUserRole?.Company
          : isActive === "trainee"
          ? MessageUserRole?.Trainee
          : MessageUserRole?.Trainer
      );
    }
  }, [isActive]);

  const { data: fetchTargetUserbyList, refetch: refetchTargetUserby } =
    useQuery({
      queryKey: [QUERY_KEYS.getTargetUserby, targetAudienceId],
      queryFn: () => getTargetUserby(userID as string),
    });

  useEffect(() => {
    refetchTargetUserby();
  }, [selectTab]);

  const fetchAssignToList = (selectType: string) => {
    const selectedType =
      selectType === "client" ? "admin" : selectType.replace(/ /g, "");

    if (role === UserRole?.Trainer) {
      setSelectToValue(
        fetchTargetUserbyList?.data?.data?.[0]?.trainerCompanyDetails?.[
          selectedType
        ]?.filter((item: any) => item.status === TrainerStatus.Active)
      );
    } else if (role === UserRole?.Company) {
      setSelectToValue(
        fetchTargetUserbyList?.data?.data?.[0]?.companyDetails?.[selectedType]
      );
    } else if (role === UserRole?.Trainee) {
      setSelectToValue(
        fetchTargetUserbyList?.data?.data?.[0]?.trainerDetails?.[selectedType]
      );
    } else if (role === UserRole?.Employee) {
      setSelectToValue(
        fetchTargetUserbyList?.data?.data?.[0]?.employeeDetails?.[selectedType]
      );
    }
  };

  useEffect(() => {
    fetchAssignToList(isActive);
  }, [isActive, fetchTargetUserbyList]);

  const {
    data: emailtemplateList,
    isPending,
    refetch: refetchEmailtemplateList,
  } = useQuery({
    queryKey: [QUERY_KEYS.emailTemplate],
    queryFn: () => fetchEmails(selectTab),
  });

  useEffect(() => {
    refetchEmailtemplateList();
  }, [selectTab]);

  const schema = z.object({
    to: z
      .string({ required_error: "Please select this field" })
      .min(1, "Please select this field"),
    emailTemplate: z.string().optional(),
    message: z.string().min(1, "Please enter message"),
  });
  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setValue(
      "message",
      emailtemplateList?.data?.data?.find(
        (item: any) => item?.id === +chatMessage
      )?.message
    );
    setEmailTemplateMessage(
      emailtemplateList?.data?.data?.find(
        (item: any) => item?.id === +chatMessage
      )
    );
  }, [chatMessage]);

  useEffect(() => {
    setValue("to", "");
    setValue("emailTemplate", "");
    setValue("message", "");
    setClient("");
    setChatMessage("");
    setEmailTemplateMessage({} as EmailTemplateType);
  }, [isActive]);

  const { mutate: handleSend, isPending: sendPending } = useMutation({
    mutationFn: (payload: SendMessagePayload) => {
      return sendMessage(payload);
    },
    onSuccess: (data) => {
      const socket = io(import.meta.env.VITE_SOCKET_URL);
      socket.emit("new message", data?.data);
      setChatMessage("");
      navigate(`/${currentUser}/message`);
      toast({
        variant: "success",
        title: data?.data?.message,
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      Array.from(fileList).map((file) => {
        upload_file(file);
      });
    }

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const { mutate: upload_file, isPending: FileUploadPending } = useMutation({
    mutationFn: (file: any) => uploadFile(file),
    onSuccess: (data) => {
      setImages((prevImages) => [...prevImages, data?.data?.data?.file]);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleSendMessage: SubmitHandler<ValidationSchema> = async (
    data: FieldValues
  ) => {
    handleSend({
      senderId: UserId,
      receiverId: data.to,
      message: data?.message,
      images: images,
    });
  };

  return (
    <>
      <Card className="border-0 shadow-none rounded-lg bg-white">
        <CardHeader className="sm:px-[20px] sm:py-3 p-[15px] border-b-[#d9d9d9] border-b border-solid">
          <div className="lg:flex block items-center justify-between">
            <div>
              {fetchMessageRoles(role)?.map((item: string) => {
                return (
                  <div
                    className={`inline-flex px-[15px] items-center py-2 border border-solid rounded-md mr-6 cursor-pointer xl:my-0 my-2 ${
                      isActive === item ? "border-[#00778B]" : ""
                    }`}
                    onClick={() => setIsActive(item)}
                  >
                    <Avatar className="w-[42px] h-[42px]">
                      <AvatarFallback className="text-white text-xl bg-[#0077A2]">
                        {item?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h6 className="leading-[19.53px] mb-px text-[black] capitalize">
                        {item}
                      </h6>
                      {/* <div className="text-neutral-400 leading-[15.6px] text-xs capitalize">
                        {item} Name
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              variant={"ghost"}
              className="text-black font-semibold gap-2 text-[16px] m-0 p-0"
              onClick={() => {
                dispatch(
                  setPath([
                    {
                      label: "Message",
                      link: `/${currentUser}/message`,
                    },
                  ])
                );
              }}
            >
              <IoIosArrowRoundBack size={26} />
              Back
            </Button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(handleSendMessage)}>
          <CardContent className="sm:pt-6 sm:pb-4 sm:px-5 p-[15px]">
            <div className="sm:mb-[29px] mb-[20px]">
              <Select
                onValueChange={(e) => {
                  setValue("to", e);
                  setClient(e);
                }}
                {...register("to")}
                value={client}
              >
                <SelectGroup>
                  <SelectLabel className="mb-[11px] !mt-0 p-0 text-base font-calibri font-normal">
                    To <span className="text-red-400">*</span>
                  </SelectLabel>
                  <SelectTrigger
                    className={`w-full px-[15px] py-4 h-[52px] text-base font-calibri${
                      !client ? "text-neutral-400 " : ""
                    } `}
                  >
                    <SelectValue placeholder={`Select ${isActive}`} />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent
                  noData={
                    selectToValue || selectToValue?.length > 0 ? false : true
                  }
                >
                  {isActive === "client" ? (
                    <>
                      {+userData?.query?.role === UserRole.Trainee ? (
                        <SelectItem
                          value={String(selectToValue?.userDetails?.id)}
                        >
                          {selectToValue?.userDetails?.name ||
                            selectToValue?.userDetails?.email?.split("@")[0]}
                        </SelectItem>
                      ) : (
                        <SelectItem
                          value={String(selectToValue?.clientDetails?.id)}
                        >
                          {selectToValue?.clientDetails?.name ||
                            selectToValue?.clientDetails?.email?.split("@")[0]}
                        </SelectItem>
                      )}
                    </>
                  ) : selectToValue?.length > 0 ? (
                    selectToValue?.map((item: any) => {
                      return (
                        <SelectItem
                          key={item?.userDetails?.id}
                          value={String(item?.userDetails?.id)}
                        >
                          {isActive === "trainer Company"
                            ? `${
                                item?.contactFirstName || item?.providerName
                                  ? item?.contactFirstName || item?.providerName
                                  : item?.userDetails?.email?.split("@")[0]
                              } ${item?.contactSurname}`
                            : item?.name || item?.email?.split("@")[0]}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <span className="py-3 h-full block text-center text-lg text-neutral-400">
                      No data found
                    </span>
                  )}
                </SelectContent>
              </Select>
              {!errors?.to?.ref?.value && (
                <ErrorMessage message={errors.to?.message as string} />
              )}
            </div>

            <div className="sm:mb-[29px] mb-[20px]">
              <Select
                onValueChange={(e) => {
                  setValue("emailTemplate", e);
                  setChatMessage(e);
                }}
                {...register("emailTemplate")}
                value={String(chatMessage)}
              >
                <SelectGroup>
                  <SelectLabel className="mb-[11px] p-0 text-base font-calibri font-normal">
                    {role === UserRole?.SuperAdmin
                      ? "Email Templates"
                      : "Message Templates"}
                  </SelectLabel>
                  <SelectTrigger
                    className={`w-full px-[15px] py-4 h-[52px] placeholder:text-[#A3A3A3] text-base font-calibri`}
                  >
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                </SelectGroup>
                <SelectContent>
                  {emailtemplateList?.data.data &&
                  emailtemplateList?.data.data?.length > 80 ? (
                    emailtemplateList?.data.data.map((item: any) => {
                      return (
                        <SelectItem key={item?.id} value={String(item?.id)}>
                          {item?.name}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <span className="py-3 h-full block text-center text-lg text-neutral-400">
                      No data found
                    </span>
                  )}
                </SelectContent>
              </Select>
              {!errors?.emailTemplate?.ref?.value && (
                <ErrorMessage
                  message={errors.emailTemplate?.message as string}
                />
              )}
            </div>
            <div>
              <Label className="mb-[11px] inline-block text-base font-calibri font-normal">
                Message <span className="text-red-400">*</span>
              </Label>
              <div>
                <Textarea
                  className="h-[250px] px-[15px] py-[20px] shadow-none outline-none focus:border-[#4b4b4b] resize-none bg-white border border-[#d9d9d9] placeholder:text-[#A3A3A3] text-base font-calibri"
                  placeholder="Enter message"
                  {...register("message")}
                  // onChange={(e) => setChatMessage(e.target.value)}
                  defaultValue={emailTemplateMessage?.message}
                />
                {!errors?.message?.ref?.value && (
                  <ErrorMessage message={errors.message?.message as string} />
                )}
                {images?.length > 0 ? (
                  <div className="p-3 py-4 flex gap-5 overflow-x-auto bg-[#F5F5F5] mt-5">
                    {images.map((image, index: number) => {
                      return (
                        <div key={index} className="relative">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="absolute -right-2 -top-2 h-4 w-4"
                            onClick={() => removeImage(index)}
                          >
                            <MdClose className="h-4 w-4" />
                          </Button>
                          {image?.endsWith(".pdf") ? (
                            <div className="flex items-center">
                              <IoIosDocument />
                              <span className="mx-3 text-medium">
                                {image?.split("/")?.[3]}
                              </span>
                            </div>
                          ) : (
                            <img
                              src={image}
                              alt={`Preview-${index}`}
                              className="h-[50px]"
                            />
                          )}
                        </div>
                      );
                    })}
                    {FileUploadPending && <p>Loading...</p>}
                  </div>
                ) : (
                  FileUploadPending && (
                    <p className="p-3 py-4 overflow-x-auto bg-[#F5F5F5] mt-5">
                      Loading...
                    </p>
                  )
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-[20px] block py-0 pb-4">
            <div className="flex justify-between items-center">
              <div className="flex">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <FaImage className="text-[26px]" />
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    multiple
                  />
                </label>
                <label htmlFor="pdfUpload" className="cursor-pointer">
                  <MdOutlineAttachFile className="text-[26px] ml-5" />
                  <input
                    id="pdfUpload"
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    multiple
                  />
                </label>
              </div>
              <Button
                type="submit"
                className="px-[30px] py-[15px] bg-[#58BA66] text-base"
                disabled={sendPending || FileUploadPending}
                // onClick={() => {
                // 	if (id && client && (chatMessage || images?.length > 0)) {
                // 		handleSend({
                // 			senderId: id,
                // 			receiverId: client,
                // 			message: chatMessage,
                // 			images,
                // 		});
                // 	}
                // }}
              >
                {sendPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                SEND
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>

      <Loading isLoading={isPending} />
    </>
  );
};

export default Compose;
