"use strict";

(function () {
  const inputsStr = sessionStorage.getItem("search");
  const inputsArr = inputsStr.split(",");
  const restaurants = JSON.parse(sessionStorage.getItem("restaurants"));

  // listener for search again button
  document.getElementById("search-again-btn").onclick = function (data) {
    location.href = "index.html";
  };

  // help function to create nodes with mulitple classes
  function createNode(type, classes) {
    let node = document.createElement(type);
    classes.forEach(function (clss) {
      node.classList.add(clss);
    });
    return node;
  }

  //implement basic searches results based on cuisine type. More advanced //search will need to be implemented but is out of scope for assignments
  // TODO filter on location, word matching, time and date availabilty ect
  function filterSearchResults() {
    let results = [];
    restaurants.forEach(function (restaurant) {
      if (restaurant.cuisine === inputsArr[0]) {
        results.push(restaurant);
      }
    });
    return results;
  }

  let count = 0;
  let venues = document.getElementById("venues");
  let row = null;
  // Create a condition that targets viewports at least 992px wide
  const mediaQuery = window.matchMedia("(max-width: 992px)");

  let searchResults = filterSearchResults();

  if (searchResults.length > 0) {
    let content = document.getElementsByClassName("not-available");
    content[0].setAttribute("class", "hidden");
    if (mediaQuery.matches) {
      row = createNode("div", ["places"]);
    } else {
      row = createNode("div", ["row", "places"]);
    }
    venues.appendChild(row);
  }

  searchResults.forEach(function (result) {
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

    img.setAttribute("src", result.image);

    heading.innerHTML = result.name;
    cuisine.innerHTML = result.cuisine;
    desc.innerHTML = result.info;
    reserveBtn.setAttribute("type", "button");
    reserveBtn.innerHTML = "Make Reservation";
    reserveBtn.setAttribute("id", result.id);

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

  // Register event listener for screen size change
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

    // store in global session
    sessionStorage.setItem("reservationSelection", JSON.stringify(selection));
    sessionStorage.setItem("optionSelected", true);
    if (sessionStorage.getItem("currentUser") === null) {
      window.location.href = "login.html";
    } else {
      window.location.href = "restaurantbooking.html";
    }
  });
})();
