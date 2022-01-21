import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
const schema = require("./graphql/schema");
const { authenticate } = require("./middleware/auth");

const app = express();

app.use(authenticate);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ msg: "Welcome. Go to /graphql" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;
