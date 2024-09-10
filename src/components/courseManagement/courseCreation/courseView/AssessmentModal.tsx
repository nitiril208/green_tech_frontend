import { QUERY_KEYS } from "@/lib/constants";
import { getAssessmentOptions } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import AssessmentModalSelectItem from "./AssessmentModalSelectItem";

interface AssessmentModalProps {
  moduleId?: string;
  setIsOpenAssessmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  sectionID?: number;
}

const AssessmentModal = ({
  moduleId,
  setIsOpenAssessmentModal,
  sectionID,
}: AssessmentModalProps) => {
  const { data: assessmentOptions } = useQuery({
    queryKey: [QUERY_KEYS.assessmentOptions],
    queryFn: () => getAssessmentOptions(),
  });

  return (
    <div>
      <div className="p-4">
        <h5 className="font-bold text-black sm:text-xl text-base font-calibri pb-2.5">
          Select Question Type
        </h5>
        <p className="text-[#606060] sm:text-[15px] text-sm font-abhaya leading-[16px] pb-5">
          Which format would best suit this particular assessment question?
        </p>
      </div>
      <div className="flex items-center md:justify-center justify-center gap-[30px] flex-wrap !pt-0 p-[18px] ">
        {assessmentOptions?.data?.data &&
          Object.entries(assessmentOptions?.data?.data)?.map((data, index) => {
            return (
              <AssessmentModalSelectItem
                setIsOpenAssessmentModal={setIsOpenAssessmentModal}
                key={index}
                data={data}
                moduleId={moduleId}
                sectionID={sectionID}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AssessmentModal;
