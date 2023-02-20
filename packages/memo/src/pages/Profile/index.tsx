import Footer from "layout/Footer";
import Header from "layout/Header";
import { AuthUser } from "recoil/authUserState";
import { memo, useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "models/user";
import { firebaseAuth } from "services/auth";
import * as userService from "../../services/user";
import * as teamService from "../../services/team";

const ProfilePageComponent = () => {
  const css = useStyles();
  const [loggedUser, setLoggedUser] = useRecoilState(AuthUser);
  const [edit, setEdit] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState("");
  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [teams, setTeams] = useState<any>();

  useEffect(() => {
    if (!teams) {
      const fetch = async () => {
        const res = await teamService.getTeam(loggedUser.uid);
        setTeams(res.data);
      };
      fetch();
    }
  }, []);
  const saveForm = async () => {
    let user = {} as User;
    user.name = displayName ? displayName : loggedUser.name;
    user.uid = loggedUser.uid;
    user.picture = loggedUser.picture;
    user.email = loggedUser.email;
    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      userService.update(
        token!,
        loggedUser.uid,
        displayName,
        loggedUser.picture!
      );
      setLoggedUser(user);
      setEdit(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const create = async (e) => {
    e.preventDefault();
    const token = await firebaseAuth.currentUser?.getIdToken();
    const { name, description, emails } = e.target.elements;
    const form: teamService.TeamForm = {
      name: name.value,
      description: description.value,
      emails: emails.value.replaceAll(" ", "").split(","),
    };
    const res = teamService.createTeam(token!, form);
    setOpenCreateTeam(false);
  };
  return (
    <div className={css.homeRoot}>
      <Header />
      <Grid>
        <Button onClick={() => setOpenCreateTeam(true)}>Create Team</Button>
        <Dialog open={openCreateTeam} onClose={() => setOpenCreateTeam(false)}>
          <form onSubmit={create}>
            <DialogTitle>Create Team</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                name="name"
                label="Name"
                fullWidth
                variant="standard"
                required
              />
              <TextField
                name="description"
                label="Description"
                fullWidth
                variant="standard"
              />
              <TextField
                name="emails"
                label="Team member's Email, separate by comma"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCreateTeam(false)}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>

      {teams ? (
        teams.map((team, i) => {
          return (
            <>
              <Card key={i} style={{ padding: "30px" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Team:
                  <Button>{team.name}</Button>
                </Typography>
                <Typography color="text.secondary">
                  {team.description}
                </Typography>
                <Typography color="text.secondary">
                  Owner: {team.username}
                </Typography>
              </Card>
            </>
          );
        })
      ) : (
        <></>
      )}
      {edit ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                required
                color="primary"
                label="Display Name"
                name="displayName"
                onChange={(e: any) => setDisplayName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="text" size="small" onClick={() => saveForm()}>
            Save
          </Button>
          <Button variant="text" size="small" onClick={() => setEdit(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className={css.edit}>
          <Card>
            <CardHeader>User Profile</CardHeader>
            <CardMedia
              component="img"
              height="140"
              width={70}
              image={loggedUser.picture!}
            />
            <CardContent>
              <Grid>
                <Grid item xs={8}>
                  Name: {loggedUser.name}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Button variant="text" size="small" onClick={() => setEdit(true)}>
            Edit
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};
const Profile = memo(ProfilePageComponent);
Profile.displayName = "HomePage";
export default Profile;
