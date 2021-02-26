import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {isAuthenticated, setJWT, setUser, logout}  from '../../auth';

class Login extends Component {
  constructor(props) {
  super(props);

  this.state = {
    username: "",
    password: ""
    }
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  }

  handleSubmit = async (event) => {
    // REMOVE THIS 
    if (isAuthenticated()) {
      logout();
    }

    event.preventDefault();

    const submission = {
      username: this.state.username,
      password: this.state.password
    };

    try {
      const response = await fetch(`http://localhost:8000/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });

      if (response.ok) {
        const json = await response.json();
        setJWT(json.token);
        setUser(json.user);
                    
        <Redirect to="/" />
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h2>Hello world</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Username:</label>
              <input type="username" onChange={this.handleChange("username")} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" onChange={this.handleChange("password")} />
            </div>
            <div>
              <input type="submit" value="Log In" />
            </div>
          </form>
      </div>
    );
  }
}

export default Login;
