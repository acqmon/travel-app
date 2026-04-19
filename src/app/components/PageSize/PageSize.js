import { SelectView } from "../index";

export default function PageSize({
  options,
  rowsPerPage,
  onChangeRowsPerPage,
}) {
  const defaultOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  return (
    <div className="w-30">
      <SelectView
        options={options || defaultOptions}
        value={rowsPerPage}
        onChange={onChangeRowsPerPage}
        menuPlacement="auto"
        variant="page-limit"
      />
    </div>
  );
}
