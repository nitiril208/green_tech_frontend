/* eslint-disable @typescript-eslint/ban-ts-comment */
import { addFeedback } from "@/services/apiServices/feedback";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ErrorResponse } from "react-router-dom";
import Modal from "../comman/Modal";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const RatingModel = ({
  isOpen,
  setIsOpen,
  maxRating = 5,
}: {
  maxRating?: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [rating, setRating] = useState<number | null>(null);

  const { mutate: addFeedbackFun, isPending } = useMutation({
    mutationFn: addFeedback,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.message,
        variant: "success",
      });

      console.log("data++++", data);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          query: { ...userData?.query, givefeedback: data?.data?.giveFeedback },
        })
      );
      setIsOpen(false);
    },
    onError: (error: ErrorResponse) => {
      console.log("data++++", error);

      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const handleMouseEnter = (value: number) => {
    setRating(value);
  };

  // const handleMouseLeave = () => {
  //   setRating(0);
  // };

  const handleClick = (value: number) => {
    setRating(value);
    // if (onRate) {
    //   onRate(value);
    // }
  };

  const handleEmoji = (index: number) => {
    switch (index) {
      case 0:
        return "🙁";

      case 1:
        return "😐";

      case 2:
        return "🙂";

      case 3:
        return "😀";

      case 4:
        return "😍";

      default:
        return "🙂";
    }
  };

  const handleSubmit = () => {
    const payload: any = {
      userId: userData?.query?.id,
      feedback: rating,
    };
    console.log("payload", payload);
    addFeedbackFun(payload);
  };

  return (
    <Modal
      open={isOpen}
      header="Feedback"
      className="max-w-[515px] w-full gap-0"
      onClose={() => {
        setIsOpen(false);
      }}
      showCloseButton={false}
    >
      <div className="p-5">
        <div className="flex items-center justify-center gap-4">
          {[...Array(maxRating)].map((_, index) => {
            const value = index + 1;
            return (
              <span
                key={value}
                onMouseEnter={() => handleMouseEnter(value)}
                // onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(value)}
                style={{
                  fontSize: "2rem",
                  margin: "0 0.1rem",
                }}
                className={`${
                  // @ts-ignore
                  (rating && value === rating) || value <= rating
                    ? "grayscale-0"
                    : "grayscale"
                } cursor-pointer`}
              >
                {handleEmoji(index)}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-[#00778b]"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />} Submit
        </Button>
      </div>
    </Modal>
  );
};

export default RatingModel;
