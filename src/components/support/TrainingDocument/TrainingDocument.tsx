import Loader from "@/components/comman/Loader";
import { NewDataTable } from "@/components/comman/NewDataTable";
import { Input } from "@/components/ui/input";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchDocument } from "@/services/apiServices/Document";
import {
  TrainingDocumentResponse,
  TrainingDocumentResult,
} from "@/types/TrainingDoc";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";

const TrainingDocument = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userRole = userData ? userData?.query?.role : null;
  const Role =
    UserRole.Trainer === +userRole
      ? 1
      : UserRole?.Trainee === +userRole
      ? 2
      : UserRole?.Company === +userRole
      ? 3
      : 4;
  const { data: document, isLoading } = useQuery<TrainingDocumentResponse>({
    queryKey: [QUERY_KEYS.fetchDocument, { page, search, Role }],
    queryFn: () =>
      fetchDocument({
        page,
        role: Role,
        keyword: search,
      }),
  });

  const column: ColumnDef<TrainingDocumentResult>[] = [
    {
      accessorKey: "id",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-black">
            #{row.index + 1}
          </h6>
        );
      },
      meta: {
        className: "xl:w-[150px] w-[75px] py-[15px]",
      },
    },
    {
      accessorKey: "documentTitle",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Document Title
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <a
              href={row.original?.documentUrl}
              className="xl:text-[15px] text-xs font-calibri text-[#00778B]"
              target="_blank"
            >
              {row.original?.title}
            </a>
          </div>
        );
      },
      meta: {
        className: "xl:w-[500px] w-[300px] py-[15px]",
      },
    },
    {
      accessorKey: "type",
      header: () => {
        return (
          <h5 className="font-medium xl:text-[15px] text-xs text-black font-calibri">
            Type
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="xl:text-[15px] text-xs font-calibri text-black line-clamp-2 xl:leading-6 leading-4 xl:w-[70%] w-full">
            {row.original?.type}
          </h6>
        );
      },
      meta: {
        className: "py-[15px]",
      },
    },
  ];
  return (
    <div className="bg-white rounded-xl">
      <div className="border-b border-[#D9D9D9] p-4">
        <h6 className="text-[16px] text-[#000000] font-calibri font-semibold pb-2">
          Training Document
        </h6>
        <p className="text-[#606060] text-[15px] font-abhaya sm:leading-[16px] leading-5">
          Here’s the full list of training documents related to all your courses
        </p>
      </div>
      <div className="p-5">
        <div className="flex items-center xl:w-[550px] md:w-[450px] sm:w-[350px] w-[290px] sm:h-[52px] h-[46px] rounded-lg relative">
          <Search className="text-[#A3A3A3] absolute left-4" width={18} />
          <Input
            className=" xl:text-[15px] text-sm font-inter pr-4 pl-12 py-2 w-full h-full"
            placeholder="Search by name and type"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>
      <div className="">
        {isLoading ? (
          <Loader />
        ) : (
          <NewDataTable
            columns={column}
            data={document?.data || []}
            totalPages={document?.metadata?.totalPages}
            setPage={setPage}
            inputbox={false}
          />
        )}
      </div>
    </div>
  );
};

export default TrainingDocument;
