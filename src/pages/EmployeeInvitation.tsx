import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import FileUpload from "@/components/comman/FileUpload";
import FormError from "@/components/comman/FormError";
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/use-redux";
import { createEmployeeInvition } from "@/services/apiServices/member";
import { EmployeePayload } from "@/types/Invition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface InviteData {
  email: string;
  fName: string;
  lName: string;
}

const initialData = {
  email: "",
  fName: "",
  lName: "",
};

const schema = z.object({
  file: z.string().optional(),
  invitiondetail: z
    .string()
    .min(1, { message: "Please enter invition detail" }),
});

const EmployeeInvitation = () => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [inviteData, setInviteData] = useState<InviteData[]>([initialData]);
  const [file, setFile] = useState("");
  const handleBackClick = () => {
    navigate("/company/employeelist");
  };
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const CompanyID = CompanyId
    ? CompanyId
    : userData?.query
    ? userData?.query?.companyDetails?.id
    : userData?.companyDetails?.id;

  type ValidationSchema = z.infer<typeof schema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate: createEmployeeInvitionlist, isPending } = useMutation({
    mutationFn: createEmployeeInvition,
    onSuccess: (data) => {
      if (data?.data?.data?.employeeExist?.length > 0) {
        toast({
          title: "Error",
          description: "Employee invitation already send.",
          variant: "destructive",
        });
      } else {
        reset();
        setFile("");
        navigate("/company/employeelist");
        toast({
          title: "Success",
          description: "Invitation sent successfully",
          variant: "success",
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const isCheckInvalid = inviteData.some(
      (data) => !data.email || !data.fName || !data.lName
    );

    const isEmailCheck = inviteData.every((data) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    );

    console.log("isEmailCheck", isEmailCheck);

    if (isCheckInvalid) {
      setError("Please fill all the fields");
      return;
    } else if (!isEmailCheck) {
      setError("Please Check the Email Format");
      return;
    } else {
      setError("");
      const payload: EmployeePayload = {
        email: inviteData.map((item) => ({
          ...item,
          email: item.email.trim(),
        })),
        csvUrl: data?.file,
        invitationDetails: data?.invitiondetail,
        companyId: CompanyID,
      };
      createEmployeeInvitionlist(payload);
    }
  };

  const handleAddEmail = () => {
    setInviteData((prevData) => [...prevData, initialData]);
  };

  const handleRemoveEmail = (index: number) => {
    setInviteData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;

    setInviteData((prevData) => {
      return prevData.map((data, i) => {
        if (i === index) {
          return { ...data, [name]: value };
        } else {
          return data;
        }
      });
    });
  };

  return (
    <div>
      <div className="rounded-xl">
        <div className="bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] flex items-center justify-between pb-[5px] p-5">
          <div className="">
            <p className="text-[#000000] font-calibri font-bold text-base pb-2">
              Send Invitation
            </p>
            <p className="text-[15px] font-abhaya text-[#606060] font-semibold">
              Drop them an invite so they can join you here with their sleeves
              rolled
            </p>
          </div>
          <div>
            <Button
              className="bg-transparent hover:bg-transparent text-black font-nunito font-semibold text-base p-0 h-auto"
              onClick={handleBackClick}
            >
              <IoIosArrowRoundBack size={26} />
              Back
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-5 bg-white rounded-lg">
            <h3 className="text-[16px] font-nunito font-semibold pb-2 flex sm:flex-row flex-col sm:gap-2 gap-1">
              Enter Team Member Name & Email ID
            </h3>
            {inviteData?.map((data, index, arr) => (
              <div>
                <div className="flex lg:flex-nowrap flex-wrap items-center sm:gap-5 gap-3 w-full mb-2">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={data?.fName}
                    name="fName"
                    onChange={(e) => {
                      if (/^[A-Za-z ]*$/.test(e.target.value))
                        handleChange(e, index);
                    }}
                    className="border rounded p-3 lg:w-[320px] w-[200px] h-[52px]"
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lName"
                    value={data?.lName}
                    onChange={(e) => {
                      if (/^[A-Za-z ]*$/.test(e.target.value))
                        handleChange(e, index);
                    }}
                    className="border rounded p-3 lg:w-[320px] w-[200px] h-[52px]"
                  />
                  <Input
                    value={data?.email}
                    name="email"
                    // type="email"
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Enter email id"
                    className="border rounded p-3 lg:w-[320px] w-[200px] h-[52px]"
                  />
                  {arr.length > 1 && (
                    <Button
                      variant={"ghost"}
                      type="button"
                      onClick={() => handleRemoveEmail(index)}
                    >
                      <Minus />
                    </Button>
                  )}
                  {arr.length - 1 === index && (
                    <Button
                      variant={"ghost"}
                      type="button"
                      onClick={() => handleAddEmail()}
                    >
                      <Plus />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {error && <FormError message={error} />}
          </div>

          <div className="bg-white p-5 mt-5 rounded-lg">
            <div className="">
              <p className="text-lg font-medium">Bulk Invite Team Members</p>
              <p className="text-base font-abhaya text-[#000000] font-bold">
                Want to invite a list of team members?
                <br />
                Simply prepare their details on a CSV file, keeping at least one
                row per email user, and we’ll send an invitation to each person.
              </p>
            </div>
            <p className="font-bold font-abhaya text-base">
              <a
                href="https://greentech.s3.amazonaws.com/bulk_invite_team_members_sample_file.csv"
                className="text-[#0E9CFF] underline"
              >
                Download Sample File
              </a>
            </p>
            <div className="mt-[16px] flex items-center gap-6">
              <div className="flex items-center gap-3">
                <FileUpload
                  handleDrop={(e: any) => {
                    setInviteData(e);
                  }}
                  isCSV
                  className="border-none cursor-pointer !p-0 justify-center"
                  acceptType=".csv"
                >
                  <div className="flex">
                    <span className="bg-[#00778B] w-[134px] h-[52px] leading-[52px] rounded text-white cursor-pointer !p-0 text-base font-abhaya">
                      Upload CSV File
                    </span>
                  </div>
                </FileUpload>
                {file && (
                  <label className=" w-full overflow-hidden text-ellipsis mt-[4px]">
                    {file.split("/").pop()}
                  </label>
                )}
              </div>
            </div>
          </div>

          {errors.file?.message && (
            <ErrorMessage message={errors.file.message as string} />
          )}

          <div className="mt-[20px]">
            <InputWithLabel
              className="text-[#020817] border h-[60px] mt-[10px] text-[base] font-nunito"
              label="Invitation Message"
              labelClassName="font-nunito font-semibold !text-base"
              {...register("invitiondetail")}
              placeholder="Enter Details"
            />
            {errors.invitiondetail?.message && (
              <ErrorMessage message={errors.invitiondetail.message as string} />
            )}
          </div>

          <div className="text-end mt-[30px] ">
            <Button
              type="submit"
              className="bg-[#64A70B] text-base leading-5 w-[100px] h-[52px] font-semibold font-nunito"
            >
              {isPending ? (
                <Loader containerClassName="h-auto" />
              ) : (
                "Send Invite"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeInvitation;
