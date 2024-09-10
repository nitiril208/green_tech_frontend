import treePlantingIcon from "@/assets/images/TreePlanting.png";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BsFillPlusSquareFill, BsInfoLg, BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function MaturityLevelActionableMeasurePopup() {
  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <Card className="bg-white rounded-lg p-4 h-[634px] w-[814px]">
        <div className="flex  mb-4">
          <div className="   bg-white border-[2px] rounded-full  w-10 h-9 p-2 mb-2">
            <img src={treePlantingIcon} alt="treePlantingIcon" />
          </div>
          <div className="ml-3 mt-1 h-[22px] w-[800px]">
            <h2 className=" text-xm font-semibold text-[#1D2026]">
              Have you identified actionable items on provided measures?
            </h2>
          </div>
          <div className="ml-8">
            <button className="text-[#1D2026] hover:text-red-500">
              <RxCross2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="bg-[#EDF0F4] p-3 rounded-sm border border-[#EDF0F4] w-[776px]">
          <div className="flex">
            <div className=" mt-[5px] ml-[2px] bg-[#FFD56A] h-[36px] w-[38px] flex items-center justify-center rounded-full">
              <BsInfoLg className="text-white h-6 w-9" />
            </div>
            <p className="text-[#606060] Calibri text-[14.5px] ml-[20px]">
              Review this set of measures carefully, as they are designed to
              assist you in advancing to the next maturity level; we encourage
              you to consider them thoughtfully when creating your action items
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 ">
          <div className="text-[#1D2026] font-Calibri font-bold  mt-4">
            Environmental
          </div>

          <div className="flex  h-full w-full mt-2">
            <div className=" h-[333px] w-[380px] border border-solid border-[#D9D9D9] rounded">
              <div className="w-full h-74 border-b border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                <div className="pb-2 pt-2 h-[42px] w-[350px]">
                  <div className="ml-4  text-[#1D2026] font-calibri font-bold">
                    Measures
                  </div>

                  <div className="p-2 ">
                    <ScrollArea className="h-[255px] w-[355px] p-2 mt-3  ">
                      <ul className="list-disc ml-6 text-[14.5px]  font-calibri">
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
            <div className="ml-6 h-[297px]  border border-solid border-[#D9D9D9] rounded w-[380px] ">
              <div className="w-full h-74 border-b border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                <div className="pb-2 pt-2 h-[42px] w-[350px]">
                  <div className="ml-6  text-[#1D2026] font-calibri font-bold">
                    Enter initiatives or action items
                  </div>

                  <div className="p-4">
                    <div className="flex  p-2 w-[322px] h-[42px] mt-2">
                      <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">
                        <input
                          type="text"
                          placeholder="Action item 1"
                          className="flex-1 border-none  pl-2 pt-2"
                        />
                      </div>
                      <button className="border-none bg-transparent text-lg cursor-pointer  ml-2 mt-2">
                        <BsPencil className="text-[#B9B9B9]" />
                      </button>
                      <button className="border-none bg-transparent text-lg cursor-pointer gap-4 mt-2">
                        <RiDeleteBin6Line className="text-[#B9B9B9]" />
                      </button>
                    </div>
                  </div>

                  <div className="pl-4 ">
                    <div className="flex  p-2 w-[322px] h-[42px] mt-2">
                      <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">
                        <input
                          type="text"
                          placeholder=""
                          className="flex-1 border-none  pl-2 pt-2"
                        />
                      </div>
                      <button className="border-none bg-transparent text-lg cursor-pointer mr-[0px] ml-2 mt-2">
                        <BsPencil className="text-[#B9B9B9]" />
                      </button>
                      <button className="border-none bg-transparent text-lg cursor-pointer  mt-2">
                        <RiDeleteBin6Line className="text-[#B9B9B9] " />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-4 h-4  ml-[315px] mt-8">
                    <BsFillPlusSquareFill />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <button className="bg-green-500 text-white px-2 py-1 rounded-md text-sm w-[119px] h-[48px] ml-[482px]  ">
              Save
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm w-[119px] h-[48px] ml-[20px]">
              Close
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MaturityLevelActionableMeasurePopup;
