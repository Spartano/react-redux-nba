import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "app/rootReducer";

import { PlayersList } from "./playersListPage/PlayersList";
import { fetchPlayers } from "./playersSlice";
import PlayersListHeader from "./playersListPage/PlayersListHeader";
import { LinearProgress } from "@material-ui/core";

export const PlayersListPage = () => {
  const dispatch = useDispatch();

  const {
    currentPagePlayers,
    isLoading,
    error: playersError,
    playerByNumber,
    search,
    per_page,
    pageCount,
  } = useSelector((state: RootState) => state.players);

  const players = currentPagePlayers.map((playerNumber) => playerByNumber[playerNumber]);

  useEffect(() => {
    dispatch(fetchPlayers(search, pageCount, per_page));
  }, [search, per_page, pageCount, dispatch]);

  if (playersError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{playersError.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <PlayersListHeader />
      {isLoading && <LinearProgress />}
      <PlayersList players={players} />
    </div>
  );
};
