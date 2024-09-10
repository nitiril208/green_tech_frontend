import { GetSingleCourseEntity } from "@/types/course";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type StepperProps = {
  currentStep?: string | null | undefined;
  steps: string[];
  onChangeStep?: (step: string) => void | undefined | null;
  courseData: GetSingleCourseEntity | null
};

const CourseStepper = ({ currentStep, steps, onChangeStep, courseData }: StepperProps) => {
  const search = window.location.search;
  const paramsTab = new URLSearchParams(search).get("tab") || "0";
  const paramsversion = new URLSearchParams(search).get("version");
  const paramsId = new URLSearchParams(search).get("id");
  const paramsType = new URLSearchParams(search).get("type");
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location?.pathname?.split("/")[1];
  const courseId = location?.pathname?.split("/")[3];
  const activeColor = (index: number) =>
    currentStep && +currentStep === index || currentStep && +currentStep > index ? "bg-muted" : "bg-muted";

  const activeTextColor = (index: number) =>
    currentStep && +currentStep === index ? "text-orange" : "text-grey";

  const handleChangeSteps = (index: number) => {    
    if (courseData && +courseData?.course?.step >= +index) {
      if (!+courseId) {
        navigate(`/${pathName}/create_course?tab=${paramsTab}&step=${index}&id=${paramsId}&version=${paramsversion}`);
        onChangeStep?.(index?.toString());
      } else {
        if (+courseId) {
          navigate(`/${pathName}/create_course/${courseId}?tab=${paramsTab}&step=${index}&version=${paramsversion}${paramsType ? `&type=${paramsType}` : ''}`);
          onChangeStep?.(index?.toString());
        } else if (paramsId && currentStep) {
          if (currentStep && +currentStep <= index) {
            return null
          } else {
            navigate(`/${pathName}/create_course?tab=${paramsTab}&step=${index}&id=${paramsId}&version=${paramsversion}`);
            onChangeStep?.(index?.toString());
          }
        }
      }
    }
  }

  return (
    <div>
      <div className="mt-[-17px] flex items-center justify-between relative">
        {steps.map((step, index) => (
          <Fragment key={step}>
            <div
              className={`relative flex items-center justify-center rounded-full flex-col bg-transparent ${courseData && courseData?.course?.step >= index ? "cursor-pointer" : "cursor-default"} ${activeColor(
                index
              )}`}
              onClick={() => handleChangeSteps(index)}
            >
              <div
                className={`h-8 w-8 px-4 flex items-center justify-center rounded-full z-50 ${currentStep && +currentStep === index
                    ? "bg-[#00778B] text-white"
                    : "bg-[#D9D9D9] text-black"
                  }`}
              >
                {index + 1}
              </div>
              <h3
                className={`w-full font-calibri mt-[6px] text-sm sm:block hidden ${currentStep && +currentStep === index ? "text-[#00778B]" : "text-grey"
                  } ${index === 0
                    ? "text-left"
                    : index === 3
                      ? "text-right"
                      : index === 4
                        ? "text-right"
                        : "text-center"
                  } ${activeTextColor(index)}`}
              >
                {step}
              </h3>
            </div>
          </Fragment>
        ))}
        <div className="h-[2px] 2xl:w-[95%] xl:w-[90%] sm:w-[88%] bg-muted absolute top-[18px] m-auto left-0 right-0 z-10"></div>
      </div>
      {/* <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <Fragment key={index}>
            <h3
              className={`w-full font-calibri mt-[6px] text-sm sm:block hidden ${
                currentStep === index ? "text-[#00778B]" : "text-grey"
              } ${
                index === 0
                  ? "text-left"
                  : index === 3
                  ? "text-right"
                  : index === 4
                  ? "text-right"
                  : "text-center"
              } ${activeTextColor(index)}`}
            >
              {step}
            </h3>
          </Fragment>
        ))}
      </div> */}
    </div>
  );
};

export default CourseStepper;
