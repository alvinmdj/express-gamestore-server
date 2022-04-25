const express = require('express');

const router = express.Router();

const { isLoggedInPlayer } = require('../middleware/auth');

const {
  landingPage,
  detailPage,
  category,
  checkOut,
  history,
} = require('./controller');

/* starts with /api/v1/players */

router.get('/landing-page', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoggedInPlayer, checkOut);
router.get('/history', isLoggedInPlayer, history);

module.exports = router;
