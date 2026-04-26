import { SelectView } from "../index";

export default function PageSize({
  options,
  rowsPerPage,
  onChangeRowsPerPage,
  ...props
}) {
  const defaultOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    // { label: "100", value: 100 },
  ];

  console.log("rowsPerPage", rowsPerPage);

  const selectedOption =
    options?.find((opt) => opt.value === rowsPerPage) ||
    defaultOptions.find((opt) => opt.value === rowsPerPage);

  return (
    <div className="w-25">
      <SelectView
        options={options || defaultOptions}
        value={selectedOption}
        onChange={(selected) => onChangeRowsPerPage(selected.value)}
        menuPlacement="auto"
        variant="page-limit"
        placeholder={"limit"}
        {...props}
      />
    </div>
  );
}
