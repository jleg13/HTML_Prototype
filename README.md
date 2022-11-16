# HTML Prototype for FullStack Application

## Description:

### DropBearTable Prototype

For this project I am implementing the **Store-Front** to the new company DropBearTable. This demo demonstrates the flow and design for the finished App
that will be created as a SPA using the MERN stack.

## Built With:

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Project details:

This demo shows the features that are going to be implemented in the SPA to meet the project criteria, these include
      
  - **Search Bar(including NavBar search)**: Some mock restaurant data has been used to demo the site. I have created basic search functionality by keyword search, currently just matching **cuisine types** for example searching indian or italian or fusion returns the restaurants of that cuisine type. This same keyword search can be accessed in the navbar across pages to give the greatest flexibility for the user.
  - **Browse All Restaurants**: The footer section has options for default searches. Here the one that is implemented is to browse all the resaurants and from here a booking can be made. Currently there are 5 mock restaurants with a placeholder image, and mock time schedule for a week of reservations.
  - **User Registration**: Depending on the timeline and scope of this project this feature might be left out and a mock user login used to demo the site.
  - **User Login**: Having a user space is vital to allowing many customers a tailored experience to managing their on reservations, so there is a login implementation with basic authentication. When details are stored and retrieved from the Mongo db validation can be alot more sofisticated.
  - **Restaurant reservation form**: There are two ways to arrive at the reservation form once loged in. First if coming from the search bar the reservation form brings in the search details, and aims to give the matching date/timeslot or 'next available' slot. The details of restaurant, date, time, and guests are already inputed and date, time, and guests can be modified. Restauarant name is fixed (if another resaurant is required you have to search again). User must also enter phone number and optional special requests. All these options have been stipulated in the functional requirments. The second route to the reservation form is from a default search like the browse all. Here the date is set to current day and other fields given default values. The calander is an interative calander that allows the days to be selected 1 week from the current day. A selection diplays the available time slots in the times drop down.
  - **Browse all user reservations**: Completing the form takes you to the My Reservations page, where details and status of each reservation can be seen. A reservation is initially processing and once completed changes to confirmed
  - **Edit and delete reservations**: To complete the basic CRUD operations stipulated in the funtional requiremments each reservation has an edit and delete option. The delete is simply a hard delete and the record of the reservation is wiped from the database. The edit option opens the registation form with the reservation details inputed and allows for changes to all of the options stipulated in the functional requirments. An edited reservation will go back into a processing state until confirmed.
  - **Push Notifications**: As per the functional requiremenents once a reservation is switched from processing to confirmed a notification is given in the top right of the browser window.
  - **Trending Restaurants Statistics**: This will be implemented in assignment 3 and will focus on trending restaurants so the user can be given details of which restaurants are popular and the most visited.

## Usage:
This Vue/Express prototype is a basic html/css/js prototype. Thus the demo can be viewed by opening the **index.html** in a browser of your choice. 
- **Note:** since the demo represents an 'ideal' use case the site is not optimised for all browsers, it has been developed on Google Chrome where it will guarentee the full prototype experience. Other browser may not experience all the features.

The demo has basic user login functionality, but the user registration page has not yet been implemented. 

To walk through the site demo from the **browsing/searching** for restaurants  phase to the **booking and editing** stage you must simulate being the test user with the following mocked details:

- User Name: **user@email.com**
- Password: **password**

## Support:
Please email joshualegresley@gmail.com if further details are required.

## Contributing:
For major changes, please open an issue first to discuss what you would like to change.
