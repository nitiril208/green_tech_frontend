import { useAppSelector } from "@/hooks/use-redux";
import { getImages } from "@/lib/utils";
import { getDataByPillerId } from "@/services/apiServices/pillar";
import { QuestionsByPillerResponse } from "@/types/Pillar";
import { useQuery } from "@tanstack/react-query";
import Loader from "../comman/Loader";
import Modal from "../comman/Modal";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface MaturityLevelModelProps {
  isOpen: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<number | null>>;
  pillerName: string;
  setPillerName: React.Dispatch<React.SetStateAction<string>>;
}

const maturityLevel = [
  {
    maturityLevelName: "Introductory",
    rangeStart: 0,
    rangeEnd: 39.9,
    color: "#FF5252",
  },
  {
    maturityLevelName: "Intermediate",
    rangeStart: 40,
    rangeEnd: 69.9,
    color: "#FFD56A",
  },
  {
    maturityLevelName: "Advance",
    rangeStart: 70,
    rangeEnd: 100,
    color: "#D6F5AC",
  },
];

const MaturityLevelModel = ({
  isOpen,
  setIsOpen,
  pillerName,
  setPillerName,
}: MaturityLevelModelProps) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { data, isPending } = useQuery<QuestionsByPillerResponse>({
    queryKey: ["getPillarDatabyID", { pillarId: isOpen }],
    queryFn: () =>
      getDataByPillerId({
        pillerId: isOpen as number,
        userId:
          userData?.query?.role === "4"
            ? userData?.company?.userDetails?.id
            : userID,
        clientId: +clientId,
      }),
    enabled: !!isOpen && !!userID && !!clientId,
  });
  const findMaturityLevel = (score: number) => {
    for (const level of maturityLevel) {
      if (score >= level.rangeStart && score <= level.rangeEnd) {
        return level;
      }
    }
    return null;
  };

  return (
    <Modal
      open={!!isOpen}
      className="max-w-[815px] w-full gap-0 h-[800px]"
      onClose={() => {
        setIsOpen(null);
        setPillerName("");
      }}
    >
      <div className="flex">
        <div className="h-[105px] w-[270px] flex flex-col">
          <div className="flex ">
            <div className=" ml-4 mt-0 bg-white rounded-full drop-shadow-md w-[42px] h-[42px] p-2 mb-2">
              <img
                src={getImages(pillerName, true)}
                alt="Leaf Icon"
                className="w-full h-full"
              />
            </div>

            <div className="ml-2 mt-2 h-[25px] w-[203px]">
              <h2 className="text-xm text-[#1D2026] font-calibri text-lg font-semibold">
                {pillerName}
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
            <h2 className=" text-xm text-[#1D2026] font-abhaya text-lg font-semibold">
              Where your answers put you
            </h2>
          </div>
        </div>
      </div>

      {isPending ? (
        <Loader />
      ) : (
        // <div className="flex mt-6 h-[calc(100%_-_250px)] overflow-y-auto">
        <div className="flex mt-6 h-[calc(800px_-_250px)] overflow-y-auto items-start flex-wrap gap-2">
          {data?.data?.[pillerName as string]?.map((item, i) => {
            const color = findMaturityLevel(item?.questionScores)?.color || "";
            return (
              <div className="flex flex-col border p-3 rounded-lg w-[242px] h-[255px]">
                <div className="overflow-y-auto h-[calc(100%_-_16px)]">
                  <div className="text-xs font-bold">
                    Question : {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="mt-2 w-[210px] scroll-y-auto font-calibri text-sm font-normal leading-[17.4px] text-left">
                    {item.title}
                  </div>
                  <div className="text-xs font-bold mt-2">Answer :</div>
                  {item?.answers?.length > 0 && (
                    <div className="mt-2 w-[210px] scroll-y-auto font-calibri text-sm font-normal leading-[17.4px] text-left">
                      {item?.answers?.[0]}
                    </div>
                  )}
                  {/* <div className="h-[75px] w-[210px] leading-[17.4px] text-left">
                  {
                    item?.answers?.length > 0 && item?.answers?.map((answer, i) => {
                      return (
                        <div className="mt-[10px]  font-calibri text-sm font-normal leading-[17.4px] text-left">
                         {`${i + 1}. ${answer}`}
                        </div>
                      )
                    })

                  }

                  </div> */}
                </div>

                <Progress
                  className="w-full rounded-full mt-2"
                  value={item?.questionScores || 0}
                  color={color}
                />
              </div>
            );
          })}
        </div>
        // {/* </div> */}
      )}
      <div className="mt-8 text-right">
        <Button
          type="button"
          onClick={() => {
            setIsOpen(null);
            setPillerName("");
          }}
          className="bg-[#64A70B] px-[42px] py-[14px] h-auto text-[16px] font-calibri"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default MaturityLevelModel;
