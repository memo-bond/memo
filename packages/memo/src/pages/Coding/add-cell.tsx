import { Button } from "@mui/material";
import { Cell } from "models/cell";
import { FC, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Cells } from ".";

interface AddCellProps {
  forceVisible?: boolean;
  previousCellId: string | null;
}

export const AddCell: FC<AddCellProps> = ({ previousCellId }) => {
  const [textCell, setTextCell] = useState();
  const setCells = useSetRecoilState(Cells);
  const insertCellAfter = (previousCellId, type) => {
    if (type === "text") {
      setCells((oldCells: Cell[]) => {
        let id;
        if (oldCells === undefined || oldCells.length === 0) {
          id = 1;
        } else {
          id = oldCells[oldCells.length - 1].id + 1;
        }
        const newCells = [
          ...oldCells,
          {
            id: id,
            type: "text",
            content: "",
          },
        ];
        return newCells;
      });
    }
  };
  return (
    <>
      <div>
        <Button onClick={() => insertCellAfter(previousCellId, "code")}>
          Code
        </Button>
        <Button onClick={() => insertCellAfter(previousCellId, "text")}>
          Text
        </Button>
      </div>
      <div id={previousCellId == null ? "cell-001" : previousCellId}></div>
    </>
  );
};
