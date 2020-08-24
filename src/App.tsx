import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PlayersListPage } from "features/playersList/PlayersListPage";
import { PlayerDetailPage } from "features/playersList/PlayerDetailPage";

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact>
          <PlayersListPage />
        </Route>
        <Route path="/player/:id">
          <PlayerDetailPage />
        </Route>
        <Route>
          <div>Error 404</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
