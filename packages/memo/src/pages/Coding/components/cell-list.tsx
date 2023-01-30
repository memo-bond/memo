import "./cell-list.css";
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useActions } from "../hooks/use-actions";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthUser } from "layout/Header";
import * as memoService from "../../../services/memo";

interface CellListProps {
  memoId?: string;
}

const CellList: React.FC<CellListProps> = ({ memoId }) => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const [title, setTitle] = useState("");
  const loggedUser = useRecoilValue(AuthUser);
  const logged = loggedUser.uid !== undefined;
  const { getMemo } = useActions();
  const navigate = useHistory();

  useEffect(() => {
    if (memoId) {
      getMemo(memoId);
      const fetch = async () => {
        const memo = await memoService.getMemoTitle(memoId);
        setTitle(memo.title);
      };
      fetch();
    }
  }, [memoId]);

  const save = async () => {
    if (memoId) {
      // update
    } else {
      // create
      memoService.create(loggedUser.username!, title, cells);
      navigate.push("/");
    }
  };

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
      />
      <div className="cell-list">
        <AddCell forceVisible={cells.length === 0} previousCellId={null} />
        {renderedCells}
      </div>
      <Button onClick={() => console.log(JSON.stringify(cells))}>Test</Button>
      {logged ? (
        <>
          <Button onClick={save}>Save</Button>
          <Button>Delete</Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CellList;
