import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter, BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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
  const changeIsLogged = (isLogged) => setLogged(isLogged);
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar isLogged={isLogged} changeIsLogged={changeIsLogged} />
          <Switch>
            <>
              <Route exact path="/" component={Home} />
              <Route exact path="/agency" component={Agency} />
              <Route exact path="/agency-profile/:id" component={AgencyProfilePage} />
              <Route exact path="/agency-profile/:id/edit" component={AgencyEditPage} />
              <Route exact path="/create-agency" component={AgencyForm} />
              <Route
                exact
                path="/login"
                render={(...props) => <Login {...props} changeIsLogged={changeIsLogged} />}
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
