const express = require('express');

const router = express.Router();

const { isLoggedInAdmin } = require('../middleware/auth');

const { index, actionStatus } = require('./controller');

/* starts with /payment */

router.use(isLoggedInAdmin);
router.get('/', index);
router.put('/status/:id', actionStatus);

module.exports = router;
