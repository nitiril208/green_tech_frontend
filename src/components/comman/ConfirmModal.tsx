import cross from "@/assets/images/cross.svg";
import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import Modal from "./Modal";

interface AreYouSureModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  value: string;
  isLoading?: boolean;
  message?: string;
}

export const ConfirmModal = ({
  open,
  onClose,
  onDelete,
  value,
  isLoading,
  children,
  message,
}: AreYouSureModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center">
        <div className="flex justify-center">
          <img src={cross} alt="" />
        </div>
        <h2 className="mt-[26px] text-[24px] font-bold">Are you sure</h2>
        <p className="mt-[19px] text-[16px]">
          {message
            ? message
            : `Do you want to delete ${value || "this"} Record?`}
        </p>
        <div className="mt-[49px] flex justify-center gap-[14px]">
          <Button
            className="bg-[#FF5252] text-[16px] font-semibold px-[30px] py-[15px]"
            onClick={onClose}
          >
            NO
          </Button>
          <Button
            className="bg-[#58BA66] text-[16px] font-semibold px-[30px] py-[15px]"
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading && (
              <Loader2 className=" h-4 w-4 animate-spin text-white" />
            )}
            YES
          </Button>
        </div>
      </div>
      {children}
    </Modal>
  );
};
