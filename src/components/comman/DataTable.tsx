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
import { useState } from "react";
import search from "../../assets/images/search.svg";
import Input from "./Input/Input";
import Paginations from "./Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  inputbox?: boolean;
  pagenationbox?: boolean;
  pagination?: PaginationState;
  totalPages?: number;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  searchPlaceholder?: string;
  searchFilter?: (e: string) => void;
  rounded?: boolean;
  headerBackground?: boolean;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  inputbox,
  pagenationbox,
  pagination = { pageIndex: 1, pageSize: 10 },
  setPagination = () => {},
  totalPages = 0,
  setPage,
  searchFilter,
  rounded = true,
  headerBackground = true,
  searchPlaceholder = "Search by company name, country, sector, etc.",
}: DataTableProps<TData, TValue>) {
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
    <div className="w-full">
      {!inputbox ? null : (
        <div className="flex items-center py-4 relative">
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => handleSearchFilter(e.target.value)}
            className="py-[17px] pl-[39px] border w-[550px] rounded-[6px] ml-[23px] placeholder:text-[15px] placeholder:text-[#A3A3A3] bg-primary-foreground h-[52px] placeholder:font-normal"
          />
          <img src={search} alt="" className="absolute left-10" />
        </div>
      )}
      <div
        className={`border ${
          rounded ? "rounded-md" : "rounded-none border-none"
        }`}
      >
        <Table>
          <TableHeader
            className={`font-semibold text-[15px] ${
              headerBackground ? "bg-[#F1F1F1]" : "bg-transparent"
            }`}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-auto py-[10px] text-sm text-foreground text-[15px] font-medium font-inter",
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className=""
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "h-auto py-[10px] text-sm text-foreground font-[400] text-[15px] font-inter",
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        cell?.column?.columnDef?.meta?.className
                      )}
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
      {pagenationbox && totalPages > 0 ? (
        <div className="flex items-center justify-end space-x-2 py-4">
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
      ) : null}
    </div>
  );
}
