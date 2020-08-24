import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "app/rootReducer";
import { useParams } from "react-router-dom";
import { fetchPlayer } from "./playersSlice";
import { LinearProgress, Container } from "@material-ui/core";
import { PlayerDetail } from "./playerDetailPage/PlayerDetail";

export const PlayerDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, error: playerError, playerByNumber } = useSelector(
    (state: RootState) => state.players
  );

  useEffect(() => {
    if (!id) return;

    dispatch(fetchPlayer(id));
  }, [id, dispatch]);

  if (playerError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{playerError.toString()}</div>
      </div>
    );
  }

  const player = playerByNumber[id];
  let renderedDetail = isLoading || !player ? <LinearProgress /> : <PlayerDetail {...player} />;

  return <Container maxWidth="md">{renderedDetail}</Container>;
};
