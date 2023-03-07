import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Navigationbar from "../Navigationbar";
import AllParis from "../../pages/AllParis";
import Administration from "../../pages/Administration";
// LA PAGE D'ACCUEIL
const index = () => {
  return (
    <Router>
      <div>
        <Navigationbar />
      </div>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/All-paris" exact component={AllParis} />
          <Route path="/Administration" exact component={Administration} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default index;
