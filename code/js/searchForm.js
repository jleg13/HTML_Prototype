"use strict";

(function () {
  // set date to current date by defualt and set valid range
  let date = new Date();
  let dateField = document.getElementById("datepicker");
  dateField.valueAsDate = date;
  dateField.min = formatDate(date);
  dateField.max = formatDate(new Date(Date.now() + 6.048e8));

  // set time to current date by defualt
  let time = document.getElementById("timepicker");
  let hours = date.getHours();
  let mins = date.getMinutes();
  let hoursStr = hours < 10 ? `0${hours.toString()}` : hours.toString();
  let minsStr = mins < 10 ? `0${mins.toString()}` : mins.toString();
  time.value = `${hoursStr}:${minsStr}`;
  time.min = `${hoursStr}:${minsStr}`;

  const form = document.getElementById("search-form");

  function collectData() {
    let formInputs = document.getElementsByClassName("form-in");
    let formValues = [];
    for (let i = 0; i < formInputs.length; i++) {
      formValues[i] = formInputs[i].value;
    }
    sessionStorage.setItem("search", formValues);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formInputs = document.getElementsByClassName("form-in");
    let formValues = [];
    for (let i = 0; i < formInputs.length; i++) {
      formValues[i] = formInputs[i].value;
    }
    sessionStorage.setItem("search", formValues);
    window.location.href = "searchrestaurants.html";
  });
})();
