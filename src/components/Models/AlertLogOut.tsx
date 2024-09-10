import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RiShutDownLine } from "react-icons/ri";
import { PrimaryButton } from "../comman/Button/CustomButton";

interface AlertLogOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AlertLogOutDialog({
  isOpen,
  onClose,
  onConfirm,
}: AlertLogOutDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
        <Button style={{ display: "none" }} />
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:px-[52px] px-[40px] py-[30px] rounded-lg sm:w-full w-[345px]">
        <AlertDialogHeader className="items-center">
          <div className="flex justify-center items-center bg-[#297f94] rounded-full text-white w-[66px] h-[66px]">
            <RiShutDownLine size={24} />
          </div>
          <AlertDialogTitle className="text-[#000] text-bold text-[24px] leading-[24px] text-center">
            Are you sure ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#000] text-[16px] !mb-[8px] leading-[normal] text-center">
            Do you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center sm:gap-0 gap-[10px]">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="xl:px-[30px] w-full h-[40px] px-[15px] py-2 font-semibold !font-abhaya text-md text-[#020817]"
          >
            Cancel
          </Button>
          <PrimaryButton
            onClick={onConfirm}
            name="Log Out"
            className="xl:px-[30px] w-full px-[15px] py-2 h-[40px] primary-background font-semibold !font-abhaya text-md !sm:ml-[14px]"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
