const { log } = require("console");
const mongoose = require("mongoose");
const app = require("./app");
const PORT_SERVER = process.env.PORT || 3978; //PORT_SERVER
const { API_VERSION, IP_SERVER, PORT_DB, DB_NAME } = require("./config"); //PORT_DB

mongoose.set("useFindAndModify", false);

mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, result) => {
    if (error) throw error;

    console.log("The connection with the database is established");
    console.log(`mongodb://${IP_SERVER}:${PORT_DB}/${DB_NAME}`);

    app.listen(PORT_SERVER, () => {
      console.log("#####################");
      console.log("###### API GraphQL #####");
      console.log("#####################");
      console.log(`http:${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
    });
  }
);
