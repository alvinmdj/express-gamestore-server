const express = require('express');

const router = express.Router();

const { landingPage } = require('./controller');

/* starts with /players */

router.get('/landing-page', landingPage);

module.exports = router;
