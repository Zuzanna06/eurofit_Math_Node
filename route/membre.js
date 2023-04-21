const { connection } = require("../server");

const path = (app) => {
  app.get("/membre", (req, res) => {
    connection.query(
      "SELECT m.nom_membres, m.prenom_membres, m.tel, m.mail, c.nom_club, a.titre FROM membres m INNER JOIN club c ON m.id_club = c.id_club INNER JOIN abonnement a ON m.id_abonnement = a.id_abonnement;",
      [],
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });
  app.get("/membre/:id", (req, res) => {
    const id_membres = req.params.id;
    connection.query(
      "SELECT * FROM membres WHERE id_membres = ?;",
      [id_membres],
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });
  app.get("/membre/nom/:nom", (req, res) => {
    const nom = req.params.nom;
    connection.query(
      'SELECT m.nom_membres, m.prenom_membres, m.tel, m.mail, c.nom_club, a.titre FROM membres m INNER JOIN club c ON m.id_club = c.id_club INNER JOIN abonnement a ON m.id_abonnement = a.id_abonnement WHERE prenom_membres LIKE ?;',
      [nom],
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });

  app.post("/membre", (req, res) => {
    const {
      nom_membres,
      prenom_membres,
      tel,
      mail,
      certificat_medical,
      card_number,
      card_date,
      CCV,
      password,
      id_club,
      id_abonnement,
      id_medecin,
      id_adresse,
    } = req.body;

    if (!nom_membres) {
      res.status(400).json({ error: "Le titre est obligatoire" });
      return;
    }
    connection.query(
      "INSERT INTO membres(nom_membres, prenom_membres, tel, mail, certificat_medical, card_number, card_date, CCV, password, id_club, id_abonnement, id_medecin, id_adresse) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nom_membres,
        prenom_membres,
        tel,
        mail,
        certificat_medical,
        card_number,
        card_date,
        CCV,
        password,
        id_club,
        id_abonnement,
        id_medecin,
        id_adresse,
      ],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Membre créé avec succès" });
        }
      }
    );
  });
  app.delete("/membre/:id", (req, res) => {
    const id_membres = req.params.id;
    connection.query(
      "DELETE FROM membres WHERE id_membres = ?",
      [id_membres],
      (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
          res.status(404).send("Membre non trouvé");
        } else {
          res.status(200).json({ message: "Membre supprimé avec succès" });
        }
      }
    );
  });
  app.patch("/membre/:id", (req, res) => {
    const {
      nom_membres,
      prenom_membres,
      tel,
      mail,
      certificat_medical,
      card_number,
      card_date,
      CCV,
      password,
      id_club,
      id_abonnement,
      id_medecin,
      id_adresse,
    } = req.body;
    const id_membres = req.params.id;
    connection.query(
      "UPDATE membres SET nom_membres = ?, prenom_membres = ?, tel = ?, mail = ?, certificat_medical = ?, card_number = ?, card_date = ?, CCV = ?, password = ?, id_club = ?, id_abonnement = ?, id_medecin = ?, id_adresse = ? WHERE id_membres = ?",
      [
        nom_membres,
        prenom_membres,
        tel,
        mail,
        certificat_medical,
        card_number,
        card_date,
        CCV,
        password,
        id_club,
        id_abonnement,
        id_medecin,
        id_adresse,
        id_membres,
      ],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Membre modifié avec succès" });
        }
      }
    );
  });
};

module.exports = path;
