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
    db.query(`SELECT posts.id, posts.title, posts.url, posts.description, posts.posted_at, COUNT(DISTINCT comments) AS nbComments, COUNT(DISTINCT ratings) AS nbRratings, (SELECT ROUND(AVG(value), 1) FROM ratings WHERE posts.id = post_id) AS avgRating
    FROM posts
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN ratings ON posts.id = ratings.post_id
    GROUP BY posts.id
    ORDER BY posts.posted_at;`)
      .then(data => {
        const posts = data.rows;
        const templateVars = { posts };
        console.log(templateVars);
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/new", (req, res) => {
    res.render("new_post");
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
    db.query(`INSERT INTO posts (user_id, collection_id, title, url, description)
    VALUES ()`)
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
    const queryString = `SELECT posts.id, posts.title, posts.url, posts.description, posts.posted_at,
    COUNT(DISTINCT comments) AS nbComments, COUNT(DISTINCT ratings) AS nbRratings,
    (SELECT ROUND(AVG(value), 1) FROM ratings WHERE posts.id = post_id) AS avgRating
    FROM posts
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN ratings ON posts.id = ratings.post_id
    WHERE posts.id = $1
    GROUP BY posts.id
    `;
    const values = [req.params.post_id];
    db.query(queryString, values)
      .then(data => {
        console.log(data.rows);
        res.render("show_post");
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
    db.query(``)
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
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
