import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

import Home from "./pages/Home/Home";
import Agency from "./pages/Agency/Agency";
import AgencyProfilePage from "./pages/AgencyProfilePage/AgencyProfilePage";
import AgencyEditPage from "./pages/AgencyEditPage/AgencyEditPage";
import AgencyForm from "./pages/AgencyForm/AgencyForm";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { isAuthenticated } from "./auth";

function App() {
  const [isLogged, setLogged] = useState(isAuthenticated());
  const [deleted, setDeleted] = useState(0);
  const changeDeleted = (deleteIncr) => setDeleted(deleteIncr);
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar isLogged={isLogged} changeIsLogged={setLogged} />
          <Switch>
            <>
              <Route
                exact
                path="/"
                render={() => (
                  <Home key={deleted} deleted={deleted} changeDeleted={changeDeleted} />
                )}
              />
              <Route exact path="/agency" component={Agency} />
              <Route exact path="/agency-profile/:id" component={AgencyProfilePage} />
              <Route exact path="/agency-profile/:id/edit" component={AgencyEditPage} />
              <Route exact path="/create-agency" component={AgencyForm} />
              <Route
                exact
                path="/login"
                render={(...props) => <Login {...props} changeIsLogged={setLogged} />}
              />
              <Route exact path="/register" component={Register} />
            </>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
