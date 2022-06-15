function getUserById(req, res) {
  connection.query(
    "SELECT * FROM student WHERE ID=?",
    [req.params.id],

    (err, result) => {
      if (err) {
        console.log(err);
        res.send(
          "API OnlySchool : Erreur base de données, utilisation correcte de l'url : /onlySchool-api/user/id"
        );
      } else if (result.length === 0) {
        res.send(
          "API OnlySchool : Utilisateur inexistant, verification échouée."
        );
      } else {
        console.log(result);
        res.status(200).send("L'utilisateur récupéré est le suivant", result);
      }
    }
  );
}

function AddUser(req, res) {
  connection.query(
    "INSERT INTO student (f_name, l_name) VALUES ('" +
      [req.params.f_name] +
      "','" +
      [req.params.l_name] +
      "')",

    (err, result) => {
      if (err) {
        console.log(err);
        res.send(
          "API OnlySchool : Erreur base de données, utilisation correcte de l'url : /onlySchool-api/user/f_name/l_name"
        );
      } else if (result.length === 0) {
        res.send("API OnlySchool : Aucun ajout d'Utilisateur dans la BDD.");
      } else {
        console.log(result);
        res.status(200).send("Utilisateur ajouté dans la BDD");
      }
    }
  );
}

module.exports = { getUserById, AddUser };
