import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: String(page),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2">
      {isPrevDisabled ? (
        <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-400">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      )}

      {visiblePages.map((page, key) => {
        if (page === "...") {
          return (
            <span
              key={key}
              className="px-2 py-2 text-sm font-medium text-slate-400">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrentPage = pageNumber === currentPage;

        return isCurrentPage ? (
          <span
            key={key}
            className="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
            {pageNumber}
          </span>
        ) : (
          <Link
            key={key}
            href={getPageUrl(pageNumber)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            {pageNumber}
          </Link>
        );
      })}

      {isNextDisabled ? (
        <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-400">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
