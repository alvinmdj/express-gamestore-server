const express = require('express');

const router = express.Router();

const {
  viewSignIn,
  actionSignIn,
  actionSignOut,
} = require('./controller');

/* starts with /users */

router.get('/', viewSignIn);
router.post('/', actionSignIn);
router.get('/logout', actionSignOut);

module.exports = router;
