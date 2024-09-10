import { Checkbox } from "../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatDPColor } from "@/lib/utils";

type TraineeEmployee = {
  data: {
    image: string;
    name: string;
    companyName: string;
    email: string;
    id: string;
  };
  traineeList: { name: string; id: string }[];
  setTraineeList: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }[]>
  >;
};

const TraineeItems = ({
  data,
  setTraineeList,
  traineeList,
}: TraineeEmployee) => {  
  const handleChanges = (e: boolean, data: any): void => {
    if (e) {
      setTraineeList((prev: any[]) => [
        ...prev,
        {
          name: data?.name || data?.email?.split("@")?.[0] || "",
          id: data?.id?.toString(),
        },
      ]);
    } else {
      setTraineeList((prev: any[]) =>
        prev.filter((item: { id: number }) => +item?.id !== +data?.id)
      );
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2 mb-2">
      <div className="flex items-center gap-3">
        <div className="w-[38px] h-[38px]">
          <Avatar className="w-full h-full">
            <AvatarImage src={""} alt="profileImage" />
            <AvatarFallback
              className="text-white text-xl"
              style={{ background: chatDPColor(+data?.id) }}
            >
              {data?.name?.charAt(0)?.toUpperCase() ||
                data?.email?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <h5 className="text-base font-abhaya text-black font-semibold">
            {data?.name || data?.email?.split?.("@")?.[0]}
          </h5>
          <h6 className="text-[#606060] text-base">{data.companyName}</h6>
        </div>
      </div>
      <div className="">
        <Checkbox
          className="border-[#D9D9D9] w-6 h-6"
          onCheckedChange={(e) => handleChanges(!!e, data)}
          checked={traineeList?.some(
            (item: any) => +item?.id === +data?.id
          )}
        />
      </div>
    </div>
  );
};

export default TraineeItems;
