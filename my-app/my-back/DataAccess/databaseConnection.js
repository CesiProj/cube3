function dbConnect(mysql, app) {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pronote_back",
  });

  //utilise express pour activer un system de CORS
  //   app.use(function (res, next) {
  //     res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  //     res.header(
  //       "Access-Control-Allow-Headers",
  //       "Origin, X-Requested-With, Content-Type, Accept"
  //     );
  //     next();
  //   });

  //Connect the back to the database
  connection.connect(async function (err) {
    if (err) throw err;
    console.log("Connected to OnlySchool database!");
  });

  return connection;
}

module.exports = { dbConnect };
