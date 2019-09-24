const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    const collectionQuery = `
    SELECT collections.*, COUNT(DISTINCT posts) as post_count, users.username as owner
    FROM collections
    LEFT JOIN posts ON collection_id = collections.id
    JOIN users ON collections.owner_id = users.id
    WHERE collections.id = $1
    GROUP BY collections.id, users.username;`

    const postQuery = `
    SELECT *
    FROM posts
    WHERE collection_id = $1;`

    const queryParams = [req.params.id]

    const collection = db.query(collectionQuery, queryParams)
    const posts = db.query(postQuery, queryParams)
    Promise.all([collection, posts])
      .then(values => {
        let overall = {
          collection: values[0].rows[0],
          posts: values[1].rows,
          user: req.session.id,
        }
        res.render('show_collection', overall)
      })
      .catch(err => {
         console.log(err.stack);
      })
  })

  router.get('/api/:id', (req, res) => {
    const collectionQuery = `
    SELECT collections.*, COUNT(DISTINCT posts) as post_count, users.username as owner
    FROM collections
    LEFT JOIN posts ON collection_id = collections.id
    JOIN users ON collections.owner_id = users.id
    WHERE collections.id = $1
    GROUP BY collections.id, users.username;`

    const postQuery = `
    SELECT *
    FROM posts
    WHERE collection_id = $1;`

    const queryParams = [req.params.id]

    const collection = db.query(collectionQuery, queryParams)
    const posts = db.query(postQuery, queryParams)
    Promise.all([collection, posts])
      .then(values => {
        let overall = {
          collection: values[0].rows[0],
          posts: values[1].rows,
        }
        res.json(overall)
      })
      .catch(err => {
         console.log(err.stack);
      })
  })
  return router
}
