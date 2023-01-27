import Footer from "layout/Footer";
import Header, { AuthUser } from "layout/Header";
import { memo, useEffect, useState } from "react";
import useStyles from "./styles";
import { Button } from "@mui/material";
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { AddCell } from "./add-cell";
import { localStorageEffect } from "services/utils";
import { CellList } from "./cell-list";
import { Cell } from "models/cell";
import { getDocs, query, where } from "firebase/firestore";
import { contentsRef } from "repository";

export const Cells = atom({
  key: "cells",
  default: [] as Cell[],
  effects_UNSTABLE: [localStorageEffect("cells")],
});

const CodingPageComponent = () => {
  const css = useStyles();
  const cells = useRecoilValue(Cells);
  const setCells = useSetRecoilState(Cells);
  const [editing, setEditing] = useState(false);
  const resetCells = useResetRecoilState(Cells);
  const [title, setTitle] = useState();
  const [memoId, setMemoId] = useState();
  const [contentId, setContentId] = useState("");

  const fetchData = async (memoId) => {
    let contentDoc;
    const q = query(contentsRef, where("memo.id", "==", memoId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      contentDoc = doc.data();
      setContentId(doc.id!);
    });
    const memo = contentDoc.memo;
    setTitle(memo.title);
    setCells(JSON.parse(contentDoc.content));
    setMemoId(memoId);
  };

  useEffect(() => {
    const a = window.location.pathname.split("-");
    const memoId = a[a.length - 1];
    console.log("memoId ", memoId);
    if (memoId === "/code/") {
      // new
      setEditing(false);
    } else {
      // edit
      setEditing(true);
      fetchData(memoId);
    }
  }, [editing]);

  return (
    <div className={css.homeRoot}>
      <Header />
      <Button onClick={resetCells}>Reset Cells</Button>
      <CellList
        cells={cells}
        isEdit={editing}
        title={title}
        contentId={contentId}
        memoId={memoId}
      />
      <Footer />
    </div>
  );
};
const CodingPage = memo(CodingPageComponent);
CodingPage.displayName = "CodingPage";
export default CodingPage;
