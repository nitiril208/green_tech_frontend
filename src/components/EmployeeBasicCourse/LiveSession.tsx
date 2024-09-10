import Zoom_Video from "@/assets/images/zoom-video.png";
import { ModuleSectionsEntity } from "@/types/employee";
import { CalendarDays, Clock } from "lucide-react";
import moment from "moment";
import { Button } from "../ui/button";

const LiveSession = ({ list }: { list: ModuleSectionsEntity }) => {
  console.log(list, "+++++++++++++++++++++++");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  function getTimeRemaining(startTime: string): any {
    // Parse the start time as a Date object
    const eventStartTime: Date = new Date(startTime);

    // Get the current time
    const now: Date = new Date();

    // Calculate the difference in milliseconds
    const timeDiff: number = eventStartTime.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return "The event has already started or has passed.";
    }

    // Calculate time components
    const minutes: number = Math.floor(timeDiff / 1000 / 60) % 60 || 0;
    const hours: number = Math.floor(timeDiff / 1000 / 60 / 60) % 24 || 0;
    const days: number = Math.floor(timeDiff / 1000 / 60 / 60 / 24) || 0;

    // Format the remaining time
    return { days, hours, minutes };
  }

  const timeRemaining = getTimeRemaining(list?.liveSection[0]?.startTime);

  const isEmployee = !!list?.liveSection[0]?.employee?.find(
    (item: any) => item.id === userData?.query?.detailsid
  );

  const isButtonPermission =
    +userData?.query?.role === 4
      ? isEmployee &&
        (timeRemaining?.days !== 0 ||
          timeRemaining?.hours !== 0 ||
          timeRemaining?.minutes !== 0)
      : true;

  console.log("isButtonPermission", isButtonPermission);

  return (
    <div className="bg-white min-h-[calc(100vh_-_130px)]">
      <div className="md:p-5 p-4">
        <div className="border-b border-t border-[#D9D9D9] md:py-5 py-4 mb-5">
          <div className="flex items-center md:gap-5 gap-4">
            <div className="md:w-[50px] w-[40px] md:h-[50px] h-[40px] rounded-full">
              <img src={Zoom_Video} alt="" className="w-full h-full" />
            </div>
            <div className="md:flex block items-center justify-between w-full">
              <div className="">
                <h5 className="md:text-base text-sm text-black font-bold font-nunito pb-1.5">
                  Live Session({list?.title})
                </h5>
                <div className="sm:flex block items-center gap-5 md:mb-0 mb-2">
                  <h6 className="flex items-center gap-2 text-xs text-[#777] sm:mb-0 mb-2">
                    <CalendarDays width={20} className="text-[#666666]" /> Date
                    :
                    <span className="text-black">
                      {moment(list?.liveSection[0]?.startTime).format(
                        "DD MMM, YYYY"
                      )}{" "}
                    </span>
                  </h6>
                  <h6 className="flex items-center gap-2 text-xs text-[#777]">
                    <Clock width={20} className="text-[#666666]" /> Time :{" "}
                    <span className="text-black">
                      {moment(list?.liveSection[0]?.startTime).format(
                        "hh:mm A"
                      )}{" "}
                      to{" "}
                      {moment(list?.liveSection[0]?.startTime)
                        .add(list?.liveSection[0]?.sessionDuration, "m")
                        .format("hh:mm A")}
                    </span>
                  </h6>
                </div>
              </div>
              {/* <div className="md:text-right text-left">
                <h6 className="text-[#777] text-xs font-nunito pb-2.5">
                  Assign date :
                  <span className="text-black"> -</span>
                </h6>
                <h6 className="text-[#777] text-xs font-nunito">
                  Planned completed date :
                  <span className="text-black">20th April, 2024</span>
                </h6>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bg-[#00778B1A] xl:h-[450px] sm:h-[425px] h-[380px] w-full rounded-xl flex justify-center items-center">
          <div className="text-center">
            <p className="text-[#313131] sm:text-sm text-xs font-inter mb-5">
              The meeting link will be enabled{" "}
              {`${timeRemaining?.days.toString().padStart(2, "0") ?? 0} days, ${
                timeRemaining?.hours.toString().padStart(2, "0") ?? 0
              } hours, ${
                timeRemaining?.minutes.toString().padStart(2, "0") ?? 0
              } minutes`}{" "}
              <br />
              before the scheduled time.
            </p>
            <a
              target="_blank"
              href={list?.liveSection[0]?.zoomApiBaseUrl}
              className={`bg-[#00778B] text-sm font-inter px-10 py-3 text-white rounded-[6px] sm:h-[42px] h-[36px] ${
                isButtonPermission
                  ? "pointer-events-none opacity-40"
                  : "pointer-events-auto opacity-100"
              }`}
            >
              Join
            </a>
          </div>
        </div>
      </div>

      {+userData?.query?.role === 4 && (
        <Button className="bg-[#00778B] xl:h-12 sm:h-9 h-8 px-5 font-calibri xl:w-[110px] w-[80px] xl:text-base text-sm">
          Mark As Completed
        </Button>
      )}
    </div>
  );
};

export default LiveSession;
