import { useLocation } from "react-router-dom";
import EmployeeHeader from "./EmployeeHeader";
import MainHeader from "./MainHeader";
function HeaderCourse() {
  const location = useLocation();
  const Role = location.pathname.split("/")[1];
  
  return (
    <>
      <div className={`${Role === "employee" ? "hidden" : "block"}`}>
        <MainHeader />
      </div>
      <div className={`${Role === "employee" ? "block" : "hidden"}`}>
        <EmployeeHeader />
      </div>
    </>
  );
}

export default HeaderCourse;
