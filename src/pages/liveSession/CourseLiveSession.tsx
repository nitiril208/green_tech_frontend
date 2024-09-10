import TotalLiveSessionsPage from "@/components/courseManagement/TotalLiveSessions/TotalLiveSessionsPage";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { getAllLiveSession } from "@/services/apiServices/liveSession";
import { useQuery } from "@tanstack/react-query";
import { List, NotepadText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LiveSessionsCalendar from "../courseManagement/LiveSessionsCalendar";

const CourseLiveSession = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search).get("view");
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const currentUser = pathName.split("/")[1];
  const dispatch = useAppDispatch();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const changeView = (id: number) => {
    navigate(`${location?.pathname}?view=${id}`, { replace: true });
  };

  const Role = location.pathname.split("/")[1];
  let para;
  if (Role === "trainee") {
    para = "trainerId";
  } else {
    para = "trainerCompanyId";
  }

  const { data: allLiveSession } = useQuery({
    queryKey: [QUERY_KEYS.allLiveSession],
    queryFn: () => getAllLiveSession(userData?.query?.detailsid, para),
  });

  return (
    <div className="rounded-xl bg-white">
      {params === "1" && (
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start sm:gap-0 gap-3 sm:px-6 p-4 sm:py-5 border-b border-[#D9D9D9]">
          <h5 className="text-[16px] font-semibold font-calibri">
            Schedule Live Session
          </h5>

          <div className="flex items-center gap-7">
            <Button
              className={`bg-[#00778B] uppercase text-base`}
              onClick={() => {
                dispatch(
                  setPath([
                    { label: "Course Managment", link: null },
                    {
                      label: "Live Session",
                      link: `/${currentUser}/CourseLiveSession`,
                    },
                    {
                      label: "schedule-live-session",
                      link: `/${currentUser}/schedule-live-session`,
                    },
                  ])
                );
              }}
            >
              Add New
            </Button>
            <div className="flex rounded-md bg-white border border-[#D9D9D9] overflow-hidden">
              <Button
                className={`uppercase text-base rounded-none bg-transparent text-[#A3A3A3] border-e border-[#D9D9D9] hover:bg-[#00778B] hover:text-white`}
                onClick={() => changeView(0)}
              >
                <NotepadText />
              </Button>
              <Button
                className={`uppercase text-base rounded-none bg-transparent text-[#A3A3A3] hover:bg-[#00778B] hover:text-white ${
                  params === "1" ? "text-[#fff] bg-[#00778B]" : "text-[#A3A3A3]"
                }`}
                onClick={() => changeView(1)}
              >
                <List />
              </Button>
            </div>
          </div>
        </div>
      )}

      {params === "0" || !params ? (
        <div className="">
          <LiveSessionsCalendar allLiveSession={allLiveSession?.data?.data} />
        </div>
      ) : (
        <div className="">
          <TotalLiveSessionsPage allLiveSession={allLiveSession?.data?.data} />
        </div>
      )}
    </div>
  );
};

export default CourseLiveSession;
