const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
//environment variables or constants
env.config();

//mongoDB connection
//mongodb+srv://root:<password>@cluster0.u7cx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.u7cx5.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("database connected successfully");
  });

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running port ${process.env.PORT}`);
});
