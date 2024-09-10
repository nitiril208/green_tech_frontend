import action_assigned from "@/assets/images/action_assigned.png";
import Action_Completed from "@/assets/images/action_completed.png";
import Action_Display from "@/assets/images/action_display.png";
import Action_Open from "@/assets/images/action_open.png";
import { QUERY_KEYS } from "@/lib/constants";
import { getDashboardEmployeeCourse } from "@/services/apiServices/employee";
import { MyActionDataType } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import CustomCarousel from "../comman/CustomCarousel";
import MyActionItems from "./MyActionItems";

const MyAction = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const { data, isLoading } = useQuery({
    queryKey: [
      QUERY_KEYS.getdashboardEmployeeCourse,
      { id: userData?.query?.detailsid },
    ],
    queryFn: () => getDashboardEmployeeCourse(userData?.query?.detailsid),
    enabled: !!userData?.query?.detailsid,
  });

  const actionItems: MyActionDataType[] = [
    {
      image: action_assigned,
      title: data?.myActionItems?.assigned || 0,
      subTitle: "Assigned",
    },
    {
      image: Action_Open,
      title: data?.myActionItems?.ontime || 0,
      subTitle: "Open",
    },
    {
      image: Action_Display,
      title: data?.myActionItems?.delayed || 0,
      subTitle: "Delayed",
    },
    {
      image: Action_Completed,
      title: data?.myActionItems?.completed || 0,
      subTitle: "Completed",
    },
  ];

  return (
    <div className="mb-6">
      <h5 className="sm:text-base text-lg text-black font-inter pb-4 sm:font-medium font-bold">
        My Action Items
      </h5>
      <div className="lg:block hidden">
        <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
          {actionItems?.length ? (
            actionItems?.map((data, index) => {
              return <MyActionItems data={data} key={index} isLoading={isLoading} />;
            })
          ) : (
            <p className="col-span-full flex items-center justify-center h-[300px]">
              No data
            </p>
          )}
        </div>
      </div>
      <div className="lg:hidden block">
        <CustomCarousel dots={false} className="basis-1/3">
          {actionItems.length ? (
            actionItems?.map((data: any, index: number) => {
              return <MyActionItems data={data} key={index} isLoading={isLoading} />;
            })
          ) : (
            <p className="col-span-full flex items-center justify-center h-[300px]">
              No data
            </p>
          )}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default MyAction;
