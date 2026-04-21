import { PaginationView, PageSize } from "../index";

export default function TableFooter({
  options,
  rowsPerPage,
  rowCount,
  currentPage,
  onChangePage,
  onChangeRowsPerPage,
}) {
  console.log("rowsPerPage", rowsPerPage);
  return (
    <div className="w-full h-full flex items-center justify-between gap-2">
      <PageSize
        options={options}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />

      <PaginationView
        rowCount={rowCount}
        rowsPerPage={rowsPerPage?.value}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
}
