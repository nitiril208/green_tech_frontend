import { SessionsEntity } from "@/types/dashboard";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import moment from "moment";

type liveSessionItemsProps = {
  data: SessionsEntity;
};

const LiveSessionsItems = ({ data }: liveSessionItemsProps) => {
  console.log(data, "data");

  return (
    <div className="col-span-1 md:p-5 p-4 shadow rounded-md sm:m-0 m-1">
      <div className="flex items-center">
        <div className="">
          <div className="rounded-md overflow-hidden min-w-20 min-h-20 w-20 h-20">
            <img
              src={data.course?.bannerImage}
              alt="img"
              className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
            />
          </div>
          <a
            href={data?.zoomApiBaseUrl}
            target="_blank"
            className="flex items-center bg-transparent text-sm hover:bg-transparent text-[#00778B] font-bold p-0"
          >
            JOIN <ArrowRight width={16} />
          </a>
        </div>
        <div className="md:ps-5 ps-3">
          <h5 className="md:text-base text-sm font-medium font-inter text-[#1D2026] pb-2">
            {data.subtitle}
          </h5>
          <h6 className="text-[#1D2026] md:text-sm text-xs font-normal font-inter pb-2">
            {data.description}
          </h6>
          <h6 className="flex items-center text-xs text-[#666666] pb-1">
            <CalendarDays width={14} />
            Date:{" "}
            <span className="text-black">
              {moment(data.date).format("Do MMMM, YYYY")}
            </span>
          </h6>
          <h6 className="flex items-center text-xs text-[#666666]">
            <Clock width={14} />
            Time:{" "}
            <span className="text-black">
              {moment(data.startTime).format("hh:mm A")} to{" "}
              {moment(data.startTime)
                .add(data.sessionDuration, "minutes")
                .format("hh:mm A")}
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionsItems;
