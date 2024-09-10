import { LucideIcon } from "lucide-react";
import { FC, ReactNode } from "react";

interface iconProps {
  imgsrc: LucideIcon | ReactNode;
  headone: string;
  textone: string;
  texttwo?: string;
}

const WhiteIconCard: FC<iconProps> = ({
  headone,
  textone,
  texttwo,
  imgsrc,
}) => {
  const Icon: any = imgsrc as LucideIcon;

  return (
    <>
      <div
        className="p-[20px] rounded-[10px] border-[1px] border-[#dee2e6] bg-[#ffffff] flex flex-col items-center"
        style={{ height: "-webkit-fill-available" }}
      >
        <div className="mb-3">{Icon}</div>
        <div className="flex flex-col text-center mb-[20px]">
          <h1 className="font-[700] text-headingtext text-[20px] font-primary leading-[24px] mb-[7px] ">
            {headone}
          </h1>
          <p className="font-inter text-sm font-[400] leading-[24px] ">
            {textone} <br /> {texttwo}
          </p>
        </div>
      </div>
    </>
  );
};

export default WhiteIconCard;
