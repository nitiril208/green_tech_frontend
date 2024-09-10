import Accordions from "@/components/comman/Accordions";
import { AccordionOption } from "@/types";
import { CohortGroupType, EnrolledCoursesType } from "@/types/enroll";
import EnrollCourseEmployeeDetailsList from "./EnrollCourseEmployeeDetailsList";
import EnrolledCourseDetailsItems from "./EnrolledCourseDetailsItems";

const EnrolledCourseDetailsList = ({ data }: EnrolledCoursesType | any) => {
  const accordionItems: AccordionOption[] = data?.cohortGroup?.map(
    (item: CohortGroupType) => {
      return {
        title: <EnrolledCourseDetailsItems data={item} />,
        content: <EnrollCourseEmployeeDetailsList data={item} course={data} />,
      };
    }
  );
  return (
    <div className="">
      <Accordions
        items={accordionItems}
        rounded={false}
        className="sm:mt-[25px] mt-0"
        itemsClass="md:p-5 p-3 sm:mx-0 mx-0"
        customIconClassName="sm:block hidden"
      />
    </div>
  );
};

export default EnrolledCourseDetailsList;
