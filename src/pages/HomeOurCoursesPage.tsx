import OurCourses from "@/components/homeOurCourses/OurCourses";
import { useEffect } from "react";

const HomeOurCoursesPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <OurCourses />
    </div>
  );
};

export default HomeOurCoursesPage;
