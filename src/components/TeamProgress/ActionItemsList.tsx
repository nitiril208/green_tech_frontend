import { MeasureEntity } from "@/types/Invition";
import moment from "moment";

type ActionItems = {
  data: MeasureEntity;
};

const ActionItemsList = ({ data }: ActionItems) => {
  const status = () => {
    if (data?.iscompleted === 1) {
      return "bg-[#D2EFB6]";
    } else if (
      moment(new Date(data.startDate), "YYYY-MM-DD").isSameOrBefore(
        moment(new Date(), "YYYY-MM-DD")
      ) &&
      moment(new Date(data.endDate), "YYYY-MM-DD").isSameOrAfter(
        moment(new Date(), "YYYY-MM-DD")
      )
    ) {
      return "bg-[#EDEA89]";
    } else if (
      moment(new Date(), "YYYY-MM-DD").isAfter(
        moment(new Date(data.endDate), "YYYY-MM-DD")
      )
    ) {
      return "bg-[#F1B89C]";
    }
    return "bg-[#dadada]";
  };
  return (
    <div className="border-b border-[#D9D9D9] last:border-none md:py-4 py-3 md:px-5 px-4">
      <div className="flex gap-3">
        <div
          className={`w-[22px] h-[22px] min-w-[22px] min-h-[22px] rounded-sm ${status()}`}
        ></div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-black font-abhaya font-semibold">
            {data?.measure}
          </p>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-2">
            <div className="flex flex-col gap-2 col-span-1">
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Last Updated By :{" "}
                <span className="text-black">
                  {data?.lastUpdeated?.createdBy?.name}
                </span>
              </h6>
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Last Updated Date :{" "}
                <span className="text-black">
                  {moment(data.updatedAt).format("DD/MM/YYYY")}
                </span>
              </h6>
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Target Completion Date :{" "}
                <span className="text-black">
                  {moment(data?.endDate)?.format("DD/MM/YYYY")}
                </span>
              </h6>
              <h6 className="text-[#606060] text-sm font-abhaya font-semibold">
                Actual Completion Date :{" "}
                <span className="text-black ml-2">
                  {data?.iscompleted === 1
                    ? moment(data?.lastUpdeated?.updatedAt).format("DD/MM/YYYY")
                    : "-"}
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionItemsList;
