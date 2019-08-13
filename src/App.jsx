import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/";
import Registration from "./pages/Registration/";
import NotificationSystem from "./components/NotificationComponent";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Registration} />
          <Route path="/posts/" component={() => {}} />
          <Route path="/posts/:postID" component={() => {}} />
          <Route path="/about/" component={() => {}} />
          <Route path="/users/" component={() => {}} />
          <Route path="/users/self" component={() => {}} />
        </Switch>
      </Router>
      <NotificationSystem />
    </Fragment>
  );
};

export default App;
