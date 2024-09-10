import Ellipse_two from "@/assets/images/Ellipse2.png";
import Ellipse_three from "@/assets/images/Ellipse3.png";
import { MyActionDataType } from "@/types/common";
import { Loader2 } from "lucide-react";

type MyActionProps = {
  data: MyActionDataType;
  isLoading: boolean;
};

const MyActionItems = ({ data, isLoading }: MyActionProps) => {
  return (
    <div className="col-span-1 py-2">
    <div className="sm:px-5 p-4 sm:py-6 shadow-md rounded-lg relative">
      {isLoading ? <span className="flex justify-center lg:py-7 py-6">
        <Loader2 className="w-5 h-5 animate-spin" />
      </span> : <>
        <div className="flex items-center">
          <div className="md:w-20 w-10 md:h-20 h-10 rounded-full bg-[#F5F7FF] flex justify-center items-center">
            <img src={data.image} alt="" className="md:w-9 w-7 h-7 md:h-9" />
          </div>
          <div className="ps-5">
            <span className="font-bold font-nunito lg:text-[32px] text-lg text-black">
              {data.title}
            </span>
            <h5 className="sm:text-base text-sm font-nunito text-black sm:block hidden">
              {data.subTitle}
            </h5>
          </div>
        </div>
        <h5 className="sm:text-base text-sm font-nunito text-black sm:hidden block pt-2">
          {data.subTitle}
        </h5>
      </>}
      <img
        src={Ellipse_two}
        alt="ellipse"
        className="absolute top-0 right-0 sm:block hidden"
      />
      <img
        src={Ellipse_three}
        alt="ellipse"
        className="absolute top-0 right-0 sm:block hidden"
      />
    </div>
    </div>
  );
};

export default MyActionItems;
