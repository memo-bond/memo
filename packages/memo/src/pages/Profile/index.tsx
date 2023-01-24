import Footer from "layout/Footer";
import Header, { AuthUser } from "layout/Header";
import { memo, useState } from "react";
import useStyles from "./styles";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { collection, setDoc, doc } from "firebase/firestore";
import { User } from "models/user";
import { db } from "repository";

const ProfilePageComponent = () => {
  const css = useStyles();
  const loggedUser = useRecoilValue(AuthUser);
  const setLoggedUser = useSetRecoilState(AuthUser);
  const [edit, setEdit] = useState<boolean>(false);
  const [username, setUsername] = useState();
  const [displayName, setDisplayName] = useState("");

  const saveForm = async () => {
    let user = {} as User;
    user.username = username;
    user.name = displayName ? displayName : loggedUser.name;
    user.uid = loggedUser.uid;
    user.picture = loggedUser.picture;
    user.email = loggedUser.email;
    try {
      const usersRef = collection(db, "users");
      await setDoc(doc(usersRef, loggedUser.uid!), Object.assign({}, user), {
        merge: true,
      });
      setLoggedUser(user);
      setEdit(false);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className={css.homeRoot}>
      <Header />

      {edit ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                color="primary"
                label="Username"
                name="username"
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
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
                  Email: {loggedUser.email}
                </Grid>
                <Grid item xs={8}>
                  Name: {loggedUser.name}
                </Grid>
                <Grid item xs={8}>
                  User Name: {loggedUser.username}
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
