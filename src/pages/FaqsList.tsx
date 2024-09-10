import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

function FaqsList() {
  return (
    <div className="bg-[#f5f3ff]">
      <div className="bg-[#FFFFFF] rounded-[10px]">
        <div className="pt-[16px] pl-[30px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] flex items-center justify-between">
          <p className="text-[#000000] text-[Calibri] font-bold">FAQs</p>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
            Some common questions answered. Need more help? Send a message to
            support
          </p>
        </div>
        <div className="p-5">
          <div className=" border-red-200 mr-[10px] ml-[10px] ">
            <div className=" flex justify-between p-4 border border-[#D9D9D9] ">
              <div className="font-bold">How to create an FAQ page</div>
              <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowDown className="  h-[16px] w-[16px]" />
              </div>
            </div>
            <div className="p-4 border-b border-l border-r border-[#D9D9D9]">
              <div className="font-semibold text-[15.7px]">
                If you want to make an FAQ section that resonates with your
                customers, don’t just slap some ordinary questions and answers
                on a site page. Carefully think about what questions to include,
                consider who will answer (and how), and offer next-step
                solutions for when FAQs aren’t enough. If you want to make an
                FAQ section that resonates with your customers, don’t just slap
                some ordinary questions and answers on a site page. Carefully
                think about what questions to include, consider who will answer
                (and how), and offer next-step solutions for when FAQs aren’t
                enough.
              </div>
            </div>
            <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
              <div className="font-bold">How to create an FAQ page</div>
              <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
            </div>
            <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
              <div className="font-bold">How to create an FAQ page</div>
              <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
            </div>
            <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
              <div className="font-bold">How to create an FAQ page</div>
              <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
            </div>
            <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
              <div className="font-bold">How to create an FAQ page</div>
              <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqsList;
