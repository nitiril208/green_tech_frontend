import Arrow_Right from "@/assets/images/Arrow_Right.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { getImages } from "@/lib/utils";
import { Eye } from "lucide-react";
import moment from "moment";

interface MeasuresItemsResponse {
  id: number;
  pillarName: string;
  checked: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  measures?: MeasuresEntity[] | null;
  userMaturityLevel?: UserMaturityLevelEntity[];
  completed: number;
  notCompleted: number;
  total: number;
  progressPR: number;
}
interface MeasuresEntity {
  id: number;
  measure: string;
  startDate: string;
  endDate: string;
  evidence?: null;
  iscompleted: number;
  empAssignDate?: null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  employeeId: EmployeeId;
}
interface EmployeeId {
  id: number;
  name: string;
  email: string;
  status: string;
  employeeStatus: string;
  profileImage?: null;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}
interface UserMaturityLevelEntity {
  id: number;
  level: string;
  nextLevel: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

const AssignProf = ({ data }: { data: MeasuresItemsResponse }) => {
  return (
    <div className="mb-5">
      <div className="w-full border border-[#D9D9D9] rounded-xl">
        <div className="lg:flex block items-center justify-between w-full sm:px-5 p-[15px] sm:py-3 border-b border-[#D9D9D9]">
          <div className="flex items-center xl:gap-5 gap-3 lg:pb-0 sm:pb-3 pb-2.5">
            <div className="bg-white drop-shadow-md p-2 xl:w-[52px] xl:h-[52px] w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={getImages(data?.pillarName, true)}
                alt="Leaf Icon"
                className=""
              />
            </div>
            <h5 className="text-[#1D2026] font-abhaya font-bold sm:text-base text-sm">
              {data.pillarName}
            </h5>
          </div>
          <div className="bg-[#E3E5F5] h-[20px] 2xl:w-[470px] xl:w[400px] lg:w-[240px] w-full rounded-full">
            <Progress
              value={Number(data.progressPR.toFixed(0))}
              color="#FFD56A"
              className="w-full rounded-full h-[20px]"
              isShow={true}
            />
          </div>
          <div className="flex items-center relative lg:mt-0 mt-[21px]">
            <Button
              className={`${
                data?.userMaturityLevel?.[0]?.level === "Advanced"
                  ? "bg-[#258483]"
                  : data?.userMaturityLevel?.[0]?.level === "Introductory"
                  ? "bg-[#C92C35]"
                  : "bg-[#FFD56A]"
              } text-black sm:text-base text-xs font-Calibri rounded-full h-[30px] xl:px-4 xl:py-2 p-2.5`}
            >
              {data?.userMaturityLevel?.[0]?.level}
            </Button>
            <div className="relative border border-dashed border-[#A6A6A6] xl:w-40 lg:w-24 w-full">
              <img
                src={Arrow_Right}
                alt="Arrow"
                className="absolute bottom-0 top-0 left-0 right-0 m-auto"
              />
            </div>
            <Button
              className={`text-black sm:text-base text-xs rounded-full xl:px-4 xl:py-2 p-2.5 ${
                data?.userMaturityLevel?.[0]?.nextLevel === "Advanced"
                  ? "bg-[#258483]"
                  : data?.userMaturityLevel?.[0]?.nextLevel === "Introductory"
                  ? "bg-[#C92C35]"
                  : "bg-[#FFD56A]"
              } h-[30px]`}
            >
              {data?.userMaturityLevel?.[0]?.nextLevel}
            </Button>
          </div>
        </div>
        {data?.measures?.map((item: any) => {
          return (
            <>
              <div className="sm:py-[23px] sm:px-5 p-[15px] border-b border-[#D9D9D9] last:border-b-0">
                <div className="flex sm:items-center items-start">
                  <div>
                    <Checkbox
                      checked={item?.iscompleted === 1 ? true : false}
                      disabled
                      className="border border-[#D9D9D9] w-6 h-6 data-[state=checked]:bg-[#64A70B] disabled:opacity-100"
                    />
                  </div>
                  <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full sm:pl-[18px] pl-3">
                    <div>
                      <h5 className="sm:text-base text-xs font-abhaya text-[#000] font-semibold sm:pb-[13px] pb-3">
                        {item?.measure}
                      </h5>
                      <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-4 gap-[9px] sm:pb-0 pb-[13px]">
                        <div className="font-abhaya sm:text-[13px] text-xs">
                          <span className="text-[#A3A3A3]">
                            Last updated by:
                          </span>
                          <span className="text-[#000000] font-semibold">
                            {item?.measureHistory?.createdBy?.name}
                          </span>
                        </div>
                        <div className="font-abhaya sm:text-[13px] text-xs">
                          <span className="text-[#A3A3A3]">Date:</span>
                          <span className="text-[#000000] font-semibold">
                            {moment(new Date(item?.createdAt)).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {item?.iscompleted === 1 && item?.evidence && (
                        <a
                          href={item?.evidence}
                          target="_blank"
                          className="flex items-center sm:gap-[6px] gap-1 text-[#4285F4]"
                        >
                          <Eye className="sm:w-[20px] sm:h-[18px] w-[16px] h-[16px]" />
                          <span className="sm:text-base text-xs font-abhaya font-semibold">
                            View Proof
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AssignProf;
