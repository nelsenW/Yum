const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');
const { db } = require('../../models/Event');

router.get('/', async (req, res) => {

    try {
      console.log(req.query.search)
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      console.log(regex)
        const events = await Event.find({ title: regex })
    //   const events = await Event.find(query, projection)
        //                         .populate("host", "_id, username")
        //                         .sort({ createdAt: -1 });
        // console.log("query:", query)
        console.log("events:", events)
      return res.json(events);
    }
    catch(err) {
      return res.json("Something went Wrong");
    }
  });

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  module.exports = router;
