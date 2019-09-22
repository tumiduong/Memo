const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/api/:id', (req, res) => {
    const queryString = `
    SELECT users.id, users.username, users.biography, users.icon, COUNT(DISTINCT comments) as nbComments, COUNT(DISTINCT collections) AS nbCollections, COUNT(DISTINCT posts) AS nbPosts, COUNT(DISTINCT likes) AS nbLikes
    FROM users
    LEFT JOIN collections ON collections.owner_id = users.id
    LEFT JOIN posts ON posts.user_id = users.id
    LEFT JOIN comments ON comments.user_id = users.id
    LEFT JOIN likes ON likes.user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id`;

    const queryParams = [req.params.id]

    db.query(queryString, queryParams)
      .then(data => {
        console.log(data.rows)
        info = data.rows[0]
        res.json(info)
      })
      .catch(err => {
        console.log(err.stack)
      })
  })

  router.get('/:id', (req, res) => {
    const queryString = `
    SELECT users.id, users.username, users.biography, users.icon, COUNT(DISTINCT comments) as nbComments, COUNT(DISTINCT collections) AS nbCollections, COUNT(DISTINCT posts) AS nbPosts, COUNT(DISTINCT likes) AS nbLikes
    FROM users
    LEFT JOIN collections ON collections.owner_id = users.id
    LEFT JOIN posts ON posts.user_id = users.id
    LEFT JOIN comments ON comments.user_id = users.id
    LEFT JOIN likes ON likes.user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id`;

    const queryParams = [req.params.id]

    db.query(queryString, queryParams)
      .then(data => {
        templateVars = data.rows[0];
        res.render('profile', templateVars)
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
           icon: obj.icon
          }
         res.json({ obj });
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
