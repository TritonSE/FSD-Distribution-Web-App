import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Agency from "./pages/Agency/Agency";
import Login from "./pages/Login/Login";
import AgencyProfileForm from "./pages/AgencyProfileForm/AgencyProfileForm";
import { isAuthenticated } from "./auth";
import { useState } from 'react';

function App() {
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
              <Route exact path="/create-agency" component={AgencyProfileForm} />
              <Route exact path="/login" render={(...props) => (<Login {...props} changeIsLogged={changeIsLogged} />)} />
            </React.Fragment>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
