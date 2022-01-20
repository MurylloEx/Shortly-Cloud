import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SeeClickedAmount from "./pages/SeeClickedAmount";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/click/:short_code" component={SeeClickedAmount} />
      </Switch>
    </BrowserRouter>
  );
}
