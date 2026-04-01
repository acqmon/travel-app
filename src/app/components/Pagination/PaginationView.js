import ButtonView from "../Button/ButtonView";

export default function PaginationView() {
  return (
    <nav aria-label="Page navigation" className="w-full flex justify-end">
      <ul className="pagination flex justify-end items-center gap-2">
        <li className="page-item">
          <ButtonView title="Previous" size="sm" />
        </li>
        <li className="page-item">
          <ButtonView title="1" size="bx" />
        </li>
        <li className="page-item">
          <ButtonView title="2" size="bx" />
        </li>
        <li className="page-item">
          <ButtonView title="3" size="bx" />
        </li>
        <li className="page-item">
          <ButtonView title="Next" size="sm" />
        </li>
      </ul>
    </nav>
  );
}
