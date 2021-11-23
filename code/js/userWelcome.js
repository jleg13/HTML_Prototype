"use strict";

function createNode(type, classes) {
  let node = document.createElement(type);
  classes.forEach(function (clss) {
    node.classList.add(clss);
  });
  return node;
}

function addUserWelcome(usr) {
  const logedInMsg = document.getElementsByClassName("register-buttons");
  const reservationsNavLink = document.getElementById("myreservations-link");
  // display user name welcome msg and logout button
  for (let i = 0; i < logedInMsg.length; i++) {
    if (logedInMsg[i].classList.contains("hidden")) {
      logedInMsg[i].classList.remove("hidden");
      const msg = document.getElementById("usr-welcome");
      msg.innerHTML = `Welcome ${usr[0].userId}`;
    } else {
      logedInMsg[i].classList.add("hidden");
    }
  }

  let link = createNode("li", ["nav-item"]);
  let innerLink = createNode("a", ["nav-link"]);

  innerLink.innerHTML = "My Reservations";
  innerLink.setAttribute("href", "myreservations.html");

  reservationsNavLink.appendChild(link);
  link.appendChild(innerLink);
}
