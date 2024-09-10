/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AssesmentContext } from "@/context/assesmentContext";
import { Trash2 } from "lucide-react";
import { useContext } from "react";

type optionsProps = {
  data: {
    option: string;
  };
  i: number;
  iIndex: number;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  id: number;
};

const AssecessmentTypeOneOptions = ({
  data,
  iIndex,
  setErrors,
  id,
}: optionsProps) => {
  const { assesment, setAssesment } = useContext(AssesmentContext);
  console.log("data++", data?.option);

  const handleCheck = (inx: number) => {
    setAssesment((prev: any) => {
      return prev.map((item: any) => {
        if (item?.ids === id) {
          return {
            ...item,
            answer: inx,
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

  console.log(
    "assesment?.[id]?.options?.[iIndex]?.option",
    typeof assesment?.find((item: any) => item?.ids === id)?.answer
  );

  return (
    <div>
      <div className="">
        <div className="space-x-2 flex items-center justify-between">
          <label htmlFor={data.option} className="flex items-center w-[98%]">
            <span className="text-sm text-black font-inter w-[80px]">
              Option {iIndex + 1}
            </span>
            <div className="w-full flex justify-between items-center relative">
              <Input
                placeholder={data.option}
                className="w-full text-base font-calibri text-black h-full px-4 py-[15px] pr-[80px]"
                onChange={(e) => {
                  handleChange(e, iIndex);
                  setErrors((prev: any) => ({
                    ...prev,
                    options: prev.options.map((option: string, index: number) =>
                      index === iIndex ? "" : option
                    ),
                  }));
                }}
                value={
                  assesment?.find((item: any) => item?.ids === id)?.options?.[
                    iIndex
                  ]?.option || ""
                }
              />
              <Button
                className="px-4 py-1 bg-[#FFD2D2] text-[#FF5252] rounded-sm hover:bg-[#FFD2D2] absolute right-4"
                onClick={() => {
                  handleRemove(iIndex);
                }}
              >
                <Trash2 width={18} />
              </Button>
            </div>
          </label>
          <div className="w-[2%] text-right">
            <RadioGroup
              onValueChange={(value: any) => handleCheck(value)}
              // @ts-ignore
              value={
                // options
                //   .findIndex((item: any) =>
                //     assesment
                //       ?.find((item: any) => item?.ids === id)
                //       // @ts-ignore
                //       ?.answer.includes(item.option)
                //   )
                //   ?.toString() ||
                typeof assesment?.find((item: any) => item?.ids === id)
                  ?.answer === "object"
                  ? assesment?.find((item: any) => item?.ids === id)?.answer[0]
                  : assesment?.find((item: any) => item?.ids === id)?.answer ||
                    ""
              }
              className="flex items-center gap-[34px]"
            >
              <RadioGroupItem
                value={data?.option?.toString()}
                id={data?.option}
                key={data?.option}
                className="w-[24px] h-[24px]"
              />
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssecessmentTypeOneOptions;
