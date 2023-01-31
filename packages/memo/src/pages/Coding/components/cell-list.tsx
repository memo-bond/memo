import "./cell-list.css";
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useActions } from "../hooks/use-actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
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

  const [contentId, setContentId] = useState("");
  const [title, setTitle] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const loggedUser = useRecoilValue(AuthUser);
  const [canUpdate, setCanUpdate] = useState(false);
  const logged = loggedUser.uid !== undefined;
  const { getMemo } = useActions();
  const navigate = useHistory();

  useEffect(() => {
    if (memoId) {
      getMemo(memoId);
      const fetch = async () => {
        const content = await memoService.getMemoContent(memoId);
        setTitle(content.memo.title);
        setContentId(content.id!);
        if (content.memo.authorId === loggedUser.uid) {
          setCanUpdate(true);
        }
      };
      fetch();
      setIsCreate(false);
    } else {
      setIsCreate(true);
    }
  }, [memoId]);

  const save = async () => {
    if (memoId) {
      // update
      memoService.update(memoId, contentId, title, cells);
      alert("Saved");
    } else {
      // create
      memoService.create(loggedUser.uid, title, cells);
      navigate.push("/");
    }
  };

  const deleteMemo = async () => {
    if (memoId) {
      // soft delete
      memoService.deleteMemo(contentId, memoId);
      // wait 1 second for firestore update :(
      await new Promise((r) => setTimeout(r, 1000));
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
      {logged ? (
        <>
          {canUpdate ? (
            <>
              <Button onClick={save}>Save</Button>
              <Button
                onClick={() => {
                  setDeleting(true);
                }}
              >
                Delete
              </Button>
            </>
          ) : (
            <></>
          )}
          {isCreate ? (
            <>
              <Button onClick={save}>Save</Button>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <Dialog open={deleting}>
        <DialogContent>
          <Typography>Are you sure to delete this memo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleting(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={deleteMemo}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CellList;
