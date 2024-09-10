import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CourseSpecificationsQuestionsItems = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="pb-4">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          {data.question}
        </h6>

        <Select>
          <SelectTrigger className="w-full border-[#D9D9D9] rounded-md text-base font-calibri px-4 py-4">
            <SelectValue placeholder={data.answer} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="item_1"
              className="font-base font-calibri text-[#1D2026]"
            >
              {data.answer}
            </SelectItem>
            <SelectItem
              value="item_2"
              className="font-base font-calibri text-[#1D2026]"
            >
              {data.answer}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CourseSpecificationsQuestionsItems;
