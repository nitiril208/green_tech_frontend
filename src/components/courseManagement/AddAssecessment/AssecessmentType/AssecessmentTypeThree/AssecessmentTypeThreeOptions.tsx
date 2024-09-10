import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/hooks/use-redux";
import { addOption, removeOption } from "@/redux/reducer/AssessmentReducer";
import { Trash2 } from "lucide-react";

type optionsProps = {
  data: {
    optionTitle: string;
    option: string;
  };
  i: number;
  iIndex: number;
  options: any[];
  setOptions: React.Dispatch<React.SetStateAction<any>>;
};

const AssecessmentTypeThreeOptions = ({
  data,
  i,
  iIndex,
  setOptions,
  options,
}: optionsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-x-2 flex items-center justify-between mb-4">
      <label htmlFor={data.optionTitle} className="flex items-center w-[95%]">
        <span className="text-sm text-black font-inter w-[80px]">
          Option {iIndex + 1}
        </span>
        <div className="border border-[#D9D9D9] rounded-md w-full flex justify-between items-center">
          <div className="flex">
            <input
              placeholder={data.option}
              className="w-full  px-5 text-base font-calibri text-black focus:border focus:border-[#4b4b4b] shadow-none outline-none"
              type="file"
              onChange={(e) => {
                dispatch(
                  addOption({ option: e?.target?.files?.[0], i, iIndex })
                );
              }}
            />
          </div>
          <Button
            className="px-4 py-1 bg-[#FFD2D2] text-[#FF5252] rounded-sm hover:bg-[#FFD2D2] me-2"
            onClick={() => {
              if (options.length <= 1) return;
              const updatedOptions = options.filter(
                (_, index) => index !== iIndex
              );
              setOptions(updatedOptions);
              dispatch(
                removeOption({
                  i,
                  iIndex,
                })
              );
            }}
          >
            <Trash2 width={18} />
          </Button>
        </div>
      </label>
      <div className="w-[5%]">
        <Checkbox className="border border-[#D9D9D9] w-[22px] h-[22px]" />
      </div>
    </div>
  );
};

export default AssecessmentTypeThreeOptions;
