// server.js
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/user.route.js");
const authRoutes = require("./src/routes/auth.route.js");
const negoRoutes = require("./src/routes/nego.route.js");
const { initializeSocketServer } = require("./src/api/socket.js");

const app = express();

app.use(cors());
app.use(express.json()); // middleware to let express know that we're going to use json
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
dotenv.config();

require("./src/utils/passport.js");

// Replace 'YOUR_MONGODB_URI' with your MongoDB connection string
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/nego", negoRoutes);

app.get("/home", (req, res) => {
  //   console.log("ehehhe");
  res.json("hehe ahha");
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

initializeSocketServer(server);
