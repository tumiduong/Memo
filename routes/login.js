const express = require('express');
const router  = express.Router();


module.exports = () => {

  router.get('/', (req, res) => {
    req.session.id = 1;
    res.redirect('/posts');
  });

  return router;
};
