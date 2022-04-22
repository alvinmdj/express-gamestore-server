const express = require('express');

const router = express.Router();

const {
  viewSignIn,
  actionSignIn,
} = require('./controller');

/* starts with /users */

router.get('/', viewSignIn);
router.post('/', actionSignIn);

module.exports = router;
