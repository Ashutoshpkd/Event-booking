const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchema = require('./schema/index');
const rootResolver = require('./resolvers/index');
const middleware = require('./middleware/auth');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if(req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
 return next();
});

app.use(middleware);

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
      console.log('Connected to port 3001');
      app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  });