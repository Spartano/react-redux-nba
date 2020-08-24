import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Player } from "api/balldontlieApi";
import { CardActionArea, CardMedia, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    width: 160,
  },
  avatar: {
    height: 160,
    width: 160,
  },
  content: {
    textAlign: "center",
  },
});

export const PlayerListItem = ({
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
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`player/${id}`)}>
        <Avatar alt={last_name} src={picUrl} className={classes.avatar} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" color="primary">
            {first_name}
            <br></br> {last_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {position || "N/A"}
          </Typography>

          <Typography variant="body2" noWrap>
            <strong>{team.full_name}</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
