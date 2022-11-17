const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');

router.get('/', async (req, res) => {

    const queryParams = req.query.searches.split(" ")
    const query = { $text: { $search: req.query.searches } };

    const projection = {
        _id: 0,
        title: 1,
        // description: 1,
        // price: 1,
        // location: 1,
        // eventType: 1,
        // host: 1,
        // guests: 1,
        // restrictions: 1,
      };

    try {
        db.inventory.createIndex({ "name": "text"})
        const events = await Event.find({ $text: { $search: "pasta" }}).pretty()
    //   const events = await Event.find(query, projection)
        //                         .populate("host", "_id, username")
        //                         .sort({ createdAt: -1 });
        // console.log("query:", query)
        console.log("events:", events)
      return res.json("hello");
    }
    catch(err) {
      return res.json("Something went Wrong");
    }
  });

  module.exports = router;
