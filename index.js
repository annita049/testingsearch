import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use("/users", userRoutes); // Mount user routes

mongoose.connect("mongodb://localhost:27017/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => console.log("Server running on port 5000"));
