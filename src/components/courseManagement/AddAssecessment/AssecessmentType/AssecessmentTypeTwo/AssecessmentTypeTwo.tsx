/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AssesmentContext } from "@/context/assesmentContext";
import { CircleX } from "lucide-react";
import {
  ChangeEvent,
  forwardRef,
  Fragment,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import AssecessmentTypeTwoOptions from "./AssecessmentTypeTwoOptions";

interface AssecessmentTypeProps {
  i: number;
  assecessmentQuestion: any;
}

interface Validatable {
  validate: () => boolean;
}

const AssecessmentTypeTwo = forwardRef<Validatable, AssecessmentTypeProps>(
  ({ assecessmentQuestion }, ref) => {
    const { setAssesment, assesment } = useContext(AssesmentContext);

    const [errors, setErrors] = useState({
      question: "",
      point: "",
      options: Array(
        // @ts-ignore
        assesment?.find((item) => +item.ids === +assecessmentQuestion?.ids)
          ?.options?.length
          ? // @ts-ignore
            assesment?.find((item) => +item.ids === +assecessmentQuestion?.ids)
              ?.options?.length
          : 0
      )?.fill(""),
      answer: "",
    });

    const validateAssecessmentTypeTwo = () => {
      let valid = true;
      const newErrors = {
        question: "",
        point: "",
        options: Array(
          // @ts-ignore
          assesment?.find((item) => +item.ids === +assecessmentQuestion?.ids)
            ?.options.length
        ).fill(""),
        answer: "",
      };

      // Validate question
      const questionValue =
        assesment
          // @ts-ignore
          ?.find((item) => +item.ids === +assecessmentQuestion?.ids)
          ?.question?.trim() || "";
      if (!questionValue) {
        newErrors.question = "Question is required";
        valid = false;
      }
      if (questionValue?.length > 250) {
        newErrors.question =
          "You can not write questionValue more than 250 characters.";
        valid = false;
      }

      // Validate points
      const pointValue = assesment
        // @ts-ignore
        ?.find((item) => +item.ids === +assecessmentQuestion?.ids)?.point;
      if (!pointValue || pointValue <= 0) {
        newErrors.point = "Points must be a positive integer";
        valid = false;
      }

      // Validate Answer
      const answerValue = assesment
        // @ts-ignore
        ?.find((item) => +item.ids === +assecessmentQuestion?.ids)?.answer;
      console.log("+++++++++++++++answerValue", answerValue);

      if (!answerValue?.length) {
        newErrors.answer = "Answer is required";
        valid = false;
      }

      // Validate options
      const currentOptions = assesment
        // @ts-ignore
        ?.find((item) => +item.ids === +assecessmentQuestion?.ids)
        ?.options.map((option) => option.option.trim());
      if (currentOptions && currentOptions.some((option) => !option)) {
        newErrors.options = currentOptions.map((option) =>
          !option ? "Option is required" : ""
        );
        valid = false;
      }

      setErrors(newErrors);
      return valid;
    };

    useImperativeHandle(ref, () => ({
      validate: validateAssecessmentTypeTwo,
    }));

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setAssesment((prev) => {
        return prev.map((item) => {
          // @ts-ignore
          if (+item.ids === +assecessmentQuestion?.ids) {
            return {
              ...item,
              [name]: value,
            };
          }
          return item;
        });
      });
    };

    const handleAddOption = () => {
      setAssesment((prev: any) => {
        return prev.map((item: any) => {
          // @ts-ignore
          if (+item.ids === +assecessmentQuestion?.ids) {
            return {
              ...item,
              options: [
                ...item.options,
                {
                  option: "",
                },
              ],
            };
          }
          return item;
        });
      });
    };

    const handleRemoveQuestion = (id: number) => {
      setAssesment((prev: any) => {
        return prev.filter((item: any) => +item.ids !== +id);
      });
    };

    return (
      <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
        <div className="pb-8">
          <div className="flex justify-between items-center">
            <h6 className="text-base text-black font-calibri pb-3">
              Assessment Type
            </h6>
            <CircleX
              className="text-[#fb6262] -mt-7 cursor-pointer"
              onClick={() => handleRemoveQuestion(assecessmentQuestion?.ids)}
            />
          </div>
          <input
            placeholder="Multiple Choice Question"
            disabled
            className="bg-[#FBFBFB] border border-[#D9D9D9] rounded-md w-full px-4 py-3 font-base font-calibri text-[#1D2026] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
          />
        </div>
        <div className="pb-8">
          <h6 className="text-base text-black font-calibri pb-3">
            Enter Question
          </h6>
          <div className="flex justify-between items-center w-full">
            <Input
              placeholder="Enter the question"
              className="font-base font-calibri text-[#1D2026] w-full px-4 py-3 h-auto mr-3"
              name="question"
              onChange={(e) => {
                handleChangeValue(e);
                setErrors((prev) => ({ ...prev, question: "" }));
              }}
              value={
                assesment
                  // @ts-ignore
                  ?.find((item) => +item.ids === +assecessmentQuestion?.ids)
                  ?.question || ""
              }
            />
            <div className="flex items-center">
              <label className="me-3 text-[#515151] text-base font-calibri">
                Point
              </label>
              <Input
                className="py-3 px-3 w-[100px] rounded-md h-auto"
                onChange={(e) => {
                  handleChangeValue(e);
                  setErrors((prev) => ({ ...prev, point: "" }));
                }}
                type="number"
                name="point"
                min={0}
                max={100}
                value={
                  assesment
                    // @ts-ignore
                    ?.find((item) => +item.ids === +assecessmentQuestion?.ids)
                    ?.point || ""
                }
              />
            </div>
          </div>
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question}</p>
          )}
          {errors.point && (
            <p className="text-red-500 text-sm">{errors.point}</p>
          )}
        </div>
        <div className="">
          <div className="text-right">
            <Button
              className="bg-transparent text-[#4285F4] text-base font-calibri text-right mb-5 hover:bg-transparent"
              onClick={handleAddOption}
              type="button"
            >
              + Add Option
            </Button>
          </div>
          {assesment
            // @ts-ignore
            ?.find((item) => +item?.ids === +assecessmentQuestion?.ids)
            ?.options?.map((data, index) => {
              return (
                <Fragment key={index}>
                  <AssecessmentTypeTwoOptions
                    data={data}
                    iIndex={index}
                    setErrors={setErrors}
                    id={
                      assesment?.find(
                        // @ts-ignore
                        (item) => +item?.ids === +assecessmentQuestion?.ids
                      )?.ids || 0
                    }
                  />
                  {errors.options[index] && (
                    <p className="text-red-500 text-sm">
                      {errors.options[index]}
                    </p>
                  )}
                </Fragment>
              );
            })}
          {errors.answer && (
            <p className="text-red-500 text-sm">{errors.answer}</p>
          )}
        </div>
      </div>
    );
  }
);

export default AssecessmentTypeTwo;
