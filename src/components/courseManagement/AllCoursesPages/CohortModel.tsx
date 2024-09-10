/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AllCourse } from "@/types/allcourses";

const CohortModel = ({ isCohortShow }: { isCohortShow: AllCourse | null }) => {
  const getUpcommingCohort = (cohortData: AllCourse) => {
    const currentDate = new Date();
    const formattedCurrentDate = {
      date: String(currentDate.getDate()).padStart(2, "0"),
      month: String(currentDate.getMonth() + 1).padStart(2, "0"),
      year: String(currentDate.getFullYear()),
    };
console.log("cohortDatacohortData", cohortData);

    const matchingSlot =
      cohortData?.cohortGroups?.length > 0 &&
      cohortData?.cohortGroups?.filter(
        (slot) =>
          parseInt(slot.slotStartDate.year) > +formattedCurrentDate.year ||
          (parseInt(slot.slotStartDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotStartDate.month) > +formattedCurrentDate.month) ||
          (parseInt(slot.slotStartDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotStartDate.month) ===
              +formattedCurrentDate.month &&
            parseInt(slot.slotStartDate.date) > +formattedCurrentDate.date &&
            parseInt(slot.slotEndDate.year) > +formattedCurrentDate.year) ||
          (parseInt(slot.slotEndDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotEndDate.month) > +formattedCurrentDate.month) ||
          (parseInt(slot.slotEndDate.year) === +formattedCurrentDate.year &&
            parseInt(slot.slotEndDate.month) === +formattedCurrentDate.month &&
            parseInt(slot.slotEndDate.date) > +formattedCurrentDate.date)
      );

    const upcomingData = matchingSlot ? matchingSlot : [];

    return (
      <>
        {upcomingData?.length > 0 ? (
          upcomingData?.map((item, i) => {
            console.log("itemitem", item);
            
            return (
              <div key={i}>
                <div className="rounded-[6px] py-[7px] px-[15px] my-[18px] border border-[#B6D8DF] bg-[#E4FBFF]">
                  <div className="pb-[6px]">
                    <p className="text-black text-xs">
                      <span className="font-medium text-base font-inter leading-5">
                        Cohort : {item?.name}
                      </span>
                      
                    </p>
                  </div>
                  <div className="font-inter text-sm leading-3 text-[#000000] font-normal">
                    <span>Start Date : </span>
                    <span>
                      {`${item.slotStartDate.date
                        .toString()
                        .padStart(2, "0")}/${item?.slotStartDate?.month
                        .toString()
                        .padStart(2, "0")}/${item?.slotStartDate?.year}`}{" "}
                    </span>
                    <span>End Date : </span>
                    <span>{`${item.slotEndDate.date
                      .toString()
                      .padStart(2, "0")}/${item?.slotEndDate?.month
                      .toString()
                      .padStart(2, "0")}/${item?.slotEndDate?.year}`}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-[18px] font-[600] font-calibri">No Cohort</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <h6 className="text-2xl font-bold font-calibri leading-7">All Cohort</h6>
      <div>{isCohortShow && getUpcommingCohort(isCohortShow)}</div>
    </div>
  );
};

export default CohortModel;
