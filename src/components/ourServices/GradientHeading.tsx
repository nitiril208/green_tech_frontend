import { FC } from "react";

interface textProps {
  headings?: string;
  blacktext: string;
  pinktext: string;
}

const GradientHeading: FC<textProps> = ({ headings, blacktext, pinktext }) => {
  return (
    <>
      <div className="realtive md:mb-[50px] mb-[20px] text-center">
        <h2 className="text-[27px] 1sm:text-[36px] md:text-[52px] font-[500] leading-[43px] text-center absolute top-[-20px] left-1/2 opacity-10 tracking-wider font-secondary -translate-x-1/2 -translate-y-35px capitalize">
          {headings}
        </h2>
        <h1 className="text-[26px] md:text-[44px] leading-[30px] text-headingtext font-[700] font-primary tracking-[0.16px] mt-[10px] capitalize">
          {blacktext}
          <span className="font-primary text-primary"> {pinktext} </span>
        </h1>
      </div>
    </>
  );
};

export default GradientHeading;
