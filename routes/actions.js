const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/like/:post_id", (req, res) => {
    const queryString = `INSERT INTO likes (user_id, post_id)
    VALUES ($1, $2);`;
    const values = [req.session.id, req.params.post_id];
    db.query(queryString, values)
      .then(() => {
        res.redirect('/posts');
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/like/:post_id/delete", (req, res) => {
    const queryString = `DELETE FROM likes
    WHERE user_id = $1 AND post_id = $2;`;
    const values = [req.session.id, req.params.post_id];
    db.query(queryString, values)
    .then(() => {
      res.redirect('/posts');
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
