require("dotenv").config();

module.exports = {
  backend: {
    uri: process.env.BACKEND_URI || "http://localhost:8000",
  },
};
