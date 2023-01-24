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
      await updateDoc(doc(db, "contents", contentId!), {
        "memo.title": bookTitle,
        "memo.modifiedAt": Timestamp.now(),
        content: JSON.stringify(savingCells),
      });
      // update memo title
      await updateDoc(doc(db, "memos", memoId!), {
        title: bookTitle,
        modifiedAt: Timestamp.now(),
      });
    } else {
      // create new memo
      const memoRef = doc(memosRef);
      const memoId = memoRef.id;
      const memo: Memo = {
        author: loggedUser.username!,
        title: bookTitle,
        tags: [],
        id: memoId,
        createdAt: Timestamp.now(),
        modifiedAt: Timestamp.now(),
      };
      await setDoc(memoRef, memo);
      // create new content
      const contentRef = doc(contentsRef);
      const content: MemoContent = {
        memo,
        content: JSON.stringify(savingCells), // serialize cells
        createdAt: Timestamp.now(),
        modifiedAt: Timestamp.now(),
      };
      await setDoc(contentRef, content);
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
