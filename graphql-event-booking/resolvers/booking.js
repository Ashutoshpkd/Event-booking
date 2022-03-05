const Bookings = require('../models/bookings');
const Event = require('../models/event');
const User = require('../models/user');
const { transformDate } = require('../helpers/date');
const { transformEvents } = require('../helpers/transform');


const getSingleEvent = async eventId => {
    const event = await Event.findById(eventId);
    return transformEvents(event);
};

const getUser = async userId => {
    const user = await User.findById(userId);
    return {
        ...user._doc,
        _id: user.id,
    }
};

module.exports = {
      bookings: async (args, req) => {
          try {
            if(!req.isAuth) {
                throw new Error('User not authorised.')
            }
            const bookedEvents = await Bookings.find();
            const response = bookedEvents.map(bookedEvent => {
              return {
                  ...bookedEvent._doc,
                  _id: bookedEvent.id,
                  createdAt: transformDate(bookedEvent._doc.createdAt),
                  updatedAt: transformDate(bookedEvent._doc.updatedAt),
                  event: getSingleEvent.bind(this, bookedEvent._doc.event),
                  user: getUser.bind(this, bookedEvent._doc.user),
              }
            });
            return response;
          } catch (error) {
              console.log(`[ERROR] - Finding the bookings - ${error.message}`);
              throw error;
          }
      },
      createBooking: async (args, req) => {
          try {
            if(!req.isAuth) {
                throw new Error('User not authorised.')
            }
            const booking = new Bookings({
                event: args.eventId,
                user: req.userId
            });
            const result = await booking.save();
            return {
                ...result._doc,
                _id: result.id,
                createdAt: transformDate(result._doc.createdAt),
                updatedAt: transformDate(result._doc.updatedAt),
                event: getSingleEvent.bind(this, result._doc.event),
                user: getUser.bind(this, result._doc.user),
            };
          } catch (error) {
            console.log(`[ERROR] - Create Booking - ${error.message}`);
              throw error;
          }
      },
      cancleBooking: async (args, req) => {
          try {
            if(!req.isAuth) {
                throw new Error('User not authorised.')
            }
            const cancledBooking = await Bookings.findByIdAndDelete(args.bookingId);
            if(!cancledBooking) {
                throw new Error('Booking does not exist.');
            }
            const event = await Event.findById(cancledBooking._doc.event);
            return transformEvents(event);
          } catch (error) {
              console.log(`[ERROR] - Cancel Booking - ${error.message}`);
              throw error;
          }
      },
};