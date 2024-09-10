import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import InputWithLabel from "@/components/comman/InputWithLabel";
import Loader from "@/components/comman/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { uploadImage } from "@/services/apiServices/upload";
import { getUserDetails, updateUserDetails } from "@/services/apiServices/user";
import { UserRole } from "@/types/UserRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import * as zod from "zod";

// const birthMonth = [
//   {
//     label: "January",
//     value: "january",
//   },
//   {
//     label: "February",
//     value: "february",
//   },
//   {
//     label: "March",
//     value: "march",
//   },
//   {
//     label: "April",
//     value: "april",
//   },
//   {
//     label: "May",
//     value: "may",
//   },
// ];

// const birthDate = [
//   {
//     label: "1",
//     value: "1",
//   },
//   {
//     label: "2",
//     value: "2",
//   },
//   {
//     label: "3",
//     value: "3",
//   },
//   {
//     label: "4",
//     value: "4",
//   },
//   {
//     label: "5",
//     value: "5",
//   },
// ];

// const birthYear = [
//   {
//     label: "1998",
//     value: "1",
//   },
//   {
//     label: "1999",
//     value: "2",
//   },
//   {
//     label: "2000",
//     value: "3",
//   },
//   {
//     label: "2001",
//     value: "4",
//   },
//   {
//     label: "2002",
//     value: "5",
//   },
// ];

