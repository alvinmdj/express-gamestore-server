const express = require('express');

const router = express.Router();

const {
  index,
} = require('./controller');

/* starts with /voucher */

router.get('/', index);
// router.get('/create', viewCreate);
// router.post('/create', actionCreate);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);

module.exports = router;
