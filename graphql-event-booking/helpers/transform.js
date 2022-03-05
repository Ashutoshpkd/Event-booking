const { transformDate } = require('./date');
const User = require('../models/user');
const Event = require('../models/event');

const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    } catch (err) {
        console.log(`[ERROR]: user ${err.message}`);
      throw err;
    }
  };

const events = async eventIds => {
    try {
      const events = await Event.find({ _id: { $in: eventIds } });
      return events.map(event => transformEvents(event));
    } catch (err) {
        console.log(`[ERROR]: events ${err.message}`);
      throw err;
    }
};

const transformEvents = event => {
    return {    
        ...event._doc,
        _id: event.id,
        date: transformDate(event._doc.date),
        creator: user.bind(this, event._doc.creator)
    }};

exports.transformEvents = transformEvents;