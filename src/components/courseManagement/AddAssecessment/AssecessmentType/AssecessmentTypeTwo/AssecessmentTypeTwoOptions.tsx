/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AssesmentContext } from "@/context/assesmentContext";
import { Trash2 } from "lucide-react";
import { useContext } from "react";

type optionsProps = {
  data: {
    option: string;
  };
  iIndex: number;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  id: number;
};

const AssecessmentTypeTwoOptions = ({
  data,
  iIndex,
  setErrors,
  id,
}: optionsProps) => {
  const { assesment, setAssesment } = useContext(AssesmentContext);

  const handleCheck = (inx: number) => {
    setAssesment((prev: any) => {
      return prev.map((item: any) => {
        if (item?.ids === id) {
          return {
            ...item,
            answer: item?.answer?.find((_: any) => _ === inx)
              ? item?.answer?.filter((_: any) => _ !== inx)
              : // @ts-ignore
                [...item?.answer, inx],
          };
        }
        return item;
      });
    });
    setErrors((prev: any) => ({
      ...prev,
      answer: "",
    }));
  };

  console.log("assesment ", iIndex);

  const handleRemove = (index: number) => {
    setAssesment((prev: any) => {
      return prev.map((item: any) => {
        if (item?.ids === id) {
          return {
            ...item,
            options: item?.options?.filter(
              (_: any, idx: number) => idx !== index
            ), // Filter the options array
          };
        }
        return item; // Return unchanged item
      });
    });
  };

  const handleChange = (e: any, i: number) => {
    const { value } = e.target;
    setAssesment((prev: any) => {
      return prev.map((item: any) => {
        if (item?.ids === id) {
          return {
            ...item,
            options: item?.options?.map((option: any, index: number) => {
              if (index === i) {
                return { ...option, option: value }; // Update the specific option
              }
              return option; // Return unchanged option
            }),
          };
        }
        return item; // Return unchanged item
      });
    });
  };

  return (
    <div className="mb-3">
      <div className="space-x-2 flex items-center justify-between">
        <label htmlFor={data.option} className="flex items-center w-[98%]">
          <span className="text-sm text-black font-inter w-[80px]">
            Option {iIndex + 1}
          </span>
          <div className="w-full">
            <div className="w-full flex justify-between items-center relative">
              <Input
                placeholder={data.option}
                className="w-full px-4 py-[15px] pr-[80px] text-base font-calibri text-black h-auto"
                onChange={(e) => {
                  handleChange(e, iIndex);
                }}
                value={
                  assesment?.find((item: any) => item?.ids === id)?.options?.[
                    iIndex
                  ]?.option || ""
                }
              />
              <Button
                type="button"
                className="px-4 py-1 bg-[#FFD2D2] text-[#FF5252] rounded-sm hover:bg-[#FFD2D2] absolute right-4"
                onClick={() => {
                  handleRemove(iIndex);
                }}
              >
                <Trash2 width={18} />
              </Button>
            </div>
          </div>
        </label>
        <div className="w-[2%] text-right">
          <Checkbox
            className="border border-[#D9D9D9] w-[22px] h-[22px]"
            onCheckedChange={() => handleCheck(iIndex)}
            checked={
              assesment
                ?.find((item) => item.ids === id)
                // @ts-ignore
                ?.answer?.includes(iIndex) || false
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AssecessmentTypeTwoOptions;
