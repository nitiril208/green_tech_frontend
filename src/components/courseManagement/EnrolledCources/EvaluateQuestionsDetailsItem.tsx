import { EvaluationsEntity } from "@/types/enroll";

interface EvaluateQuestionsDetailsItemProps {
  item: EvaluationsEntity | null;
  index: number;
}

const EvaluateQuestionsDetailsItem = ({ item, index }: EvaluateQuestionsDetailsItemProps) => {
  const answer:any = item?.answer;
  const machedKeyword = item?.machedKeyword?.filter(
    machText => answer?.split(", ")?.includes(machText));
  return (
    <div className="border border-solid border-[#D9D9D9] rounded-sm sm:p-5 p-3">
      <div className="flex items-center pb-3">
        <h6 className="sm:text-base text-sm font-calibri font-bold pe-5 text-[#606060]">
          Question :<span className="ml-1">{index + 1}</span>
        </h6>
        <h6 className="sm:text-base text-sm font-calibri font-bold text-[#606060]">
          Points :<span>{item?.question?.point}</span>
        </h6>
      </div>
      <p className="md:text-base sm:text-sm text-xs font-calibri pb-3">
        {item?.question?.question}
      </p>
      <div className="pb-3">
        <span className="text-[#606060] font-bold sm:text-base text-sm font-calibri">
          Answer
        </span>
        <p className="sm:text-base text-sm font-calibri">{item?.answer?.[0]}</p>
      </div>
      <div className="pb-3">
        <h6 className="text-[#606060] text-xs font-calibri">
          <p className="sm:text-base text-sm font-bold">KeyWords (Matched 
            <span className="ml-1">{item?.machedKeyword?.length}</span>, Unmatched 
            <span className="ml-1">{machedKeyword?.length || 0}</span> )
          </p>
        </h6>
      </div>
      <div className="">
        <ul className="flex flex-wrap flex-row md:gap-4 gap-2.5 items-center font-calibri font-base">
          {
            item?.machedKeyword?.map((qItem, index) => {
              // @ ts-ignore
              return <li key={index} className={`text-${answer?.split(", ")?.includes(qItem) ? "white" : "black"} py-1.5 text-center bg-[${answer?.split(", ")?.includes(qItem) ? "#58BA66" : "#EDF0F4"}] px-5 rounded-full sm:text-base text-sm md:min-w-[104px] min-w-[95px]`}>
                {qItem}
              </li>
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default EvaluateQuestionsDetailsItem;
