import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, Button, Grid, Typography, makeStyles } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
import "./Register.css";
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
      color: 'black',
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


const Register = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  // Updates given state with given value 
  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  // Handles submission of the form (button click)
  // Validates form data for completion/length, making a backend request to Users DB for secret key autentication + 
  // email uniqueness. If register succeeds, user is redirected to admin page and added to user DB. Otherwise, an error message appears. 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const submission = {
      username: state.email,
      password: state.password,
    };

    //Attempt to register with given credentials 
    try {
      const response = await fetch(`${config.backend.uri}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      //Successful Registration
      if (response.ok) {
        // const json = await response.json();
        console.log("account pending approval");
        history.push("/");
      }
    }
    catch (error) {
      console.log(error);
    }

  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ marginTop: "2rem" }}
      >
        <Grid item md={6} xs={12}>
          <div className="Border">
            <Typography variant="h4" className={classes.title}>
              Register New Account
                    </Typography>
            <p className={classes.centered} style={{ color: "#8d8d8d" }}> Fill out the fields below to create a new account </p>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField label='Email' variant='outlined' type='email' onChange={handleChange('email')} />
              <TextField label='Password' variant='outlined' type='password' onChange={handleChange('password')} />
              <TextField label='Confirm Password' variant='outlined' type='password' onChange={handleChange('passwordConfirmation')} />
              <Link to="login"><Typography>Already have an account? Sign-In</Typography></Link>
              <div className={classes.centered}>
                <Button variant="contained" color="primary" type="submit" disabled={state.form_disabled}>Register</Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;