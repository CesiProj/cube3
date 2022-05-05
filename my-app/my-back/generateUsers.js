const mysql = require("mysql");
const axios = require("axios");
const express = require("express")
const app = express()

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pronote_back",
});

var studentsUrl = "https://randomuser.me/api/?results=100&nat=fr";
var teacherUrl = "https://randomuser.me/api/?results=7&nat=fr";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Connect the back to the database
connection.connect(async function (err) {
  if (err) throw err;
  console.log("Connected to OnlySchool database!");

  //get axios to connect to the url of the api generating fake people details
  await axios.get(studentsUrl).then(function (response) {
    var result = response.data.results;
    var dataFiltered = result.filter((user) => user.dob.age <= 30);
    //for each user in the api render,
    dataFiltered.forEach((result) => {
      var user = {};
      if (result.gender == "male") {
        user.sexe = "m";
      } else {
        user.sexe = "f";
      }
      user.f_name = result.name.first;
      user.l_name = result.name.last;
      user.age = result.dob.age;

      var sql =
        "INSERT INTO student (f_name, l_name, age, sexe) VALUES ('" +
        user.f_name +
        "','" +
        user.l_name +
        "','" +
        user.age +
        "','" +
        user.sexe +
        "')";

      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 student inserted");
      });
    });
  });

  //do the same for teachers without the age filter
  await axios.get(teacherUrl).then(function (response) {
    var result = response.data.results;
    var dataFiltered = result.filter((user) => user.dob.age >= 30);

    //for each user in the api render,
    dataFiltered.forEach((result) => {
      var user = {};
      if (result.gender == "male") {
        user.sexe = "m";
      } else {
        user.sexe = "f";
      }
      user.f_name = result.name.first;
      user.l_name = result.name.last;
      user.age = result.dob.age;

      var sql =
        "INSERT INTO teacher (f_name, l_name, age, sexe) VALUES ('" +
        user.f_name +
        "','" +
        user.l_name +
        "','" +
        user.age +
        "','" +
        user.sexe +
        "')";

      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 teacher inserted");
      });
    });
  });
});