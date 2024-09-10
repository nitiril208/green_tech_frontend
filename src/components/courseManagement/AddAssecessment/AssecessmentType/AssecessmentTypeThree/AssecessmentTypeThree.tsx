import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addPoint, addQuestion } from "@/redux/reducer/AssessmentReducer";
import { RootState } from "@/redux/store";
import { Fragment, useEffect, useState } from "react";
import AssecessmentTypeThreeOptions from "./AssecessmentTypeThreeOptions";

interface AssecessmentTypeProps {
  i: number;
  type: string;
}

const AssecessmentTypeThree = ({ i, type }: AssecessmentTypeProps) => {
  const dispatch = useAppDispatch();

  const { questionOption } = useAppSelector(
    (state: RootState) => state.assessment
  );

  const [options, setOptions] = useState([
    {
      optionTitle: `Option 1:`,
      option: "",
    },
  ]);

  useEffect(() => {
    setOptions(
      questionOption[i]?.option?.map((item: string, index: number) => ({
        optionTitle: `Option ${index + 1}:`,
        option: item,
      }))
    );
  }, [questionOption]);

  const addOption = () => {
    const newOption = {
      optionTitle: `Option ${options.length + 1}:`,
      option: "",
    };
    setOptions([...options, newOption]);
  };

  return (
    <div className="border border-[#D9D9D9] rounded-lg p-5 mb-5">
      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Assessment Type 12
        </h6>
        <input
          placeholder="Single Choice Question"
          className="border border-[#D9D9D9] rounded-md w-full px-4 py-3  font-base font-calibri text-[#1D2026] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
        />
      </div>
      <div className="pb-8">
        <h6 className="text-base text-black font-calibri pb-3">
          Enter Question
        </h6>
        <div className="flex justify-between items-center border border-[#D9D9D9] rounded-md w-full px-4 py-1">
          <input
            placeholder="Enter the question"
            className=" font-base font-calibri text-[#1D2026] w-full focus:border focus:border-[#4b4b4b] shadow-none outline-none"
            onChange={(e) =>
              dispatch(
                addQuestion({
                  index: i,
                  question: e.target.value,
                  assessmentType: type,
                })
              )
            }
            value={questionOption[i]?.question}
          />
          <div className="flex items-center">
            <label className="me-3 text-[#515151] text-base font-calibri">
              Point
            </label>
            <input
              className="py-2 px-3 w-[100px] border border-[#D9D9D9]  rounded-md focus:border focus:border-[#4b4b4b] shadow-none outline-none"
              onChange={(e) => {
                const { value } = e.target;
                if (value.match(/^[0-9]*$/)) {
                  dispatch(addPoint({ index: i, point: +e.target.value }));
                }
                return;
              }}
              type="number"
              value={questionOption[i]?.point}
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-right">
          <Button
            className="bg-transparent text-[#4285F4] text-base font-calibri text-right mb-5 hover:bg-transparent"
            onClick={addOption}
          >
            + Add Option
          </Button>
        </div>
        {options.map((data, index) => {
          return (
            <Fragment key={index}>
              <AssecessmentTypeThreeOptions
                data={data}
                i={i}
                iIndex={index}
                options={options}
                setOptions={setOptions}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AssecessmentTypeThree;
