import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "layout/Footer";
import Header from "layout/Header";
import { memo, useEffect, useState } from "react";
import useStyles from "./styles";
import * as teamService from "../../services/team";

const TeamPageComponent = () => {
  const css = useStyles();
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const create = async () => {};

  useEffect(() => {
    if (!teams) {
      const fetch = async () => {
        const teams = await teamService.getTeams(page, pageSize);
        setTeams(teams);
      };
      fetch();
    }
  }, []);
  return (
    <>
      <div className={css.homeRoot}>
        <div id="sectionBody" className={css.landingBody}>
          <Header />
          <Grid spacing={2}>
            <Grid></Grid>
            <Grid>
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
                        <Typography className={css.navBtn}>
                          {team.description}
                        </Typography>
                        <Typography color="text.secondary">
                          Owner: {team.owner.username}
                        </Typography>
                      </Card>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
          <Footer />
        </div>
      </div>
    </>
  );
};

const Team = memo(TeamPageComponent);
Team.displayName = "Team";
export default Team;
