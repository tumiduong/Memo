const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    const queryString = `
    SELECT *
    FROM collections
    WHERE collections.id = $1`
    const queryParams = [req.params.id]

    db.query(queryString, queryParams)
       .then(data => {
         console.log(data);
       })
       .catch(err => {
         console.log(err.stack);
       })
  })

  router.get('/api/:username', (req, res) => {
    const queryString = `
    SELECT collections.*
    FROM users
    JOIN collections ON users.id = owner_id
    WHERE users.username = $1;`
    const queryParams = [req.params.username];

    db.query(queryString, queryParams)
      .then(data => {
        collections = data.rows
        res.json(collections);
      })
      .catch(err => {
        console.log(err.stack);
      })
  })
  return router
}
