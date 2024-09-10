import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import Paginations from "./Pagination";
import search from "/assets/icons/search.svg";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  inputbox?: boolean;
  pagenationbox?: boolean;
  pagination?: PaginationState;
  totalPages?: number;
  border?: boolean;
  itemClassName?: string;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchPlaceholder?: string;
  searchFilter?: (e: string) => void;
  isLoading?: boolean;
}

export function NewDataTable<TData, TValue>({
  data,
  columns,
  inputbox = true,
  border = true,
  itemClassName,
  pagenationbox = true,
  pagination = { pageIndex: 1, pageSize: 10 },
  setPagination = () => {},
  totalPages = 0,
  setPage,
  searchFilter,
  isLoading,
  searchPlaceholder = "Search by company name, country, sector, etc.",
}: DataTableProps<TData, TValue>) {
  console.log("pagination", pagenationbox);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // const pageCount = Math.ceil(totalCount / (pagination?.pageSize || 1));

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // pageCount,
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const handleSearchFilter = (e: string) => {
    setGlobalFilter(e);
    searchFilter && searchFilter(e);
  };

  return (
    <div
      className={`w-full`}
    >
      {!!inputbox && (
        <div className="flex items-center py-4 relative">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => handleSearchFilter(e.target.value)}
            className="py-[17px] pl-[39px] border lg:w-[550px] w-auto rounded-[6px] ml-[23px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground h-[52px] placeholder:font-normal"
          />
          <img src={search} alt="" className="absolute left-10" />
        </div>
      )}
      <div
        className={`rounded-md ${border ? "rounded-md border" : "border-none"}`}
      >
        <Table>
          <TableHeader className="bg-[#F1F1F1] text-[15px] font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-black font-medium",
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        header?.column?.columnDef?.meta?.className
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <span className="flex items-center justify-center py-10">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </span>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className=""
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        cell?.column?.columnDef?.meta?.className
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages <= 1 ? null : (
        <div
          className={cn(
            `flex items-center justify-end space-x-2 py-4`,
            itemClassName
          )}
        >
          <div className="flex-1 text-sm text-black px-4">
            Showing {pagination.pageIndex}/{totalPages} Records
          </div>
          <div className="pr-[24px]">
            <Paginations
              currentPage={pagination?.pageIndex}
              totalPages={totalPages || 1}
              itemsPerPage={10}
              setCurrentPage={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
