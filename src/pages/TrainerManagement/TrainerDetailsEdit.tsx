/* eslint-disable @typescript-eslint/ban-ts-comment */
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  inviteSingleEmployeeDetail,
  updateEmployee,
} from "@/services/apiServices/employee";
import { uploadImage } from "@/services/apiServices/upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pencil, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useNavigate, useParams } from "react-router-dom";

const TrainerEditDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [trainerDetails, setTrainerDetails] = useState({
    name: "",
    contact: "",
    image: "",
  });
  const params = useParams();

  const [trainerStatus, setTrainerStatus] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.employeeDetails, { id: params.id }],
    queryFn: () => inviteSingleEmployeeDetail(params.id!),
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      dispatch(
        setPath([
          {
            label: "Trainer Managment",
            link: null,
          },
          {
            label: "Team List",
            link: null,
          },
        ])
      );

      navigate(`/company/employeelist`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setTrainerDetails((prev) => ({
        ...prev,
        image: data?.data?.data?.image,
      }));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (data) {
      setTrainerStatus(data?.employeeStatus === "Active" ? 1 : 0);
      setTrainerDetails({
        name: data?.name,
        // @ts-ignore
        contact: data?.phone,
        image: data?.profileImage || "",
      });
    }
  }, [data]);

  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setTrainerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      event.target.files?.[0] !== undefined && event.target.files?.[0];
    const formData = new FormData();
    // @ts-ignore
    formData.append("image", file);
    upload(formData);
  };

  const handleSubmit = () => {
    const payload = {
      name: trainerDetails?.name,
      phone: trainerDetails?.contact,
      profileImage: trainerDetails?.image,
      employeeStatus: +trainerStatus === 1 ? "Active" : "Inactive",
    };
    mutate({ id: params?.id ? params?.id : "", data: payload });
  };

  return (
    <div className="pb-[36px] bg-primary-foreground rounded-[10px] sm:h-full h-[calc(100vh-190px)] font-nunitoSans overflow-auto">
      <div className="border-b-2 pb-[25px] flex justify-between pl-[22px] pr-[28px] items-center pt-[24px]">
        <h2 className="text-base font-bold font-nunito pb-1">
          Trainers Details
        </h2>
        <Button
          variant={"ghost"}
          className="p-0 text-base font-nunito font-bold"
          onClick={() => window.history.back()}
        >
          <IoIosArrowRoundBack size={26} />
          Back
        </Button>
      </div>

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="px-[22px]">
            <div className="mt-[17px]">
              <fieldset className="border rounded-[10px]">
                <legend className="mx-[35px] text-base">
                  <h2 className="font-nunito text-base">
                    Trainer personal information
                  </h2>
                </legend>
                <div className="grid grid-cols-9 items-center gap-4 sm:px-[25px] sm:py-[20px] p-[15px]">
                  <div className="text-base xl:col-span-2 col-span-4">
                    {/* <Avatar className="w-[109px] h-[109px]">
                      <AvatarImage src={data?.profileImage || ""} />
                      <AvatarFallback className="text-xl">
                        {data?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar> */}
                    {trainerDetails?.image ? (
                      <>
                        {isUploading ? (
                          <p className="bg-white text-center flex justify-center items-center w-28 h-28 rounded-full">
                            <Loader containerClassName="h-auto" />
                          </p>
                        ) : (
                          <div className="relative w-28 h-28">
                            <Avatar className="w-28 h-28">
                              <AvatarImage
                                src={
                                  data?.profileImage || trainerDetails?.image
                                }
                              />
                              <AvatarFallback className="uppercase shadow-lg text-[40px] font-nunito">
                                {data?.name?.charAt(0) ||
                                  data?.email?.split("@")[0].charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <label
                              htmlFor="upload"
                              className="absolute right-0 top-0"
                            >
                              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer">
                                <Pencil className="w-4 h-4 text-gray-800" />
                              </div>
                            </label>
                          </div>
                        )}
                      </>
                    ) : (
                      <label htmlFor="upload">
                        <div className="w-[100px] h-[100px] bg-slate-200 rounded-full flex items-center justify-center cursor-pointer">
                          {isUploading ? <Loader /> : <Upload />}
                        </div>
                      </label>
                    )}
                    <input
                      type="file"
                      id="upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </div>
                  <div className="text-base xl:col-span-2 col-span-5 gap-4 sm:ps-0 ps-3">
                    <h6 className="text-[#A3A3A3] text-base font-nunito pb-2.5">
                      Trainer name
                    </h6>
                    <InputWithLabel
                      placeholder="John"
                      className="h-[46px]"
                      name="name"
                      onChange={handleChanges}
                      value={trainerDetails?.name || ""}
                    />
                    {/* <p className="text-base font-nunito">{data?.name || "-"}</p> */}
                  </div>
                  <div className="text-base xl:col-span-2 sm:col-span-4 col-span-9 xl:pt-0 pt-3">
                    <h6 className="text-[#A3A3A3] text-base font-nunito pb-2.5">
                      Contact number
                    </h6>
                    {/* <InputWithLabel
                      placeholder="Contact Number"
                      className="h-[46px]"
                      name="contact"
                      onChange={handleChanges}
                      value={trainerDetails?.contact || ""}
                    /> */}
                    <PhoneInputWithCountrySelect
                      placeholder="Enter phone number"
                      value={trainerDetails?.contact || ""}
                      international
                      onChange={(e: any) => {
                        setTrainerDetails((prev) => ({ ...prev, contact: e }));
                      }}
                      className="phone-input font-normal"
                    />
                    {/* <p className="text-base font-nunito">{"-"}</p> */}
                  </div>
                  <div className="text-base xl:col-span-3 sm:col-span-5 col-span-9 xl:pt-0 pt-3">
                    <h6 className="text-[#A3A3A3] text-base font-nunito pb-2.5">
                      Email address
                    </h6>
                    <p className="text-base font-nunito">
                      {data?.email || "-"}
                    </p>
                  </div>
                </div>
              </fieldset>
            </div>
            {/* <div className="mt-[40px]">
            <fieldset className="border rounded-[10px]">
              <legend className="mx-[35px] text-base">
                <h2>Provider information</h2>
              </legend>
              <div className="pl-[25px] pb-[29px]">
                <div className="grid grid-cols-4 items-center pt-[21px]">
                  <div className="text-base">
                    <h6 className="text-[#A3A3A3]">Provider name</h6>
                    <p>{"-"}</p>
                  </div>
                  <div className="text-base">
                    <h6 className="text-[#A3A3A3]">Provider type</h6>
                    <p>{"-"}</p>
                  </div>
                  <div className="text-base">
                    <h6 className="text-[#A3A3A3]">Country</h6>
                    <p>{"-"}</p>
                  </div>
                  <div className="text-base">
                    <h6 className="text-[#A3A3A3]">City / Town</h6>
                    <p>{"-"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center pt-[32px]">
                  <div className="text-base">
                    <h6 className="text-[#A3A3A3]">Foreign provider</h6>
                    <p>{"-"}</p>
                  </div>
                  <div className="text-base">
                    <h6 className="text-[#A3A3A3]">Provider note</h6>
                    <p>{"-"}</p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div> */}
            <div className="xl:mt-[27px] mt-[22px]">
              <fieldset className="border rounded-[10px]">
                <legend className="mx-[35px] text-base">
                  <h2 className="text-base font-nunito">Trainer Status</h2>
                </legend>
                <div className="pl-[25px] py-[20px] flex items-center gap-[59px]">
                  <RadioGroup
                    onValueChange={(value: any) => setTrainerStatus(value)}
                    // disabled={true}
                    value={trainerStatus.toString()}
                    className="flex items-center gap-[34px]"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={"1"}
                        indicatorClassName="!w-auto !h-auto"
                        id="r1"
                      />
                      <Label
                        htmlFor="r1"
                        className="text-base font-nunito font-normal"
                      >
                        Active
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={"0"}
                        indicatorClassName="!w-auto !h-auto"
                        id="r3"
                      />
                      <Label
                        htmlFor="r3"
                        className="text-base font-nunito font-normal"
                      >
                        Inactive
                      </Label>
                    </div>
                  </RadioGroup>
                  {/* <Button className="xl:text-base text-sm font-nunito font-semibold xl:w-[121px] xl:h-[52px] w-[100px] h-[40px] bg-[#58BA66]">
                    SUBMIT
                  </Button> */}
                </div>
              </fieldset>
            </div>
            <div className="mt-[40px] text-right">
              <Button
                className="w-[100px] h-[52px] bg-[#58BA66] text-white font-nunito font-semibold"
                isLoading={isMutating}
                onClick={() => {
                  handleSubmit();
                }}
              >
                SAVE
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerEditDetails;
