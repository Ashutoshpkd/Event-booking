const eventResolver = require('../resolvers/event');
const userResolver = require('../resolvers/user');
const bookingResolver = require('../resolvers/booking');

const rootResolver = {
    ...eventResolver,
    ...userResolver,
    ...bookingResolver,
};

module.exports = rootResolver;