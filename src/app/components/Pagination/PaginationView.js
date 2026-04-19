import ButtonView from "../Button/ButtonView";
import PageSize from "../PageSize/PageSize";

export default function PaginationView({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) {
  console.log("currentPage", currentPage);
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  if (totalPages <= 1) return null;

  const maxVisible = 3;
  const pages = [];

  for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
    pages.push(i);
  }

  return (
    <div className="w-full  flex justify-end items-center gap-2">
      {/* Previous */}
      {currentPage > 1 && (
        <ButtonView
          title="Previous"
          size="sm"
          onClick={() => onChangePage(currentPage - 1)}
        />
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <ButtonView
          key={page}
          title={page}
          size="bx"
          variant={page === currentPage ? "primary" : "secondary"}
          onClick={() => onChangePage(page)}
        />
      ))}

      {/* Dots */}
      {totalPages > maxVisible && <span>...</span>}

      {/* Last Page */}
      {totalPages > maxVisible && (
        <ButtonView
          title={totalPages}
          size="bx"
          onClick={() => onChangePage(totalPages)}
        />
      )}

      {/* Next */}
      {currentPage < totalPages && (
        <ButtonView
          title="Next"
          size="sm"
          onClick={() => onChangePage(currentPage + 1)}
        />
      )}
    </div>
  );
}
