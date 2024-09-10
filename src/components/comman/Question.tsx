import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { setActivePillar } from "@/redux/reducer/QuestionReducer";
import { QuestionType } from "@/types/Question";
import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import QuestionBox from "../QuestionBox";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { toast } from "../ui/use-toast";

const Question = ({
  setIsLoading,
  handleSelected,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSelected: (value: string) => void;
}) => {
  const question = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();
  const { activePillar, allPillar } = useAppSelector((state) => state.question);
  const location = useLocation();
  const isHide = location.pathname?.split("/")?.length === 2 ? false : true;

  const handlePrev = () => {
    const currentIndex = allPillar.indexOf(activePillar);
    if (currentIndex > 0) {
      const prevPillar = allPillar[currentIndex - 1];
      handleSelected(prevPillar);
      dispatch(setActivePillar(prevPillar));
    }
  };
  const handleNext = () => {
    const currentIndex = allPillar.indexOf(activePillar);
    if (currentIndex < allPillar.length - 1) {
      const nextPillar = allPillar[currentIndex + 1];
      handleSelected(nextPillar);
      dispatch(setActivePillar(nextPillar));
    } else {
      toast({
        variant: "success",
        title: "Please Click on Submit button",
      });
    }
  };

  return (
    <>
      <div className="sm:block hidden">
        {Array.isArray(question[activePillar]) &&
          question[activePillar]?.map((i: QuestionType, index: number) => {
            return (
              <QuestionBox i={i} index={index} setIsLoading={setIsLoading} />
            );
          })}
      </div>
      <div className="sm:hidden block">
        <Carousel>
          <CarouselContent>
            {Array.isArray(question[activePillar]) &&
              question[activePillar]?.map((i: QuestionType, index: number) => {
                return (
                  <CarouselItem>
                    <QuestionBox
                      i={i}
                      index={index}
                      setIsLoading={setIsLoading}
                    />
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
      <div
        className={`w-full sm:mt-0 mt-5 gap-2 items-center justify-center ${
          isHide ? "hidden" : "flex"
        }`}
      >
        <Button
          // variant={"outline"}
          disabled={allPillar.indexOf(activePillar) === 0}
          type="button"
          className="text-base w-full bg-[#64A70B] hover:bg-[#64A70B] max-w-[130px]"
          onClick={handlePrev}
        >
          Prev
        </Button>
        <Button
          type="button"
          // variant={"outline"}
          disabled={allPillar.indexOf(activePillar) === allPillar.length - 1}
          className="text-base w-full bg-[#64A70B] hover:bg-[#64A70B] max-w-[130px]"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Question;
