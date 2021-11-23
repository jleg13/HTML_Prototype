// global on load funtion to check if a user is loggin in and display the relevant user name

window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  if (user !== null) {
    addUserWelcome(user);
  }
};
