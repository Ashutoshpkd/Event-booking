const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchema = require('./schema/index');
const rootResolver = require('./resolvers/index');

const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: rootResolver,
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