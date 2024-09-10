import {
  getTrainer,
  updateTrainerStatusById,
} from "@/services/apiServices/trainer";
import { DataEntity, TrainersResponse } from "@/types/Trainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import Loading from "./comman/Error/Loading";
import Loader from "./comman/Loader";
import { NewDataTable } from "./comman/NewDataTable";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { toast } from "./ui/use-toast";
import searchIcon from "/assets/icons/search.svg";

const TrainerSetting = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const id = userData?.query?.detailsid;
  const queryclient = useQueryClient();

  const { data, isPending } = useQuery<TrainersResponse>({
    queryKey: ["trainer", { page, search, id }],

    queryFn: () =>
      getTrainer({ page, limit: 10, keyword: search, id, status: "Active" }),
  });

  const { mutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateTrainerStatusById,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["trainerDetails"],
      });
      toast({
        variant: "success",
        description: "Permission updated successfully",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const handleChange = (
    updateData: DataEntity,
    name: "approved" | "editCourses" | "assignCertificate",
    value: boolean
  ): void => {
    const payload: {
      approved?: string;
      editCourses?: string;
      assignCertificate?: string;
    } = {};
    updateData[name] = value;
    if (updateData.approved !== undefined) {
      payload.approved = updateData.approved.toString();
    }
    if (updateData.editCourses !== undefined) {
      payload.editCourses = updateData.editCourses.toString();
    }
    if (updateData.assignCertificate !== undefined) {
      payload.assignCertificate = updateData.assignCertificate.toString();
    }
    const data = {
      approved: payload.approved as string,
      editCourses: payload.editCourses as string,
      assignCertificate: payload.assignCertificate as string,
    };

    mutate({ id: updateData?.id.toString() || "", data });
  };

  const column: ColumnDef<DataEntity>[] = [
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
                <AvatarImage src={row.original?.profileImage || ""} />
                <AvatarFallback className="uppercase">
                  {row.original?.name?.charAt(0) ||
                    row.original?.email?.split("@")[0].charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h6 className="xl:text-[15px] text-xs font-inter text-black">
              {row.original?.name || row.original?.email?.split("@")[0]}
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
            Create Course
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <Switch
            className="data-[state=checked]:bg-[#00778B]"
            onCheckedChange={(value) =>
              handleChange(row.original, "approved", value)
            }
            checked={row.original.approved}
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
            Edit Course
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <Switch
            className="data-[state=checked]:bg-[#00778B]"
            onCheckedChange={(value) =>
              handleChange(row.original, "editCourses", value)
            }
            checked={row.original.editCourses}
          />
        );
      },
      meta: {
        className: "text-center",
      },
    },
    {
      accessorKey: "assignCertificate",
      header: () => {
        return (
          <h5 className="font-medium xl:text-sm text-xs text-black font-inter">
            Assign Certificate
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <Switch
            className="data-[state=checked]:bg-[#00778B]"
            onCheckedChange={(value) =>
              handleChange(row.original, "assignCertificate", value)
            }
            checked={row.original.assignCertificate}
          />
        );
      },
      meta: {
        className: "text-center",
      },
    },
  ];
  return (
    <div className="bg-white rounded-b-xl">
      <h3 className="px-[19px] py-[22px] text-[16px] font-semibold font-calibri border-b">
        Settings
      </h3>
      <div className="px-[19px] py-[22px]">
        <div className="flex bg-[#FFFFFF] ">
          <div className="mb-4 relative">
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
        <div className="w-full">
          {isPending ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto w-full">
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
      <Loading isLoading={isPendingUpdate} />
    </div>
  );
};

export default TrainerSetting;
