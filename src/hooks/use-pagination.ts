import { range } from "@/lib/utils";
import { useMemo } from "react";

type UsePaginationParams = {
  totalPages: number;
  siblingCount: number;
  currentPage: number;
};

const usePagination = ({
  currentPage,
  siblingCount = 1,
  totalPages,
}: UsePaginationParams) => {
  const paginationRange: number[] = useMemo(() => {
    const totalPageNumbers = siblingCount + 3;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex >= 2;
    const shouldShowRightDots = rightSiblingIndex <= totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, 0, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, 0, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, 0, ...middleRange, 0, lastPageIndex];
    }

    return [];
  }, [totalPages, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
