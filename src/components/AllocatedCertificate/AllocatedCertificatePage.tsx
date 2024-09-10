import { PermissionContext } from "@/context/PermissionContext";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  deleteAllocateCertificate,
  IssuedCertificateList,
} from "@/services/apiServices/certificate";
import { certificateDataEntity, IssuedCertificate } from "@/types/certificate";
import { UserRole } from "@/types/UserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, FileSliders, Search, Trash2 } from "lucide-react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../comman/Error/Loading";
import Loader from "../comman/Loader";
import { NewDataTable } from "../comman/NewDataTable";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

const AllocatedCertificatePage = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { permissions } = useContext(PermissionContext);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<certificateDataEntity[]>([]);
  const [page, setPage] = useState(1);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();

  const { data: Issued_Certificate, isPending } = useQuery<IssuedCertificate>({
    queryKey: [QUERY_KEYS.issuedCertificate, { page, search }],
    queryFn: () =>
      IssuedCertificateList({ id: userData?.query?.id, page, search }),
  });

  const { mutate: deleteCertificate, isPending: deletePending } = useMutation({
    mutationFn: deleteAllocateCertificate,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Allocate Certificate User deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.issuedCertificate],
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
      });
    },
  });

  const column: ColumnDef<certificateDataEntity>[] = [
    {
      accessorKey: "id",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            ID
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black">
            #{row.original?.id}
          </h6>
        );
      },
    },
    {
      accessorKey: "employeeName",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Employee Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center font-bold px-3">
            <Avatar>
              <AvatarImage
                src={row?.original?.employee?.profileImage || undefined}
                alt="Img"
              />
              <AvatarFallback>
                {row?.original?.employee?.name
                  ? row?.original?.employee?.name?.charAt(0)
                  : row?.original?.employee?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <p className={`font-bold px-3`}>
              {row?.original?.employee?.name ||
                row?.original?.employee?.email?.split("@")[0]}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "courseName",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Course Name
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black line-clamp-2 2xl:leading-6 leading-4 2xl:w-[70%] w-full">
            {row?.original?.course?.title}
          </h6>
        );
      },
    },
    {
      accessorKey: "certificateTitle",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Certificate Title
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black line-clamp-2">
            {row.original?.course?.certificate as any}
          </h6>
        );
      },
    },
    {
      accessorKey: "date",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Date
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <h6 className="2xl:text-[15px] text-xs font-inter text-black line-clamp-2">
            {moment(new Date(row?.original?.employee?.createdAt || "")).format(
              "DD/MM/YYYY"
            )}
          </h6>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Status
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="">
            {row?.original?.certificatePdf &&
            row?.original?.employee?.createdAt ? (
              <Button className="bg-[#58BA66] px-4 2xl:h-8 h-7 2xl:text-sm text-xs">
                Issued
              </Button>
            ) : (
              <Button className="bg-[#FFA25E] px-4 2xl:h-8 h-7 2xl:text-sm text-xs ">
                Pending
              </Button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => {
        return (
          <h5 className="font-medium 2xl:text-base text-xs text-black font-inter">
            Action
          </h5>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => deleteCertificate(row?.original?.id)}
            >
              <Trash2 className="cursor-pointer text-[#A3A3A3]" width={18} />
            </Button>
            {row?.original?.certificatePdf && row?.original?.createdAt ? (
              <a href={row?.original?.certificatePdf} target="_blank">
                <Eye
                  className="mx-2 cursor-pointer text-[#A3A3A3]"
                  width={18}
                />
              </a>
            ) : (
              <Button
                variant={"ghost"}
                onClick={() => {
                  dispatch(
                    setPath([
                      {
                        label: `Certificate Management`,
                        link: null,
                      },
                      {
                        label: `Issued Certificate`,
                        link: `/${UserRole[
                          userData?.query?.role
                        ]?.toLowerCase()}/allocated-certificate`,
                      },
                      {
                        label: `Allocate Certificate`,
                        link: `/${UserRole[
                          userData?.query?.role
                        ]?.toLowerCase()}/allocated-certificate-employee?courseId=${
                          row?.original?.course?.id
                        }&traineeId=${row?.original?.employee?.id}&courseName=${
                          row?.original?.course?.title
                        }`,
                      },
                    ])
                  );
                  navigate(
                    `/${UserRole[
                      userData?.query?.role
                    ]?.toLowerCase()}/allocated-certificate-employee?courseId=${
                      row?.original?.course?.id
                    }&traineeId=${row?.original?.employee?.id}&courseName=${
                      row?.original?.course?.title
                    }`
                  );
                }}
              >
                <FileSliders
                  className="cursor-pointer text-[#A3A3A3]"
                  width={18}
                />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (Issued_Certificate?.data && Array.isArray(Issued_Certificate.data)) {
      const filteredData = Issued_Certificate.data.filter(
        (item: certificateDataEntity) => {
          return (
            item.employee?.name
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            item.employee?.email
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            item.course?.title?.toLowerCase()?.includes(search?.toLowerCase())
          );
        }
      );
      setFilteredData(filteredData);
    }
  }, [search, Issued_Certificate?.data]);

  return (
    <div className="bg-white rounded-lg">
      <div className="sm:flex block justify-between items-center border-b border-[#D9D9D9] p-4">
        <div className="">
          <h6 className="text-[16px] font-semibold font-calibri pb-1">
            Issued Certificate
          </h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px]">
            All the certificates you’ve awarded to trainees so far
          </p>
        </div>
        <div className="">
          <Button
            disabled={
              userData?.query?.role === "3" && !permissions?.certificate
            }
            className="uppercase px-5 py-2 bg-[#00778B] xl:text-base text-sm text-white font-nunito sm:mt-0 mt-3"
            onClick={() => {
              navigate(
                `/${UserRole[
                  userData?.query?.role
                ]?.toLowerCase()}/allocated-certificate-employee`
              );
              dispatch(
                setPath([
                  {
                    label: `Certificate Management`,
                    link: null,
                  },
                  {
                    label: `Issued Certificate`,
                    link: `/${UserRole[
                      userData?.query?.role
                    ]?.toLowerCase()}/allocated-certificate`,
                  },
                  {
                    label: `Allocate Certificate`,
                    link: `/${UserRole[
                      userData?.query?.role
                    ]?.toLowerCase()}/allocated-certificate-employee`,
                  },
                ])
              );
            }}
          >
            Issued Certificate
          </Button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center 2xl:w-[550px] sm:w-[450px] w-[290px] sm:h-[52px] h-[46px] rounded-lg relative">
          <Search className="text-[#A3A3A3] absolute left-4" width={18} />
          <Input
            value={search}
            className=" text-[15px] font-inter pr-4 pl-12 h-full"
            placeholder="Search by name, course name, certificate name, etc."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {isPending ? (
        <span className="flex justify-center items-center py-10">
          <Loader className="w-5 h-5 animate-spin" />
        </span>
      ) : (
        <>
          <div className="">
            <NewDataTable
              columns={column}
              data={filteredData || []}
              setPage={setPage}
              inputbox={false}
              pagination={{ pageIndex: page, pageSize: 10 }}
              itemClassName="flex sm:flex-row flex-col sm:space-y-0 space-y-4"
            />
          </div>
        </>
      )}
      <Loading isLoading={deletePending} />
    </div>
  );
};

export default AllocatedCertificatePage;
