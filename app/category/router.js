const express = require('express');

const router = express.Router();

const { index } = require('./controller');

/* starts with /category */

/* GET category page. */
router.get('/', index);

module.exports = router;
