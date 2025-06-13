require("dotenv").config();
const express = require("express");
const authMiddleware = require("../server/middleware/authMiddleware");
const app = express();
const cors = require("cors");
const cookieP = require("cookie-parser");
require("./connection/connect");

const userApi = require("./controllers/user");
const taskApis = require("./controllers/task");
const gemini = require("./controllers/gemini");


app.use(express.json());
app.use(cookieP());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors({
  origin: "http://localhost:5173",
  credentials:true,
}));


app.get("/", (req, res) => {
  res.send("hi");
});
app.use("/api/v1",userApi);
app.use("/api/v1/gemini",gemini);
app.use("/api/v1/tasks",authMiddleware, taskApis);

app.listen(1000, () => {
  console.log("server started");
});
