/* eslint-disable @typescript-eslint/ban-ts-comment */
import Menu_Icon from "@/assets/images/menu_icon.png";
import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { setPillars } from "@/redux/reducer/PillarReducer";
import {
  filterMaturityMeasures,
  updatePillarCheckbox,
} from "@/services/apiServices/pillar";
import { ErrorType } from "@/types/Errors";
import { AllActionDataPillerWiseResult } from "@/types/MaturityLavel";
import { MaturityLevelOneResponse } from "@/types/message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import ActionItemModel from "./ActionItemModel";

interface View {
  id: number;
  view: number;
}

interface PillerItemProps {
  item: AllActionDataPillerWiseResult;
  setCheckedStates: Dispatch<
    React.SetStateAction<AllActionDataPillerWiseResult[]>
  >;
  selectAssessment: string;
}

const PillerCard = ({
  item,
  setCheckedStates,
  selectAssessment = "1",
}: PillerItemProps) => {
  const [view, setView] = useState<View[] | null>(null);
  const [selectmaturity, setselectMaturity] = useState("");
  const [pid, setPId] = useState<string | null>("");
  const dispatch = useAppDispatch();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const pillars = useAppSelector((state) => state.pillar?.maturitypillar);
  const [currentPiller, setCurrentPiller] = useState<string>("");
  const [open, setOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const queryClient = useQueryClient();
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  // Api Calling......

  const { mutate: updatepillarcheckbox, isPending: updatePending } =
    useMutation({
      mutationFn: updatePillarCheckbox,
      onSuccess: async (data) => {
        setPId("");
        setCheckedStates((prev: AllActionDataPillerWiseResult[]) => {
          return (
            prev &&
            prev.map((item) => {
              if (item.pillarid === data?.data?.data[0].pillarid) {
                return data?.data?.data[0];
              }
              return item;
            })
          );
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.maturitypillar],
        });
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    });

  const { data: filtermesuresdata, isLoading: measuresPending } =
    useQuery<MaturityLevelOneResponse>({
      queryKey: [
        QUERY_KEYS.filterMaturityMeasures,
        { selectmaturity, userID, clientId },
      ],
      queryFn: () =>
        filterMaturityMeasures(
          clientId as string,
          userID as string,
          selectmaturity as string,
          pid as string,
          selectAssessment as string
        ),
      enabled: !!selectmaturity && !!selectAssessment,
    });

  // Impliment Functions

  useEffect(() => {
    if (pillars) {
      const viewData = pillars.map((item) => {
        return {
          // @ts-ignore
          id: item?.pillarid,
          view: 2,
        };
      });
      setView(viewData);
    }
  }, [pillars]);

  const handleChangesView = (piller: number) => {
    setView((prev: View[] | null) => {
      return (
        prev &&
        prev.map((item) => {
          if (item.id === piller) {
            return {
              ...item,
              view: item.view === 2 ? 0 : 2,
            };
          }
          return item;
        })
      );
    });
  };

  const handleChangeCheck = (id: number, check: boolean) => {
    setPId(id.toString());
    dispatch(
      setPillars({
        id: id,
        checked: !check ? 0 : 1,
      })
    );
    const payload = {
      pillerId: +id,
      data: {
        checked: !check ? 0 : 1,
        clientId: +clientId,
        userId: +userID,
        assessmentNumber: selectAssessment,
      },
    };
    updatepillarcheckbox(payload);
  };

  const handleChange = (e: string, p_id: string) => {
    setselectMaturity(e);
    if (p_id !== null) {
      setPId(p_id);
    }
  };

  const levels = ["Introductory", "Intermediate", "Advanced"];

  // console.log("item", currentLevel, currentRecommendedLevel);

  return (
    <div className="pb-0 flex w-full">
      <div className="border border-solid border-[#D9D9D9] h-max-content rounded-xl flex flex-col w-full mb-6 bg-white">
        <div className="flex justify-between h-8">
          <div
            className={`${
              item?.checked ? "bg-[#414648]" : "bg-[#838383] text-white"
            } bg-[#414648] rounded-tl-lg rounded-br-lg px-1 pt-0 h-[28px] min-w-[176px] flex items-center justify-center`}
          >
            <h2 className="text-sm font-inter">
              <span
                className={`${
                  item?.checked ? "text-white" : "text-[#FFD56A]"
                } text-white`}
              >
                Your Level -
              </span>
              <span className="text-[#FFD56A] ms-1">
                {item.maturityLevelName}
              </span>
            </h2>
          </div>

          <div className="mt-2.5 me-3">
            <input
              className={`w-6 h-6 cursor-pointer border border-[#B9B9B9] focus:border focus:border-[#4b4b4b] shadow-none outline-none ${
                item?.checked === 0
                  ? "accent-[white]"
                  : "accent-[#64A70B] text-[#FFF]"
              }`}
              type="checkbox"
              checked={item?.checked ? true : false}
              onChange={(e) =>
                handleChangeCheck(item?.pillarid, e.target.checked)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-12 p-4">
          <div className="text-center md:col-span-2 col-span-4">
            <div className="bg-white rounded-full drop-shadow-md md:w-[90px] w-[40px] md:h-[90px] h-[40px] sm:m-auto m-0 flex items-center sm:justify-center justify-start overflow-hidden">
              <img src={getImages(item?.pillarname, true)} alt="" />
            </div>
            <div className="mt-2 text-[#1D2026] font-Calibri sm:text-base text-sm sm:text-center text-left font-bold">
              {item.pillarname}
            </div>
          </div>
          <div className="md:col-span-2 col-span-8">
            <h5 className="text-sm font-calibri text-[#8C94A3] flex items-center gap-2 mb-2">
              <FaStar className="text-[#FD8E1F]" /> RECOMMENDED
            </h5>

            <Select
              onValueChange={(e) => {
                handleChange(e, item?.pillarid.toString());
              }}
              value={selectmaturity || item.maturityNameRecommended}
            >
              <SelectGroup>
                <SelectTrigger className="max-w-[176px] rounded-none">
                  <SelectValue
                    placeholder={item.maturityNameRecommended}
                    className="w-[176px]"
                  />
                </SelectTrigger>
                <SelectContent>
                  {levels?.map((itm, index) => {
                    const findIndex = levels.findIndex(
                      (lev) => lev === item.maturityLevelName
                    );

                    return (
                      <SelectItem
                        key={index}
                        disabled={findIndex > index}
                        value={itm}
                      >
                        {itm}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </SelectGroup>
            </Select>
            {/* <SelectMenu
                  option={LevelOption}
                  setValue={(e: string) =>
                    handleChange(e, item?.pillarid)
                  }
                  value={item.maturityNameRecommended}
                  className="max-w-[176px]"
                /> */}
          </div>
          <div className="md:col-span-5 sm:col-span-8 col-span-12 md:my-0 my-3">
            <div className="bg-white rounded-full flex items-center mb-2">
              <div className="w-5 h-5 rounded-full overflow-hidden drop-shadow-md">
                <img src={Menu_Icon} alt="menu" />
              </div>
              <div className="text-[#8C94A3] ml-2 font-bold text-sm">
                MEASURES
              </div>
            </div>
            <div>
              <ul className="list-disc ml-6 sm:text-base text-sm text-[#8C94A3] font-calibri">
                {pid && +pid === item?.pillarid ? (
                  measuresPending ? (
                    <Loader containerClassName="h-auto" />
                  ) : (
                    filtermesuresdata?.data &&
                    filtermesuresdata?.data.map((m, index: number) =>
                      m?.filteredOptions
                        ?.slice(
                          0,
                          view &&
                            view.find((it) => it.id === m.pillarid)?.view !== 0
                            ? 2
                            : m?.filteredOptions?.length
                        )
                        ?.map(
                          (measures, subIndex: number) =>
                            measures?.measures && (
                              <li
                                key={`item-${index}-${subIndex}`}
                                className=""
                              >
                                {measures?.measures}
                              </li>
                            )
                        )
                    )
                  )
                ) : (
                  item?.filteredOptions
                    ?.slice(
                      0,
                      view &&
                        view.find((it) => it.id === item.pillarid)?.view !== 0
                        ? 2
                        : item?.filteredOptions?.length
                    )
                    .map((m) => {
                      if (m.measures) {
                        return <li>{m.measures}</li>;
                      }
                    })
                )}
                {item?.filteredOptions && item?.filteredOptions?.length > 1 && (
                  <Button
                    variant={"link"}
                    type="button"
                    onClick={() => handleChangesView(item.pillarid)}
                    className="text-[#64A70B] font-calibri text-sm font-bold"
                  >
                    {view?.length &&
                    view?.find((it) => it.id === item.pillarid)?.view === 0
                      ? "View less"
                      : "View more"}
                  </Button>
                )}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 sm:col-span-4 col-span-12 flex items-end sm:flex-col sm:justify-center justify-center">
            <Button
              disabled={item.checked === 0}
              onClick={() => {
                setPId(item?.pillarid.toString());
                setCurrentPiller(item.pillarname);
                setOpen(true);
                setselectMaturity(item.maturityNameRecommended);
              }}
              className="bg-[#64A70B] text-sm font-calibri text-white py-2 px-4 rounded-md h-[40px] w-[150px] font-bold"
            >
              {item?.actionItem && item?.actionItem?.length > 0
                ? "View Action Items"
                : "Define Action Items"}
            </Button>
            {item?.actionItem?.length > 0 && (
              <span>Action Item: {item?.actionItem?.length}</span>
            )}
          </div>
        </div>
      </div>
      <Loading isLoading={updatePending} />
      <ActionItemModel
        open={open}
        setOpen={setOpen}
        currentPiller={currentPiller}
        setPId={setPId}
        pid={pid}
        selectmaturity={selectmaturity}
        selectAssessment={selectAssessment}
      />
    </div>
  );
};

export default PillerCard;
