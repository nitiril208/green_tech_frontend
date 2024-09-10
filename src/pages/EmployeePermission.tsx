import Loading from "@/components/comman/Error/Loading";
import Loader from "@/components/comman/Loader";
import { NewDataTable } from "@/components/comman/NewDataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  employeeList,
  updateEmployeeList,
} from "@/services/apiServices/employee";
import { EmployeeResponse, EmployeeResult } from "@/types/employeeDetails";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent, useState } from "react";
import searchIcon from "/assets/icons/search.svg";

function EmployeePermission() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const { data, isPending: employeeListPending } = useQuery<EmployeeResult>({
    queryKey: [
      QUERY_KEYS.getEmployeeList,
      {
        page,
        search,
        id: !!userData?.query?.companyDetails
          ? userData?.query?.companyDetails?.id
          : userData?.query?.detailsid,
      },
    ],
    queryFn: () =>
      employeeList(
        page.toString(),
        "10",
        !!userData?.query?.companyDetails
          ? userData?.query?.companyDetails?.id
          : userData?.query?.detailsid,
        search
      ),
  });

  const { mutate: update_employee, isPending: updatePending } = useMutation({
    mutationFn: updateEmployeeList,
    onSuccess: () => {
      toast({ title: "Permission Updated Successfully" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getEmployeeList],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleChange = (
    updateData: EmployeeResponse,
    name: "editActionItem" | "retakeSelfAssessment" | "shareFeedback",
    value: boolean
  ): void => {
    const payload: Partial<EmployeeResponse> = {};
    updateData[name] = value;
    if (updateData.editActionItem !== undefined) {
      payload.editActionItem = updateData.editActionItem;
    }
    if (updateData.retakeSelfAssessment !== undefined) {
      payload.retakeSelfAssessment = updateData.retakeSelfAssessment;
    }
    if (updateData.shareFeedback !== undefined) {
      payload.shareFeedback = updateData.shareFeedback;
    }
    const bodyData = {
      id: +updateData.id,
      item: payload,
    };
    update_employee(bodyData);
  };

  const column: ColumnDef<EmployeeResponse>[] = [
    {
      accessorKey: "id",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-inter text-black">
            #{row.original?.id}
          </h6>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Team Member
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="overflow-hidden">
              <Avatar className="w-8 h-8 rounded-full ">
                <AvatarImage src={row.original?.profileImage} />
                <AvatarFallback className="uppercase">
                  {row.original?.name?.charAt(0) ||
                    row.original?.email?.split("@")[0].charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h6 className="xl:text-[15px] text-xs font-inter text-black">
              {row.original?.name || row?.original?.email?.split("@")[0]}
            </h6>
          </div>
        );
      },
    },
    {
      accessorKey: "editAction",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Edit Action Item
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <Switch
            className="data-[state=checked]:bg-[#00778B]"
            onCheckedChange={(value) =>
              handleChange(row.original, "editActionItem", value)
            }
            checked={row.original.editActionItem}
          />
        );
      },
      meta: {
        className: "text-center",
      },
    },
    {
      accessorKey: "selfAssessment",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Retake Self-assessment
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <Switch
            className="data-[state=checked]:bg-[#00778B]"
            onCheckedChange={(value) =>
              handleChange(row.original, "retakeSelfAssessment", value)
            }
            checked={row.original.retakeSelfAssessment}
          />
        );
      },
      meta: {
        className: "text-center",
      },
    },
    {
      accessorKey: "feedback",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Share Feedback
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <Switch
            className="data-[state=checked]:bg-[#00778B]"
            onCheckedChange={(value) =>
              handleChange(row.original, "shareFeedback", value)
            }
            checked={row.original.shareFeedback}
          />
        );
      },
      meta: {
        className: "text-center",
      },
    },
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-xl sm:mt-5 mt-0">
      <div className="rounded-[10px]">
        <div className="p-5 border-b border-[#D9D9D9]">
          <p className="text-[#000000] font-calibri font-bold">Settings</p>
        </div>

        <div className="flex bg-[#FFFFFF] ">
          <div className="m-4 relative">
            <Input
              placeholder="Search by Name, Email etc."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="pl-[45px] border sm:w-[550px] w-[290px] rounded-[6px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground sm:h-[52px] h-[44px] placeholder:font-normal"
            />
            <img
              src={searchIcon}
              alt="searchIcon"
              className="absolute left-[18px] top-[18px]"
            />
          </div>
        </div>

        <div>
          {employeeListPending ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <NewDataTable
                columns={column}
                data={data?.data || []}
                totalPages={data?.metadata?.totalPages || 1}
                setPage={setPage}
                border={false}
                inputbox={false}
                pagination={{ pageIndex: page, pageSize: 10 }}
              />
            </div>
          )}
        </div>
      </div>
      <Loading isLoading={updatePending} />
    </div>
  );
}

export default EmployeePermission;
