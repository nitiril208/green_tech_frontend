import { ScrollArea } from "@/components/ui/scroll-area";
import { EvaluteDataEntity } from "@/types/enroll";
import EvaluateModalDetailsItem from "./EvaluateModalDetailsItem";

interface EvaluateModalDetailsProps {
  data: EvaluteDataEntity[];
  courseId: number;
  employeeId: number;
}

const EvaluateModalDetails = ({ data, courseId, employeeId }: EvaluateModalDetailsProps) => {
  const evaluationsData = data?.filter((item) => item?.evaluations?.length > 0);
  
  return (
    <div className="">
      <div className="sm:px-5 px-4 pb-2">
        <h3 className="sm:text-2xl text-base font-calibri font-bold pb-2">
          Evaluate
        </h3>
        <p className="text-[#606060] text-[15px] font-abhaya leading-[15px]">
          See how many keywords have been correctly matched, and submit them to
          approve
        </p>
      </div>
      <ScrollArea className="xl:h-[600px] sm:h-[500px] h-[400px]">
        {evaluationsData?.length > 0 ? evaluationsData?.map((item, index) => {
            return (
              <EvaluateModalDetailsItem key={index} data={item} index={index} courseId={courseId} employeeId={employeeId} />
            );
          }) : <span className="flex justify-center items-center py-10 h-[400px]">No Data Found</span>}
      </ScrollArea>
    </div>
  );
};

export default EvaluateModalDetails;