const ProfileSetting = ({ handleClose }: { handleClose: () => void }) => {
  // const [selectBirthMonth, setSelectBirthMonth] = useState("");
  // const [selectBirthDate, setSelectBirthDate] = useState("");
  // const [selectBirthYear, setSelectBirthYear] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [profile_image, setProfileImage] = useState<string>("");
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];

  const schema = zod
    .object({
      firstname: zod.string().nonempty("Please enter first name"),
      lastname: zod.string().nonempty("Please enter last name"),
      smeOrganisation: zod.string().optional(),
      email: zod.string(),
      mobilenumber: zod
        .string()
        .max(15, { message: "Please enter valid mobile number" })
        .optional(),
      gender: zod.string(),
    })
    .superRefine((_, ctx) => {
      if (
        +userData!.query?.role !== UserRole.Company &&
        !_.mobilenumber &&
        _.mobilenumber &&
        _.mobilenumber?.length < 8
      ) {
        return ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "Please enter mobile number",
          path: ["mobilenumber"],
        });
      }
      if (+userData!.query?.role === UserRole.Company && !_.smeOrganisation) {
        return ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "Please enter SME organisation name",
          path: ["smeOrganisation"],
        });
      }
    });

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });
  console.log("🚀 ~ ProfileSetting ~ errors:", errors);

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.userDetails, { id: userData?.query?.id }],
    queryFn: () => getUserDetails(userData?.query?.id),
  });

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (data) => {
      const newUser = {
        ...userData,
        query: {
          ...data?.data,
          detailsid: userData?.query?.detailsid,
          role: userData?.query?.role.toString(),
        },
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      reset();
      handleClose();
      toast({ title: "Profile updated successfully", variant: "success" });
    },
  });

  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setProfileImage(data.data?.data?.image);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);

      setValue("firstname", data?.data?.fname || "");
      setValue("lastname", data?.data?.lname || "");
      setValue(
        "smeOrganisation",
        data?.data?.name || data?.data?.smeOrganisation || ""
      );
      setValue("email", data?.data?.email || "");
      setValue("mobilenumber", data?.data?.number || "");
      setValue("gender", data?.data?.gender);
      setProfileImage(data?.data?.image);
      const userData = JSON.parse(localStorage.getItem("user") as string);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          query: {
            ...userData?.query,
            fname: data?.data?.fname,
            lname: data?.data?.lname,
          },
        })
      );
    }
  }, [data]);

  const onSubmit = (data: FieldValues) => {
    const payload = {
      firstName: data?.firstname,
      lastName: data?.lastname,
      gender: data?.gender,
      smeOrganisation: data?.smeOrganisation,
      number: data?.mobilenumber,
      image: profile_image || "",
      userid: userData?.query?.id,
    };
    mutate(payload);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      event.target.files?.[0] !== undefined && event.target.files?.[0];
    const formData = new FormData();
    // @ts-ignore
    formData.append("image", file);
    upload(formData);
  };

  console.log("data?.data", data?.data?.companyDetails?.companyId);

  return (
    <div className="flex flex-col gap-5">
      {isPending ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-5">
            <div className="col-span-full mx-auto text-center">
              <label htmlFor="upload" className="cursor-pointer">
                <Avatar className="w-20 h-20">
                  <input
                    type="file"
                    id="upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                  {isUploading ? (
                    <p className="bg-white text-center flex justify-center items-center w-full h-full">
                      Loading...
                    </p>
                  ) : (
                    <>
                      <AvatarImage src={profile_image ? profile_image : ""} />
                      <AvatarFallback className="uppercase shadow-lg text-[26px] font-nunito">
                        {watch("firstname")?.[0] || watch("email")?.[0] || ""}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              </label>
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <InputWithLabel
                label={"First name"}
                placeholder={"First name"}
                {...register("firstname")}
                error={errors?.firstname?.message as string}
              />
            </div>

            <div className="col-span-1 flex flex-col gap-1">
              <InputWithLabel
                label={"Last name"}
                placeholder={"Last name"}
                {...register("lastname")}
                error={errors?.lastname?.message as string}
              />
            </div>
          </div>
          {currentUser === "company" && (
            <>
              <div className="col-span-1 flex flex-col gap-1">
                <InputWithLabel
                  label={"SME Organisation"}
                  placeholder={"SME Organisation"}
                  {...register("smeOrganisation")}
                  className="font-bold text-slate-900"
                  disabled
                  error={errors?.smeOrganisation?.message as string}
                />
              </div>
              <div className="col-span-1 flex flex-col gap-1">
                <InputWithLabel
                  label={"Company Id"}
                  placeholder={"Company Id"}
                  disabled
                  className="font-bold text-slate-900"
                  value={data?.data?.companyDetails?.companyId}
                  error={errors?.smeOrganisation?.message as string}
                />
              </div>
            </>
          )}
          {+userData?.query.role !== UserRole.Company && (
            <div className="flex flex-col gap-1 py-2">
              <label className="font-primary text-[14px] font-[400] leading-normal text-[#111821] md:text-[14px]">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <PhoneInputWithCountrySelect
                placeholder="Enter phone number"
                international
                onChange={(e: any) => {
                  setValue("mobilenumber", e);
                }}
                disabled={data?.data?.number ? true : false}
                value={watch("mobilenumber") || ""}
                className="phone-input"
              />
              {errors.mobilenumber && (
                <ErrorMessage message={errors.mobilenumber.message as string} />
              )}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <InputWithLabel
              label="Email"
              disabled={watch("email") ? true : false}
              placeholder="Email"
              {...register("email")}
              className="font-bold text-slate-900"
              error={errors?.email?.message as string}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="font-primary text-[14px] font-[400] leading-normal text-[#111821] md:text-[14px]">
              Gender
            </Label>
            <RadioGroup
              onValueChange={(data) => setValue("gender", data)}
              value={watch("gender")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="male"
                  id="option-one"
                  className="border-[#9B9B9B] w-6 h-6"
                />
                <Label
                  htmlFor="option-one"
                  className="text-[#9B9B9B] text-sm font-sans"
                >
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="female"
                  id="option-two"
                  className="border-[#9B9B9B] w-6 h-6"
                />
                <Label
                  htmlFor="option-two"
                  className="text-[#9B9B9B] text-sm font-sans"
                >
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-1">
            {/* <Label className="sm:text-base text-sm font-nunito text-black">
              Birth Date
            </Label>
            <div className="flex items-center gap-5">
              <SelectMenu
                option={birthMonth}
                setValue={(data: string) => setSelectBirthMonth(data)}
                value={selectBirthMonth}
                className="font-nunito text-sm text-black"
                placeholder="January"
              />
              <SelectMenu
                option={birthDate}
                setValue={(data: string) => setSelectBirthDate(data)}
                value={selectBirthDate}
                className="font-calibri text-sm text-black"
                placeholder="1"
              />
              <SelectMenu
                option={birthYear}
                setValue={(data: string) => setSelectBirthYear(data)}
                value={selectBirthYear}
                className="font-calibri text-sm text-black"
                placeholder="2000"
              />
            </div> */}
            <div className="text-center mt-5">
              <Button
                type="submit"
                isLoading={isPendingMutation}
                className="bg-[#00778B] font-abhaya text-base px-7"
              >
                Edit
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileSetting;
