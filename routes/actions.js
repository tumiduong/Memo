const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/like/api/:post_id", (req, res) => {
    const queryString = `INSERT INTO likes (user_id, post_id)
    VALUES ($1, $2);`;
    const values = [req.session.id, req.params.post_id];
    db.query(queryString, values)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/like/api/:post_id/delete", (req, res) => {
    const queryString = `DELETE FROM likes
    WHERE user_id = $1 AND post_id = $2;`;
    const values = [req.session.id, req.params.post_id];
    db.query(queryString, values)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/like/api/:post_id", (req, res) => {
    const queryString = `SELECT * FROM Likes
    WHERE user_id = $1 AND post_id = $2;`
    const values = [req.session.id, req.params.post_id];
    db.query(queryString, values)
      .then (data => {
        const likes = data.rows
        res.json(likes)
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      });
  })

  router.post("/rating/api/:post_id", (req, res) => {
    const queryString = `INSERT INTO ratings (user_id, post_id, value)
    VALUES ($1, $2, $3);`;
    const values = [req.session.id, req.params.post_id, req.body.rating];
    db.query(queryString, values)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/comment/api/:post_id", (req, res) => {
    const queryString = `INSERT INTO comments (user_id, post_id, content)
    VALUES ($1, $2, $3);`;
    const values = [req.session.id, req.params.post_id, req.body.content];
    db.query(queryString, values)
      .then(data => {
        res.status(200).send();
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/comment/api/:post_id', (req, res) => {
    const queryString = `SELECT comments.id, comments.user_id, users.icon as icon, users.username as username, comments.content, comments.posted_at
    FROM comments
    JOIN users ON user_id = users.id
    WHERE post_id = $1
    ORDER BY comments.id;`
    const values = [req.params.post_id]
    db.query(queryString, values)
      .then(data => {
        const comments = data.rows
        res.json(comments);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message});
      });
  });
  return router;
};
