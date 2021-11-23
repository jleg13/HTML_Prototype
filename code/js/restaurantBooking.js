"use strict";

//global function to insert option nodes into the dom for the matching available time options to the selected day
function displayTimeOptions(editMode) {
  const search = sessionStorage.getItem("search");
  const searchArr = search.split(",");
  const reservation = JSON.parse(
    sessionStorage.getItem("reservationSelection")
  );
  const timeOptions = document.getElementById("options");
  const restaurants = JSON.parse(sessionStorage.getItem("restaurants"));

  //clear old options
  timeOptions.innerHTML = "";
  let date = function () {
    const inputFields = document.getElementsByClassName("form-control");
    for (let i = 1; i < inputFields.length; i++) {
      if (inputFields[i].getAttribute("name") === "date") {
        return inputFields[i].value;
      }
    }
  };
  // reserved day minus current day
  let daysInFuture = new Date(date()).getDate() - new Date().getDate();

  //use the day in future to find index of day of timeslots
  let restaurant = restaurants.filter(
    (restaurant) => restaurant.name === reservation[0].name
  );
  let max = restaurant[0].schedule[daysInFuture].max;
  let times = restaurant[0].schedule[daysInFuture].times;

  times.forEach((t) => {
    const option = document.createElement("option");
    option.value = t.time;
    option.innerHTML = t.time;
    let full = false;
    if (t.tables.length === max) {
      option.disabled = true;
      option.classList.add("unselected");
      full = true;
    }
    let selectedCurrent = false;
    if (editMode && t.time === searchArr[2]) {
      option.selected = true;
      selectedCurrent = true;
    } else if (
      Date.parse(`${date()} ${searchArr[2]}:00`) >
        Date.parse(`${date()} ${t.time}:00`) &&
      !selectedCurrent &&
      !full
    ) {
      option.selected = true;
      selectedCurrent = true;
    }
    timeOptions.appendChild(option);
  });
}

(function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const search = sessionStorage.getItem("search");
  const searchArr = search.split(",");
  const reservation = JSON.parse(
    sessionStorage.getItem("reservationSelection")
  );
  const inputFields = document.getElementsByClassName("form-control");
  const edit = sessionStorage.getItem("editmode");
  let users = JSON.parse(sessionStorage.getItem("userDetails"));

  if (edit) {
    let submit = document.getElementById("confirm");
    submit.innerHTML = "Save Changes";
  }
  // fill out feservation form inputs
  for (let i = 1; i < inputFields.length; i++) {
    switch (inputFields[i].getAttribute("name")) {
      case "restaurant":
        inputFields[i].value = reservation[0].name;
        break;

      case "date":
        inputFields[i].value = searchArr[1];
        break;

      case "time":
        inputFields[i].value = searchArr[2];
        break;

      case "guests":
        inputFields[i].value = searchArr[3];
        break;

      case "user":
        inputFields[i].value = user[0].userId;
        break;
      case "mobile":
        inputFields[i].value = searchArr[4] !== undefined ? searchArr[4] : "";
        break;
      case "requests":
        inputFields[i].value = searchArr[5] !== undefined ? searchArr[5] : "";
        break;
      default:
        break;
    }
  }

  displayTimeOptions(edit);

  //submit button listener
  const form = document.getElementById("limit");
  let userId = null;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formInputs = document.getElementsByClassName("form-control");
    let formValues = {};
    for (let i = 0; i < formInputs.length; i++) {
      if (formInputs[i].name !== "user" && formInputs[i].name !== "search") {
        formValues[formInputs[i].name] = formInputs[i].value;
      } else if (formInputs[i].name === "user") {
        userId = formInputs[i].value;
        formValues["status"] = "Processing";
        formValues["id"] = Math.random().toPrecision(3) * 10000;
      }
    }

    let editRes = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === userId) {
        //delete old booking if in editmode
        if (edit) {
          editRes = users[i].reservations.filter(
            (res) => res.id.toString() !== searchArr[6]
          );
          users[i].reservations = editRes;
          users[i].reservations.push(formValues);
        } else {
          users[i].reservations.push(formValues);
        }
        break;
      }
    }

    sessionStorage.setItem("userDetails", JSON.stringify(users));
    sessionStorage.setItem("search", formValues);
    window.location.href = "myreservations.html";
  });
})();
