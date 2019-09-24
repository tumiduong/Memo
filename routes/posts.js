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
    const queryStringPosts = `SELECT posts.id, posts.title, posts.url, posts.description, posts.posted_at,
    (SELECT COUNT(DISTINCT comments) FROM comments WHERE posts.id = post_id) as nbComments, COUNT(DISTINCT ratings) AS nbRratings,
    ROUND(AVG(value), 1) AS avgRating,
    (SELECT value FROM ratings WHERE user_id = $1 AND posts.id = post_id) AS rated,
    (SELECT id FROM likes WHERE user_id = $1 AND posts.id = post_id) AS liked
    FROM posts
    LEFT JOIN ratings ON posts.id = ratings.post_id
    LEFT JOIN likes ON posts.id = likes.user_id
    LEFT JOIN users ON users.id = posts.user_id
    GROUP BY posts.id
    ORDER BY posts.posted_at DESC;`;

    const queryStringCollections = `SELECT collections.id, collections.title
    FROM collections
    JOIN users ON owner_id = users.id
    WHERE owner_id = $1
    ORDER BY collections.title`
    const userId = [req.session.id];

    const promisePosts = db.query(queryStringPosts, userId);
    const promiseCollections = db.query(queryStringCollections, userId);

    Promise.all([promisePosts, promiseCollections])
      .then(data => {
        const templateVars = {
          posts: data[0].rows,
          collections: data[1].rows,
          user: req.session.id
        };
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/new", (req, res) => {
    const queryStringCollections = `SELECT collections.id, collections.title
    FROM collections
    JOIN users ON owner_id = users.id
    WHERE owner_id = $1
    ORDER BY collections.title;`
    const userId = [req.session.id];

    db.query(queryStringCollections, userId)
      .then(data => {
        const templateVars = {
          collections: data.rows,
          user: req.session.id
        };
        if (templateVars.user) {
          res.render("new_post", templateVars);
        } else {
          res.redirect("/");
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Search for the posts with the keyword in the title (shouldn't it be ajax?)
  router.get("/search/:keyword", (req, res) => {
    const queryStringPosts = `SELECT posts.id, posts.title, posts.url, posts.description, posts.posted_at, (SELECT COUNT(DISTINCT comments) FROM comments WHERE posts.id = post_id) as nbComments, COUNT(DISTINCT ratings) AS nbRratings, ROUND(AVG(value), 1) AS avgRating
    FROM posts
    LEFT JOIN ratings ON posts.id = ratings.post_id
    WHERE LOWER(title) LIKE LOWER($1)
    GROUP BY posts.id
    ORDER BY posts.posted_at DESC;`
    const keyword = ['%' + req.params.keyword + '%'];

    const queryStringCollections = `SELECT collections.id, collections.title
    FROM collections
    JOIN users ON owner_id = users.id
    WHERE owner_id = $1
    ORDER BY collections.title;`
    const userId = [req.session.id];

    const promisePosts = db.query(queryStringPosts, keyword);
    const promiseCollections = db.query(queryStringCollections, userId);

    Promise.all([promisePosts, promiseCollections])
      .then(data => {
        const templateVars = {
          posts: data[0].rows,
          collections: data[1].rows,
          user: req.session.id
        };
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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
    const queryStringPost = `SELECT posts.id, posts.title, posts.url, posts.description, posts.posted_at,
    (SELECT COUNT(DISTINCT comments) FROM comments WHERE posts.id = post_id) as nbComments,
    COUNT(DISTINCT ratings) AS nbRratings, ROUND(AVG(value), 1) AS avgRating,
    (SELECT value FROM ratings WHERE user_id = $1 AND posts.id = post_id) AS rated,
    (SELECT id FROM likes WHERE user_id = $1 AND posts.id = post_id) AS liked
    FROM posts
    LEFT JOIN ratings ON posts.id = ratings.post_id
    LEFT JOIN likes ON posts.id = likes.user_id
    LEFT JOIN users ON users.id = posts.user_id
    WHERE posts.id = $2
    GROUP BY posts.id
    `;
    const valuesPost = [req.session.id, req.params.post_id];

    const queryStringComments = `SELECT comments.id, comments.content, comments.posted_at
    FROM comments
    WHERE post_id = $1;`
    const valuesComments = [req.params.post_id];

    const queryStringCollections = `SELECT collections.id, collections.title
    FROM collections
    JOIN users ON owner_id = users.id
    WHERE owner_id = $1`
    const userId = [req.session.id];

    const promisePost = db.query(queryStringPost, valuesPost);
    const promiseComments = db.query(queryStringComments, valuesComments);
    const promiseCollections = db.query(queryStringCollections, userId);

    Promise.all([promisePost, promiseComments, promiseCollections])
      .then(data => {
        const templateVars = {
          post: data[0].rows,
          comments: data[1].rows,
          collections: data[2].rows,
          user: req.session.id
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

  // Delete a post = STRETCH
  // router.post("/:post_id/delete", (req, res) => {
  //   db.query(`DELETE FROM posts
  //   WHERE posts.id = :post_id`)
  //     .then(data => {
  //       console.log(data.rows);
  //       res.redirect("/posts");
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  return router;
};
