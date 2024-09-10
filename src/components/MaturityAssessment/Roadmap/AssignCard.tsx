import Arrow_Right from "@/assets/images/Arrow_Right.png";
import Modal from "@/components/comman/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getImages } from "@/lib/utils";
import { CircleCheck, Eye } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import AssignModel from "./AssignModel";
import DelayModel from "./DelayModel";
import HistoryModel from "./HistoryModel";

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

const AssignCard = ({ data }: { data: MeasuresItemsResponse }) => {
  const [isOpenAssignModel, setIsOpenAssignModel] = useState<number | null>(
    null
  );
  const [isOpenHistoryModel, setIsOpenHistoryModel] = useState<number | null>(
    null
  );
  const [isOpenDelayModel, setIsOpenDelayModel] = useState(false);
  const [uploadData, setUploadData] = useState<any>(null);
  const [historyMasure, setHistoryMasure] = useState<string>("");

  return (
    <>
      <Modal
        open={!!isOpenAssignModel}
        onClose={() => setIsOpenAssignModel(null)}
        className="w-[417px] px-6 py-5"
      >
        <AssignModel
          id={isOpenAssignModel}
          setIsOpenAssignModel={setIsOpenAssignModel}
        />
      </Modal>
      <Modal
        open={!!isOpenHistoryModel}
        onClose={() => {
          setIsOpenHistoryModel(null);
          setHistoryMasure("");
        }}
        className="min-w-[514px] py-5 px-6"
      >
        <HistoryModel id={isOpenHistoryModel} historyMasure={historyMasure} />
      </Modal>
      <Modal
        open={isOpenDelayModel}
        onClose={() => setIsOpenDelayModel(false)}
        className="sm:py-5 p-4 sm:px-6 lg:max-w-[800px] sm:max-w-xl max-w-[335px] rounded-xl"
      >
        <DelayModel
          uploadData={uploadData}
          setUploadData={setUploadData}
          handleClose={() => setIsOpenDelayModel(false)}
        />
      </Modal>
      <div className="mb-5">
        <div className="w-full border border-[#D9D9D9] rounded-xl">
          <div className="lg:flex block items-center justify-between w-full sm:px-5 px-3 py-3">
            <div className="flex items-center sm:gap-5 gap-3 lg:pb-0 pb-3">
              <div className="bg-white drop-shadow-md p-2 sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center">
                <img
                  src={getImages(data.pillarName, true)}
                  alt="Leaf Icon"
                  className=""
                />
              </div>
              <h5 className="text-[#1D2026] font-Calibri font-bold sm:text-base text-sm">
                {data.pillarName}
              </h5>
            </div>
            <div className="bg-[#E3E5F5] h-[20px] xl:w-[511px] w-[290px] rounded-full">
              <Progress
                value={Number(data.progressPR.toFixed(0))}
                color="#FFD56A"
                className="w-full rounded-full h-[20px]"
                isShow={true}
              />
            </div>
            <div className="flex items-center relative lg:mt-0 mt-3">
              <Button
                className={`${
                  data?.userMaturityLevel?.[0]?.level === "Advanced"
                    ? "bg-[#258483]"
                    : data?.userMaturityLevel?.[0]?.level === "Introductory"
                    ? "bg-[#C92C35]"
                    : "bg-[#FFD56A]"
                } text-black sm:text-base text-xs font-Calibri rounded-full h-[30px]`}
              >
                {data?.userMaturityLevel?.[0]?.level}
              </Button>
              <div className="relative border border-dashed border-[#A6A6A6] w-40">
                <img
                  src={Arrow_Right}
                  alt="Arrow"
                  className="absolute bottom-0 top-0 left-0 right-0 m-auto"
                />
              </div>
              <Button
                className={`text-black sm:text-base text-xs rounded-full ${
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
            const status = () => {
              if (
                moment(new Date(item.startDate), "YYYY-MM-DD").isSameOrBefore(
                  moment(new Date(), "YYYY-MM-DD")
                ) &&
                moment(new Date(item.endDate), "YYYY-MM-DD").isSameOrAfter(
                  moment(new Date(), "YYYY-MM-DD")
                )
              ) {
                return "On time";
              } else if (
                moment(new Date(), "YYYY-MM-DD").isAfter(
                  moment(new Date(item.endDate), "YYYY-MM-DD")
                )
              ) {
                return "Delay";
              } else if (
                moment(new Date(item.startDate), "YYYY-MM-DD").isAfter(
                  moment(new Date(), "YYYY-MM-DD")
                )
              ) {
                return "On time";
              }
            };

            console.log("item", item);

            return (
              <>
                <div className="sm:flex block items-center sm:px-5 p-3 sm:py-2.5 justify-between w-full border-t border-[#D9D9D9]">
                  <div className="flex flex-col gap-2.5">
                    <p className="text-black font-calibri text-base">
                      {item?.measure}
                    </p>
                    {item?.employeeId && (
                      <>
                        {" "}
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={item?.employeeId?.profileImg} />
                            <AvatarFallback className="text-xs">
                              {item?.employeeId?.name?.charAt(0) ||
                                item?.employeeId?.email
                                  ?.split("@")[0]
                                  ?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h6 className="text-black font-calibri text-base">
                            {item?.employeeId?.name ||
                              item?.employeeId?.email?.split("@")[0]}
                          </h6>
                        </div>
                        <div className="sm:pb-0 pb-2.5">
                          <h6 className="sm:text-sm text-xs text-[#00000099] font-nunito flex items-center">
                            <MdOutlineCalendarMonth className="h-[20px] w-[20px] text-[#666666] me-2" />
                            Date:
                            <span className="text-black ps-2">
                              {moment(new Date(item.startDate)).format(
                                "Do MMMM YYYY"
                              )}
                              -{moment(item.endDate).format("Do MMMM YYYY")}
                            </span>
                          </h6>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex sm:flex-col flex-row sm:gap-0 gap-2.5 sm:items-end items-center">
                    {item.employeeId !== null &&
                      item.iscompleted !== 1 &&
                      status() && (
                        <Button
                          className={`${
                            status() === "Delay"
                              ? "bg-[#F63636] text-white"
                              : "bg-[#FFD56A] text-black"
                          } text-sm font-calibri rounded-full h-[28px] px-2 min-w-[66px] sm:mb-2.5 mb-0`}
                        >
                          {status()}
                        </Button>
                      )}
                    <div className="flex gap-3 items-center">
                      <Button
                        className="text-base text-[#4285F4] underline bg-transparent font-abhaya font-semibold p-0"
                        onClick={() => {
                          setIsOpenHistoryModel(item.id);
                          setHistoryMasure(item.measure);
                        }}
                      >
                        History
                      </Button>
                      {item.employeeId === null && (
                        <div className="flex items-center gap-4">
                          <Button
                            className="bg-[#00778B] text-white rounded-md text-sm h-[32px] px-2 flex items-center w-[75px]"
                            onClick={() => setIsOpenAssignModel(item.id)}
                          >
                            <BsPencilFill width={16} className="w-full" />{" "}
                            Assign
                          </Button>
                        </div>
                      )}
                      {item.iscompleted === 1 && (
                        <div className="flex items-center gap-3">
                          {item.evidence && (
                            <a
                              href={item.evidence}
                              target="_blank"
                              className="gap-2 bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]"
                            >
                              <Eye width={18} />
                              view
                            </a>
                          )}

                          <Button className="bg-transparent text-[#58BA66] text-base font-nunito font-semibold flex items-center px-2.5">
                            <CircleCheck width={20} /> Completed
                          </Button>
                        </div>
                      )}
                      {item.iscompleted === 0 && item.employeeId !== null && (
                        <Button
                          type="button"
                          onClick={() => {
                            setIsOpenDelayModel(true);
                            setUploadData(item);
                          }}
                          className="bg-[#00778B] text-white rounded-md flex items-center text-sm h-[32px] px-2 w-[75px]"
                        >
                          <BsPencilFill />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AssignCard;
