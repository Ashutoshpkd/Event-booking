const bcrypt = require('bcryptjs');
const Bookings = require('../models/bookings');
const Event = require('../models/event');
const User = require('../models/user');

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const getSingleEvent = async eventId => {
    const event = await Event.findById(eventId);
    return {
        ...event._doc,
        _id: event.id,
    }
};

const getUser = async userId => {
    const user = await User.findById(userId);
    return {
        ...user._doc,
        _id: user.id,
    }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5c0fbd06c816781c518e4f3e'
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById('5c0fbd06c816781c518e4f3e');

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  bookings: async () => {
      try {
        const bookedEvents = await Bookings.find();
        const response = bookedEvents.map(bookedEvent => {
          return {
              ...bookedEvent._doc,
              _id: bookedEvent.id,
              createdAt: new Date(bookedEvent._doc.createdAt).toString(),
              updatedAt: new Date(bookedEvent._doc.updatedAt).toString(),
              event: getSingleEvent.bind(this, bookedEvent._doc.event),
              user: getUser.bind(this, bookedEvent._doc.user),
          }
        });
        return response;
      } catch (error) {
          throw error;
      }
  },
  createBooking: async args => {
      try {
        const booking = new Bookings({
            event: args.eventId,
            user: '621dc1e9b9f31e3b1a91e653'
        });
        const result = await booking.save();
        return {
            ...result._doc,
            _id: result.id,
            createdAt: new Date(result._doc.createdAt).toString(),
            updatedAt: new Date(result._doc.updatedAt).toString(),
            event: getSingleEvent.bind(this, result._doc.event),
            user: getUser.bind(this, result._doc.user),
        };
      } catch (error) {
          throw error;
      }
  },
  cancleBooking: async args => {
      try {
        const cancledBooking = await Bookings.findByIdAndDelete(args.bookingId);
        const event = await Event.findById(cancledBooking._doc.event);
        return {
            ...event._doc,
            _id: event.id,
            creator: user.bind(this, event._doc.creator),
        }
      } catch (error) {
          throw error;
      }
  }
};