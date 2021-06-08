import React from "react";
import { TextField, Button, Typography, makeStyles, Snackbar } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { setJWT, setUser } from "../../auth";
import "./Login.css";
import { BACKEND_URL } from "../../config";


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

/**
 * Login is the login form page that user will have to go through in order
 * to access the site.
 */
const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    email: "",
    password: "",
    snack: {
      message: "",
      open: false,
    },
    errors: {
      email: false,
      password: false,
    },
    form_disabled: false,
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submission = {
      username: state.email,
      password: state.password,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        const json = await response.json();
        setJWT(json.token);
        setUser(json.user);
        history.push("/");
        props.changeIsLogged(true);
      } else if (response.status === 401) {
        document.body.style.cursor = null;
        setState({
          ...state,
          errors: { email: true, password: true },
          form_disabled: false,
          snack: { message: "Invalid Login: Email or password not recognized.", open: true },
        });
      }
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        errors: { email: false, password: false },
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
    <div className="Main">
      <div className="Border">
        <Typography variant="h4" className={classes.title} style={{ fontSize: "2.5rem" }}>
          {" "}
          Login{" "}
        </Typography>
        <p className={classes.centered} style={{ color: "#8d8d8d" }}>
          {" "}
          Sign-in into an existing account below{" "}
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
          <Link to="/register" className="Child" as={Link}>
            <Typography>Register Account</Typography>
          </Link>
          <div className={classes.centered}>
            <Button variant="contained" type="submit" disabled={state.form_disabled}>
              Login
            </Button>
          </div>
        </form>
      </div>
      <Snackbar
        open={state.snack.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={state.snack.message}
      />
    </div>
  );
};

export default Login;
