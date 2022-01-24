import app from "./app";
import { connectDB } from "./db";
import { PORT } from "./config";

connectDB();

app.listen(PORT, () => {
  console.log("#####################");
  console.log("#### API GraphQL ####");
  console.log("#####################");
  console.log("Server on port", PORT);
});
