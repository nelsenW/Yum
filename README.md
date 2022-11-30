# Yum

[Live Site](https://yum.onrender.com/)

When you cook at home for one, you’re always buying too much and have limited options in what to make. Yum solves this problem by allowing users to host events and share their excess cooking. Users can not only cut down on food costs, but also share the joy of food with others! Users can also be guests of events, by which they can enjoy home cooked meals from verified chefs/hosts at a fraction of the normal cost they may pay for a meal.

---

## Technologies Used

- React.js
- Redux
- Mapbox API
- MongoDB
- Express.js
- Node.js
- Geolocation API
- HTML5
- CSS3

Yum’s core application is built around the Mapbox API to render a map with pins that represent the location of created events. The back end is built on Node.js and Express.js, and all data is stored on a MongoDB NoSQL database. The front end is built using React.js, Redux for the global state management of the application, HTML5, and CSS3.

---

## Features

### User Authentication:

- Users can create an account and login/logout with their credentials.
- Users can choose to login with a Demo User account, which will provide them with access to all of the application’s features.
- Users cannot use the application without first logging in.
- User authentication uses the passport-local node module, an extension for the passport node module, that authenticates users with a username and password combination.
- To authenticate users after registering or logging in, we make use of a JSON Web Token and send it to the client side every time a user either registers or logs in.

### Events:

- On the map, users can see events that are near their current location or at any location that they choose.
- Users can choose to attend an event and choose how many meals they would like to buy. They can also choose to unattend those events and remove them from their attending events list.
- Users can create, update and delete events that they host.
- Through the use of the Mapbox Geolocation API, users can search the desired location for their hosted event and see results that match their input.
- When an event is created, a pin is added to the location of the event on the map.
- In their profile, users can see the events that they’ve hosted, and the events that they’re attending.

### Map:

- Users can see pins on the map that represent events. Users can click on these pins and a modal pops up with details about the event and an option to attend the event.
- Users can move around the map and explore other locations, but can always return to their current location by clicking the current location button on the bottom part of the map. This is possible thanks to the Geolocation API.

### Search:

- Users can search for events and see information about the events in the search results by clicking on them.
- The search results are updated whenever the user's input changes.
- The events that are displayed in the sidebar are in sync with the search results.

### Reviews:

- Users can create, edit, and delete their reviews of hosts.
- Users can see the reviews made to event hosts, and the reviews made to them by other users.
