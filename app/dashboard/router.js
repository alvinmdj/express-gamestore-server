const express = require('express');

const router = express.Router();

const { index } = require('./controller');

const { isLoggedInAdmin } = require('../middleware/auth');

/* GET dashboard page. */

router.use(isLoggedInAdmin); // must be logged in as admin
router.get('/', index);

module.exports = router;
