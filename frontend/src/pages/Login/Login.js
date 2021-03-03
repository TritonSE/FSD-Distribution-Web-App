import React from 'react';
import { useHistory } from 'react-router-dom';
import { setJWT, setUser } from '../../auth';
const config = require('../../config');

const Login = (props) => {
  let history = useHistory();

  const [state, setState] = React.useState({
    username: "",
    password: ""
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submission = {
      username: state.username,
      password: state.password
    };

    try {
      const response = await fetch(`${config.backend.uri}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });

      if (response.ok) {
        const json = await response.json();
        setJWT(json.token);
        setUser(json.user);
        history.push("/");
        props.changeIsLogged(true);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Hello world</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="username" onChange={handleChange("username")} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange("password")} />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    </div>
  );
}

export default Login;
