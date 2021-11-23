<template>
  <div>
    <form method="post" id="limit" @submit.prevent="checkFormAndSubmit">
      <h2 class="">
        <strong>{{ action }}</strong> Reservation.
      </h2>
      <div class="mb-3 form-section">
        <label> Restaurant </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="text"
            name="restaurant"
            :placeholder="this.$store.state.selectedRestaurant"
            v-model="this.$store.state.selectedRestaurant"
            
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Date </label>
        <div class="input-bord">
          <input
            id="datepicker"
            class="form-control"
            type="date"
            :min="minDate"
            :max="maxDate"
            v-model="reservation.date"
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Time </label>
        <div class="input-bord">
          <!-- <b-form-select  v-model="reservation.time" :options="this.$store.state.schedule"></b-form-select> -->
          <!-- <Select :options="options"/> -->
          <!-- <select
         id="numpeople" class="form-select form-control" 
          name="time"
          v-model="reservation.time"
        >
          <option
            v-for="(time, idx) in this.$store.state.schedule"
            :key="idx"
            id="options"
            label="Reservation Time"
            v-bind:value="time"
          ></option>
        </select> -->
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Guests </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="number"
            name="guests"
            :placeholder="reservation.guests"
            v-model="reservation.guests"
            max="6"
            min="1"
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Mobile </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="text"
            name="mobile"
            :placeholder="reservation.mobile"
            v-model="reservation.mobile"
            required
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Special Requests </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="text"
            name="requests"
            :placeholder="reservation.requests"
            v-model="reservation.requests"
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <button
          id="confirm"
          class="btn btn-primary d-block w-100"
          type="submit"
        >
          {{ btnLabel }}
        </button>
      </div>
    </form>
    <div class="errors" v-if="errors.length">
      <p>Please correct the following error(s):</p>
      <ul>
        <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>
<template>
  <div>
    <form method="post" id="limit">
      <h2 class="">
        <strong>{{ action }}</strong> Reservation.
      </h2>
      <div class="mb-3 form-section">
        <label> Restaurant </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="text"
            name="restaurant"
            :placeholder="this.$store.state.selectedRestaurant"
            v-model="this.$store.state.selectedRestaurant"
            readonly="readonly"
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Date </label>
        <div class="input-bord">
          <input
            id="datepicker"
            class="form-control"
            type="date"
            :min=""
            :max=""
            v-model="reservation.date"
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Time </label>
        <div class="input-bord">
          <!-- <b-form-select  v-model="reservation.time" :options="this.$store.state.schedule"></b-form-select> -->
          <!-- <Select :options="options"/> -->
          <!-- <select
         id="numpeople" class="form-select form-control" 
          name="time"
          v-model="reservation.time"
        >
          <option
            v-for="(time, idx) in this.$store.state.schedule"
            :key="idx"
            id="options"
            label="Reservation Time"
            v-bind:value="time"
          ></option>
        </select> -->
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Guests </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="number"
            name="guests"
            :placeholder="reservation.guests"
            v-model="reservation.guests"
            max="6"
            min="1"
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Mobile </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="text"
            name="mobile"
            :placeholder="reservation.mobile"
            v-model="reservation.mobile"
            required
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <label> Special Requests </label>
        <div class="input-bord">
          <input
            class="form-control"
            type="text"
            name="requests"
            :placeholder="reservation.requests"
            v-model="reservation.requests"
          />
        </div>
      </div>
      <div class="mb-3 form-section">
        <button
          id="confirm"
          class="btn btn-primary d-block w-100"
          type="submit"
        >
          {{ btnLabel }}
        </button>
      </div>
    </form>
    <div class="errors" v-if="errors.length">
      <p>Please correct the following error(s):</p>
      <ul>
        <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import api from "@/services/api";

export default {
  name: "ReservationForm",
  props: {
    action: {
      type: String,
      required: true,
    },
    btnLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      reservation: {},
      schedule: [],
      options: [],
    };
  },
  methods: {
    async checkFormAndSubmit() {
      this.errors = [];
      const phoneregx = /^\d{10}$/;

      if (!this.reservation.mobile.match(phoneregx)) {
        this.errors.push("Valid Mobile Required.");
      }
      if (this.reservation.requests.length > 200) {
        this.errors.push("Add less Requests");
      }
      let sendRequest;
      if (this.errors.length === 0) {
        if (this.action === "Finalise") {
          sendRequest = await api.createReservation(
            this.$store.state.activeUser,
            this.reservation
          );
        } else {
          sendRequest = await api.updateReservation(
            this.$store.state.activeUser,
            this.$store.state.reservation._id,
            this.reservation
          );
        }
        if (sendRequest.errors.confirmation === "fail") {
          useRoute().push({ name: "PageNotFound" });
        } else {
          useRoute().push({ name: "Reservations" });
        }
      }
    },
    formatDate(date) {
      let month = "" + (date.getMonth() + 1);
      let day = "" + date.getDate();
      let year = date.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    minDate() {
      let date = new Date();
      return this.formatDate(date);
    },
    maxDate() {
      return this.formatDate(new Date(Date.now() + 6.048e8));
    },
  },
  computed: {
    start() {
      return this.$store.state.schedule[0];
    },
  },
  created() {
    if (this.action === "Finalise") {
      this.reservation.date = new Date().toJSON().slice(0, 10);
      this.reservation.time = this.$store.state.schedule;
      this.reservation.guests = "1";
      this.reservation.mobile = "Mobile Phone";
      this.reservation.requests = "Special Requests";
    } else {
      this.reservation.date = this.$store.state.reservation.date;
      this.reservation.time = this.start();
      this.reservation.guests = this.$store.state.reservation.guests;
      this.reservation.mobile = this.$store.state.reservation.mobile;
      this.reservation.requests = this.$store.state.reservation.requests;
    }
    this.reservation.name = this.$store.state.selectedRestaurant;
    this.reservation.status = "Processing";
    const route = useRoute();
    // update the selected restaurants schedule of confirmed bookings
    this.$store.dispatch("updateCurrentSchedule", route.params.restaurant);
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_reservation-form.scss";
</style>
