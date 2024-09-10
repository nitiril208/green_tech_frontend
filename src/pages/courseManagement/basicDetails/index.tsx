import CourseStepper from "@/components/comman/CourseStepper";
import Loader from "@/components/comman/Loader";
import CourseAffiliations from "@/components/courseManagement/courseCreation/basicDetails/CourseAffiliations";
import CourseBanner from "@/components/courseManagement/courseCreation/basicDetails/CourseBanner";
import CourseInformation from "@/components/courseManagement/courseCreation/basicDetails/CourseInformation";
import CourseLogistic from "@/components/courseManagement/courseCreation/basicDetails/CourseLogistic";
import CourseSpecifications from "@/components/courseManagement/courseCreation/basicDetails/CourseSpecifications";
import { GetSingleCourseEntity } from "@/types/course";
import React from "react";

interface BasicDetailsProps {
  courseData: GetSingleCourseEntity | null;
}

const BasicDetails = ({ courseData }: BasicDetailsProps) => {
  const search = window.location.search;
  const params = new URLSearchParams(search).get("step") || "0";
  // const [step, setStep] = React.useState<string | null>(params || null);
  const [courseById, setCourseById] = React.useState<number | null>(null);

  // useEffect(() => {
  //   if (courseData) {
  //     setStep(courseData?.course?.step?.toString() || null);
  //   }
  // }, [courseData])


  // useEffect(() => {
  //   if (!!params && !!paramsId && !!paramsversion && !!paramsTab) {
  //     navigate(
  //       `/${pathName}/create_course?tab=${paramsTab}&step=${params}&id=${paramsId}&version=${paramsversion}`
  //     );
  //     setStep(params);
  //   } else if (!!paramsId && !!paramsversion && !!paramsTab) {
  //     navigate(
  //       `/${pathName}/create_course?tab=${paramsTab}id=${paramsId}&version=${paramsversion}`,
  //       { replace: true }
  //     );
  //     setStep(params);
  //   } else if (courseId) {
  //     if(courseId && paramsTab && params && paramsversion){
  //       navigate(
  //         // `/${pathName}/create_course/${courseId}?tab=0&step=2&version=${paramsversion}`
  //         `/${pathName}/create_course/${courseId}?tab=${courseData?.course?.tab?.toString()}&step=${courseData?.course?.step}&version=${paramsversion}`
  //       );
  //       setStep(params);
  //     }else{
  //       navigate(
  //         // `/${pathName}/create_course/${courseId}?tab=0&version=${paramsversion}`
  //         `/${pathName}/create_course/${courseId}?tab=${courseData?.course?.tab?.toString()}&version=${paramsversion}`
  //       );
  //       setStep(params);
  //     }
  //   } else if (paramsTab === "1" && paramsversion && paramsId) {
  //     navigate(
  //       `/${pathName}/create_course?tab=${paramsTab}&id=${paramsId}&version=${paramsversion}`,
  //       {
  //         replace: true,
  //       }
  //     );
  //     setStep(params);
  //   } else {
  //     navigate(
  //       `/${pathName}/create_course?tab=${paramsTab}&step=${params}&version=${paramsversion}`,
  //       {
  //         replace: true,
  //       }
  //     );
  //     setStep(params);
  //   }
  // }, [paramsId, paramsversion, paramsTab, navigate, courseData]);

  return !courseData && courseById ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div className="w-full sm:my-10 mt-5 mb-[15px]">
        <CourseStepper
          steps={[
            "Course Information",
            "Course Details & Specifications",
            "Course Logistics",
            "Course Accreditations",
            "Course Banner",
          ]}
          currentStep={params}
          courseData={courseData}
        />
      </div>
      {params === "0" ? (
        <CourseInformation
          courseById={courseById}
          setCourseById={setCourseById}
        />
      ) : params === "1" ? (
        <CourseSpecifications courseById={courseById} />
      ) : params === "2" ? (
        <CourseLogistic courseById={courseById} />
      ) : params === "3" ? (
        <CourseAffiliations courseById={courseById} />
      ) : (
        <CourseBanner courseById={courseById} />
      )}
    </div>
  );
};

export default BasicDetails;
