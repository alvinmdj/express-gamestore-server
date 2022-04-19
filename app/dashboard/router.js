const express = require('express');

const router = express.Router();

const { index } = require('./controller');

/* GET dashboard page. */
router.get('/', index);

module.exports = router;
