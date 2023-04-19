const {connection} = require('../server');

const path = (app)=>{
  app.get('/abonnement', (req, res)=>{
    connection.query('SELECT * FROM abonnement;', 
    [],
    (err, results)=>{
      if (err) throw err;
      res.json(results)
    })
  })

  app.get('/abonnement/:id', (req, res)=>{
    const id_abonnement = req.params.id;
    connection.query('SELECT * FROM abonnement WHERE id_abonnement = ?;', 
    [id_abonnement],
    (err, results)=>{
      if (err) throw err;
      res.json(results)
    })
  })

  app.post('/abonnement', (req, res) => {
    const { titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif } = req.body;
    
    if (!titre) {
      res.status(400).json({ error: 'Le titre est obligatoire' });
      return;
    }
  
    connection.query(
      'INSERT INTO abonnement(titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      [titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur du serveur');
        } else {
          res.status(201).json({ message: 'Abonnement créé avec succès' });
        }
      }
    )
  });
  
  app.delete('/abonnement/:id', (req, res) => {
    const id_abonnement = req.params.id;
    connection.query('DELETE FROM abonnement WHERE id_abonnement = ?', [id_abonnement], (err, results) => {
      if (err) throw err;
      if(results.affectedRows === 0) {
        res.status(404).send('Abonnement non trouvé');
      } else {
        res.status(200).json({ message: 'Abonnement supprimé avec succès'});
      }
    });
  });
}

module.exports = path;