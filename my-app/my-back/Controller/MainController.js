const ServiceUser = require("../Services/serviceUser.js");

//function that listen to post on specific url
function MainController(app) {
  //express function to get user of DB by ID
  app.get("/onlySchool-api/user/:id", function (req, res) {
    ServiceUser.getUserById(req, res);
  });

  //express function to add new user to DB
  app.get("/onlySchool-api/user/:f_name/:l_name", function (req, res) {
    ServiceUser.AddUser(req, res);
  });
}

module.exports = { MainController };
