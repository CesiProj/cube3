app.get("/login-:status/:firstName:lastName/:password", (req, res) => {
    connection.query(
      "SELECT * FROM " + req.params.status + " WHERE f_name=? AND l_name=?",
      [req.params.firstName, req.params.lastName],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          res.send(
            "API OnlySchool : Erreur base de données, utilisation correcte de l'url : login-status/firstName lastName/password"
          );
        } else if (result.length === 0) {
          res.send(
            "API OnlySchool : Utilisateur inexistant, verification échouée."
          );
        } else {
          res
            .status(204)
            .send("API OnlySchool : Utilisateur existant, connection réussie.");
          connection.query("");
        }
      }
    );
    console.log(req.params);
  });
  
  app.get(
    "/registerPassword-:status/:firstName/:lastName/:password",
    (req, res) => {
      connection.query(
        "SELECT * FROM " + req.params.status + " WHERE f_name=? AND l_name=?",
        [req.params.firstName, req.params.lastName],
        function (err, result, fields) {
          if (err) {
            console.log(err);
            res.send(
              "API OnlySchool : Erreur base de données, utilisation correcte de l'url : registerPassword/firstName/lastName/password"
            );
          } else if (result.length === 0) {
            res.send("API OnlySchool : Erreur dans le code du front?");
          } else {
            res
              .status(201)
              .send("API OnlySchool : Mot de passe créé avec succès.");
            connection.query(
              "UPDATE " +
                req.params.status +
                " SET password = '" +
                req.params.password +
                "'WHERE f_name=? AND l_name=?",
              [req.params.firstName, req.params.lastName],
              function (err) {
                if (err) throw err;
                console.log("1 " + req.params.status + " inserted");
              }
            );
          }
        }
      );
      console.log(req.params);
    }
  );
  
  app.get("/login-:status//:firstname:lastname/:password", (req, res) => {
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
  