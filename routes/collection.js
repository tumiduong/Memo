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

    const queryStringCollections = `SELECT collections.id, collections.title
    FROM collections
    JOIN users ON owner_id = users.id
    WHERE owner_id = $1
    ORDER BY collections.title;`

    const queryParams = [req.params.id]
    const queryParams2 = [req.session.id]

    const collections = db.query(collectionQuery, queryParams)
    const posts = db.query(postQuery, queryParams)
    const sidebarCollections = db.query(queryStringCollections, queryParams2)
    Promise.all([collections, posts, sidebarCollections])
      .then(values => {
        let overall = {
          collection: values[0].rows[0],
          posts: values[1].rows,
          collections: values[2].rows,
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

    const queryStringCollections = `SELECT collections.id, collections.title
    FROM collections
    JOIN users ON owner_id = users.id
    WHERE owner_id = $1
    ORDER BY collections.title;`

    const queryParams = [req.params.id]
    const queryParams2 = [req.session.id]

    const collections = db.query(collectionQuery, queryParams)
    const posts = db.query(postQuery, queryParams)
    const sidebarCollections = db.query(queryStringCollections, queryParams2)
    Promise.all([collections, posts, sidebarCollections])
      .then(values => {
        let overall = {
          collection: values[0].rows[0],
          posts: values[1].rows,
          collections: values[2].rows,
          user: req.session.id,
        }
        res.json(overall)
      })
      .catch(err => {
         console.log(err.stack);
      })
  })

  router.post('/collection', (req, res) => {
    const addCollectionQuery = `
    INSERT INTO collections (owner_id, title, description)
    VALUES ($1, $2, $3)`

    const queryParams = [req.session.id, req.body.text]

    db.query(addCollectionQuery, queryParams)
       .then(data => {
         res.status(201).send();
       })
       .catch(err => {
         console.log(err.stack);
       })
  })

  router.get('/sidebar/api/:id', (req, res) => {
    const collectionQuery = `
    SELECT owner_id, title
    FROM collections
    WHERE owner_id = $1;`

    const queryParams = [req.params.id]

    db.query(collectionQuery, queryParams)
       .then(data => {
         const collections = data.rows
         res.json(collections);
       })
       .catch(err => {
         console.log(err.stack);
       })
  })
  return router
}
