"use strict";
// Code contained here has been built upon from the lecture material in COSC360

(function () {
  class Cal {
    constructor(d, containerId) {
      this._date = d;
      this._container = document.getElementById(containerId);
    }

    prev() {
      this._date.setMonth(this._date.getMonth() - 1);
      this.render();
    }

    next() {
      this._date.setMonth(this._date.getMonth() + 1);
      this.render();
    }

    getdate() {
      return this._date;
    }

    setdate(d) {
      if (d) {
        this._date.setDate(d);
      }
    }

    _dayOfTheFirstDay() {
      return new Date(this._date.getFullYear(), this._date.getMonth(), 1);
    }

    _dayOfTheLastDay() {
      return new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);
    }

    _buildHeader() {
      let month = document.createElement("div");
      month.id = "month";

      // get full month and full year
      let m = document.createElement("span");
      m.innerHTML = this._date.toLocaleString("default", {
        month: "long",
      });
      m.innerHTML += ` ${this._date.getFullYear()}`;

      // Define Left Button and bind click event
      let leftBtn = document.createElement("div");
      leftBtn.id = "leftBtn";
      leftBtn.innerHTML = "<";
      leftBtn.addEventListener("click", (event) => this.prev());

      // Define Right Button and bind click event
      let rightBtn = document.createElement("div");
      rightBtn.id = "rightBtn";
      rightBtn.innerHTML = ">";
      rightBtn.addEventListener("click", (event) => this.next());

      // Put the buttons and month&year into #month
      month.appendChild(leftBtn);
      month.appendChild(m);
      month.appendChild(rightBtn);

      // Build the "Sun" to "Sat" part
      let calendarHeader = document.createElement("div");
      calendarHeader.id = "calendarHeader";
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      days.forEach((day) => {
        let d = document.createElement("div");
        d.innerHTML = day;
        d.className = "header";
        calendarHeader.appendChild(d);
      });

      // Add month, year to header
      this._container.appendChild(month);
      // Add days to header
      this._container.appendChild(calendarHeader);
    }

    _buildBody() {
      let calendarBody = document.createElement("div");
      calendarBody.id = "calendarBody";

      // Add extra cells to the row if the first day of the month is not Sunday
      let firstDay = this._dayOfTheFirstDay().getDay();
      for (let i = 0; i < firstDay; i++) {
        let d = document.createElement("div");
        d.innerHTML = "";
        d.className = "day";
        calendarBody.appendChild(d);
      }

      // Add one cell per day
      let lastDate = this._dayOfTheLastDay().getDate();
      for (let i = 1; i < lastDate + 1; i++) {
        let d = document.createElement("div");
        d.innerHTML = i;
        d.className = "day";
        calendarBody.appendChild(d);
      }

      // Add extra cells to the row if the last day of the month is not Saturday
      let lastDay = this._dayOfTheLastDay().getDay();
      for (let i = lastDay; i < 6; i++) {
        let d = document.createElement("div");
        d.innerHTML = "";
        d.className = "day";
        calendarBody.appendChild(d);
      }

      this._container.appendChild(calendarBody);
    }

    // function to highlight the selected reservation day
    highlightReservation() {
      const selected = this.getdate().getDate();

      const grid = document.getElementsByClassName("day");
      for (let i = 0; i < grid.length; i++) {
        const gridValue = grid[i].innerHTML;
        if (grid[i].classList.contains("highlight")) {
          grid[i].classList.remove("highlight");
        }
        if (selected === parseInt(gridValue)) {
          console.log;
          grid[i].classList.add("highlight");
        }
      }
    }

    render() {
      this._container.innerHTML = "";
      this._buildHeader();
      this._buildBody();
      this.highlightReservation();
    }
  }

  const containerId = "renderhere";

  const search = sessionStorage.getItem("search");
  const searchArr = search.split(",");

  //Initialise the calander object by passing in the date specified for booking so to highlight the day
  let calendarInstance = new Cal(
    new Date(`${searchArr[1]}T${searchArr[2]}`),
    containerId
  );
  calendarInstance.render();

  const grid = document.getElementById("calendarBody");
  grid.addEventListener("click", (event) => {
    event.preventDefault();
    const isDayInRange =
      event.target.innerHTML >= new Date().getDate() &&
      event.target.innerHTML <= new Date(Date.now() + 6.048e8).getDate();
    if (!isDayInRange) {
      return;
    }
    //update date
    calendarInstance.setdate(event.target.innerHTML);
    calendarInstance.highlightReservation();
    const inputFields = document.getElementsByClassName("form-control");

    for (let i = 1; i < inputFields.length; i++) {
      if (inputFields[i].getAttribute("name") === "date") {
        inputFields[i].value = formatDate(calendarInstance.getdate());
      }
    }
    displayTimeOptions();
  });
})();
