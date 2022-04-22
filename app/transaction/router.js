const express = require('express');

const router = express.Router();

const { isLoggedInAdmin } = require('../middleware/auth');

const { index } = require('./controller');

/* starts with /payment */

router.use(isLoggedInAdmin);
router.get('/', index);

module.exports = router;
