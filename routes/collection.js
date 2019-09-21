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
  return router
}
