import Ellipse1 from "@/assets/images/Ellipse1.png";
import Ellipse2 from "@/assets/images/Ellipse2.png";
import Ellipse3 from "@/assets/images/Ellipse3.png";
import { supportTicketIcon } from "@/lib/utils";

interface SupportMetricProps {
  label: string;
  value?: number;
  iconName: string;
}

const SupportMetric = ({ label, value = 0, iconName }: SupportMetricProps) => {
  return (
    <div className="sm:h-[108px] h-[111px] border border-1px solid gray rounded-[6px] sm:flex block items-center sm:px-[20px] sm:py-[14px] p-[10px] gap-5 relative text-center">
      <div className="lg:w-[80px] lg:h-[80px] sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] rounded-full bg-[#F5F7FF] flex items-center justify-center sm:m-0 m-auto">
        <img
          className="lg:max-w-[40px] sm:max-w-[30px] max-w-[24px]"
          src={supportTicketIcon(iconName)}
          alt={iconName}
        />
      </div>
      <div>
        <h2 className="font-[700] sm:text-[32px] text-[18px] sm:pb-2.5 pb-1">
          +{value}
        </h2>
        <h3 className="capitalize sm:text-base text-xs">{label}</h3>
      </div>
      <img
        src={Ellipse1}
        alt="ellipse"
        className="absolute bottom-0 right-[10%] sm:block hidden"
      />
      <img
        src={Ellipse2}
        alt="ellipse"
        className="absolute top-0 right-0 sm:block hidden"
      />
      <img
        src={Ellipse3}
        alt="ellipse"
        className="absolute top-0 right-0 sm:block hidden"
      />
    </div>
  );
};

export default SupportMetric;
