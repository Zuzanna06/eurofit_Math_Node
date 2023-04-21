const { connection } = require("../server");

const path = (app) => {
  app.get("/abonnement", (req, res) => {
    connection.query("SELECT * FROM abonnement;", [], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  app.get("/abonnement/:id", (req, res) => {
    const id_abonnement = req.params.id;
    connection.query(
      "SELECT * FROM abonnement WHERE id_abonnement = ?;",
      [id_abonnement],
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });
  app.post("/abonnement", (req, res) => {
    const {
      titre,
      tout_club,
      toutes_salles,
      tout_pays,
      reduc_complement,
      reduc_medecine,
      reduc_coach,
      tarif,
    } = req.body;

    if (!titre) {
      res.status(400).json({ error: "Le titre est obligatoire" });
      return;
    }
    connection.query(
      "INSERT INTO abonnement(titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        titre,
        tout_club,
        toutes_salles,
        tout_pays,
        reduc_complement,
        reduc_medecine,
        reduc_coach,
        tarif,
      ],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Abonnement créé avec succès" });
        }
      }
    );
  });
  app.delete("/abonnement/:id", (req, res) => {
    const id_abonnement = req.params.id;
    connection.query(
      "DELETE FROM abonnement WHERE id_abonnement = ?",
      [id_abonnement],
      (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
          res.status(404).send("Abonnement non trouvé");
        } else {
          res.status(200).json({ message: "Abonnement supprimé avec succès" });
        }
      }
    );
  });
  app.put("/abonnement/:id", (req, res) => {
    const {
      titre,
      tout_club,
      toutes_salles,
      tout_pays,
      reduc_complement,
      reduc_medecine,
      reduc_coach,
      tarif,
    } = req.body;
    const id_abonnement = req.params.id;
    connection.query(
      "UPDATE abonnement SET titre = ?, tout_club = ?, toutes_salles = ?, tout_pays = ?, reduc_complement = ?, reduc_medecine = ?, reduc_coach = ?, tarif = ? WHERE id_abonnement = ?",
      [
        titre,
        tout_club,
        toutes_salles,
        tout_pays,
        reduc_complement,
        reduc_medecine,
        reduc_coach,
        tarif,
        id_abonnement,
      ],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Abonnement modifié avec succès" });
        }
      }
    );
  });
  app.patch('/abonnement/:id/:value', (req, res) => {
    const id_abonnement = req.params.id;
    let value = {};
    if (req.params.value === 'titre') {
        value = req.body.titre
        reqSql = 'UPDATE abonnement SET titre = ? WHERE id_abonnement = ?'
    } else if (req.params.value === 'tout_club') {
        value = req.body.tout_club
        reqSql = 'UPDATE abonnement SET tout_club = ? WHERE id_abonnement = ?'
    } else if (req.params.value === 'toutes_salles') {
        value = req.body.toutes_salles
        reqSql = 'UPDATE abonnement SET toutes_salles = ? WHERE id_abonnement = ?'
    } else if (req.params.value === 'tout_pays') {
        value = req.body.tout_pays
        reqSql = 'UPDATE abonnement SET tout_pays = ? WHERE id_abonnement = ?'
    } else if (req.params.value === 'reduc_complement') {
        value = req.body.reduc_complement
        reqSql = 'UPDATE abonnement SET reduc_complement = ? WHERE id_abonnement = ?'
    } else if (req.params.value === 'reduc_medecine') {
        value = req.body.reduc_medecine
        reqSql = 'UPDATE abonnement SET reduc_medecine = ? WHERE id_abonnement = ?'
    } else if (req.params.value === 'reduc_coach') {
        value = req.body.reduc_coach
        reqSql = 'UPDATE abonnement SET reduc_coach = ? WHERE id_abonnement = ?'
    } else if (req.params.value === 'tarif') {
        value = req.body.tarif
        reqSql = 'UPDATE abonnement SET tarif = ? WHERE id_abonnement = ?'
    } else {
        console.error("error");
    }
    connection.query(
      reqSql,
      [value, id_abonnement],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else {
          res.status(201).json({ message: 'Abonnement modifié avec succès' });
        }
      }
    )
  });
  //   app.patch('/abonnement/:id', (req, res) => {
  //     const query = 'UPDATE abonnement SET year = ?, month = ?, day = ?, message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  //     const params = [req.body.year, req.body.month, req.body.day, req.body.message, req.params.id];
  //     connection.query(query, params, (error, result) => {
  //       res.send({
  //         ok: true,
  //       });
  //     });
  //   });
};

module.exports = path;
