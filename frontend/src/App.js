import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Agency from "./pages/Agency/Agency";
import Login from "./pages/Login/Login";
import AgencyForm from "./pages/AgencyForm/AgencyForm";
import { isAuthenticated } from "./auth";
import { useState } from "react";


/**
 * Rendering the navigation bar of the website and creating all the routes that will
 * be used in the web app
 */
function App() {
  /**
   * used as a helper to track whether the user is logged in
   * changedIsLogged will be passed into components as props to allow isLogged to be changed
   * and force re-rendering of the navigation bar
   */
  const [isLogged, setLogged] = useState(isAuthenticated());
  const changeIsLogged = (isLogged) => setLogged(isLogged);
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar isLogged={isLogged} changeIsLogged={changeIsLogged} />
          <Switch>
            <React.Fragment>
              <Route exact path="/" component={Home} />
              <Route exact path="/agency" component={Agency} />
              <Route exact path="/create-agency" component={AgencyForm} />
              <Route
                exact
                path="/login"
                render={(...props) => (
                  <Login {...props} changeIsLogged={changeIsLogged} />
                )}
              />
            </React.Fragment>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
