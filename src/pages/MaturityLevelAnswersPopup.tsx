import React from "react";
import { Card } from "@/components/ui/card";
import pathStepsIcon from "@/assets/images/PathSteps.png"

function MaturityLevelAnswersPopup() {
  const [progress, setProgress] = React.useState(0);
  const [progress1, setProgress1] = React.useState(0);
  const [progress2, setProgress2] = React.useState(0);
  const [progress3, setProgress3] = React.useState(0);
  const [progress4, setProgress4] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress1(40), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress2(40), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress3(60), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress4(40), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <Card className="bg-white rounded-lg p-6 h-[540px] w-[812px] ">
        <div className="flex">
          <div className="h-[105px] w-[270px] flex flex-col">
            <div className="flex ">
              <div className=" ml-4 mt-0 bg-white rounded-full drop-shadow-md w-[42px] h-[42px] p-2 mb-2">
                <img src={pathStepsIcon} alt="pathStepsIcon" />
              </div>

              <div className="ml-2 mt-2 h-[25px] w-[203px]">
                <h2 className="text-xm text-[#1D2026] font-calibri text-lg font-semibold">
                  Strategic Integration
                </h2>
              </div>
            </div>

            <div className="h-[19px] w-[270px]  flex mt-[35px]">
              <div className="h-[19px] w-[86px] flex">
                <div className="h-[12px] w-[12px] rounded  bg-[#F63636] mt-[3px]"></div>
                <div className="h-[19px] w-[62.21px] text-xs ml-[10px]">
                  Introductory
                </div>
              </div>

              <div className="h-[19px] w-[86px] flex ml-[12px]">
                <div className="h-[12px] w-[12px] rounded  bg-[#FFD56A] mt-[3px] "></div>
                <div className="h-[19px] w-[65px] text-xs ml-[10px]">
                  Intermediate
                </div>
              </div>
              <div className="h-[19px] w-[86px] flex ml-[12px]">
                <div className="h-[12px] w-[12px] rounded  bg-[#64A70B] mt-[3px] "></div>
                <div className="h-[19px] w-[49px] text-xs ml-[10px]">
                  Advanced
                </div>
              </div>
            </div>
          </div>
          <div className="h-[105px] w-[270px] ">
            <div className="ml-3 mt-2 h-[25px] w-[230px]">
              <h2 className=" text-xm text-[#1D2026] font-calibri text-lg font-semibold">
                Maturity level of your answers
              </h2>
            </div>
          </div>
          <div className="h-[105px] w-[160px] ">
            <div className="ml-[200px]">
              <button className="text-[#1D2026] hover:text-red-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex  flex-col mt-6">
          <div className="flex gap-2">
            <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
              <div className="text-xs font-bold">Question : 01</div>
              <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-[12px] font-normal leading-[17.4px] text-left">
                {`Does your business have a clearly defined vision, mission, and values that reflect a commitment to sustainability and social responsibility?Equipment Sales Specialist`}
              </div>

              <div className="overflow-hidden h-4  text-xs flex rounded-full bg-[#EDF0F4]">
                <div
                  style={{ width: `${progress}%` }}
                  className="rounded-full bg-[#64A70B]"
                ></div>
              </div>
            </div>

            <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
              <div className="text-xs font-bold">Question : 02</div>
              <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-[12px] font-normal leading-[17.4px] text-left">
                {`How does your business integrate sustainability into its overall business strategy and decision-making processes? `}
              </div>

              <div className="overflow-hidden h-4  text-xs flex rounded-full bg-[#EDF0F4]">
                <div
                  style={{ width: `${progress1}%` }}
                  className="rounded-full bg-[#F63636]"
                ></div>
              </div>
            </div>

            <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
              <div className="text-xs font-bold">Question : 03</div>
              <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-[12px] font-normal leading-[17.4px] text-left">
                {`How well does your business align its strategy with United Nations Sustainable Development Goals (UNSDGs) or other recognised sustainability standards or goals?`}
              </div>

              <div className="overflow-hidden h-4  text-xs flex rounded-full bg-[#EDF0F4]">
                <div
                  style={{ width: `${progress2}%` }}
                  className="rounded-full bg-[#FFD56A]"
                ></div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-[6px] h-[150px] w-[508px]">
            <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
              <div className="text-xs font-bold">Question : 04</div>
              <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-[12px] font-normal leading-[17.4px] text-left">
                {`How do you communicate your commitment to sustainability to your customers, clients, and the public?`}
              </div>

              <div className="overflow-hidden h-4   text-xs flex rounded-full bg-[#EDF0F4]">
                <div
                  style={{ width: `${progress3}%` }}
                  className="rounded-full bg-[#F63636]"
                ></div>
              </div>
            </div>

            <div className="flex flex-col border p-3 rounded-lg w-[252px] h-[150px]">
              <div className="text-xs font-bold">Question : 05</div>
              <div className="mb-3 mt-2 h-[75px] w-[230px]  font-calibri text-[12px] font-normal leading-[17.4px] text-left">
                {`Does our business actively engage in collaborative efforts to influence policy and drive systemic changes that contribute to the global transition towards a sustainable future?`}
              </div>

              <div className="overflow-hidden h-4  text-xs flex rounded-full bg-[#EDF0F4]">
                <div
                  style={{ width: `${progress4}%` }}
                  className="rounded-full bg-[#F63636]"
                ></div>
              </div>
            </div>
          </div>

          <div className="flex">
            <button className="bg-green-500 text-white px-2 py-1 rounded-md text-[12px] w-[119px] h-[48px] ml-[650px] mt-4">
              Close
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MaturityLevelAnswersPopup;
