const Event = require('../models/event');
const User = require('../models/user');
const { transformEvents } = require('../helpers/transform');
const { transformDate } = require('../helpers/date');

module.exports = {
    events: async () => {
        try {
          const events = await Event.find();
          return events.map(event => transformEvents(event));
        } catch (err) {
            console.log(`[ERROR] - in fetching events - ${err.message}`);
          throw err;
        }
      },
      createEvent: async args => {
        const event = new Event({
          title: args.event.title,
          description: args.event.description,
          price: +args.event.price,
          date: new Date(args.event.date),
          creator: '621dc1e9b9f31e3b1a91e653'
        });
        let createdEvent;
        try {
        const creator = await User.findById('621dc1e9b9f31e3b1a91e653');

        if (!creator) {
            throw new Error('User not found.');
        }
          const result = await event.save();
          createdEvent = transformEvents(result);
          creator.createdEvents.push(event);
          await creator.save();
    
          return createdEvent;
        } catch (err) {
            console.log(`[ERROR] - in creating event - ${err.message}`);
          throw err;
        }
      },
};