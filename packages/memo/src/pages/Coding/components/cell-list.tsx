import "./cell-list.css";
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useActions } from "../hooks/use-actions";
import {
  Button,
  Checkbox,
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
import { firebaseAuth } from "services/auth";
import { log } from "console";

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
  const [sharing, setSharing] = useState(true);
  const loggedUser = useRecoilValue(AuthUser);
  const [canUpdate, setCanUpdate] = useState(false);
  const logged = loggedUser.uid !== undefined;
  const { getMemo } = useActions();
  const navigate = useHistory();

  useEffect(() => {
    if (memoId) {
      getMemo(memoId);
      const fetch = async () => {
        firebaseAuth.onAuthStateChanged(async (user) => {
          const token = user ? await user.getIdToken() : undefined;
          const content = await memoService.getBeMemoContent(memoId, token!);
          setTitle(content.memo.title);
          setContentId(content.memo.id!);
          setSharing(content.memo.sharing);
          if (content.memo.author === loggedUser.username) {
            setCanUpdate(true);
          }
        });
      };
      fetch();
      setIsCreate(false);
    } else {
      setIsCreate(true);
    }
  }, [memoId]);

  const save = async () => {
    const token = await firebaseAuth.currentUser?.getIdToken();
    const form: memoService.MemoForm = {
      title,
      sharing,
      cells,
      tags: undefined,
    };
    if (memoId) {
      // update
      memoService.update(token!, memoId, form);
      alert("Saved");
    } else {
      // create
      memoService.create(token!, form);
      navigate.push("/");
    }
  };

  const deleteMemo = async () => {
    if (memoId) {
      const token = await firebaseAuth.currentUser?.getIdToken();
      const res = await memoService.deleteMemo(token!, memoId);
      if (res.status === 200) {
        alert("Delete successful");
      }
      navigate.push("/");
    }
  };

  const copy = async () => {
    const token = await firebaseAuth.currentUser?.getIdToken();
    const form: memoService.MemoForm = {
      title,
      sharing,
      cells,
      tags: undefined,
    };
    memoService.create(token!, form);
    navigate.push("/");
  };

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <>
      <div className="section-title">
        <div className="field-title">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
          />
        </div>
        <div className="field-share">
          Sharing
          <Checkbox
            checked={sharing}
            onChange={(e) => setSharing(e.target.checked)}
          />
        </div>
      </div>
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
            <Button onClick={copy}>Copy</Button>
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
