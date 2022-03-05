const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Events!
    user: User!
    createdAt: String!
    updatedAt: String!
}
type AuthData {
    userId: ID!
    email: String!
    token: String!
    expiresIn: Int!
}
type Events {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}
type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Events!]
}
input Event {
    title: String!
    description: String!
    price: Float!
    date: String!
}
type RootQuery {
    events: [Events!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}
type RootMutation {
    createEvent(event: Event): Events
    createUser(email: String!, password: String!): User
    createBooking(eventId: ID!): Booking
    cancleBooking(bookingId: ID!): Events
}
schema {
    query: RootQuery,
    mutation: RootMutation
}
`);
