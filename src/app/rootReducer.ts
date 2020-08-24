import { combineReducers } from "@reduxjs/toolkit";

import playersReducer from "features/playersList/playersSlice";

const rootReducer = combineReducers({
  players: playersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
