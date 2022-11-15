const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: {
            type: String,
            enum:['Point'],
            required:true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    event_type: {
        type: String,
        default: 'both',
        enum:['in-person','to-go','both']
    },
    host:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    guests: [{
        type: Schema.Types.ObjectId,
        ref: "User"
        }],
    restrictions: {
        type: [String]
    }}, {
    timestamps: true
  });

  module.exports = mongoose.model('Event', eventSchema);
