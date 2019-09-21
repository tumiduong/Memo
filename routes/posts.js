/*
 * All routes for Posts are defined here
 * This file is loaded in server.js into /posts,
 *   these routes are mounted onto /posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT posts.* FROM posts
    LEFT JOIN users ON users.id = posts.user_id
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN ratings ON posts.id = ratings.post_id
    LEFT JOIN likes ON posts.id = likes.post_id
    LEFT JOIN collections ON collections.id = posts.collection_id
    GROUP BY posts.id
    ORDER BY posts.posted_at DESC
    LIMIT 10;`)
      .then(data => {
        console.log(data.rows);
        res.render("index");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/new", (req, res) => {
    db.query(` SELECT name FROM users
    JOIN posts ON users.id = posts.user_id
    `)
      .then(data => {
        console.log(data.rows);
        res.render("new_post");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.get("/:params", (req, res) => {
  //   const queryString = `SELECT * FROM posts
  //   WHERE title LIKE $1
  //   ORDER BY created_at DESC
  //   LIMIT 10`;
  //   const values = [':params'];
  //   db.query(queryString, values)
  //     .then(data => {
  //       console.log(data.rows);
  //       res.render("posts");
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  router.post("/", (req, res) => {
    db.query(`INSERT INTO posts ()`)
      .then(data => {
        console.log(data.rows);
        res.redirect(`/posts/${post_id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:post_id", (req, res) => {
    const queryString = `SELECT * FROM posts
    JOIN users ON users.id = posts_user_id
    JOIN comments ON posts.id = comments.post_id
    JOIN ratings ON posts.id = ratings.post_id
    JOIN likes ON posts.id = likes.post_id
    WHERE posts.pd = $1
    `;
    const values = [req.params.post_id];
    db.query(queryString, values)
      .then(data => {
        const posts = data.rows;
        const templateVars = { posts }
        res.render("show_post", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:post_id/edit", (req, res) => {
    db.query(`SELECT * FROM posts
    JOIN users ON users.id = posts_user_id
    JOIN comments ON posts.id = comments.post_id
    JOIN ratings ON posts.id = ratings.post_id
    JOIN likes ON posts.id = likes.post_id
    WHERE posts.pd = :post_id
    `)
      .then(data => {
        console.log(data.rows);
        res.render("new_post");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:post_id", (req, res) => {
    db.query(`SELECT * FROM posts
    JOIN users ON users.id = posts_user_id
    JOIN comments ON posts.id = comments.post_id
    JOIN ratings ON posts.id = ratings.post_id
    JOIN likes ON posts.id = likes.post_id
    WHERE posts.pd = :post_id
    `)
      .then(data => {
        console.log(data.rows);
        res.redirect("/:post_id");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:post_id/delete", (req, res) => {
    db.query(`DELETE FROM posts
    WHERE posts.id = :post_id`)
      .then(data => {
        console.log(data.rows);
        res.redirect("/posts");
      })
  });

  return router;
};
