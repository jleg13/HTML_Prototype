"use strict";

(function () {
  const form = document.getElementById("login-form");
  const invalid = document.getElementById("error-msg");
  const loginInputs = document.getElementsByClassName("form-control");
  let users = JSON.parse(sessionStorage.getItem("userDetails"));

  function removeErrMsg() {
    if (invalid.classList.contains("visible")) {
      invalid.classList.remove("visible");
      invalid.classList.add("hidden");
    }
  }

  // remove err msg if displayed
  form.addEventListener("click", (event) => {
    removeErrMsg();
  });

  // form submit listener
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = users.filter((user) => {
      return user.email === loginInputs[1].value;
    });
    if (validateLogin(user, loginInputs)) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));

      if (sessionStorage.getItem("reservationSelection") === null) {
        window.location.href = "index.html";
      } else {
        window.location.href = "restaurantbooking.html";
      }
    } else {
      invalid.classList.remove("hidden");
      invalid.classList.add("visible");
      form.reset();
    }
  });
})();
