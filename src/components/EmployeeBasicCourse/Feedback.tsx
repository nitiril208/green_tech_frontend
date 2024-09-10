import { QUERY_KEYS } from "@/lib/constants";
import { getFeedback } from "@/services/apiServices/review";
import { GetFeedback } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../comman/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FeedbackCard from "./FeedbackCard";

const Feedback = ({ data }: any) => {
  const [filter, setFilter] = useState("");
  const { data: feedback, isLoading } = useQuery<GetFeedback>({
    queryKey: [QUERY_KEYS?.feedback, { filter }],
    queryFn: () => getFeedback(data?.course?.id, filter),
  });

  console.log("data123", data);
  

  return (
    <div className="">
      <div className="flex items-center justify-end mb-4">
        <Select
          value={filter}
          defaultValue="All"
          onValueChange={(e) => setFilter(e)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TopReview">Top Reviews</SelectItem>
            <SelectItem value="MostRecent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col w-full gap-y-4">
        {isLoading ? (
          <Loader />
        ) : feedback?.data && feedback?.data?.length > 0 ? (
          feedback?.data?.map((item) => {
            return <FeedbackCard data={item} />;
          })
        ) : (
          <div className="flex justify-center items-center py-10">
            No Feedback
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
