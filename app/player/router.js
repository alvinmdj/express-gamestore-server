const express = require('express');

const router = express.Router();

const { landingPage, detailPage, category } = require('./controller');

/* starts with /api/v1/players */

router.get('/landing-page', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);

module.exports = router;
