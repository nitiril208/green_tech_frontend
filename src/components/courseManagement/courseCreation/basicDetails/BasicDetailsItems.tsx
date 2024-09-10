import InputWithLabel from "@/components/comman/InputWithLabel";
import { Label } from "@/components/ui/label";

interface BasicDetailsItemsProps {
  data: any;
}

const BasicDetailsItems = ({ data }: BasicDetailsItemsProps) => {
  return (
    <div>
      <div className="pb-4">
        <Label
          htmlFor={data?.placeholder}
          className="text-base text-[#515151] font-calibri pb-3"
        >
          {data.qestion}
        </Label>
        <InputWithLabel
          placeholder={data.placeholder}
          className="border border-[#D9D9D9] rounded-md w-full px-4 py-3  font-base font-calibri text-[#1D2026]"
        />
      </div>
    </div>
  );
};

export default BasicDetailsItems;
