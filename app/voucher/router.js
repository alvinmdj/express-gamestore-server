const os = require('os');
const express = require('express');
const multer = require('multer');
const {
  index,
  viewCreate,
  actionCreate,
} = require('./controller');

const router = express.Router();

/* starts with /voucher */

router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({ dest: os.tmpdir() }).single('thumbnail'), actionCreate);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);

module.exports = router;
