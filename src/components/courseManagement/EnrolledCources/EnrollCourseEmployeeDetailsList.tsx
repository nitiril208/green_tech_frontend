import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { CohortGroupType } from "@/types/enroll";
import { Video } from "lucide-react";
import { useState } from "react";
import EnrollCourseEmployeeDetailsListItem from "./EnrollCourseEmployeeDetailsListItem";
import SessionModalDetails from "./SessionModalDetails";

interface EnrollCourseEmployeeDetailsListProps {
  data: CohortGroupType;
  course: any;
}
const EnrollCourseEmployeeDetailsList = ({
  data,
  course,
}: EnrollCourseEmployeeDetailsListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="">
        {data?.employee && data?.employee?.length > 0 ? (
          data?.employee?.map((item, index) => {
            return (
              <EnrollCourseEmployeeDetailsListItem
                data={item}
                key={index}
                course={course}
              />
            );
          })
        ) : (
          <span className="text-center block text-xl text-neutral-400">
            No data found
          </span>
        )}
      </div>
      <div className="flex sm:flex-row flex-col sm:items-start items-center gap-3 mt-5">
        {data?.moduleLiveSection?.map((item, i: number) => {
          return (
            <Button
              key={i}
              variant={"outlinePrimary"}
              className="text-base font-calibri px-2.5"
              onClick={() => setIsOpen(true)}
            >
              <Video />
              {item?.liveSecTitle}
            </Button>
          );
        })}
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-3xl"
      >
        <SessionModalDetails />
      </Modal>
    </div>
  );
};

export default EnrollCourseEmployeeDetailsList;
