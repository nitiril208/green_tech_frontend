import { QUERY_KEYS } from "@/lib/constants";
import {
  getOneFeedback,
  updateFeedback,
} from "@/services/apiServices/feedback";
import { addReview } from "@/services/apiServices/review";
import { getSingleCourseType } from "@/types/course";
import { FeedbackSingleResponse } from "@/types/feedback";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../comman/Loader";
import Rating from "../Rating";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

const ReviewModal = ({ course, onClose }: getSingleCourseType | any) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [courseRatting, setCourseRatting] = useState(0);
  const [trainerRatting, setTrainerRatting] = useState(0);
  const [review, setReview] = useState("");
  const queryClient = useQueryClient();
  const [shareFeedback, setShareFeedback] = useState(false);

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    if (value.length <= 250) {
      setReview(value);
    }
  };

  const { data, isLoading } = useQuery<FeedbackSingleResponse>({
    queryKey: ["feedback"],
    queryFn: () => getOneFeedback(course?.course?.id, userData?.query?.id),
    enabled: !!course?.course?.id || !!userData?.query?.id,
  });
  console.log("data", data);
  

  useEffect(() => {
    if (data) {
      setCourseRatting(data?.data?.courseRate);
      setTrainerRatting(data?.data?.trainerRate);
      setReview(data?.data?.discription);
      setShareFeedback(!!data?.data?.shareFeedback)
    }
  }, [data]);

  const { mutate, isPending: isPendingAdd } = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.feedback],
      });
    },
  });

  const { mutate: update, isPending } = useMutation({
    mutationFn: updateFeedback,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.feedback],
      });
    },
  });

  const handleClose = () => {
    onClose();
    setCourseRatting(0);
    setTrainerRatting(0);
    setReview("");
  };

  const handleSubmit = () => {
    if (data) {
      const payload = {
        courseRate: courseRatting,
        trainerRate: trainerRatting,
        discription: review,
        shareFeedback: shareFeedback,
      };
      update({ id: data?.data?.id, data: payload });
    } else {
      const payload = {
        courseRate: courseRatting,
        trainerRate: trainerRatting,
        discription: review,
        user: userData?.query?.id,
        course: course?.course?.id,
        trainerCompany: course?.course?.trainerId
          ? course?.course?.trainerId?.trainerCompany?.id
          : course?.course?.trainerCompanyId?.id,
      };
      mutate(payload);
    }
  };

  return (
    <div>
      <h4 className="xl:text-[28px] text-[22px] font-bold font-nunito text-black pb-5 lg:text-left text-center">
        Your feedback would go a long way!
      </h4>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-5 items-center mb-5 sm:gap-5 gap-2">
            <span className="text-black lg:text-base text-sm font-nunito sm:col-span-3 col-span-5 font-semibold">
              How would you rate the course?
            </span>
            <div className="flex md:gap-3 gap-2 items-center col-span-2">
              <Rating
                value={courseRatting}
                onChange={(val) => setCourseRatting(val)}
                className="gap-4"
                edit={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 items-center mb-6 sm:gap-5 gap-2">
            <span className="text-black lg:text-base text-sm font-nunito sm:col-span-3 col-span-5 font-semibold">
              And how would you rate the trainer?.
            </span>
            <div className="flex md:gap-3 gap-2 items-center col-span-2">
              <Rating
                value={trainerRatting}
                onChange={(val) => setTrainerRatting(val)}
                className="gap-4"
                edit={true}
              />
            </div>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Leave a review...     Just a sentence or the all details of your experience!"
              onChange={handleReviewChange}
              value={review}
              className="lg:px-5 lg:py-4 p-3 border border-[#D9D9D9] text-[15px] placeholder:text-[#A3A3A3]"
              rows={5}
            />
            <div className="right-2 bottom-2 absolute text-[#A3A3A3] text-[12px]">
              {review.length}/{250}
            </div>
          </div>
        </>
      )}
      <div className="grid lg:grid-cols-3 grid-cols-1 items-center mt-5">
        <div className="col-span-1 lg:flex hidden items-center">
          <Checkbox
            className="me-3"
            onCheckedChange={() => setShareFeedback(!shareFeedback)}
          />
          <h5 className="text-[#888888] font-inter text-sm">
            I’m totally fine with my review to be shared on social media.
          </h5>
        </div>
        <div className="col-span-2 flex gap-4 items-center lg:justify-end justify-start">
          <Button
            type="button"
            disabled={
              review === "" || courseRatting === 0 || trainerRatting === 0
            }
            isLoading={isPending || isPendingAdd}
            onClick={handleSubmit}
            className="bg-[#64A70B] lg:text-base md:text-sm text-xs font-bold font-Poppins xl:w-[130px] w-[120px] xl:h-[48px] h-[42px]"
          >
            Share it
          </Button>
          <Button
            type="button"
            onClick={handleClose}
            className="bg-[#E41B1B] lg:text-base md:text-sm text-xs font-bold font-Poppins xl:w-[130px] w-[120px] xl:h-[48px] h-[42px]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
