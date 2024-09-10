import { useAppSelector } from "@/hooks/use-redux";
import { createEmployeeInvition } from "@/services/apiServices/member";
import { EmployeePayload } from "@/types/Invition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Modal from "../comman/Modal";
import TextAreaWithLabel from "../comman/TextAreaWithLabel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const schema = z.object({
  invitiondetail: z.string().min(1, { message: "Email address is required" }),
});
const InviteMember = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { CompanyId } = useAppSelector((state) => state.user);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();
  const [emails, setEmails] = useState<{
    email: string;
    fName: string;
    lName: string;
  }>({
    email: "",
    fName: "",
    lName: "",
  });
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
    onSuccess: () => {
      reset();
      setEmails({
        email: "",
        fName: "",
        lName: "",
      });
      setIsOpen(false);
      toast({ title: "Invitation sent successfully", variant: "success" });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const isCheckValid =
      emails.email !== "" && emails.fName !== "" && emails.lName !== "";

    if (!isCheckValid) {
      setError("Please fill all the fields");
      return;
    } else {
      const payload: EmployeePayload = {
        email: [emails],
        csvUrl: "",
        invitationDetails: data?.invitiondetail,
        companyId: CompanyID,
      };
      setError("");
      createEmployeeInvitionlist(payload);
    }
  };
  return (
    <Modal
      open={isOpen}
      header="Invite Team Member"
      className="max-w-[815px] w-full gap-0"
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="bg-[#FFFFFF] rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="text-[16px] font-nunito font-semibold pt-5 pb-2">
              Enter Team Member Email ID
            </h3>
            <div className="mt-[10px]">
              <div className="flex lg:flex-nowrap flex-wrap items-center sm:gap-5 gap-3 w-full mb-2">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={emails?.fName}
                  name="fName"
                  onChange={(e) =>
                    setEmails({ ...emails, fName: e.target.value })
                  }
                  className="border rounded p-3 sm:w-[200px] w-full h-[52px]"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lName"
                  value={emails?.lName}
                  onChange={(e) =>
                    setEmails({ ...emails, lName: e.target.value })
                  }
                  className="border rounded p-3 sm:w-[200px] w-full h-[52px]"
                />
                <Input
                  value={emails?.email}
                  name="email"
                  onChange={(e) =>
                    setEmails({ ...emails, email: e.target.value })
                  }
                  placeholder="Enter email id"
                  className="border rounded p-3 sm:w-[200px] w-full h-[52px]"
                />
              </div>
              {error && <ErrorMessage message={error} />}
            </div>
          </div>

          <div className="mt-[33px]">
            <TextAreaWithLabel
              className=" text-base font-nunito"
              label="Invitation Details"
              labelClassName="font-nunito font-semibold !text-base"
              {...register("invitiondetail")}
              placeholder="Enter Details"
              isLength={false}
            />
            {errors.invitiondetail?.message && (
              <ErrorMessage message={errors.invitiondetail.message as string} />
            )}
          </div>

          <div className="text-end mt-[10px] ">
            <Button
              type="submit"
              className="bg-[#64A70B] text-base leading-5 w-[100px] h-[40px] font-semibold font-nunito"
              isLoading={isPending}
            >
              Send Invite
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default InviteMember;
