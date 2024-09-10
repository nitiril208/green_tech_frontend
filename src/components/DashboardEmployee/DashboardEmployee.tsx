import MaturityLevel from "./MaturityLevel";
import MyAction from "./MyAction";
import MyCourses from "./MyCourses";
import RecentCourses from "./RecentCourses";
import LiveSessions from "./LiveSessions";

const DashboardEmployee = () => {
  return (
    <div className="bg-white rounded-b-xl py-0 p-5">
      <div className="py-5">
        <MaturityLevel />
        <MyAction />
        <MyCourses />
        <RecentCourses />
        <LiveSessions />
      </div>
    </div>
  );
};

export default DashboardEmployee;
