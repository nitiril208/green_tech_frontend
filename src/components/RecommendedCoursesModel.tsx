import { QUERY_KEYS } from "@/lib/constants";
import { fetchEnroll } from "@/services/apiServices/enroll";
import { CourseDiscountDataEntity } from "@/types/course";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectMenu from "./comman/SelectMenu";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";

interface RecommendedCoursesModelProps {
  isLoading: boolean;
  data: CourseDiscountDataEntity[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecommendedCoursesModel = ({
  isLoading,
  data,
  setOpen,
}: RecommendedCoursesModelProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { CompanyId } = useSelector((state: any) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const CompanyID = CompanyId
    ? CompanyId
    : userData?.query?.companyDetails?.id || userData?.query?.detailsid;
  const [selectFilterByCategory, setSelectFilterByCategory] = useState("");
  const [itemList, setItemList] = useState<number[]>([]);
  const [selectCourseByIndex, setSelectCourseByIndex] = useState<
    number | string
  >("");
  const [selectCourse, setSelectCourse] = useState("");

  useEffect(() => {
    if (data) {
      const initialItemList = data?.map(() => 1);
      setItemList(initialItemList);
    }
  }, [data]);

  const handleIncrement = (index: number) => {
    if (index === selectCourseByIndex) {
      setItemList((prev) =>
        prev.map((item, idx) => (idx === index ? item + 1 : item))
      );
    } else {
      setSelectCourseByIndex(index);
      setItemList((prev) =>
        prev.map((item, idx) => (idx === index ? item + 1 : item))
      );
    }
  };

  const handleDecrement = (index: number) => {
    if (index === selectCourseByIndex && itemList[index] > 0) {
      setItemList((prevItemList) =>
        prevItemList.map((item, idx) => (idx === index ? item - 1 : item))
      );
    }
  };

  const filterOption =
    data?.[0]?.currentVersion?.cohortGroup?.map((item, index) => {
      return {
        label: `Cohort ${index + 1} : Start ${item?.slotStartDate?.date}/${
          item?.slotStartDate?.month
        }/${item?.slotStartDate?.year} End ${item?.slotEndDate?.date}/${
          item?.slotEndDate?.month
        }/${item?.slotEndDate?.year}`,
        value: String(item?.id),
      };
    }) || [];

  const { mutate: enrollRequest, isPending } = useMutation({
    mutationFn: fetchEnroll,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchbycourse],
      });
      toast({
        variant: "success",
        title: data?.data?.message,
      });
      setOpen(false);
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });

  const handleEnrollementRequest = () => {
    enrollRequest({
      versionId: data[+selectCourse]?.currentVersion?.id,
      companyId: +CompanyID,
      cohortGroupId: +selectFilterByCategory,
      isdiscounted: +selectCourse,
      numberOfEmployee: itemList[+selectCourse],
      price: data[+selectCourse]?.price * itemList[+selectCourse],
    });
  };

  useEffect(() => {
    if (data?.length === 1) {
      setSelectCourse("0");
    }
  }, [data]);

  return isLoading ? (
    <span className="h-full flex items-center justify-center">
      <Loader2 className="w-7 h-7 animate-spin" />
    </span>
  ) : data?.length > 0 ? (
    <div>
      <ScrollArea className="md:h-[500px] h-[400px]">
        {data.map((courseList, index: number) => {
          return (
            <div key={index}>
              <div className="border border-[#D9D9D9] md:p-5 p-3 mb-6 rounded-md">
                <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 justify-between pb-[18px]">
                  <div className="flex items-center text-base font-normal font-calibri gap-2 text-[#000]">
                    <input
                      type="radio"
                      value="button"
                      name="course"
                      className="md:w-6 w-4 md:h-6 h-4 focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                      onChange={() => setSelectCourse(index?.toString())}
                      checked={selectCourse === index?.toString()}
                    />
                    {courseList?.isDiscounted
                      ? "With Discount"
                      : "Without Discount"}
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-base font-calibri leading-5">
                      Course Price :{" "}
                    </p>
                    <span className="font-calibri font-bold text-base leading-5 text-[#000]">
                      € {courseList?.price}
                    </span>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:items-center items-start md:gap-7 gap-4">
                  <div className="sm:min-w-[143px] sm:min-h-[143px] sm:w-[143px] sm:h-[143px] w-full">
                    <img
                      src={courseList?.bannerImage}
                      alt=""
                      className=" rounded-md object-cover h-full w-full"
                    />
                  </div>
                  <div className="">
                    <h6 className="font-bold md:text-2xl text-lg font-calibri leading-7">
                      {courseList?.title}
                    </h6>
                    <div className="flex sm:flex-row flex-col sm:items-center items-start gap-6 mt-3">
                      <div>
                        <p className="text-base font-normal font-calibri leading-5 pb-[6px]">
                          Number of Employee
                        </p>
                        <div className="inline-flex items-center border border-[#D9D9D9]">
                          <Button
                            className="w-[50px] h-[42px] rounded-none bg-white hover:bg-white text-black border-r  border-[#D9D9D9]"
                            onClick={() => handleDecrement(index)}
                          >
                            <Minus />
                          </Button>
                          <input
                            type="number"
                            value={itemList[index]}
                            min={0}
                            onChange={(e) =>
                              setItemList((prevItemList) =>
                                prevItemList?.map((item: any, idx: number) =>
                                  idx === index
                                    ? parseInt(e.target.value) || 0
                                    : item
                                )
                              )
                            }
                            className="w-[88px] h-[42px] text-center focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                          />
                          <Button
                            className="w-[50px] h-[42px] rounded-none bg-white hover:bg-white text-black border-l border-[#D9D9D9]"
                            onClick={() => handleIncrement(index)}
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-base font-normal font-calibri leading-5">
                          Total Price :{" "}
                        </p>
                        <span className="text-base font-calibri font-bold leading-5">
                          € {courseList?.price * itemList[index]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>
      <div className="flex sm:flex-row flex-col justify-between sm:gap-0 gap-4">
        <SelectMenu
          option={filterOption}
          setValue={(data: string) => setSelectFilterByCategory(data)}
          value={selectFilterByCategory}
          className="md:w-[391px] sm:w-[350px] w-[300px] sm:h-[52px] h-12 font-inter text-black border border-[#D9D9D9] sm:text-base text-sm font-normal"
          itemClassName="text-base font-medium font-inter"
          placeholder="Select Cohort"
        />
        <Button
          className="bg-[#64A70B] text-base font-semibold font-nunito leading-[22px] w-[137px] sm:h-[52px] h-12"
          onClick={handleEnrollementRequest}
          disabled={data?.[0]?.isOnline === 1 ? false || !selectCourse || isPending  : isPending || !selectCourse || !selectFilterByCategory}
        >
          {isPending && <Loader2 className="w-5 h-5 animate-spin" />} Select
        </Button>
      </div>
    </div>
  ) : (
    <span className="flex items-center justify-center text-xl">
      No data found
    </span>
  );
};

export default RecommendedCoursesModel;
