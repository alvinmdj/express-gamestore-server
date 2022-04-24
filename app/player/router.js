const express = require('express');

const router = express.Router();

const { landingPage } = require('./controller');

/* starts with /api/v1/players */

router.get('/landing-page', landingPage);

module.exports = router;
