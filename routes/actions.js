const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/like/:id", (req, res) => {
    console.log("hi");
    const queryString = `INSERT INTO likes (user_id, post_id)
    VALUES ($1, $2);`;
    const values = [req.session.id, req.params.id];
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

  router.post("/comment/:id", (req, res) => {
    const queryString = `INSERT INTO comments (user_id, post_id, content)
    VALUES ($1, $2, $3);`;
    const values = [req.session.id, req.params.id, req.body.content];
    db.query(queryString, values)
      .then(() => {
        res.redirect(`/posts/${req.params.id}`)
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
