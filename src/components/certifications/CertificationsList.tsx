import { EmployeeCertificationResult } from "@/types/certificate";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type certificationListProps = {
  data: EmployeeCertificationResult;
};

const CertificationsList = ({ data }: certificationListProps) => {
  const navigate = useNavigate();
  return (
    <div className="shadow xl:p-5 sm:p-4 p-[15px] border border-[#dddddd33] rounded-[10px]">
      <div className="grid grid-cols-9 items-center">
        <div className="flex items-center sm:col-span-6 col-span-7">
          <div className="sm:min-w-[100px] sm:w-[100px] min-w-[50px] w-[50px] sm:min-h-[100px] sm:h-[100px] min-h-[50px] h-[50px] sm:mr-5 mr-[10px]">
            <img
              src={data?.course?.bannerImage}
              alt=""
              className="object-cover w-full h-full static align-middle max-w-full inline-block inset-[50%_auto_auto_50%]"
            />
          </div>
          <div>
            <p className="sm:text-sm text-xs font-medium font-inter leading-4 sm:line-clamp-3 line-clamp-2 text-[#1D2026] mb-2">
              {data.course.title}
            </p>
            <h6 className="sm:text-sm text-xs font-normal font-nunito leading-5 text-[#000000] sm:pb-2 pb-[6px]">
              {data?.course?.courseData
                ?.map((item: any) => item?.fetchPillar?.pillarName)
                ?.join(" | ")}{" "}
              <br />
              {/* {data?.course?.module} modules */}
            </h6>
          </div>
        </div>
        <div className="sm:col-span-3 col-span-2 text-right">
          <Button
            className="sm:w-20 sm:h-10 w-[52px] h-9 rounded-md bg-[#00778B] sm:text-base text-sm sm:font-normal font-bold sm:uppercase font-calibri leading-5"
            onClick={() =>
              navigate(`/employee/my-accomplishments/${data.id}`, {
                state: data?.course?.id,
              })
            }
            disabled={!data?.certificatePdf}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificationsList;
