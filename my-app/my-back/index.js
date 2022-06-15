// Import DB Connection function
const mainController = require("./Controller/MainController.js");
const dbConnect = require("./DataAccess/databaseConnection.js");
// // Create a require with create require
// import createRequire from "module";
// const require = createRequire(import.meta.url);

const mysql = require("mysql");
const axios = require("axios");
const express = require("express");
const app = express();

dbContext = dbConnect.dbConnect(mysql, app);
mainController.MainController(app);
app.listen(9090, () => {
  console.log("Serveur à l'écoute");
});
