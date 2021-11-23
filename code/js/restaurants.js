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

  // Create a condition that targets viewports at least 992px wide
  const mediaQuery = window.matchMedia("(max-width: 992px)");
  const restaurants = JSON.parse(sessionStorage.getItem("restaurants"));
  let count = 0;
  let venues = document.getElementById("venues");
  let row = null;

  // start by creating a row if its required
  if (restaurants.length > 0) {
    let content = document.getElementsByClassName("not-available");
    content[0].setAttribute("class", "hidden");
    if (mediaQuery.matches) {
      row = createNode("div", ["places"]);
    } else {
      row = createNode("div", ["row", "places"]);
    }
    venues.appendChild(row);
  }

  //loop through restaurants and build the html fot each restaurant dynamically
  restaurants.forEach(function (restaurant) {
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
    let cuisine = createNode("p", ["cuisine"]);
    let desc = createNode("p", ["desription"]);
    let reserve = createNode("div", ["mb-3"]);
    let reserveBtn = createNode("button", [
      "btn",
      "btn-primary",
      "d-block",
      "w-100",
    ]);

    img.setAttribute("src", restaurant.image);

    heading.innerHTML = restaurant.name;
    cuisine.innerHTML = restaurant.cuisine;
    desc.innerHTML = restaurant.info;
    reserveBtn.setAttribute("type", "submit");
    reserveBtn.innerHTML = "Make Reservation";
    reserveBtn.setAttribute("id", restaurant.id);

    row.appendChild(item);
    item.appendChild(box);
    box.appendChild(img);
    box.appendChild(heading);
    box.appendChild(cuisine);
    box.appendChild(desc);
    box.appendChild(reserve);
    reserve.appendChild(reserveBtn);

    //track row length
    count += 1;
  });

  // Register event listener
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

  // Register event listener for reservation button select
  venues.addEventListener("click", (event) => {
    event.preventDefault();
    const isButton = event.target.nodeName === "BUTTON";
    if (!isButton) {
      return;
    }
    let selection = restaurants.filter((restauraunt) => {
      return restauraunt.id === event.target.id;
    });

    //set search defaults for booking form
    let formValues = [];
    formValues.push("");
    formValues.push(formatDate(new Date()));
    formValues.push("11:00");
    formValues.push(1);

    // store in global session
    sessionStorage.setItem("search", formValues);
    sessionStorage.setItem("reservationSelection", JSON.stringify(selection));
    sessionStorage.setItem("optionSelected", true);
    if (sessionStorage.getItem("currentUser") === null) {
      window.location.href = "login.html";
    } else {
      window.location.href = "restaurantbooking.html";
    }
  });
})();
