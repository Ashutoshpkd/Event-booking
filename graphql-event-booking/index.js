const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');
const { json } = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Events {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        input Event {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Events!]!
        }
        type RootMutation {
            createEvent(event: Event): Events!
        }
        schema {
            query: RootQuery,
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: async () => {
            const response = await Event.find();
            const results = response.map(event => {
                const data = {...event._doc, _id: event.id};
                return data;
            });
            return results;
        },
        createEvent: async (args) => {
            const event = new Event({
                title: args.event.title,
                description: args.event.description,
                price: args.event.price,
                date: new Date(args.event.date),
            });

            const response = await event.save();
            console.log('Response', response._doc);
            return response._doc;
        }
    },
    graphiql: true,
}));
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0.9tjtu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
      console.log('Connected to port 3000');
      app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });