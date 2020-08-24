import React from "react";

import { Player } from "api/balldontlieApi";
import { PlayerListItem } from "./playersList/PlayerListItem";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 8,
    },
  })
);

interface Props {
  players: Player[];
}

export const PlayersList = ({ players }: Props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid container justify="center" spacing={2}>
        {players.map((player, i) => (
          <Grid key={i} item>
            <PlayerListItem {...player} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
