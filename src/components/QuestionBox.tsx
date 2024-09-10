import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { setAnswer } from "@/redux/reducer/QuestionReducer";
import { addAnswer } from "@/services/apiServices/question";
import { ErrorType } from "@/types/Errors";
import { Option, QuestionType } from "@/types/Question";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./comman/Loader";
import { toast } from "./ui/use-toast";
import Suggestion from "/assets/img/Suggestion.png";

const QuestionBox = ({
  i,
  index,
  setIsLoading,
}: {
  i: QuestionType;
  index: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const queryClient = useQueryClient();
  const question = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  const { activePillar } = useAppSelector((state) => state.question);

  const userId = useAppSelector((state) => state.user.UserId);
  const { mutate: addanswer, isPending } = useMutation({
    mutationFn: addAnswer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getQuestionAnswer],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPending, setIsLoading]);

  const handleChange = (questionId: number, selectedOptions: any) => {
    const userID = userId
      ? userId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;
    if (userID) {
      addanswer({
        userId:
          userData?.query?.role === "4"
            ? userData?.company?.userDetails?.id
            : userID,
        questionId: questionId,
        selectedOptions: [selectedOptions],
      });
    } else {
      toast({
        variant: "destructive",
        title: "Please login again",
      });
      navigate("/auth");
    }
  };

  return (
    <div
      className={cn(
        `relative bg-white min-h-[321px] pb-3 rounded-[15.34px] shadow-[0px_4px_4px_0px_#00000040] sm:mb-12 overflow-hidden`
      )}
      key={index}
    >
      <div className="flex items-center justify-center top-0 left-0 bg-teal text-white sm:w-[208px] w-[157px] h-[37px] sm:h-[52px] rounded-br-[62.27px] font-bold sm:text-lg text-sm p-2">
        {activePillar} {index + 1}/{question[activePillar]?.length}
      </div>
      <div className="sm:py-4 bg-[#EEF9FD] sm:px-9 px-4 py-2.5 mt-5">
        <div className="flex gap-1">
          <span className="text-[#002A3A] font-bold sm:text-base text-sm">
            {index + 1}.
          </span>
          <p className="text-[#002A3A] font-bold sm:text-base text-sm">
            {i.title}
          </p>
        </div>
      </div>
      <div className="mt-[21px] flex flex-col gap-[17px] sm:px-10 px-4">
        {i.options.map((option: Option, oIndex: number, arr) => {
          return (
            <div key={oIndex}>
              <div
                className="inline-flex items-center cursor-pointer"
                onClick={() => {
                  handleChange(i.id, option);
                  dispatch(
                    setAnswer({
                      qId: index,
                      oId: oIndex,
                      arr: arr,
                    })
                  );
                }}
              >
                <input
                  type="radio"
                  className="cursor-pointer min-w-[15px] w-[15px] h-[15px] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                  checked={option?.checked ? true : false}
                />
                <span className="ml-[9px] text-sm">{option.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {question.hint && (
        <img
          src={Suggestion}
          alt="Suggestion"
          className="absolute top-5 right-12 w-8 h-8 cursor-auto"
        />
      )}
      {isPending && (
        <div className="bg-black/20 w-full h-full absolute top-0 right-0">
          <Loader containerClassName="h-full" />
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
