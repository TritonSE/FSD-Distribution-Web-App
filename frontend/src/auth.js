/**
 * File containing the helper methods for storing, getting, authenticating,
 * and removing the json webtoken in local storage
 */

function isAuthenticated() {
  return localStorage.hasOwnProperty("DWA:token");
}

function getJWT() {
  if (!isAuthenticated()) {
    return null;
  }
  return localStorage.getItem("DWA:token");
}
function setJWT(token) {
  localStorage.setItem("DWA:token", token);
}

function getUser() {
  if (!isAuthenticated()) {
    return null;
  }
  return JSON.parse(localStorage.getItem("DWA:user"));
}

function setUser(user) {
  localStorage.setItem("DWA:user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("DWA:token");
  localStorage.removeItem("DWA:user");
}

export { isAuthenticated, getJWT, setJWT, getUser, setUser, logout };
