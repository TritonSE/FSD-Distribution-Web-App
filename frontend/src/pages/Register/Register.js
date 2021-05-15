import React from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Grid, Typography, makeStyles, Snackbar } from "@material-ui/core";
import "./Register.css";

const config = require("../../config");

const useStyles = makeStyles((theme) => ({
  centered: {
    textAlign: "center",
  },
  form: {
    // Input Field - General Layout
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "95%",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black",
    },
    "& .MuiTypography-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    // Asterisk Styling
    "& .MuiFormLabel-asterisk": {
      color: "rgba(0, 0, 0, 0.54)",
    },

    // Button styling
    "& .MuiButton-root": {
      margin: theme.spacing(3),
      color: "black",
      background: "#54682f",
      width: "30%",
    },
    "& .MuiButton-label": {
      color: "white",
    },
  },
  title: {
    margin: theme.spacing(2),
    textAlign: "center",
    fontWeight: "bolder",
    textTransform: "uppercase",
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    snack: {
      message: "",
      open: false,
    },
    errors: {
      email: false,
      password: false,
      passwordConfirmation: false,
    },
    form_disabled: false,
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
    setState({ ...state, form_disabled: true });

    const submission = {
      username: state.email,
      password: state.password,
    };

    // check password length
    if (submission.password.length < 6) {
      document.body.style.cursor = null;
      setState({
        ...state,
        errors: { email: false, password: true, passwordConfirmation: false },
        form_disabled: false,
        snack: { message: "Password must be at least 6 characters long.", open: true },
      });
      return;
    }

    // check passwords match
    if (state.password !== state.passwordConfirmation) {
      document.body.style.cursor = null;
      setState({
        ...state,
        errors: { email: false, password: true, passwordConfirmation: true },
        form_disabled: false,
        snack: { message: "Passwords Do Not Match.", open: true },
      });
      return;
    }

    // Attempt to register with given credentials
    try {
      const response = await fetch(`${config.backend.uri}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      // Successful Registration
      if (response.ok) {
        console.log("account pending approval");
        history.push("/");
      } else if (response.status === 403) {
        document.body.style.cursor = null;
        setState({
          ...state,
          form_disabled: false,
          errors: { email: true, password: false, passwordConfirmation: false },
          snack: { message: "Could not register account: Email already in use!", open: true },
        });
      }
    } catch (error) {
      document.body.style.cursor = null;
      setState({
        ...state,
        errors: { email: false, password: false, passwordConfirmation: false },
        form_disabled: false,
        snack: { message: `An error occurred: ${error.message}`, open: true },
      });
    }
  };

  // Handles the closing of the Snackbar. Prevents Snackbar from closing when user clicks on the screen.
  // Allows the Snackbar to persist for 6 seconds.
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, snack: { ...state.snack, open: false } });
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
            <p className={classes.centered} style={{ color: "#8d8d8d" }}>
              {" "}
              Fill out the fields below to create a new account{" "}
            </p>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                onChange={handleChange("email")}
                required
                error={state.errors.email}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                onChange={handleChange("password")}
                required
                error={state.errors.password}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                onChange={handleChange("passwordConfirmation")}
                required
                error={state.errors.passwordConfirmation}
              />
              <Link to="login">
                <Typography>Already have an account? Sign-In</Typography>
              </Link>
              <div className={classes.centered}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={state.form_disabled}
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        open={state.snack.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={state.snack.message}
      />
    </div>
  );
};

export default Register;
