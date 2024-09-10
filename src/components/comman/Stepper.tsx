import { Fragment } from "react";

type StepperProps = {
  currentStep: number;
  steps: string[];
  onChangeStep?: (step: number) => void;
};

const Stepper = ({ currentStep, steps, onChangeStep }: StepperProps) => {
  const activeColor = (index: number) =>
    currentStep === index || currentStep > index ? "bg-muted" : "bg-muted";

  const activeTextColor = (index: number) =>
    currentStep === index ? "text-orange" : "text-grey";

  const activeColorLine = (index: number) =>
    currentStep > index ? "bg-muted" : "bg-muted";

  const isFinalStep = (index: number) => index === steps.length - 1;
  return (
    <div>
      <div className="mt-[-17px] flex items-center justify-center">
        {steps.map((step, index) => (
          <Fragment key={step}>
            <div
              className={`relative flex cursor-pointer items-center justify-center rounded-full bg-muted ${activeColor(
                index
              )}`}
              onClick={() => {
                currentStep > index && onChangeStep?.(index);
              }}
            >
              <div
                className={`h-8 w-8 px-4 flex items-center justify-center rounded-full ${
                  currentStep === index
                    ? "bg-[#00778B] text-white"
                    : "bg-[#D9D9D9] text-black"
                }`}
              >
                {index + 1}
              </div>
            </div>
            {isFinalStep(index) ? null : (
              <div
                className={`h-[2px] min-w-[300px] w-full ${activeColorLine(
                  index
                )}`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <Fragment key={index}>
            <h3
              className={`min-w-[200px] w-full font-calibri mt-[6px] text-sm ${
                currentStep === index ? "text-[#00778B]" : "text-grey"
              } ${
                index === 0
                  ? "text-left"
                  : index === steps.length - 1
                  ? "text-right"
                  : "text-center"
              } ${activeTextColor(index)}`}
            >
              {step}
            </h3>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
