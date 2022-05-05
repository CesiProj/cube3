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
});


app.get('/register-:status/:firstName/:lastName', (req,res) => {
  connection.query("SELECT * FROM "+ req.params.status +" WHERE f_name=? AND l_name=?" , [req.params.firstName, req.params.lastName], function (err, result, fields) {
    if (err) {
      console.log(err)
      res.send("API OnlySchool : Erreur base de données, utilisation correcte de l'url : register-status/firstName/lastName")
    }
    else if (result.length === 0)
    {
      res.send("API OnlySchool : Utilisateur inexistant, verification échouée.")
    }
    else {
      res.status(204).send("API OnlySchool : Utilisateur existant, connection réussie.")
      console.log("SAlijizejfizdjji")
    }
  })
  console.log(req.params)
})

app.get('/registerPassword-:status/:firstName/:lastName/:password', (req, res) => {
  connection.query("SELECT * FROM "+ req.params.status +" WHERE f_name=? AND l_name=?" , [req.params.firstName, req.params.lastName], function(err, result, fields) {
    if (err) {
      console.log(err)
      res.send("API OnlySchool : Erreur base de données, utilisation correcte de l'url : registerPassword/firstName/lastName/password")
    }
    else if (result.length === 0)
    {
      res.send("API OnlySchool : Erreur dans le code du front?")
    }
    else {
      res.status(201).send("API OnlySchool : Mot de passe créé avec succès.")
      connection.query("UPDATE "+ req.params.status +" SET password = '" + req.params.password + "'WHERE f_name=? AND l_name=?" , [req.params.firstName, req.params.lastName],  function (err) {
        if (err) throw err;
        console.log("1 "+ req.params.status +" inserted");
      });
    }
  })
  console.log(req.params)
})

app.listen(9090, () => {
  console.log("Serveur à l'écoute")
})
