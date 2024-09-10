/* eslint-disable @typescript-eslint/ban-ts-comment */
import Loader from "@/components/comman/Loader";
import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Label } from "@/components/ui/label";
import { QUERY_KEYS } from "@/lib/constants";
import {
  assignItemForEmployee,
  EmployeeList,
} from "@/services/apiServices/employee";
import { MeasuresItemsResponse } from "@/types/employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Dispatch, useState } from "react";

const AssignModel = ({
  id,
  setIsOpenAssignModel,
}: {
  id: number | null;
  setIsOpenAssignModel: Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [selectAsignModel, setSelectAsignModel] = useState("");
  const [date, setDate] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const userData = JSON?.parse(localStorage.getItem("user") as string)?.query;

  const companyId = userData?.detailsid
    ? userData?.detailsid
    : userData?.companyDetails?.id;
  const { data } = useQuery<MeasuresItemsResponse>({
    queryKey: [QUERY_KEYS.getEmployeeList, { companyId }],
    queryFn: () => EmployeeList(companyId, "Active"),
  });

  const empOption = data?.data?.map((item) => {
    return {
      label: item?.name || item.email.split("@")[0],
      value: item?.id.toString(),
    };
  });

  const { mutate, isPending } = useMutation({
    mutationFn: assignItemForEmployee,
    onSuccess: async () => {
      setIsOpenAssignModel(null);
      setDate({
        startDate: undefined,
        endDate: undefined,
      });
      setSelectAsignModel("");

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.checkedMeasuresbyAssessment],
      });
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const handleSubmit = () => {
    if (!date.startDate || !date.endDate) {
      setError("Both start date and end date are required.");
      return;
    }
    if (date.endDate <= date.startDate) {
      setError("End date must be after the start date.");
      return;
    }
    setError(null);

    const payload = {
      employeeId: selectAsignModel,
      startDate: moment(date?.startDate).toString() as string,
      endDate: moment(date?.endDate).toString() as string,
      userId: userData?.id,
    };
    if (id) {
      // @ts-ignore
      mutate({ data: payload, masureId: +id });
    }
  };

  console.log("date?.startDate", moment(date?.startDate).toString());

  return (
    <div className="">
      <h5 className="text-base font-abhaya font-semibold text-[#000] pb-3">
        Assign Action Item
      </h5>
      <p className="text-[15px] text-[#606060] font-abhaya font-bold pb-2.5">
        Get a team member roll their sleeves up for your initiative!{" "}
      </p>
      <div className="pb-2.5">
        <Label className="text-base font-abhaya font-semibold text-[#000]">
          Select Team member
        </Label>
      </div>

      <SelectMenu
        option={empOption || []}
        setValue={(data: string) => setSelectAsignModel(data)}
        value={selectAsignModel}
        placeholder="Select Team Member"
        className="w-[363px] h-[52px] text-[16px] text-[#A3A3A3]b font-abhaya xl:mb-7 mb-6"
      />
      <DatePicker
        placeHolder="Enter Date"
        labelText="Start Date"
        date={date.startDate}
        fromDate={new Date()}
        setDate={(e) => {
          setDate((prev) => ({ ...prev, startDate: e }));
          console.log("Data+++++++++++++", e);
        }}
        buttonClassName="text-base font-abhaya font-medium w-[363px] h-[52px] xl:mb-7 mb-6"
        labelClassName="text-base font-abhaya font-semibold text-[#000] pb-1"
      />
      <DatePicker
        placeHolder="Enter Date"
        labelText="End Date"
        date={date.endDate}
        fromDate={moment(date?.startDate).add(1, "days").toDate() || new Date()}
        setDate={(e) => setDate((prev) => ({ ...prev, endDate: e }))}
        buttonClassName="text-base font-abhaya font-medium w-[363px] h-[52px]"
        labelClassName="text-base font-abhaya font-semibold text-[#000] pb-1"
      />
      {error && <div className="text-red-500 text-sm pb-3">{error}</div>}
      <div className="flex justify-end pt-[30px]">
        <Button
          disabled={
            selectAsignModel === "" ||
            date.startDate === undefined ||
            date.endDate === undefined
          }
          type="button"
          onClick={handleSubmit}
          className="!disabled:cursor-not-allowed text-base font-nunito xl:w-[137px] w-[130px] xl:h-[52px] h-[48px] bg-[#58BA66]"
        >
          {isPending ? <Loader /> : "Assign"}
        </Button>
      </div>
    </div>
  );
};

export default AssignModel;
