const mysql = require("mysql");
const axios = require("axios");
const express = require("express");
const crypto = require("crypto");
const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zizi",
});

var studentsUrl = "https://randomuser.me/api/?results=100&nat=fr";
var teacherUrl = "https://randomuser.me/api/?results=7&nat=fr";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Connect the back to the database
connection.connect(async function (err) {
  if (err) throw err;
  console.log("Connected to OnlySchool database!");
});

// Register d'un nouvel utilisateur dans la db
app.get("/register/:firstname/:lastname/:age/:sexe/:password", (req, res) => {
  connection.query(
    "SELECT * FROM student WHERE f_name=?",
    [req.params.firstname],
    function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send(
          "OnlySchool : Erreur base de données, utilisation correcte de l'url "
        );
      } else if (result.length === 0) {
        connection.query(
          "INSERT INTO student (f_name,l_name, age, sexe, password) VALUES('" +
            req.params.firstname +
            "', '" +
            req.params.lastname +
            "', '" +
            req.params.age +
            "', '" +
            req.params.sexe +
            "', '" +
            req.params.password +
            "')",
          function (err, result, fields) {
            if (err) throw err;
            res.send(" OnlySchool : Utilisateur enregistré.");
          }
        );
      } else {
        res.send("OnlySchool : Erreur base de données, utilisateur existant.");
      }
    }
  );
  console.log(req.params);
});

// Login d'un utilisateur dans la db
app.get("/login/:firstname/:lastname/:password", (req, res) => {
  connection.query(
    "SELECT * FROM student WHERE f_name=? AND l_name=? AND password=?",
    [req.params.firstname, req.params.lastname, req.params.password],
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else if (result.length === 1) {
        const id = crypto.randomBytes(20).toString("hex");
        connection.query(
          "UPDATE student SET token = '" +
            id +
            "' WHERE f_name=? AND l_name=? AND password=?",
          [req.params.firstname, req.params.lastname, req.params.password],
          function (err, result, fields) {
            if (err) throw err;
            else res.send(id);
          }
        );
      } else {
        res.send("OnlySchool : Utilisateur Inconnu");
      }
    }
  );
});

app.listen(9090, () => {
  console.log("OnlySchool : Serveur à l'écoute");
});
