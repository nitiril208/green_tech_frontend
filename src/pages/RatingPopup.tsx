import { Card } from "@/components/ui/card";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface FeedbackRatingProps {
  label: string;
  rating: number;
  onRate: (newRating: number) => void;
}

const FeedbackRating: React.FC<FeedbackRatingProps> = ({
  label,
  rating,
  onRate,
}) => {
  return (
    <div className="flex items-center">
      <span className="font-semibold mr-2">{label}</span>
      {[...Array(5)].map((_, i) => (
        <button key={i} onClick={() => onRate(i + 1)} className="focus:">
          {i < rating ? (
            <FaStar className="text-[#FFA000]" />
          ) : (
            <FaRegStar className="text-[#606060]" />
          )}
        </button>
      ))}
    </div>
  );
};

function RatingPopup() {
  const [courseRating, setCourseRating] = useState(0);
  const [trainerRating, setTrainerRating] = useState(0);
  const [consent, setConsent] = useState(false);

  const handleConsentChange = () => {
    setConsent(!consent);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4">
      <Card className="bg-white rounded-lg w-full max-w-[610px] h-auto p-4">
        <div className="ml-2 mt-4">
          <h1 className="text-[28px] font-bold mb-4">
            Wind energy basic course
          </h1>
          <FeedbackRating
            label="Course Feedback:"
            rating={courseRating}
            onRate={setCourseRating}
          />
          <div className="mt-4">
            <FeedbackRating
              label="Trainer Feedback:"
              rating={trainerRating}
              onRate={setTrainerRating}
            />
          </div>
        </div>

        <div className="p-4 ml-2 mt-4">
          <textarea
            className="border-2 border-[#D9D9D9] rounded w-full h-[150px] py-2 px-3 placeholder-[#A3A3A3]"
            placeholder="Write a review..."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 ml-2 mt-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={handleConsentChange}
              className="w-5 h-5"
            />
            <label className="flex-1 text-[#888888]">
              I have no objections sharing my review in social media.
            </label>
          </div>

          <div className="flex space-x-2">
            <button className="bg-[#64A70B] w-[130px] h-[48px] text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
            <button className="bg-[#E41B1B] w-[130px] h-[48px] text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RatingPopup;
