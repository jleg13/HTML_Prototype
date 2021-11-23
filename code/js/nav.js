"use strict";

(function () {
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn !== null) {
    logoutBtn.onclick = function (event) {
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("reservationSelection");
      window.location.href = "login.html";
    };
  }

  // search button listener
  const navSearch = document.getElementById("nav-search");
  navSearch.addEventListener("search", (event) => {
    // event.preventDefault();
    let searchInput = event.target.value;
    let formValues = [];
    formValues.push(searchInput);
    formValues.push(formatDate(new Date()));
    formValues.push("11:00");
    formValues.push(1);

    sessionStorage.setItem("search", formValues);
    window.location.href = "searchrestaurants.html";
  });
})();
