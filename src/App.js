import React from "react";
import Playground from "./playground";
import Home from "./home";
import NotFound from "./404";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "tailwindcss/dist/tailwind.css";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/home"} component={Playground} />
        <Route exact path={"/"} component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
