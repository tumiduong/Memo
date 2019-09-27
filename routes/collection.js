const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //display the collection page matching the collection id
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

    const userQuery = `
    SELECT *
    FROM users
    WHERE users.id = $1;`

    const queryParams = [req.params.id]
    const queryParams2 = [req.session.id]

    const collections = db.query(collectionQuery, queryParams)
    const posts = db.query(postQuery, queryParams)
    const sidebarCollections = db.query(queryStringCollections, queryParams2)
    const userInfo = db.query(userQuery, queryParams2)

    Promise.all([collections, posts, sidebarCollections, userInfo])
      .then(values => {
        let overall = {
          collection: values[0].rows[0],
          posts: values[1].rows,
          collections: values[2].rows,
          userInfo: values[3].rows[0],
          user: req.session.id,
        }
        res.render('show_collection', overall)
      })
      .catch(err => {
         console.log(err.stack);
      })
  })

  //retrieves information about a specific collection
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

  //route to create a new collection
  router.post('/', (req, res) => {
    const addCollectionQuery = `
    INSERT INTO collections (owner_id, title, description)
    VALUES ($1, $2, $3)`

    const queryParams = [req.session.id, req.body.title, req.body.description]

    db.query(addCollectionQuery, queryParams)
       .then(data => {
         res.json(req.session.id);
       })
       .catch(err => {
         console.log(err.stack);
       })
  })

  //delete collection from db with matching id
  router.post('/delete/:id', (req, res) => {
    const deleteCollectionQuery = `
    DELETE FROM collections
    WHERE id = $1;`

    const queryParams = [req.params.id]

    db.query(deleteCollectionQuery, queryParams)
       .then(data => {
         res.json(req.params.id);
       })
       .catch(err => {
         console.log(err.stack);
       })
  })

  //get the information about the collections in the sidebar
  router.get('/sidebar/api/:id', (req, res) => {
    const collectionQuery = `
    SELECT id, title, description, created_at
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

  //update a post information when deleting it from a collection
  router.post('/edit/:id', (req, res) => {
    const editQuery = `
    UPDATE posts
    SET collection_id = NULL
    WHERE posts.id = $1
    RETURNING posts.id;`

    const queryParams = [req.params.id]

    db.query(editQuery, queryParams)
       .then(post_id => {
         res.json(post_id.rows[0].id);
       })
       .catch(err => {
         console.log(err.stack);
       })
  })

  return router
}
