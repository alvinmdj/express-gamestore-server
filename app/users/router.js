const express = require('express');

const router = express.Router();

const {
  viewSignIn,
} = require('./controller');

/* starts with /users */

router.get('/', viewSignIn);

module.exports = router;
