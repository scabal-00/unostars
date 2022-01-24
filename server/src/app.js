import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import { authenticate } from "./middleware/auth";
import cors from "cors";

const app = express();

app.use(cors());
// app.use(authenticate);

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
