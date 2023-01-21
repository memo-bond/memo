import "./cell-list.css";
import { Fragment, useEffect } from "react";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
  const cells = [
    {
      id: "1",
      type: "code" as const,
      content: "print('Hello the world')",
    },
    {
      id: "2",
      type: "text" as const,
      content: "hello the world",
    },
  ];

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
