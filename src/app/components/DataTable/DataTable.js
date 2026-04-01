import DataTable from "react-data-table-component";
import { PaginationView } from "../index";

export default function DataTableComponent({
  columns,
  data,
  pagination,
  highlightOnHover,
  ...props
}) {
  const customStyles = {
    tableWrapper: {
      style: {
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
    pagination: {
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end", // or flex-end
      },
    },
  };

  const paginationComponent = () => {
    return <PaginationView />;
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination={pagination}
      paginationComponent={paginationComponent}
      highlightOnHover={highlightOnHover}
      {...props}
    />
  );
}
