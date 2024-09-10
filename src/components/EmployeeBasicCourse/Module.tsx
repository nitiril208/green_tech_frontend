import { AccordionOption } from "@/types";
import { getSingleCourseType } from "@/types/course";
import Accordions from "../comman/Accordions";
import ModuleCardList from "./ModuleCardList";
import ModuleCourseViewCard from "./ModuleCourseViewCard";

const Module = ({ data, enrollData }: getSingleCourseType | any) => {
  const accordionItems: AccordionOption[] = data?.course?.module?.map(
    (item: any) => {
      return {
        title: <ModuleCardList data={item} />,
        content: (
          <ModuleCourseViewCard
            data={item}
            allData={data}
            enrollData={enrollData}
          />
        ),
      };
    }
  );

  return accordionItems?.length > 0 ? (
    <div>
      <Accordions items={accordionItems} border={false} />
    </div>
  ) : (
    <span className="flex justify-center items-center py-10">
      No Data Found
    </span>
  );
};

export default Module;
