var mysql = require('mysql');
var axios = require("axios");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pronote_back"
});

var studentsUrl = "https://randomuser.me/api/?results=2";
var teacherUrl = "https://randomuser.me/api/?results=5";


//Connect the back to the database
connection.connect(async function(err) {
    if (err) throw err;
    console.log("Connected to CUBE 3 database!")

    //make a loop to fetch 30 different profiles of users

        //get axios to connect to the url of the api generating fake people details
        await axios.get(studentsUrl).then( function(response){
            var result = response.data.results;

            result.forEach(result => {
                var user = {};
                if (result.gender == 'male') {
                    user.sexe = "m"
                } else {
                    user.sexe = "f"
                }
                user.f_name = result.name.first;
                user.l_name = result.name.last;
                user.age = result.dob.age;

                // var sql = "INSERT INTO students (f_name, l_name, age, sexe) VALUES (";

                // con.query(sql, function (err, result) {
                //   if (err) throw err;
                //   console.log("1 user inserted");
                // });

            });
        })
    
});

