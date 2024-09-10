/* eslint-disable @typescript-eslint/ban-ts-comment */
import advanceGreen from "@/assets/images/advanceGreen.svg";
import apply from "@/assets/images/apply.svg";
import develop from "@/assets/images/develop.svg";
import planAction from "@/assets/images/planAction.svg";
import selfAssess from "@/assets/images/selfAssess.svg";
import Loader from "@/components/comman/Loader";
import Question from "@/components/comman/Question";
import HomeFooter from "@/components/homePage/HomeFooter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import {
  setActivePillar,
  setGettedAnswer,
  setPillarName,
  setQuestion,
} from "@/redux/reducer/QuestionReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchClientwisePillarList } from "@/services/apiServices/pillar";
import {
  assessmentQuestionScore,
  fetchQuestionAnswerList,
  fetchQuestionList,
} from "@/services/apiServices/question";
import { QuestionType } from "@/types/Question";
import { UserRole } from "@/types/UserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Correct from "/assets/img/Correct.png";
import LeftArrow from "/assets/img/LeftArrow.png";

const QuestionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const currPath = localStorage.getItem("path");
  const isHide = location.pathname?.split("/")?.length === 2 ? false : true;

  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { activePillar, allPillar } = useAppSelector((state) => state.question);

  const question = useAppSelector((state) => state.question);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalAttemptedQuestions, setTotalAttemptedQuestions] = useState(0);

  const { data: clientwisePillarList } = useQuery({
    queryKey: [QUERY_KEYS.clientwisePillarList],
    queryFn: () => fetchClientwisePillarList(clientId?.toString()),
  });

  const path = 1 + 1;
  const { mutate: EnumUpadate } = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, +userID),
    onSuccess: async (data) => {
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });

  useEffect(() => {
    const pillarName: string[] = clientwisePillarList?.data?.data?.length
      ? clientwisePillarList?.data?.data?.map((itm) => itm?.pillarName)
      : [];

    if (pillarName?.length) {
      dispatch(setPillarName(pillarName));
      dispatch(setActivePillar(pillarName[0]));
      setSelectedData([pillarName[0]]);
    }
  }, [clientwisePillarList?.data?.data, dispatch]);

  useEffect(() => {
    if (
      !activePillar &&
      !!clientwisePillarList?.data?.data &&
      clientwisePillarList?.data?.data?.length > 0 &&
      clientwisePillarList?.data?.data
    ) {
      if (
        !!clientwisePillarList?.data?.data &&
        clientwisePillarList?.data?.data?.length > 0
      ) {
        dispatch(
          setActivePillar(clientwisePillarList?.data?.data[0]?.pillarName)
        );
      }
    }
  }, [clientwisePillarList?.data?.data, activePillar, dispatch]);

  const { data: questionList, isPending } = useQuery({
    queryKey: [QUERY_KEYS.questionList],
    queryFn: () => fetchQuestionList(clientId?.toString()),
  });

  const { mutate: assessmentQuestionScoreFun, isPending: isPending1 } =
    useMutation({
      mutationFn: (data: { UserId: number; clientId: number }) =>
        assessmentQuestionScore(data),
      onSuccess: async () => {
        if ((currPath && +currPath > 4) || userData?.query?.role === "4") {
          navigate(
            `/${UserRole[
              userData?.query?.role
            ]?.toLowerCase()}/maturityassessment`
          );
        } else {
          navigate("/score");
        }
      },
    });

  useEffect(() => {
    allPillar?.forEach((i: string) => {
      if (questionList?.data?.data) {
        dispatch(setQuestion({ q: questionList?.data?.data?.[i], p: i }));
      }
    });
  }, [allPillar?.length, questionList?.data?.data, activePillar]);

  const paths = [
    {
      name: "Self-assess",
      img: selfAssess,
      status: "indeterminate",
    },
    {
      name: "Plan Action",
      img: planAction,
      status: "pending",
    },
    {
      name: "Develop",
      img: develop,
      status: "pending",
    },
    {
      name: " Apply",
      img: apply,
      status: "pending",
    },
    {
      name: "Advance Your Green",
      img: advanceGreen,
      status: "pending",
    },
  ];

  useEffect(() => {
    let totalQuestions = 0;
    let totalAttemptedQuestions = 0;

    allPillar?.forEach((pillar: string) => {
      // @ts-ignore
      const pillarQuestions = question[pillar];
      if (pillarQuestions && pillarQuestions.length > 0) {
        totalQuestions += pillarQuestions.length;
        totalAttemptedQuestions += pillarQuestions.filter((que: QuestionType) =>
          que.options.some((opt) => opt.checked)
        ).length;
      }
    });

    setTotalQuestions(totalQuestions);
    setTotalAttemptedQuestions(totalAttemptedQuestions);
  }, [allPillar?.length, question]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    EnumUpadate();
    const allQueAns: any = {};
    allPillar.forEach((pillar: string) => {
      allQueAns[pillar] = question[pillar];
    });

    assessmentQuestionScoreFun({
      UserId:
        userData?.query?.role === "4"
          ? userData?.company?.userDetails?.id
          : userID,
      clientId: +clientId,
    });
  };

  const { data: fetchQuestionAnswer } = useQuery({
    queryKey: [QUERY_KEYS.getQuestionAnswer],
    queryFn: () =>
      fetchQuestionAnswerList(
        userData?.query?.role === "4"
          ? userData?.company?.userDetails?.id
          : userID?.toString()
      ),
    enabled: !!userID,
  });

  const pillarwiseQuestions = allPillar?.map((item: string) => {
    return { q: question?.[item], name: item };
  });

  const updateAnswers = (pillarwiseQuestion: any, fetchQuestionAnswer: any) => {
    if (
      fetchQuestionAnswer?.data?.data &&
      Array.isArray(pillarwiseQuestion?.q)
    ) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const updatedAnswers = [...pillarwiseQuestion?.q];
      fetchQuestionAnswer.data.data.forEach((j: any) => {
        if (j) {
          const c = pillarwiseQuestion?.q.find(
            (i: any) => i?.id === j?.questionId?.id
          );
          if (c) {
            const d = c.options.find(
              (o: any) => o?.optionId === j?.selectedOptions[0]?.optionId
            );
            if (d) {
              const updatedOption = { ...d, checked: true };
              const updatedOptions = c.options.map((o: any) =>
                o.optionId === updatedOption.optionId ? updatedOption : o
              );

              const updatedC = { ...c, options: updatedOptions };

              const index = updatedAnswers.findIndex(
                (itemA) => updatedC.id === itemA.id
              );
              if (index !== -1) {
                updatedAnswers[index] = updatedC;
              }
            }
          }
        }
      });

      dispatch(
        setGettedAnswer({ updatedAnswers, name: pillarwiseQuestion?.name })
      );
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedData, isShow]);

  useEffect(() => {
    pillarwiseQuestions.forEach((pillarwiseQuestion: any) => {
      updateAnswers(pillarwiseQuestion, fetchQuestionAnswer);
    });
  }, [
    fetchQuestionAnswer?.data?.data?.length,
    allPillar?.length,
    activePillar,
    ...pillarwiseQuestions.map((question: any) => question?.q?.length),
  ]);

  const handleSelected = (e: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setIsShow(!isShow);
    setSelectedData((prev) => {
      if (prev?.includes(e)) {
        return prev;
      } else {
        return [...prev, e];
      }
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      className={`font-calibri font-normal ${
        isHide ? "bg-white" : "bg-transparent"
      }`}
    >
      <div
        className={`${
          isHide ? "hidden" : "flex"
        } bg-teal h-[44px] justify-between items-center sticky top-0 max-h-screen z-30`}
      >
        <div className="w-full text-white px-4 text-lg leading-[21.97px xl:max-w-[1170px] max-w-full overflow-auto mx-auto xl:px-0 px-5]">
          <div className="flex gap-[9px]">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                history.back();
              }}
            >
              <img src={LeftArrow} alt="arrow" width={22} height={22} />
              <span>Back</span>
            </button>
          </div>

          {/* <button className="flex items-center gap-3 border border-solid border-white w-[166px] justify-center">
          <img src={TreePlantingWhite} alt="tree" width={24} height={30} />
          Environmental
        </button> */}
        </div>
      </div>
      <div
        className={`${
          isHide ? "hidden" : "flex"
        } h-[130px] flex justify-center pb-3 pt-[13px] overflow-x-auto overflow-y-hidden`}
      >
        <div className="relative sm:gap-[80px] gap-[50px] justify-between overflow-auto flex items-center mx-5">
          {paths.map((path, index: number) => {
            return (
              <div
                className="flex flex-col self-end items-center min-w-[150px] w-[150px]"
                key={index}
              >
                {path.status === "checked" ? (
                  <img src={Correct} alt="img" width={59.6} height={59.6} />
                ) : path.status === "indeterminate" ? (
                  <img src={path.img} alt="img" width={59.6} height={59.6} />
                ) : (
                  <img src={path.img} alt="img" width={59.6} height={59.6} />
                )}
                <p
                  className={`text-[13px] font-medium font-Poppins px-2 py-[2px] ${
                    path.name === "Engage" ? "bg-[#64A70B] text-[#FFF]" : ""
                  }`}
                >
                  {path.name}
                </p>
              </div>
            );
          })}
          <div className="absolute top-1/2 -translate-Y-1/2 left-0 w-[900px] right-0 mx-auto border-2 border-dashed border-[#585858] -z-10"></div>
        </div>
      </div>
      <div
        className={`sticky ${isHide ? "top-[-20px]" : "top-[44px]"} ${
          isHide ? "max-h-[calc(100vh-120px)]" : "max-h-[calc(100vh-164px)]"
        } z-30`}
      >
        <div className="bg-[#E7E7E8]">
          <div
            className={`flex min-h-[129px] mx-auto overflow-auto ${
              isHide
                ? "px-5 lg:max-w-[calc(100vw-300px)] max-w-full"
                : "xl:max-w-[1170px] max-w-full xl:px-0 px-5"
            }`}
          >
            <div className="flex gap-[30px] items-center justify-center">
              {allPillar.map((category: string, index: number) => {
                const pillarQuestions = question[category];
                const pillarTotal = pillarQuestions
                  ? pillarQuestions.length
                  : 0;
                const pillarAttempted = Array.isArray(pillarQuestions)
                  ? pillarQuestions.filter((que: QuestionType) =>
                      que.options.some((opt) => opt.checked)
                    ).length
                  : 0;

                return (
                  <div
                    key={index}
                    className={`min-w-[169px] w-[169px] min-h-[88px] h-[88px] py-[5px] px-[13px] rounded-[9px] shadow-[0px_6px_5.300000190734863px_0px_#00000040] items-center cursor-pointer ${
                      activePillar === category
                        ? "bg-[#64A70B]"
                        : "bg-[#EDF0F4]"
                    }`}
                    onClick={() => {
                      dispatch(setActivePillar(category));
                      handleSelected(category);
                    }}
                  >
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="w-8 h-8">
                          <img
                            src={getImages(category, activePillar !== category)}
                            alt="img"
                            className="w-full h-full"
                          />
                        </div>
                        <p
                          className={`text-nowrap font-bold pt-1 ${
                            activePillar === category
                              ? "text-white"
                              : "text-[#3A3A3A]"
                          }`}
                        >
                          {Math.floor((pillarAttempted / pillarTotal) * 100) ||
                            0}{" "}
                          %
                        </p>
                      </div>
                      <div>
                        <h2
                          className={`leading-5 ${
                            activePillar === category
                              ? "text-white"
                              : "text-[#3A3A3A]"
                          }`}
                        >
                          {category}
                        </h2>
                        <p
                          className={`text-[12px] leading-[14.65px] ${
                            activePillar === category
                              ? "text-white"
                              : "text-[#848181]"
                          }`}
                        >
                          My progress {pillarAttempted}/{pillarTotal}
                        </p>
                      </div>
                    </div>

                    <Progress
                      color={activePillar === category ? "#002A3A" : "#64A70B"}
                      className={`${
                        !(activePillar === category) && "!bg-[white]"
                      } h-[4px]`}
                      value={
                        pillarTotal ? (pillarAttempted / pillarTotal) * 100 : 0
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <form>
        <div
          className={`${
            isHide
              ? "p-5"
              : "xl:max-w-[1170px] m-[24px] xl:mt-[89px] mt-5 xl:px-0 sm:px-5 px-[15px]"
          } relative mx-auto z-10`}
        >
          <div
            className={`${
              isHide ? "grid-cols-8" : "grid-cols-7"
            } grid xl:gap-[70px] lg:gap-[50px] sm:gap-[30px] gap-5`}
          >
            <div
              className={`w-full ${
                isHide ? "xl:col-span-6 col-span-8" : "lg:col-span-5 col-span-7"
              }`}
            >
              {isPending ? (
                <Loader />
              ) : (
                <Question
                  setIsLoading={setIsLoading}
                  handleSelected={handleSelected}
                />
              )}
            </div>
            <div
              className={`w-full bg-white ${
                isHide ? "sm:h-[calc(100vh-249px)]" : "sm:h-[calc(100vh-293px)]"
              } text-[18px] font-normal sm:m-0 m-auto sticky ${
                isHide
                  ? "top-[146px] xl:col-span-2 sm:col-span-5 col-span-8"
                  : "top-[190px] md:col-span-2 sm:col-span-4 col-span-7"
              }`}
            >
              <h2 className="h-[42px] bg-teal text-white font-bold rounded-bl-[22.9px] pl-[17px] text-[18px] leading-[21.97px] items-center flex sm:capitalize uppercase">
                How far you are
              </h2>
              {/* <div className="flex items-center mt-[9px] justify-between h-[31px] font-bold text-[16px] leading-5">
              <div className="flex items-center gap-[69px]">
                <span className=" text-teal">Completed</span>
                <p className="text-teal">
                  {currentAttemptedTotal}/
                  {question?.[activePillar]?.length || 0}
                </p>
              </div>
              <div className="mr-3">
                {isLoading && (
                  <Loader
                    containerClassName="h-auto"
                    className="w-[24px] h-[24px]"
                  />
                )}
              </div>
            </div> */}
              <div className="mt-5 w-full">
                <div className="flex items-center justify-between font-bold	text-base">
                  <span>Completed</span>
                  <p>
                    {totalAttemptedQuestions}/{totalQuestions}
                  </p>
                  <span className="mr-2">
                    <IoIosArrowDown className="w-[14px] h-[14px]" />
                  </span>
                </div>
                <div className="font-normal text-[#3a3a3a]">
                  {allPillar.map((category: string, index: number) => {
                    return (
                      <div className="flex mt-3" key={index}>
                        <div
                          className={`w-full flex justify-between font-normal pb-2 pt-[10px] ${
                            index !== allPillar.length - 1 &&
                            "border-b border--solid border-[#EAEAEA]"
                          }`}
                        >
                          <p>{category}</p>
                          <div className="flex gap-[10px]">
                            {Array.isArray(question[category]) &&
                              question[category]?.length > 0 && (
                                <div className="flex gap-1">
                                  {question[category].map(
                                    (i: QuestionType, index: number) => (
                                      <p
                                        key={index}
                                        className={`w-3 h-3 ${
                                          i.options.some(
                                            (o) => o?.checked === true
                                          )
                                            ? "bg-[#64A70B]"
                                            : "bg-[#D8D0D0]"
                                        }`}
                                      ></p>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        </div>
                        <span className="mr-2 ml-[11px] mt-[10px]">
                          <IoIosArrowDown className="w-[14px] h-[14px]" />
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Button
                  className="bg-[#64A70B] hover:bg-[#64A70B] text-white rounded text-base font-calibri w-full mt-[18px]"
                  onClick={handleSubmit}
                  isLoading={isPending1}
                  disabled={
                    totalAttemptedQuestions !== totalQuestions ||
                    isLoading ||
                    isPending1
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div
        className={`${
          isHide ? "hidden" : "block"
        } lg:mt-[200px] sm:mt-[250px] mt-0 `}
      >
        <HomeFooter />
      </div>
    </div>
  );
};

export default QuestionPage;
