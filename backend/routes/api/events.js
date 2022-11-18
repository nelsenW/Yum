const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Event = mongoose.model("Event");
const { requireUser } = require("../../config/passport");
const validateEventInput = require("../../validations/events");
const upload = require("./image-upload");

//find events by userId
router.get("/users/:userId", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const events = await Event.find({
      $or: [{ host: user._id }, { guestsLists: user._id }],
    })
      .sort({ createdAt: -1 })
      .populate("host", "_id, username")
      .populate("guestLists", "_id, username");
      return res.json(events);
    }
    catch(err) {
      return res.json(user);
    }
  })

//find events by event id
router.get("/:id", async (req, res, next) => {
  try {
    const events = await Event.findById(req.params.id).populate(
      "host",
      "id, username"
    );
    return res.json(events);
  } catch (err) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
});

  //index all events
  router.get('/', async (req, res) => {
    try {
      if (req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const events = await Event.find({title: regex})
                                  .populate("host", "_id, username")
                                  .populate("guestLists", "_id, username")
                                  .sort({ createdAt: -1 });
        let noMatch;
        if (events.length < 1 ){
          noMatch = "No Events match that query, please try again"
        }
        return res.json(events);
      } else {
        const events = await Event.find()
                                  .populate("host", "_id, username")
                                  .populate("guestLists", "_id, username")
                                  .sort({ createdAt: -1 });
        return res.json(events);
      }
    }
    catch(err) {
      return res.json([]);
    }
  });

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  //create new event
  router.post('/', requireUser, validateEventInput, async (req, res, next) => {
    try {
      const newEvent = new Event({
        ...req.body
      });

      let event = await newEvent.save();
      event = await event.populate([{path:'host', select:'_id, username'}, {path:'guestLists', select:'_id, username'}]);
      return res.json(event);
    }
    catch(err) {
      next(err);
    }
  });

  router.post("/:eventId/postImages", function (req, res) {
    const eventId = req.params.eventId;
  
    upload.array("images", 5)(req, res, async function (err) {
      if (err) {
        console.log(err);
      } else {
        const newImages = req.files.map((file) => file.location);
  
        let modified = await Event.findByIdAndUpdate(eventId, {
          images: newImages,
        });
  
        return res.json();
      }
    });
  });

  //update event
  router.patch('/:id/', requireUser, validateEventInput, async (req, res, next) => {
    try {
        // const userID = req.query.userId
        const filter = {_id: req.params.id}
        const update = { "$set" :{ ...req.body}}
        const newEvent = await Event.findOneAndUpdate( filter, update, {new: true})
        // if (userID !== newEvent.host._id.toString()) throw "User has to be host";
        let event = await newEvent.save();
        event = await event.populate([{path:'host', select:'_id, username'}, {path:'guestLists', select:'_id, username'}]);
        return res.json(event);

    }
    catch(err) {
      const error = new Error('Something went wrong');
      error.statusCode = 404;
      error.errors = {
        message: "Something went wrong, User has to be the host to patch",
      };
      next(error);
    }
  }
);

//delete event
router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const newEvent = await Event.deleteOne({ _id: req.params.id });
    return res.json("Event delete");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
