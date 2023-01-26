import { Button, TextField } from "@mui/material";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { AuthUser } from "layout/Header";
import { Memo, MemoContent } from "models/memo";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { contentsRef, db, memosRef } from "repository";
import { Cells } from ".";
import { Cell } from "../../models/cell";
import { AddCell } from "./add-cell";
import { CellListItem } from "./cell-list-item";
import * as memoService from "../../services/memo";

export interface CellListProps {
  cells: Cell[];
  title?: string;
  isEdit?: boolean;
  contentId?: string;
  memoId?: string;
}

export const CellList: FC<CellListProps> = ({
  cells,
  title,
  isEdit,
  contentId,
  memoId,
}) => {
  const savingCells = useRecoilValue(Cells);
  const loggedUser = useRecoilValue(AuthUser);
  const [bookTitle, setBookTitle] = useState("");
  const resetCells = useResetRecoilState(Cells);
  const navigate = useHistory();

  useEffect(() => {
    if (title) {
      console.log("title ", title);

      setBookTitle(title);
    }
  }, [title]);
  const save = async () => {
    if (isEdit) {
      memoService.update(memoId!, contentId!, bookTitle, savingCells);
    } else {
      memoService.create(loggedUser.username!, bookTitle, savingCells);
    }
    resetCells();
    setBookTitle("");
    navigate.push("/");
  };

  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
      </Fragment>
    );
  });
  return (
    <>
      <TextField
        value={bookTitle}
        name="Title"
        style={{ width: "500px" }}
        onChange={(e) => setBookTitle(e.target.value)}
      >
        Title
      </TextField>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
      <Button onClick={save}>Save</Button>
    </>
  );
};
