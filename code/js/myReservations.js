
"use strict";

(function () {
  // help function to create nodes with mulitple classes
  function createNode(type, classes) {
    let node = document.createElement(type);
    classes.forEach(function (clss) {
      node.classList.add(clss);
    });
    return node;
  }

  function processReservation(reservations, users, userIndex) {
    let processing = reservations.filter(
      (res) => res.status.toString() === "Processing"
    );

    if (processing !== null) {
      setTimeout(function () {
        for (let i = 0; i < reservations.length; i++) {
          if (reservations[i].status.toString() === "Processing") {
            const spinners = document.getElementsByClassName("spinner-border");
            const statustext = document.getElementsByClassName("s-txt");
            reservations[i].status = "Confirmed";
            statustext[i].innerHTML = "Status: Confirmed";
            if (!spinners[i].classList.contains("invisible")) {
              spinners[i].classList.add("invisible");
            }
            // Display Bootstap Toast (Push Notification)
            var toastElList = [].slice.call(
              document.querySelectorAll(".toast")
            );
            var toastList = toastElList.map(function (toastEl) {
              return new bootstrap.Toast(toastEl);
            });
            console.log(toastList)
            toastList.forEach((toast) => toast.show());
          }
        }
        users[userIndex].reservations = reservations;
        sessionStorage.setItem("userDetails", JSON.stringify(users));
      }, 5000);
    }
  }

  const restaurants = JSON.parse(sessionStorage.getItem("restaurants"));
  let users = JSON.parse(sessionStorage.getItem("userDetails"));
  sessionStorage.removeItem("editmode");
  let count = 0;
  let venues = document.getElementById("venues");
  let row = null;
  // Create a condition that targets viewports at least 992px wide
  const mediaQuery = window.matchMedia("(max-width: 992px)");
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  let userIndex = users.findIndex((u) => u.userId === user[0].userId);
  let reservations = users[userIndex].reservations;

  if (reservations.length > 0) {
    let content = document.getElementsByClassName("not-available");
    content[0].setAttribute("class", "hidden");
    if (mediaQuery.matches) {
      row = createNode("div", ["places"]);
    } else {
      row = createNode("div", ["row", "places"]);
    }
    venues.appendChild(row);
  }

  reservations.forEach(function (reservation) {
    if (count !== 0 && count % 3 === 0) {
      if (mediaQuery.matches) {
        row = createNode("div", ["places"]);
      } else {
        row = createNode("div", ["row", "places"]);
      }
      venues.appendChild(row);
      count = 0;
    }

    let item = null;
    if (mediaQuery.matches) {
      item = createNode("div", ["col-md-10", "col-lg-4", "item", "location"]);
    } else {
      item = createNode("div", ["col-md-6", "col-lg-4", "item", "location"]);
    }

    let box = createNode("div", ["box"]);
    let img = createNode("img", ["rounded"]);
    let heading = createNode("h3", ["name"]);
    let date = createNode("p", ["date"]);
    let time = createNode("p", ["time"]);
    let guests = createNode("p", ["guests"]);
    let mobile = createNode("p", ["mobile"]);
    let requests = createNode("p", ["requests"]);
    let update = createNode("div", ["update"]);
    let updateIcon1 = createNode("div", ["icon-wrap"]);
    let updateIcon2 = createNode("div", ["icon-wrap"]);
    let select1 = createNode("a", ["edit"]);
    let select2 = createNode("a", ["delete"]);
    let iconDelete = createNode("i", ["fa", "fa-trash", "icon", "fa-lg"]);
    let iconEdit = createNode("i", ["fa", "fa-edit", "icon", "fa-lg"]);
    let status = createNode("div", ["status"]);
    let statusTxt = createNode("p", ["s-txt"]);
    let statusSpinner = createNode("div", ["spinner-border"]);
    let spinner = createNode("span", ["visually-hidden"]);

    //get resaurant img
    let restIndex = restaurants.findIndex(
      (restaurant) => restaurant.name === reservation.restaurant
    );
    let restImg = restaurants[restIndex].image;
    img.setAttribute("src", restImg);
    img.setAttribute("width", 200);
    img.setAttribute("height", 130);

    heading.innerHTML = reservation.restaurant;
    date.innerHTML = `Date: ${reservation.date}`;
    time.innerHTML = `Time: ${reservation.time}`;
    guests.innerHTML = `Guests: ${reservation.guests}`;
    mobile.innerHTML = `Mobile: ${reservation.mobile}`;
    requests.innerHTML = `Requests: ${reservation.requests}`;
    select1.setAttribute("href", "#");
    statusSpinner.setAttribute("id", "progress");
    statusSpinner.setAttribute("role", "status");
    statusTxt.innerHTML = `Status: ${reservation.status}`;
    spinner.innerHTML = "Loading...";
    select2.setAttribute("href", "#");
    select2.setAttribute("data-bs-toggle", "modal");
    select2.setAttribute("data-bs-target", "#deleteModal");
    iconDelete.setAttribute("id", reservation.id);
    iconEdit.setAttribute("id", reservation.id);
    iconDelete.setAttribute("title", "delete");
    iconEdit.setAttribute("title", "edit");
    if (reservation.status.toString() === "Confirmed") {
      statusSpinner.classList.add("invisible");
    }

    row.appendChild(item);
    item.appendChild(box);
    box.appendChild(img);
    box.appendChild(heading);
    box.appendChild(date);
    box.appendChild(time);
    box.appendChild(guests);
    box.appendChild(mobile);
    box.appendChild(requests);
    box.appendChild(update);
    box.appendChild(status);
    update.appendChild(updateIcon1);
    update.appendChild(updateIcon2);
    updateIcon1.appendChild(select1);
    select1.appendChild(iconEdit);
    updateIcon2.appendChild(select2);
    select2.appendChild(iconDelete);
    status.appendChild(statusTxt);
    status.appendChild(statusSpinner);
    statusSpinner.appendChild(spinner);

    //track row length
    count += 1;
  });

  //append section/row for user statistics
  let statisticsRow = null;

  if (mediaQuery.matches) {
    statisticsRow = createNode("div", ["places", "stats"]);
  } else {
    statisticsRow = createNode("div", ["row", "places", "stats"]);
  }
  venues.appendChild(statisticsRow);
  let placeholderImg = createNode("div", ["stats-img-holder"]);
  let statsImg = createNode("img", ["stats-img"]);
  let statsComingTxt = createNode("h6", ["stats-txt", "section-title"]);

  statsImg.setAttribute("src", "img/statistics.jpg");
  statsComingTxt.innerHTML = "User Statistics coming soon...";

  statisticsRow.appendChild(placeholderImg);
  placeholderImg.appendChild(statsImg);
  statisticsRow.appendChild(statsComingTxt);

  // Register change of screen size event listener
  mediaQuery.addEventListener("change", (e) => {
    let rows = document.getElementsByClassName("places");
    let items = document.getElementsByClassName("location");
    if (e.matches) {
      for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("row");
      }
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("col-md-6");
        items[i].classList.add("col-md-10");
      }
    } else {
      for (let i = 0; i < rows.length; i++) {
        rows[i].classList.add("row");
        items[i].classList.remove("col-md-10");
        items[i].classList.add("col-md-6");
      }
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("col-md-10");
        items[i].classList.add("col-md-6");
      }
    }
  });

  //register event listener on delete & edit icons
  const updateRow = document.getElementsByClassName("update");
  for (let i = 0; i < updateRow.length; i++) {
    updateRow[i].onclick = function (event) {
      event.preventDefault();
      let isDelete =
        event.target.nodeName === "I" &&
        event.target.title.toString() === "delete";
      let isEdit =
        event.target.nodeName === "I" &&
        event.target.title.toString() === "edit";
      // clicked off the icons
      if (!isDelete && !isEdit) {
        return;
      }

      //clicked a delete icon
      if (isDelete) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].userId === user[0].userId) {
            let reservationId = event.target.getAttribute("id");
            let editRes = users[i].reservations.filter(
              (res) => res.id.toString() !== reservationId.toString()
            );
            users[i].reservations = editRes;
            sessionStorage.setItem("userDetails", JSON.stringify(users));
          }
        }
        // clicked an edit icon
      } else {
        let reservationId = event.target.getAttribute("id");
        let edit = reservations.filter(
          (res) => res.id === parseInt(reservationId)
        );

        let formValues = [];
        formValues.push("");
        formValues.push(edit[0].date);
        formValues.push(edit[0].time);
        formValues.push(edit[0].guests);
        formValues.push(edit[0].mobile);
        formValues.push(edit[0].requests);
        formValues.push(edit[0].id);

        sessionStorage.setItem("search", formValues);

        let selection = restaurants.filter(
          (restauraunt) => restauraunt.name === edit[0].restaurant.toString()
        );

        // store in global session
        sessionStorage.setItem(
          "reservationSelection",
          JSON.stringify(selection)
        );
        sessionStorage.setItem("editmode", "true");
        window.location.href = "restaurantbooking.html";
      }
    };
  }

  //register delete button on delete reservation modal
  const deleteBtn = document.getElementById("deleteReservation");
  if (deleteBtn !== null) {
    deleteBtn.onclick = function (event) {
      event.preventDefault();

      window.location.href = "myreservations.html";
    };
  }

  window.onload = function () {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (user !== null) {
      addUserWelcome(user);
    }
    processReservation(reservations, users, userIndex);
  };
})();
