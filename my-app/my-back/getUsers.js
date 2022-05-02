var mysql = require('mysql');
var axios = require("axios");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pronote_back"
});

var url = "https://randomuser.me/api";

//Connect the back to the database
connection.connect(async function(err) {
    if (err) throw err;
    console.log("Connected to CUBE 3 database!")

    //make a loop to fetch 30 different profiles of users
    for (var i = 0; i < 30; i++) {
        //get axios to connect to the url of the api generating fake people details
        await axios.get(url).then( function(response){
            result = response.data;
            

            var sql = "INSERT INTO customers (name,) VALUES ('Company Inc', 'Highway 37')";

            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
        })
    }
});

