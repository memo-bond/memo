import { Cell } from "../../models/cell";
import { FC, useRef } from "react";
import { TextEditor } from "./text-editor";
import useStyles from "./cell-list-item-style";
import React from "react";
import { Button } from "@mui/material";

export interface CellListItemProps {
  cell: Cell;
}
export const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  const style = useStyles();
  console.log("cell.content ", cell.content);
  const iframe = useRef<any>();
  let child: JSX.Element;

  const updateCell = (id, content) => {
    cell.id = id;
    cell.content = content;
  };

  if (cell.type == "code") {
    child = (
      <div>
        {/* <CodeEditor
          initialValue={cell.content!}
          onChange={(value) => updateCell(cell.id, value)}
        /> */}
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
