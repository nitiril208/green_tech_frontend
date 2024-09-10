import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { MeasureEntity } from "@/types/employee";
import { CircleCheck, Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import DelayModel from "../Roadmap/DelayModel";

type ActionItemsProps = {
  data: MeasureEntity;
};

const ActionItemsList = ({ data }: ActionItemsProps) => {
  const [isOpenDelayModel, setIsOpenDelayModel] = useState(false);
  const [uploadData, setUploadData] = useState<any>(null);
  const status = () => {
    if (
      moment(new Date(data.startDate), "YYYY-MM-DD").isSameOrBefore(
        moment(new Date(), "YYYY-MM-DD")
      ) &&
      moment(new Date(data.endDate), "YYYY-MM-DD").isSameOrAfter(
        moment(new Date(), "YYYY-MM-DD")
      )
    ) {
      return "On time";
    } else if (
      moment(new Date(), "YYYY-MM-DD").isAfter(
        moment(new Date(data.endDate), "YYYY-MM-DD")
      )
    ) {
      return "Delay";
    } else if (
      moment(new Date(data.startDate), "YYYY-MM-DD").isAfter(
        moment(new Date(), "YYYY-MM-DD")
      )
    ) {
      return "On time";
    }
  };
  return (
    <div className="sm:flex block items-center justify-between last:border-none border-b border-[#D9D9D9] sm:p-5 p-3 ">
      <Modal
        open={isOpenDelayModel}
        onClose={() => setIsOpenDelayModel(false)}
        className="sm:py-5 p-4 sm:px-6 lg:max-w-[800px] sm:max-w-xl max-w-[335px] rounded-xl"
      >
        <DelayModel
          uploadData={uploadData}
          setUploadData={setUploadData}
          handleClose={() => setIsOpenDelayModel(false)}
        />
      </Modal>
      <div className="flex flex-col sm:gap-3 gap-2">
        <h5>{data.measure}</h5>
        <h6 className="sm:text-sm text-xs text-[#00000099] font-nunito flex items-center xl:mb-0 mb-2">
          <MdOutlineCalendarMonth className="h-[20px] w-[20px] text-[#666666] me-2" />
          Date:
          <span className="text-black ps-2">
            {moment(new Date(data.startDate)).format("Do MMMM YYYY")}-
            {moment(data.endDate).format("Do MMMM YYYY")}
          </span>
        </h6>
      </div>
      <div className="sm:text-right text-left sm:block flex sm:gap-0 gap-2.5 items-center">
        {!data.iscompleted && (
          <Button
            className={`${
              status() === "Delay"
                ? "bg-[#F63636] text-white"
                : "bg-[#FFD56A] text-black"
            } text-sm font-calibri rounded-full h-[28px] px-2 min-w-[66px] sm:mb-2.5 mb-0`}
          >
            {status()}
          </Button>
        )}

        {!data.iscompleted && (
          <Button
            onClick={() => {
              setIsOpenDelayModel(true);
              setUploadData(data);
            }}
            className="bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]"
          >
            <BsPencilFill />
            Edit
          </Button>
        )}

        {!!data?.iscompleted && (
          <div className="flex gap-3 items-center">
            {data?.evidence && (
              <a
                href={data.evidence ? data.evidence : ""}
                target="_blank"
                className="gap-2 bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]"
              >
                <Eye width={18} />
                view
              </a>
            )}

            <Button className="bg-transparent text-[#58BA66] sm:text-base text-sm font-nunito font-semibold flex items-center sm:px-2.5 px-0">
              <CircleCheck width={20} /> Completed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionItemsList;
