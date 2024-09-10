import usePagination from "@/hooks/use-pagination";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

interface PaginationsProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  useUrlParams?: boolean;
  setCurrentPage?: (page: number) => void;
}
const Paginations = ({
  className,
  currentPage,
  totalPages,
  useUrlParams,
  setCurrentPage,
}: PaginationsProps) => {
  const searchParams = window.location.search;
  const pathname = window.location.pathname;
  const replace = useNavigate();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const range = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  });

  const handlePrev = () => {
    if (currentPage <= 1) return;
    if (useUrlParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(currentPage - 1));
      replace(`${pathname}?${params.toString()}`);
    }
    setCurrentPage && setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage >= pages.length) return;
    if (useUrlParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(currentPage + 1));
      replace(`${pathname}?${params.toString()}`);
    }
    setCurrentPage && setCurrentPage(currentPage + 1);
  };

  const handleChangePage = (pageNumber: number) => {
    if (useUrlParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(pageNumber));
      replace(`${pathname}?${params.toString()}`, { replace: true });
    }
    setCurrentPage && setCurrentPage(pageNumber);
  };
  return (
    <div className={clsx("space-x-2", className)}>
      <Pagination>
        <PaginationContent className="text-destructive">
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              onClick={handlePrev}
              className="p-0 text-primary hover:bg-lightPrimary hover:text-primary border border-[#D9D9D9] px-[10px] py-[6px] h-[34px]"
            >
              <ChevronLeft width={18} height={18} className="text-[#000000]" />
            </Button>
          </PaginationItem>
          {range.map((page, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => page && handleChangePage(page)}
                  className={`border border-[#D9D9D9] px-[15px] py-[6px] h-[34px] text-[#000000] ${
                    page === currentPage && "bg-[#00778B] text-[#fff]"
                  }`}
                >
                  {page === 0 ? <PaginationEllipsis className="" /> : page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage >= pages.length}
              onClick={handleNext}
              className="p-0 text-primary hover:bg-lightPrimary hover:text-primary border border-[#D9D9D9] px-[10px] py-[6px] h-[34px]"
            >
              <ChevronRight width={18} height={18} className="text-[#000000]" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
