import React, { useState } from "react";
import { BrowserRouter, BrowserRouter as Route, Switch } from "react-router-dom";
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
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar isLogged={isLogged} changeIsLogged={setLogged} />
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
