/*
 * All routes for Posts are defined here
 * This file is loaded in server.js into /posts,
 *   these routes are mounted onto /posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Show all the posts
  router.get("/", (req, res) => {
    db.query(`SELECT posts.id, posts.title, posts.url, posts.description, posts.posted_at, (SELECT COUNT(DISTINCT comments) FROM comments WHERE posts.id = post_id) as nbComments, COUNT(DISTINCT ratings) AS nbRratings, ROUND(AVG(value), 1) AS avgRating
    FROM posts
    LEFT JOIN ratings ON posts.id = ratings.post_id
    GROUP BY posts.id
    ORDER BY posts.posted_at DESC;`)
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

  // SEARCH FOR THE POSTS WITH KEYWORD = AJAX?
  // router.get("/:keyword", (req, res) => {
  //   const queryString = `SELECT * FROM posts
  //   WHERE title LIKE $1
  //   ORDER BY posted_at DESC`;
  //   const keyword = [req.params.keyword];
  //   db.query(queryString, keyword)
  //     .then(data => {
  //       const posts = data.rows;
  //       const templateVars = { posts };
  //       console.log(templateVars);
  //       res.render("index", templateVars);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // Create a new post
  router.post("/", (req, res) => {
    const queryString = `INSERT INTO posts (title, url, description)
    VALUES ($1, $2, $3);`;
    const formInput = [req.body.title, req.body.url, req.body.description];
    db.query(queryString, formInput)
      .then(data => {
        console.log(data.rows);
        res.redirect(`/posts`); // How to redirect it to /posts/:post_id?
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Show a specific post and all its comments
  router.get("/:post_id", (req, res) => {
    const queryStringPost = `SELECT posts.id, posts.title, posts.url, posts.description, posts.posted_at, (SELECT COUNT(DISTINCT comments) FROM comments WHERE posts.id = post_id) as nbComments, COUNT(DISTINCT ratings) AS nbRratings, ROUND(AVG(value), 1) AS avgRating
    FROM posts
    LEFT JOIN ratings ON posts.id = ratings.post_id
    WHERE posts.id = $1
    GROUP BY posts.id
    `;
    const values = [req.params.post_id];
    const queryStringComments = `SELECT comments.id, comments.content, comments.posted_at
    FROM comments
    WHERE post_id = $1;`

    const promisePost = db.query(queryStringPost, values);
    const promiseComments = db.query(queryStringComments, values);

    Promise.all([promisePost, promiseComments])
      .then(data => {
        const templateVars = {
          post: data[0].rows,
          comments: data[1].rows
        };
        res.render("show_post", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // SHOW PAGE TO EDIT A POST = STRETCH
  // router.get("/:post_id/edit", (req, res) => {
  //   db.query(`SELECT posts.title, posts.url, posts.description FROM posts
  //   WHERE posts.pd = :post_id
  //   `)
  //     .then(data => {
  //       console.log(data.rows);
  //       res.render("new_post");
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // EDIT A POST = STRETCH
  // router.post("/:post_id", (req, res) => {
  //   db.query(``)
  //     .then(data => {
  //       console.log(data.rows);
  //       res.redirect("/:post_id");
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // Delete a post = AJAX?
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
