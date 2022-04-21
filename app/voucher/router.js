const os = require('os');
const express = require('express');
const multer = require('multer');
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
} = require('./controller');

const router = express.Router();

/* starts with /voucher */

router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({ dest: os.tmpdir() }).single('thumbnail') /* name of the file input field */, actionCreate); // os.tmpdir() located at temp dir -> C:\Users\Username\AppData\Local\Temp
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', multer({ dest: os.tmpdir() }).single('thumbnail'), actionEdit);
// router.delete('/delete/:id', actionDelete);

module.exports = router;
