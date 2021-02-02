import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Home from "./pages/Home/Home";
import Agency from "./pages/Agency/Agency";
import AgencyProfileForm from "./pages/agency-profile-form/AgencyProfileForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <React.Fragment>
                <Route exact path="/" component={Home}/>
                <Route exact path="/agency" component={Agency}/>
                <Route exact path="/create-agency" component={AgencyProfileForm}/>
            </React.Fragment>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
