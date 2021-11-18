const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const config = require("./config/config");
const db = require("./database/database");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

http.listen(config.port, () => {
  console.log("Server is running in port", config.port);
});

app.use("/api", require("./routes/index"));
