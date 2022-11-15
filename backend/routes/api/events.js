const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validations/events');


//index all events
router.get('/', async (req, res) => {
    try {
      const events = await Event.find()
                                .populate("host", "_id, username")
                                .sort({ createdAt: -1 });
      return res.json(events);
    }
    catch(err) {
      return res.json([]);
    }
  });


  //find events by userId
  router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.userId);
    } catch(err) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: "No user found with that id" };
      return next(error);
    }
    try {
      const events = await Event.find({$or: [{ host: user._id, guests: user._id}]})
                                .sort({ createdAt: -1 })
                                .populate("host", "_id, username")
                                .populate("guests", "_id, username");
      return res.json(events);
    }
    catch(err) {
      return res.json([]);
    }
  })

  //find events by event id
  router.get('/:id', async (req, res, next) => {a
    try {
      const events = await Event.findById(req.params.id)
                               .populate("host", "id, username");
      return res.json(events);
    }
    catch(err) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      error.errors = { message: "No event found with that id" };
      return next(error);
    }
  });

  //create new event
  router.post('/', requireUser, validateEventInput, async (req, res, next) => {
    try {
      const newEvent = new Event({
        ...req.body
      });

      let event = await newEvent.save();
      event = await event.populate('host', '_id, username').populate("guests", "_id, username");
      return res.json(event);
    }
    catch(err) {
      next(err);
    }
  });

  //update event
  router.patch('/:id', requireUser, validateEventInput, async (req, res, next) => {
    try {
        const filter = {_id: req.params.id}
        const update = { "$set" :{ ...req.body}}
        const newEvent = await Event.findOneAndUpdate( filter, update, {new: true})

        let event = await newEvent.save();
        event = await event.populate('host', '_id, username').populate("guests", "_id, username");
        return res.json(event);

    }
    catch(err) {
      next(err);
    }
  });

  //delete event
  router.patch('/:id', requireUser, validateEventInput, async (req, res, next) => {

    try {
        const newEvent = await Event.deleteOne({ _id: req.params.id });
    }
    catch(err) {
      next(err);
    }
  });

  module.exports = router;
