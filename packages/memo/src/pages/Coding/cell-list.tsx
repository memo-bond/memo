import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { AuthUser } from "layout/Header";
import { FC, Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
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
  const loggedUser = useRecoilValue(AuthUser);
  const logged = Object.keys(loggedUser).length > 0;
  const savingCells = useRecoilValue(Cells);
  const [bookTitle, setBookTitle] = useState("");
  const resetCells = useResetRecoilState(Cells);
  const navigate = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);

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
  const deleteMemo = async () => {
    memoService.deleteMemo(contentId!, memoId!);
    await new Promise((r) => setTimeout(r, 1000));
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
      {logged ? (
        <>
          <Card>
            <div style={{ textAlign: "center", margin: "20px" }}>
              <TextField
                required
                value={bookTitle}
                label={"Title"}
                name="Title"
                style={{ width: "500px" }}
                onChange={(e) => setBookTitle(e.target.value)}
              >
                Title
              </TextField>
            </div>
          </Card>
          <AddCell forceVisible={cells.length === 0} previousCellId={null} />
          {renderedCells}
          <Button onClick={save}>Save</Button>
          <Button onClick={resetCells}>Reset Cells</Button>
          <Button onClick={() => setIsDeleting(true)}>Delete</Button>
          <Dialog open={isDeleting} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm delete</DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton>{/* <Close /> */}</IconButton>
            </Box>
            <DialogContent>
              <Typography>Are you sure to delete this Memo?</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setIsDeleting(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={deleteMemo}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : bookTitle ? (
        <>
          {" "}
          <Card style={{ padding: "30px", margin: "30px" }}>
            <Typography style={{ textAlign: "center" }}>
              <Button style={{ fontSize: "30px" }}>{bookTitle}</Button>
            </Typography>
            {renderedCells}
          </Card>
        </>
      ) : (
        <>
          <Card style={{ padding: "50px", margin: "50px" }}>
            <Typography>Please Sign In</Typography>
          </Card>
        </>
      )}
    </>
  );
};
