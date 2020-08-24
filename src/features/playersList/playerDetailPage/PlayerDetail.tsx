import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Player } from "api/balldontlieApi";
import { CardActionArea, CardMedia, Avatar, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: 16,
    background: "inherit",
  },
  details: {
    display: "flex",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  team: {},
  cover: {
    width: 151,
  },
});

export const PlayerDetail = ({
  first_name,
  last_name,
  team,
  height_feet,
  height_inches,
  weight_pounds,
  position,
  id,
}: Player) => {
  const classes = useStyles();
  let history = useHistory();

  const picUrl = `https://nba-players.herokuapp.com/players/${last_name}/${first_name}`;
  return (
    <Card className={classes.root} elevation={0}>
      <CardMedia className={classes.cover} image={picUrl} title="Live from space album cover" />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {first_name} {last_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {position || "N/A"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>{height_feet || "N/A"} </strong> ft <strong>{height_inches || "N/A"} </strong>{" "}
            in
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>{weight_pounds || "N/A"}</strong> lb
          </Typography>
        </CardContent>
        <Paper elevation={3} style={{ margin: 4 }}>
          <CardActionArea>
            <CardContent className={classes.team}>
              <Typography component="h5" variant="h5">
                {team.full_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {team.abbreviation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>{team.city} </strong>
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong>{team.division}</strong> | <strong>{team.conference} </strong>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Paper>
      </div>
    </Card>
  );
};
