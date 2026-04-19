import DataTable from "react-data-table-component";
import { PaginationView, TableFooter } from "../index";

export default function DataTableComponent({
  columns,
  data,
  highlightOnHover,
  paginationTotalRows,
  paginationPerPage,
  paginationDefaultPage,
  onChangePage,
  onChangeRowsPerPage,
  ...props
}) {
  console.log("paginationTotalRows", paginationTotalRows);
  const customStyles = {
    tableWrapper: {
      style: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
      },
    },
    headRow: {
      style: {
        fontSize: "14px",
        borderBottom: "1px solid #e2e8f0",
      },
    },
    headCells: {
      style: {},
    },
    rows: {
      style: {
        "&:not(:last-child)": {
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },
    cells: {},

    // pagination: {
    //   style: {
    //     width: "100%",
    //     display: "flex",
    //     justifyContent: "flex-end", // or flex-end
    //   },
    // },
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      highlightOnHover={highlightOnHover}
      pagination
      paginationServer
      paginationTotalRows={paginationTotalRows}
      paginationPerPage={paginationPerPage}
      paginationDefaultPage={paginationDefaultPage}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      paginationComponent={TableFooter}
      {...props}
    />
  );
}
