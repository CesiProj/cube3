// Import DB Connection function
import { dbConnect } from "./DataAccess/databaseConnection.js";
// // Create a require with create require
// import createRequire from "module";
// const require = createRequire(import.meta.url);

const mysql = require("mysql");
const axios = require("axios");
const express = require("express");
const app = express();

dbConnect();

app.listen(9090, () => {
  console.log("Serveur à l'écoute");
});
