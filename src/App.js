import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Id from "./pages/Id";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Id} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
