import Modal from "@/components/comman/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { PermissionContext } from "@/context/PermissionContext";
import { QUERY_KEYS } from "@/lib/constants";
import { chatDPColor } from "@/lib/utils";
import { fetchEvaluteData } from "@/services/apiServices/enroll";
import { EmployeeType } from "@/types/enroll";
import { useQuery } from "@tanstack/react-query";
import { Award, CircleCheck, FilePenLine } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import AllocateCertificateModalDetails from "./AllocateCertificateModalDetails";
import EvaluateModalDetails from "./EvaluateModalDetails";

type employeeCourseDetailsProps = {
  data: EmployeeType;
  course: any;
};
const EnrollCourseEmployeeDetailsListItem = ({
  data,
  course,
}: employeeCourseDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { permissions } = useContext(PermissionContext);
  const [isOpenAllocate, setIsOpenAllocate] = useState(false);
  const progress = String(data?.progress)?.split(".");
  const [empId, setEmpId] = useState<string | number>("");

  const { data: fetchEvaluteList } = useQuery({
    queryKey: [QUERY_KEYS.fetchEvalute, course?.course?.id, empId],
    queryFn: () => fetchEvaluteData(course?.course?.id, +empId),
    enabled: !!course?.course?.id && !!empId,
  });

  useEffect(() => {
    if (!isOpen) {
      setEmpId("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        // open={true}
        onClose={() => setIsOpen(false)}
        className="lg:max-w-[800px] md:max-w-[650px] sm:max-w-[550px] max-w-[335px] px-0"
      >
        <EvaluateModalDetails
          data={fetchEvaluteList?.data || []}
          courseId={course?.course?.id}
          employeeId={+empId}
        />
      </Modal>

      <Modal
        open={isOpenAllocate}
        onClose={() => setIsOpenAllocate(false)}
        className="max-w-3xl"
      >
        <AllocateCertificateModalDetails
          course={course}
          data={data}
          setIsOpenAllocate={setIsOpenAllocate}
        />
      </Modal>

      <div className="grid grid-cols-12 border border-solid md:py-4 md:px-6 sm:p-3 p-2.5 gap-3">
        <div className="flex items-center 2xl:col-span-2 sm:col-span-6 col-span-12">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden sm:me-4 me-[4px]">
            <Avatar className="w-full h-full">
              <AvatarImage src={data?.profileImage || ""} alt="profileImage" />
              <AvatarFallback
                className="text-white text-xl"
                style={{ background: chatDPColor(+data?.id) }}
              >
                {data?.name?.charAt(0)?.toUpperCase() ||
                  data?.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-[calc(100%-56px)]">
            <h5 className="font-inter sm:text-base text-[15px] font-medium">
              {data?.name || data?.email?.split("@")[0]}
            </h5>
            <h6 className="text-[12px] text-[#A3A3A3] font-normal font-inter">
              {data?.company?.name}
            </h6>
          </div>
        </div>

        <div className="text-center flex items-center 2xl:col-span-5 sm:col-span-6 col-span-12">
          <Progress
            color="#58BA66"
            value={+progress?.[0] || 0}
            className="w-full"
            isShow
          />
        </div>

        <div className="flex sm:flex-row flex-col gap-2 2xl:justify-end justify-center items-center 2xl:col-span-5 col-span-12">
          <div className="flex sm:flex-nowrap flex-wrap items-center">
            {progress?.[0] === "100" && data?.certificate ? (
              <div className="pe-5">
                <span className="text-[#58BA66] flex text-base font-calibri pe-5">
                  <CircleCheck className="me-2" width={18} />
                  Completed
                </span>
              </div>
            ) : (
              <div className="flex items-center pe-5 sm:m-0 m-auto sm:pb-0 pb-3">
                <Switch disabled={progress?.[0] !== "100" ? true : false} />
                <span className="text-[#515151] text-base font-calibri ps-2 pe-5">
                  Completed
                </span>
              </div>
            )}

            {progress?.[0] === "100" && data?.certificate ? (
              <div className="pe-5">
                <span className="text-[#58BA66] flex text-base font-calibri pe-5">
                  <CircleCheck className="me-2" width={18} />
                  Certificate Issued
                </span>
              </div>
            ) : (
              <div className="sm:me-4 me-2">
                <Button
                  variant={"outlinePrimary"}
                  className="text-[#00778b] border-[#00778b] sm:px-5 p-0 w-[146px] rounded-none sm:text-base text-sm sm:h-10 h-[36px]"
                  onClick={() => setIsOpenAllocate(true)}
                  disabled={
                    progress?.[0] !== "100"
                      ? true
                      : userData?.query?.role === "3"
                      ? !permissions?.certificate
                      : false
                  }
                >
                  <Award width={18} height={18} />
                  Allocate Certificate
                </Button>
              </div>
            )}

            {progress?.[0] === "100" && data?.certificate ? (
              <div className="hidden">
                <h6 className="text-base">
                  Score:
                  <span className="font-bold">0/0</span>
                </h6>
              </div>
            ) : (
              <div className="">
                <Button
                  className="text-white flex bg-[#00778b] sm:px-5 w-[95px] sm:py-2 p-0 font-calibri sm:text-base text-sm rounded-none sm:h-10 h-[36px]"
                  onClick={() => {
                    setIsOpen(true);
                    setEmpId(data?.id);
                  }}
                  disabled={!data?.evalute}
                  // disabled={
                  //   progress?.[0] !== "100"
                  //     ? true
                  //     : userData?.query?.role === "3"
                  //     ? !permissions?.certificate
                  //     : fetchEvaluteList?.data?.find(
                  //         (item) => item?.evaluations?.length > 0
                  //       )
                  //     ? false
                  //     : true
                  // }
                >
                  <FilePenLine width={18} /> Evaluate
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollCourseEmployeeDetailsListItem;
