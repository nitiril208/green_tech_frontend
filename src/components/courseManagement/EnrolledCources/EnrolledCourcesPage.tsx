import EnrolledCourseList from "./EnrolledCourseList";

const EnrolledCourcesPage = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  return (
    <div>
      <div className="flex justify-between items-center py-2 px-4 border-b border-[#D9D9D9] mb-7">
        <div>
          <h6 className="text-[16px] font-semibold font-calibri pb-1">
            Enrolled Courses
          </h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
            {+userData?.query?.role === 2
              ? "Here are all the companies and their cohorts who’ve been involved in this course"
              : +userData?.query?.role === 3
              ? "Here is the full list of your courses that companies are currently enrolled in"
              : "The full list of your courses that are currently enrolled in by companies"}
          </p>
        </div>
      </div>
      <EnrolledCourseList />
    </div>
  );
};

export default EnrolledCourcesPage;
