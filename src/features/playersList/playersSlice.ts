import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getAllPlayers,
  getPlayer,
  getAllTeams,
  getTeam,
  Player,
  GetAllPlayersResult,
  isLastPage,
} from "api/balldontlieApi";
import { AppThunk } from "app/store";

interface PlayersState {
  playerByNumber: Record<number, Player>;
  currentPagePlayers: number[];
  pageCount: number;
  per_page: number;
  search: string;
  total_pages: number;
  isLastPage: boolean;
  isLoading: boolean;
  error: string | null;
}

const playersInitialState: PlayersState = {
  playerByNumber: {},
  currentPagePlayers: [],
  isLastPage: false,
  pageCount: 1,
  per_page: 50,
  search: "",
  total_pages: 0,
  isLoading: false,
  error: null,
};

function startLoading(state: PlayersState) {
  state.isLoading = true;
}

function loadingFailed(state: PlayersState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

const players = createSlice({
  name: "players",
  initialState: playersInitialState,
  reducers: {
    getPlayerStart: startLoading,
    getPlayersStart: startLoading,
    getPlayerSuccess(state, { payload }: PayloadAction<Player>) {
      const { id } = payload;
      state.playerByNumber[id] = payload;
      state.isLoading = false;
      state.error = null;
    },
    getPlayersSuccess(state, { payload }: PayloadAction<GetAllPlayersResult>) {
      const {
        meta: { current_page, next_page, total_pages },
        data,
      } = payload;
      state.pageCount = current_page;
      state.isLastPage = isLastPage(next_page);
      state.total_pages = total_pages;
      state.isLoading = false;

      state.error = null;
      data.forEach((player) => {
        state.playerByNumber[player.id] = player;
      });

      state.currentPagePlayers = data.map((player) => player.id);
    },
    getPlayerFailure: loadingFailed,
    getPlayersFailure: loadingFailed,
  },
});

export const {
  getPlayersStart,
  getPlayersSuccess,
  getPlayersFailure,

  getPlayerStart,
  getPlayerSuccess,
  getPlayerFailure,
} = players.actions;

export default players.reducer;

export const fetchPlayers = (search?: string, page?: number, per_page?: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getPlayersStart());
    const players = await getAllPlayers({ search, page, per_page });

    dispatch(getPlayersSuccess(players));
  } catch (err) {
    dispatch(getPlayersFailure(err.toString()));
  }
};

export const fetchPlayer = (id: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getPlayerStart());
    const player = await getPlayer(id);
    dispatch(getPlayerSuccess(player));
  } catch (err) {
    dispatch(getPlayerFailure(err.toString()));
  }
};
