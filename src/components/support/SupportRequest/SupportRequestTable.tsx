import delet from "@/assets/images/delet.svg";
import { ConfirmModal } from "@/components/comman/ConfirmModal";
import { NewDataTable } from "@/components/comman/NewDataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { deleteSupportTicket } from "@/services/apiServices/supportRequestServices";
import { ErrorType } from "@/types/Errors";
import { DataEntity, SupportTicketListType } from "@/types/SupportRequest";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "/assets/icons/search.svg";

interface SupportRequestTableProps {
  data?: SupportTicketListType;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  page: number;
}

const SupportRequestTable = ({
  data,
  page,
  setPage,
  search,
  setSearch,
  isLoading,
}: SupportRequestTableProps) => {
  const { toast } = useToast();
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [openDelete, setOpenDelete] = useState<DataEntity | null>(null);

  const column: ColumnDef<DataEntity>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
    },
    {
      accessorKey: "updatedat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return moment(row?.original?.updatedAt || "").format("DD-MM-YYYY");
      },
      meta: {
        className: "sm:table-cell hidden",
      },
    },
    {
      accessorKey: "openbyname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Requestor
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <Link
            to={`ticket-details/${row.original.id}`}
            onClick={() =>
              dispatch(
                setPath([
                  {
                    label: "support",
                    link: null,
                  },
                  {
                    label: "Support Request",
                    link: `/${Role}/support-request`,
                  },
                  { label: "Ticket Detail", link: null },
                ])
              )
            }
            className="text-[#00778B] cursor-pointer"
          >
            {row?.original?.openBy?.name ||
              row?.original?.openBy?.email?.split("@")[0]}
          </Link>
        );
      },
      meta: {
        className: "sm:table-cell hidden",
      },
    },
    {
      accessorKey: "subject",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Subject
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="line-clamp-1 max-w-[400px]">{row?.original?.subject}</p>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p
            className={`${
              row.original.status === "Answered"
                ? "text-[#58BA66]"
                : row.original.status === "InProcess"
                ? "text-[#58BA66]"
                : "text-[#FFD56A]"
            } w-20 h-8 font-bold px-3 flex items-center justify-center`}
          >
            {row.original.status}
          </p>
        );
      },
    },
    {
      accessorKey: "assigntoname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Assign to
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.original?.assignTo?.name ?? "-"}</div>;
      },
      meta: {
        className: "sm:table-cell hidden",
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <div className="flex flex-col">
              <TriangleUpIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,0,15,5"
              />
              <TriangleDownIcon
                className="ml-1 h-[14px] w-[14px] text-[#A3A3A3]"
                viewBox="0,5,15,15"
              />
            </div>
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <Badge
            className={`${
              row.original.priority === "High"
                ? "bg-[#FF5252] hover:bg-[#FF5252]/80"
                : row.original.priority === "Medium"
                ? "bg-[#58BA66] hover:bg-[#58BA66]/80"
                : "bg-[#FFD56A] hover:bg-[#FFD56A]/80"
            } rounded-[6px] w-20 h-8 px-3 flex items-center justify-center`}
          >
            {row.original.priority}
          </Badge>
        );
      },
      meta: {
        className: "sm:table-cell hidden",
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-[12px] ">
            <Button
              onClick={() => {
                setOpenDelete(row?.original);
              }}
              variant={"ghost"}
              className="p-0"
            >
              <img src={delet} alt="" />
            </Button>
          </div>
        );
      },
      meta: {
        className: "sm:table-cell hidden",
      },
    },
  ];

  const { mutate: delete_supportticket, isPending: deletePanding } =
    useMutation({
      mutationFn: (id: string) => deleteSupportTicket(id),
      onSuccess: () => {
        toast({ title: "Ticket delete Successfully" });
        setOpenDelete(null);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.supportTicketList],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.supportTicketCount],
        });
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    });

  const handleDelete = () => {
    delete_supportticket(String(openDelete?.id));
  };

  return (
    <div className="">
      <div className="flex items-center pb-5 relative">
        <Input
          placeholder={"Search by Requestor, Subject, Assign to etc."}
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="py-[17px] pl-[39px] border sm:w-[550px] w-full rounded-[6px] sm:mx-[23px] mx-[15px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground h-[52px] placeholder:font-normal"
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          className="absolute sm:left-10 left-7"
        />
      </div>
      {isLoading ? (
        <span className="flex justify-center items-center py-10">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      ) : (
        <NewDataTable
          columns={column}
          data={data?.data?.data || []}
          totalPages={data?.data?.metadata?.totalPages || 1}
          setPage={setPage}
          inputbox={false}
          border={false}
          pagination={{ pageIndex: page, pageSize: 10 }}
          searchPlaceholder="Search by Requestor, Subject, Assign to etc."
          searchFilter={(e) => setSearch(e)}
        />
      )}

      <ConfirmModal
        open={!!openDelete}
        onClose={() => setOpenDelete(null)}
        onDelete={handleDelete}
        value={openDelete?.openBy?.name || ""}
        isLoading={deletePanding}
      />
    </div>
  );
};

export default SupportRequestTable;
