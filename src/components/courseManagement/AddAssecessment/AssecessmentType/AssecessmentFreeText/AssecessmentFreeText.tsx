/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Input } from "@/components/ui/input";
import { AssesmentContext } from "@/context/assesmentContext";
import { useAppDispatch } from "@/hooks/use-redux";
import {
  addAnswer,
  addPoint,
  addQuestion,
} from "@/redux/reducer/AssessmentReducer";
import { CircleX } from "lucide-react";
import {
  ChangeEvent,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface AssecessmentTypeProps {
  i: number;
  assecessmentQuestion: any;
}

interface Validatable {
  validate: () => boolean;
}

const AssecessmentFreeText = forwardRef<Validatable, AssecessmentTypeProps>(
  ({ i, assecessmentQuestion }, ref) => {
    const dispatch = useAppDispatch();
    const { setAssesment, assesment } = useContext(AssesmentContext);

    const [errors, setErrors] = useState({
      question: "",
      point: "",
      answer: "",
    });

    const validateAssecessmentFreeText = () => {
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
      validate: validateAssecessmentFreeText,
    }));

    useEffect(() => {
      if (assecessmentQuestion !== "Free Text Response") {
        dispatch(addPoint({ index: i, point: assecessmentQuestion?.point }));
        dispatch(
          addQuestion({
            index: i,
            question: assecessmentQuestion?.question,
            assessmentType: assecessmentQuestion?.assessmentType,
          })
        );
        dispatch(
          addAnswer({
            answer: assecessmentQuestion?.answer,
            i,
          })
        );
      }
    }, [assecessmentQuestion]);

    const handleRemoveQuestion = (id: number) => {
      setAssesment((prev: any) => {
        return prev.filter((item: any) => +item.ids !== +id);
      });
    };

    const handleChangeValue = (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
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
              placeholder="Free Text Response"
              disabled
              className="border border-[#D9D9D9] bg-[#FBFBFB] rounded-md w-full px-4 py-3  font-base font-calibri text-[#1D2026] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
            />
            <div className="flex items-center">
              <label className="me-3 text-[#515151] text-base font-calibri">
                Point
              </label>
              <Input
                className="py-2 px-3 w-[100px] rounded-md"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.match(/^[0-9]*$/)) {
                    handleChangeValue(e);
                  }
                  return;
                }}
                name="point"
                value={
                  assesment
                    // @ts-ignore
                    ?.find((item) => +item.ids === +assecessmentQuestion?.ids)
                    ?.point || ""
                }
                min={0}
                max={100}
                type="text"
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
          <h6 className="text-base text-black font-calibri pb-3">
            Enter Question
          </h6>
          <div className="flex justify-between items-center w-full">
            <Input
              placeholder="Enter the question"
              className=" font-base font-calibri text-[#1D2026] w-full px-4 py-3 h-auto"
              onChange={(e) => {
                handleChangeValue(e);
              }}
              name="question"
              value={
                assesment
                  // @ts-ignore
                  ?.find((item) => +item.ids === +assecessmentQuestion?.ids)
                  ?.question || ""
              }
            />
          </div>
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question}</p>
          )}
          <div className="mt-5">
            <label className="mb-3 text-[#515151] text-base block font-calibri">
              Answer Keywords (Enter Comma Separated keywords)
            </label>
            <textarea
              placeholder="Keywords1, Keywords2, keywords3"
              className="py-4 px-3 w-full border focus:border-[#4b4b4b] shadow-none outline-none border-[#D9D9D9] placeholder:text-neutral-400  rounded-md resize-none"
              rows={8}
              onChange={(e) => {
                handleChangeValue(e);
              }}
              name="answer"
              // @ts-ignore
              value={
                assesment
                  // @ts-ignore
                  ?.find((item) => +item.ids === +assecessmentQuestion?.ids)
                  ?.answer || ""
              }
            />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default AssecessmentFreeText;
