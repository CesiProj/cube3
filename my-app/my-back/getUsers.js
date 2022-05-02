var mysql = require("mysql");
var axios = require("axios");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pronote_back",
});

var studentsUrl = "https://randomuser.me/api/?results=1000&nat=fr";
var teacherUrl = "https://randomuser.me/api/?results=5&nat=fr";

//Connect the back to the database
connection.connect(async function (err) {
  if (err) throw err;
  console.log("Connected to CUBE 3 database!");

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
        console.log("1 user inserted");
      });
    });
  });
});
