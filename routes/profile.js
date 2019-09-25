const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/api/:id', (req, res) => {
    const overviewQuery = `
    SELECT users.id, users.username, users.biography, users.icon, COUNT(DISTINCT comments) as nbComments, COUNT(DISTINCT collections) AS nbCollections, COUNT(DISTINCT posts) AS nbPosts, COUNT(DISTINCT likes) AS nbLikes
    FROM users
    LEFT JOIN collections ON collections.owner_id = users.id
    LEFT JOIN posts ON posts.user_id = users.id
    LEFT JOIN comments ON comments.user_id = users.id
    LEFT JOIN likes ON likes.user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id`;

    const collectionQuery= `
    SELECT collections.id, collections.title, collections.description, collections.created_at
    FROM collections
    WHERE owner_id = $1
    GROUP BY collections.id;`

    const postQuery = `
    SELECT posts.title, posts.url, posts.description, posts.posted_at
    FROM posts
    WHERE user_id = $1
    GROUP BY posts.id;`

    const likeQuery = `
    SELECT posts.title, posts.description, posts.posted_at
    FROM likes
    JOIN posts ON post_id = posts.id
    WHERE likes.user_id = $1
    GROUP BY posts.id;`

    const commentQuery = `
    SELECT commentS.id, posts.title, users.username, comments.content, comments.posted_at
    FROM comments
    JOIN posts on posts.id = comments.post_id
    JOIN users on posts.user_id = users.id
    WHERE comments.user_id = $1;`

    const queryParams = [req.session.id]

    const overview = db.query(overviewQuery, queryParams)
    const collections = db.query(collectionQuery, queryParams)
    const posts = db.query(postQuery, queryParams)
    const likes = db.query(likeQuery, queryParams)
    const comments = db.query(commentQuery, queryParams)
    Promise.all([overview, collections, posts, likes, comments])
      .then(values => {
        let overall = {
          overview: values[0].rows[0],
          collections: values[1].rows,
          posts: values[2].rows,
          likes: values[3].rows,
          comments: values[4].rows
        }
        res.json(overall)
      })
      .catch(err => {
        console.log(err.stack)
      })
  })

  router.get('/:id', (req, res) => {
    const overviewQuery = `
    SELECT users.id, users.username, users.biography, users.icon, COUNT(DISTINCT comments) as nbComments, COUNT(DISTINCT collections) AS nbCollections, COUNT(DISTINCT posts) AS nbPosts, COUNT(DISTINCT likes) AS nbLikes
    FROM users
    LEFT JOIN collections ON collections.owner_id = users.id
    LEFT JOIN posts ON posts.user_id = users.id
    LEFT JOIN comments ON comments.user_id = users.id
    LEFT JOIN likes ON likes.user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id`;

    const collectionQuery = `
    SELECT collections.id, collections.title, collections.description, collections.created_at
    FROM collections
    WHERE owner_id = $1
    GROUP BY collections.id
    ORDER BY collections.title;`

    const postQuery = `
    SELECT posts.title, posts.url, posts.description, posts.posted_at
    FROM posts
    WHERE user_id = $1
    GROUP BY posts.id;`

    const likeQuery = `
    SELECT posts.title, posts.url, posts.description, posts.posted_at
    FROM likes
    JOIN posts ON post_id = posts.id
    WHERE likes.user_id = $1
    GROUP BY posts.id;`

    const commentQuery = `
    SELECT commentS.id, posts.title, users.username, comments.content, comments.posted_at
    FROM comments
    JOIN posts on posts.id = comments.post_id
    JOIN users on posts.user_id = users.id
    WHERE comments.user_id = $1;`

    const queryParams = [req.session.id]

    const overview = db.query(overviewQuery, queryParams)
    const collections = db.query(collectionQuery, queryParams)
    const posts = db.query(postQuery, queryParams)
    const likes = db.query(likeQuery, queryParams)
    const comments = db.query(commentQuery, queryParams)
    Promise.all([overview, collections, posts, likes, comments])
      .then(values => {
        const overall = {
          overview: values[0].rows[0],
          collections: values[1].rows,
          posts: values[2].rows,
          likes: values[3].rows,
          comments: values[4].rows,
          user: req.session.id
        }
        if (overall.user === parseInt(req.params.id)) {
          res.render('show_profile', overall);
        } else {
          res.redirect("/posts");
        }
      })
      .catch(err => {
        console.log(err.stack)
      })
  })

  router.get('/:id/edit', (req, res) => {
    const queryString = `
    SELECT *
    FROM users
    WHERE users.id = $1;`
    const queryParams = [req.params.id];

    db.query(queryString, queryParams)
       .then (data => {
         console.log(data.rows[0]);
         let obj = data.rows[0]
         let templateVars = {
           username: obj.username,
           password: obj.password,
           email: obj.email,
           biography: obj.biograpgy,
           icon: obj.icon,
           user: req.session.id
          }
          if (templateVars.user === parseInt(req.params.id)) {
            res.json(templateVars);
          } else {
            res.redirect("/posts");
          }
       })
       .catch(err => {
         console.log(err.stack);
       })
  })

  router.put('/:id', (req, res) => {
    const username = req.username;
    const password = req.password;
    const email = req.email;
    const description = req.description;
    const icon = req.icon;

    queryString = `
    UPDATE users
    SET username = $1, password = $2, email= $3, description = $4, icon = $5
    WHERE id = $6;`
    queryParams = [username, password, email, description, icon, req.params.id]
    db.query(queryString, queryParams)
        .then(res => {
          console.log('Success');
          res.redirect('/');
        })
        .catch(err => {
          console.log(err.stack);
        })
  })

  return router;
}
