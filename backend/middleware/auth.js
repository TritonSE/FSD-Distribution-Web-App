const passport = require("passport");

const isAuthenticated = passport.authenticate("jwt", { session: false });

module.exports = { isAuthenticated };
