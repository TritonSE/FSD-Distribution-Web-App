const BACKEND_URL = process.env.REACT_APP_MODE === "prod" ? "" : "http://localhost:8000";

export { BACKEND_URL }