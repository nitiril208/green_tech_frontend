import warningIcon from "@/assets/images/warningIcon.png";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import React from "react";

const ConfirmationModel = ({
  open,
  setOpen,
  handleSubmit,
  isLoader,
}: {
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  isLoader: boolean;
}) => {
  return (
    <Modal
      open={!!open}
      onClose={() => setOpen("")}
      className="px-5 sm:w-auto w-[345px] rounded-lg"
    >
      <img
        src={warningIcon}
        alt="warningIcon"
        className="w-[100px] h-[100px] mx-auto"
      />
      <p className="text-center text-[18px] font-semibold">
        Are you sure you want to Publish this course?
      </p>

      <div className="flex justify-center gap-5 sm:mt-5 mt-3">
        <Button
          type="button"
          variant={"outline"}
          className="h-auto px-5 py-1 font-inter text-md"
          onClick={() => setOpen("")}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="px-5 bg-[#58BA66] py-1 font-inter text-md"
          isLoading={isLoader}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleSubmit(e, open)
          }
        >
          Publish
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModel;
