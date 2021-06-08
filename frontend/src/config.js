require("dotenv").config();

const BACKEND_URL = process.env.MODE === "prod" ? "" : "http://localhost:8000";

export { BACKEND_URL }