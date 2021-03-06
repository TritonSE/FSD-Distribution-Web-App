import React from "react";
import { TextField, Button, Typography, makeStyles } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { setJWT, setUser } from "../../auth";
import "./Login.css"
const config = require("../../config");

const useStyles = makeStyles((theme) => ({
  centered: {
    textAlign: 'center'
  },
  form: {
    //Input Field - General Layout
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '95%'
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black"
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(1),
      width: '100%'
    },

    '& .MuiButton-root': {
      margin: theme.spacing(3),
      background: '#54682f',
      width: '30%'
    }
  },
  title: {
    margin: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bolder',
    textTransform: 'uppercase'
  }
}));

/**
 * Login is the login form page that user will have to go through in order
 * to access the site.
 */
const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submission = {
      username: state.email,
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
    <div className="Main">
      <div className="Border">
        <Typography variant="h4" className={classes.title} style={{ fontSize: "2.5rem" }} > Login </Typography>
        <p className={classes.centered} style={{ color: "#8d8d8d" }}> Sign-in into an existing account below </p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField label='Email' variant='outlined' type='email' onChange={handleChange('email')} />
          <TextField label='Password' variant='outlined' type='password' onChange={handleChange('password')} />
          <Link to="/register" className="Child" as={Link}><Typography>Register Account</Typography></Link>
          {/* <Link to="reset-password"><Typography>Reset Password</Typography></Link> */}
          <div className={classes.centered}>
            <Button variant="contained" type="submit" >Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
