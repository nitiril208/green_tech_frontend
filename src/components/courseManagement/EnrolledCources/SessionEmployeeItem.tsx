import { Checkbox } from "@/components/ui/checkbox";

type sessionEmpoyeeProps = {
  data: {
    image: string;
    empoyeeName: string;
  };
};

const SessionEmployeeItem = ({ data }: sessionEmpoyeeProps) => {
  return (
    <div>
      <div className="flex items-center justify-between py-2.5 border-b border-[#D9D9D9]">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden me-4">
            <img src={data.image} />
          </div>
          <div className="font-calibri text-base font-medium">
            {data.empoyeeName}
          </div>
        </div>
        <div className="">
          <Checkbox className="w-[18px] h-[18px] border-[#D9D9D9]" />
        </div>
      </div>
    </div>
  );
};

export default SessionEmployeeItem;
