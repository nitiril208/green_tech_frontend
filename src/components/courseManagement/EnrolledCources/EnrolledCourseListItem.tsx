import CourseList from "@/components/comman/CourseList";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EnrolledCoursesType } from "@/types/enroll";
import { Loader2 } from "lucide-react";

interface EnrolledCourseListItemProps {
  data: EnrolledCoursesType | any;
  selectVersion: number | any;
  setSelectVersion: (e: any, index: number, trainercompnyId: number) => void;
  index: number;
  isLoading: boolean;
}

const EnrolledCourseListItem = ({
  data,
  selectVersion,
  setSelectVersion,
  index,
  isLoading,
}: EnrolledCourseListItemProps) => {
  const versionOption = data?.course?.version?.map((item: any) => {
    return {
      label: `V-${item?.version}`,
      value: item?.id,
      trainercompnyId: item?.trainerCompanyId
        ? item?.trainerCompanyId?.id
        : item?.trainerId?.id,
    };
  });

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex sm:flex-row flex-col items-center sm:gap-6 gap-2.5 sm:border-0 border rounded-[6px]">
        <div className="sm:min-w-[140px] sm:w-[140px] sm:min-h-[140px] sm:h-[140px] w-full rounded-md overflow-hidden">
          <img
            src={data?.course?.bannerImage}
            alt="bannerImage"
            className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
          />
        </div>
        <div className="w-full items-start sm:px-0 px-[15px] pb-[15px]">
          <div className="flex items-center flex-wrap xl:gap-4 gap-2 pb-2.5">
            <CourseList rating={data?.course?.feedBack?.avgRate} />
            <div className="flex items-center flex-wrap gap-[7px]">
              {data?.course?.courseData?.map((item: any) => {
                const pillarName = item.fetchPillar?.pillarName;
                const bg = item.fetchMaturity?.color;
                return (
                  <Badge
                    variant="outline"
                    className={`bg-[${bg}] border-[#EDF0F4] py-[5px] px-[10px] text-[#3A3A3A] text-xs font-Poppins font-normal`}
                  >
                    {pillarName}
                  </Badge>
                );
              })}
            </div>
          </div>
          <h5 className="text-[#1D2026] text-left font-bold text-base sm:pb-4 pb-3">
            {data?.course?.title}
          </h5>
          <h6 className="flex font-calibri md:text-base text-sm text-[#1D2026] pb-2">
            <span className="mr-2">Trainer :</span>
            {data?.course?.trainerId
              ? (data?.course?.trainerId?.contactFirstName || "") +
                " " +
                data?.course?.trainerId?.contactSurname
              : (data?.course?.trainerCompanyId?.contactFirstName || "") +
                " " +
                data?.course?.trainerCompanyId?.contactSurname}
          </h6>
          <div className="flex sm:flex-row flex-col flex-wrap sm:items-center items-start sm:gap-[19px] gap-2">
            <div className="flex flex-wrap gap-1">
              <span className="md:text-base text-sm text-[#1D2026] font-calibri">
                Enrolled Companies :
              </span>
              <span className="md:text-base text-sm text-[#1D2026] font-calibri font-bold">
                {data?.numberOfCompany || 0}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="md:text-base text-sm text-[#1D2026] font-calibri">
                Enrolled Employees :
              </span>
              <span className="md:text-base text-sm text-[#1D2026] font-calibri font-bold">
                {data?.numberOfEmployee || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mr-10">
        <Select
          onValueChange={(e: any) =>
            setSelectVersion(
              e,
              index,
              data?.course?.trainerCompanyId
                ? data?.course?.trainerCompanyId?.id
                : data?.course?.trainerId?.id
            )
          }
          value={data?.id}
          defaultValue={data?.course?.currentVersion?.id?.toString() || ""}
        >
          <SelectTrigger
            className={`bg-white  flex items-center gap-2`}
            disabled={selectVersion?.index === index}
          >
            {selectVersion?.index === index && isLoading && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            <SelectValue placeholder={"V-01"} />
          </SelectTrigger>
          <SelectContent className="bg-white max-h-[250px] w-full overflow-auto">
            {versionOption?.map((item: any, index: number) => (
              <SelectItem
                key={index}
                value={item.value}
                className={`font-calibri`}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EnrolledCourseListItem;
