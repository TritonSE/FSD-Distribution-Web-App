import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {isAuthenticated} from '../../auth';

class Home extends Component {
  render() { 
    return ( (!isAuthenticated()) ? <Redirect to="/login" /> :
      (<div>
        <h2>Home</h2>
      </div>
    ));
  }
}

export default Home;