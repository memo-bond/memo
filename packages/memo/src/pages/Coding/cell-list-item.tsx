import { Button } from "@mui/material";
import { Cell } from "models/cell";
import { FC, useRef } from "react";
import CodeEditor from "./code-editor";
import { TextEditor } from "./text-editor";

export interface CellListItemProps {
  cell: Cell;
}
export const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  console.log("cell.content ", cell.content);
  const iframe = useRef<any>();
  let child: JSX.Element;

  const updateCell = (id, content) => {
    console.log("cell1111 ", cell);
    cell.id = id;
    cell.content = content;
  };

  if (cell.type == "code") {
    child = (
      <div>
        <CodeEditor
          initialValue={cell.content!}
          onChange={(value) => updateCell(cell.id, value)}
        />
      </div>
    );
  } else {
    child = (
      <div style={{ padding: "30px" }}>
        <TextEditor cell={cell} />
      </div>
    );
  }
  return (
    <>
      <div>{child}</div>
    </>
  );
};
