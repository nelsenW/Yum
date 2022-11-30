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

---

## Code Snippets

1. Backend query for the event search bar. By using regular expressions that are global and case insensitive we can query for any events that may match a users search and then filter out events like that.

```javascript
// backend/routes/api/events.js line 74

router.get("/", async (req, res) => {
  try {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      const events = await Event.find({ title: regex })
        .populate("host", "_id, username")
        .populate("guestLists", "_id, username")
        .sort({ createdAt: -1 });
      let noMatch;
      if (events.length < 1) {
        noMatch = "No Events match that query, please try again";
      }
      return res.json(events);
    } else {
      const events = await Event.find()
        .populate("host", "_id, username")
        .populate("guestLists", "_id, username")
        .sort({ createdAt: -1 });
      return res.json(events);
    }
  } catch (err) {
    return res.json([]);
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
```

2. Example schema for users.

```javascript
// backend/models/User.js line 23

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    hostReviews: [reviewSchema],
    guestReviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
```

3. Address input logic for the 'create an event' form. The useAddress custom hook takes care of fetching the addresses that match the user's input and returns the search results. These results are then displayed in the AddressInput component.

```javascript
// useAdress custom hook - frontend/src/components/Map/useAddress.js

import { useState } from "react";

const useAddress = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const handleChange = async (e) => {
    setInputValue(e.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${accessToken}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();

      setSearchResults(results.features);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return {
    inputValue,
    setInputValue,
    handleChange,
    searchResults,
    setSearchResults,
  };
};

export default useAddress;
```

```javascript
// frontend/src/components/AddressInput.jsx line 32

<>
  <div className="location-container">
    <label>
      <span>Location</span>
      <input
        value={type === "edit" ? name : address.inputValue}
        onChange={(e) => {
          address.handleChange(e);
          setLocationName(e.target.value);
          setShowResultsDiv(true);
        }}
      />
    </label>

    {address.searchResults.length > 0 && showResultsDiv ? (
      <div className="location-results" ref={resultsRef}>
        {address.searchResults.map((searchResult) => {
          return (
            <div
              className="result-items"
              onClick={() => handleResultClick(searchResult)}
              key={searchResult.id}
            >
              {searchResult.place_name}
            </div>
          );
        })}
      </div>
    ) : null}
  </div>
</>
```

4. Average rating for user reviews made DRY to accept multiple types of reviews so that you don’t need to rewrite code for each different type of review.

```javascript
// frontend/src/components/UserPage/userModal.jsx line 28

const reviewsAverage = (type) => {
  if (user && user[type].length > 0) {
    return (
      user[type].reduce((acc, el) => {
        return acc.rating + el.rating;
      }) / user[type].length
    );
  }
};
```

5. DRY code for updating state based on target inputs for signup form. Refactored from previous iteration in which each field would individually call a separate function to update the state for that field.

```javascript
// frontend/src/components/SessionForms/SignupForm.jsx line 23

const update = (field) => {
  let setState;
  if (password !== password2) {
    errors.passwordMatch = "Confirm Password field must match";
  }

  switch (field) {
    case "email":
      setState = setEmail;
      break;
    case "username":
      setState = setUsername;
      break;
    case "password":
      setState = setPassword;
      break;
    case "password2":
      setState = setPassword2;
      break;
    default:
      throw Error("Unknown field in Signup Form");
  }

  return (e) => setState(e.currentTarget.value);
};
```
