import Loader from "@/components/comman/Loader";
import InviteMember from "@/components/Models/InviteMember";
import { Button } from "@/components/ui/button";
import { PermissionContext } from "@/context/PermissionContext";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { getCheckedMeasuresByAssessment } from "@/services/apiServices/pillar";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AssignCard from "./AssignCard";
import AssignProf from "./AssignProf";

const Assign = ({
  setStep,
  setIsEdit,
  selectAssessment = "1",
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
  setIsEdit: Dispatch<React.SetStateAction<boolean>>;
  selectAssessment: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const Role = location?.pathname?.split("/")[1];
  const { empPermissions } = useContext(PermissionContext);
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const userID =
    userData?.query?.role === "4"
      ? userData?.company?.userDetails?.id
      : UserId
      ? +UserId
      : userData?.query
      ? userData?.query?.id
      : userData?.id;

  const { data: getCheckedmeasures, isPending } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasuresbyAssessment, { selectAssessment }],
    queryFn: () =>
      getCheckedMeasuresByAssessment({
        userId: userID,
        clientId,
        assNumber: selectAssessment || "",
      }),
    enabled: !!selectAssessment,
  });

  return (
    <div className="">
      {isPending ? (
        <Loader />
      ) : Role !== "employee" ? (
        getCheckedmeasures?.data?.data.map((data: any, index: number) => {
          return <AssignCard key={index} data={data} />;
        })
      ) : (
        getCheckedmeasures?.data?.data.map((data: any, index: number) => {
          return <AssignProf key={index} data={data} />;
        })
      )}
      <div className="text-center">
        {/* <Button className="sm:w-[223px] w-[138px] bg-[#E5F1F3] text-[#00778B] sm:text-base text-sm font-bold font-calibri sm:h-[48px] h-[40px]">
          Retake Assessment
        </Button> */}
        <div className="flex flex-wrap justify-center items-center gap-5 my-[35px]">
          {((+userData?.query?.role === UserRole?.Employee &&
            empPermissions?.editActionItem) ||
            (Role !== "employee" && true)) && (
            <Button
              type="button"
              onClick={() => {
                setStep(0);
                setIsEdit(true);
              }}
              className="bg-[#64A70B] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm"
            >
              Edit Action Plan
            </Button>
          )}
          {Role !== "employee" && (
            <>
              <Button
                type="button"
                onClick={() => {
                  dispatch(
                    setPath([
                      {
                        label: "Course Management",
                        link: null,
                      },
                      {
                        label: "Recommended Course",
                        link: `/company/coursesrecommended`,
                      },
                    ])
                  );
                  navigate("/company/coursesrecommended");
                }}
                className="bg-[#002A3A] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm"
              >
                View Recommended Courses
              </Button>
              <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-[#00778B] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm"
              >
                Invite Team Members
              </Button>
            </>
          )}
        </div>
        {Role === "employee" && userData?.query?.editActionItem && (
          <p className="text-[#64A70B] lg:text-base text-sm font-semibold">
            And whenever you’ve learnt, applied, and developed:  <br />
            come back to measure your progress anytime with a re-assessment!
          </p>
        )}
      </div>
      <InviteMember isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Assign;
