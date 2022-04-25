const os = require('os');
const multer = require('multer');
const express = require('express');

const router = express.Router();

const { signUp, signIn } = require('./controller');

/* starts with /api/v1/auth */

router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signUp);
router.post('/signin', signIn);

module.exports = router;
