/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AssesmentContext } from "@/context/assesmentContext";
import { CircleX } from "lucide-react";
import {
  ChangeEvent,
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";

interface AssecessmentTypeProps {
  assecessmentQuestion: any;
}

interface Validatable {
  validate: () => boolean;
}

const AssecessmentTrueFalse = forwardRef<Validatable, AssecessmentTypeProps>(
  ({ assecessmentQuestion }, ref) => {
    const { setAssesment, assesment } = useContext(AssesmentContext);

    const [errors, setErrors] = useState({
      question: "",
      point: "",
      answer: "",
    });

    const validateAssecessmentTrueFalse = () => {
      let valid = true;
      const newErrors = {
        question: "",
        point: "",
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
      if (answerValue?.length === 0) {
        newErrors.answer = "Answer is required";
        valid = false;
      }

      setErrors(newErrors);
      return valid;
    };

    useImperativeHandle(ref, () => ({
      validate: validateAssecessmentTrueFalse,
    }));

    const handleRemoveQuestion = (id: number) => {
      setAssesment((prev: any) => {
        return prev.filter((item: any) => +item.ids !== +id);
      });
    };

    const handleChangeValue = (
      e: ChangeEvent<HTMLInputElement>,
      selectName?: string
    ) => {
      if (selectName) {
        setAssesment((prev) => {
          return prev.map((item) => {
            // @ts-ignore
            if (+item.ids === +assecessmentQuestion?.ids) {
              return {
                ...item,
                [selectName]: e,
              };
            }
            return item;
          });
        });
      } else {
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
      }
    };

    console.log(
      "+++++++++++++",
      typeof assesment?.find(
        // @ts-ignore
        (item) => +item.ids === +assecessmentQuestion?.ids
      )?.answer === "string"
    );

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
          <div className="flex items-center gap-3">
            <input
              placeholder="True Or False"
              disabled
              className="border border-[#D9D9D9] bg-[#FBFBFB] rounded-md w-full px-4 py-3  font-base font-calibri text-[#1D2026] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
            />
            <div className="flex items-center">
              <label className="me-3 text-[#515151] text-base font-calibri">
                Point
              </label>
              <Input
                className="py-3 px-3 w-[100px] rounded-md h-auto"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.match(/^[0-9]*$/)) {
                    handleChangeValue(e);
                    setErrors((prev) => ({ ...prev, point: "" }));
                  }
                  return;
                }}
                type="text"
                name="point"
                min={0}
                max={100}
                value={
                  assesment?.find(
                    // @ts-ignore
                    (item) => +item.ids === +assecessmentQuestion?.ids
                  )?.point || ""
                }
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span></span>
            {errors.point && (
              <p className="text-red-500 text-sm">{errors.point}</p>
            )}
          </div>
        </div>
        <div className="">
          <h6 className="text-base text-black font-calibri pb-1">
            Enter Question
          </h6>
          <div className="flex justify-between items-center w-full">
            <Input
              placeholder="Enter the question"
              className="font-base font-calibri text-[#1D2026] w-full px-4 py-3 h-auto"
              onChange={(e) => {
                handleChangeValue(e);
                setErrors((prev) => ({ ...prev, question: "" }));
              }}
              name="question"
              value={
                assesment?.find(
                  // @ts-ignore
                  (item) => +item.ids === +assecessmentQuestion?.ids
                )?.question
              }
            />
          </div>
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question}</p>
          )}
          <div className="mt-5">
            <RadioGroup
              // @ts-ignore
              // defaultValue={
              //   (typeof assesment?.find(
              //     // @ts-ignore
              //     (item) => +item.ids === +assecessmentQuestion?.ids
              //   )?.answer === "string" &&
              //   assesment?.find(
              //     // @ts-ignore
              //     (item) => +item.ids === +assecessmentQuestion?.ids
              //   )?.answer === "1"
              //     ? "yes"
              //     : "no") || ""
              // }
              onValueChange={(value: any) => {
                handleChangeValue(value, "answer");
                setErrors((prev) => ({ ...prev, answer: "" }));
              }}
              // @ts-ignore
              value={
                typeof assesment?.find(
                  // @ts-ignore
                  (item) => +item.ids === +assecessmentQuestion?.ids
                )?.answer === "string"
                  ? assesment?.find(
                      // @ts-ignore
                      (item) => +item.ids === +assecessmentQuestion?.ids
                    )?.answer
                  : ""
              }
            >
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem
                  value="yes"
                  id="yes"
                  className="w-[24px] h-[24px]"
                />
                <Label htmlFor="yes" className="text-base">
                  True
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="no"
                  className="w-[24px] h-[24px]"
                />
                <Label htmlFor="no" className="text-base">
                  False
                </Label>
              </div>
            </RadioGroup>
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default AssecessmentTrueFalse;
