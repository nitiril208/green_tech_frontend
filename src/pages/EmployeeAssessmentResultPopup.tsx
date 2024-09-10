import treePlantingIcon from "@/assets/images/TreePlanting.png";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BsInfoLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function EmployeeAssessmentResultPopup() {
  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 md:p-0">
      <Card className="bg-white rounded-lg p-4 h-full md:[814px] md:h-[465px]">
        <div className="flex mb-4">
          <div className="bg-white border-2 rounded-full w-9 h-9 p-2 mb-2">
            <img
              src={treePlantingIcon}
              alt="Leaf Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="ml-3 mt-1 flex-grow">
            <h2 className="text-sm md:text-xm font-semibold text-[#1D2026]">
              Have you identified actionable items on provided measures?
            </h2>
          </div>
          <div className="ml-2 md:ml-8">
            <button className="text-[#1D2026] hover:text-red-500 font-abhaya">
              <RxCross2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="bg-[#EDF0F4] p-3 rounded-sm border border-[#EDF0F4] w-full md:w-[776px]">
          <div className="flex">
            <div className="mt-[5px] ml-[2px] bg-[#FFD56A] h-9 w-9 md:h-[36px] md:w-[38px] flex items-center justify-center rounded-full">
              <BsInfoLg className="text-white h-6 w-6 md:w-9" />
            </div>
            <p className="text-[#606060] font-calibri text-sm md:text-[14.5px] ml-[20px]">
              Review this set of measures carefully, as they are designed to
              assist you in advancing to the next maturity level; we encourage
              you to consider them thoughtfully when creating your action items.
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="text-[#1D2026] font-calibri font-bold">
            Environmental
          </div>

          <div className="flex h-full w-full mt-2">
            <div className="h-full w-full md:h-[238px] md:w-[774px] border border-solid border-[#D9D9D9] rounded">
              <div className="w-full border-b border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                <div className="pb-2 pt-2 h-[42px] w-full md:w-[350px]">
                  <div className="ml-4 text-[#1D2026] font-calibri font-bold">
                    Measures
                  </div>

                  <div className="p-2">
                    <ScrollArea className="h-full md:h-[255px] w-full md:w-[755px] p-2 mt-3">
                      <ul className="list-disc ml-6 text-sm md:text-[14.5px] font-calibri">
                        <li className="mb-5">
                          Enhance and execute your Net Zero strategy with clear
                          goals and comprehensive actions.
                        </li>
                        <li className="mb-5">
                          Lead in energy efficiency through continuous
                          optimization and strategic energy management.
                        </li>
                        <li className="mb-5">
                          Achieve sustainability leadership by fully embracing
                          and expanding renewable energy use.
                        </li>
                        <li className="mb-5">
                          Optimize transportation and logistics for minimal
                          environmental impact through advanced strategies and
                          technologies.
                        </li>
                      </ul>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EmployeeAssessmentResultPopup;
