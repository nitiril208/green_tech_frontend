import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { trainerInvitation } from "@/services/apiServices/trainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Minus, MoveLeft, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as Zod from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import FileUpload from "../comman/FileUpload";
import FormError from "../comman/FormError";
import InputWithLabel from "../comman/InputWithLabel";
import Loader from "../comman/Loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

interface InviteData {
  email: string;
  name: string;
  surname: string;
}

const initialData = {
  email: "",
  name: "",
  surname: "",
};

const schema = Zod.object({
  file: Zod.string().optional(),
  invitiondetail: Zod.string().min(1, {
    message: "Please enter invitation detail",
  }),
});
const TrainerInvitation = () => {
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const id = userData?.query?.detailsid;
  const [error, setError] = useState<string>("");
  const [inviteData, setInviteData] = useState<InviteData[]>([initialData]);
  const [file, setFile] = useState("");

  type ValidationSchema = Zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: trainerInvitation,
    onSuccess: (data) => {
      if (
        data?.data?.trainerExist?.length === 0 &&
        data?.data?.trainerInvited?.length === 0
      ) {
        toast({
          description: data?.message,
          variant: "destructive",
        });
        reset();
        setFile("");
        dispatch(
          setPath([
            {
              label: "Trainer Management",
              link: `/${Role}/trainer-management`,
            },
          ])
        );
      } else {
        if (data?.data?.trainerExist?.length > 0) {
          toast({
            title: "Error",
            description: data?.data?.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: data?.message,
            variant: "success",
          });
          reset();
          setFile("");
          dispatch(
            setPath([
              {
                label: "Trainer Management",
                link: `/${Role}/trainer-management`,
              },
            ])
          );
        }
        reset();
        setInviteData([initialData]);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (data: FieldValues) => {
    const isCheckInvalid = inviteData.some(
      (data) => !data.email || !data.name || !data.surname
    );

    if (isCheckInvalid) {
      setError("Please fill all the fields");
      return;
    }

    const isEmailInvalid = inviteData.some((data) => !isValidEmail(data.email));

    if (isEmailInvalid) {
      setError("Enter valid email address");
      return;
    }

    setError("");

    const payload: any = {
      email: inviteData,
      invitationDetails: data?.details,
      TrainerCompanyId: id,
      baseUrl: location?.origin,
    };
    mutate(payload);
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
    <div className="">
      <div className="px-[14px] py-[10px] flex items-center justify-between border-b bg-white">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            Trainer Management
          </h3>
          <p className="text-[#606060] text-[15px]">
            Choose a trainer to invite into this platform!
          </p>
        </div>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => {
            dispatch(
              setPath([
                {
                  label: "Trainer Managment",
                  link: `/${Role}/trainer-management`,
                },
              ])
            );
          }}
          className="gap-4 font-nunito text-[16px]"
        >
          <MoveLeft className="text-[#0f170d]" /> Back
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-6 px-5 bg-white rounded-lg">
          <h3 className="text-[16px] font-nunito font-semibold pb-2 flex sm:flex-row flex-col sm:gap-2 gap-1">
            Enter Trainer Email ID
          </h3>
          {inviteData?.map((data, index, arr) => (
            <div>
              <div className="flex lg:flex-nowrap flex-wrap items-center sm:gap-5 gap-3 w-full mb-2">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={data?.name}
                  name="name"
                  onChange={(e) => handleChange(e, index)}
                  className="border rounded p-3 lg:w-[320px] w-[200px] h-[52px]"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="surname"
                  value={data?.surname}
                  onChange={(e) => handleChange(e, index)}
                  className="border rounded p-3 lg:w-[320px] w-[200px] h-[52px]"
                />
                <Input
                  value={data?.email}
                  name="email"
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
                  const excelData = e.map((item: any) => ({
                    name: item.fName,
                    email: item.email,
                    surname: item.lName,
                  }));
                  setInviteData(excelData);
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

        {/* <div className="py-6 px-5 bg-white rounded-lg">
          <CustomTabInput setValue={setEmails} {...register("email")} />
          {!errors?.email?.ref?.value && (
            <ErrorMessage message={errors?.email?.message as string} />
          )}
        </div>
        <div className="w-full mb-[30px]">
          <Label className="text-[16px] font-nunito font-[400]">
            Invitation Message
          </Label>
          <Textarea
            className="!w-full mt-2 font-nunito focus:border-[#4b4b4b] shadow-none outline-none"
            {...register("details")}
            placeholder="Enter Details"
          />
          {errors?.details && (
            <ErrorMessage message={errors?.details?.message as string} />
          )}
        </div> */}

        <div className="text-right mt-[30px]">
          <Button
            type="submit"
            className="text-[16px] font-semibold min-w-[98px] font-nunito py-[14px] px-[8px] h-auto bg-[#58BA66]"
          >
            {isPending ? <Loader containerClassName="h-auto" /> : "Send Invite"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TrainerInvitation;
