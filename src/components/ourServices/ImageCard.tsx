import { FC } from "react";
import courseImage from "@/assets/images/Course_image.png";

interface iconProps {
  imgsrc: string;
  headone: string;
  textone: string;
  texttwo?: string;
}

const ImageCard: FC<iconProps> = ({ headone, textone, texttwo }) => {
  return (
    <>
      <div
        className="p-[10px] mb-[10px] rounded-[10px] border-[1px] border-[#dee2e6] bg-[#ffffff] justify-center items-center"
        style={{ height: "-webkit-fill-available" }}
      >
        <div className="mb-3 max-h-[264px] h-[220px]">
          <img src={courseImage} className="w-[100%] mx-auto h-full" />
        </div>
        <div className="flex flex-col text-center mb-[20px]">
          <h1 className="font-[700] text-headingtext text-[20px] font-primary leading-[24px] mb-[7px] ">
            {" "}
            {headone}
          </h1>
          <p className="font-primary font-inter text-sm font-[400] leading-[24px] ">
            {textone} <br /> {texttwo}
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
