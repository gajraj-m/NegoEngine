// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./src/routers/user.js");

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(userRouter);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});