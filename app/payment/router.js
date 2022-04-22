const express = require('express');

const router = express.Router();

const { isLoggedInAdmin } = require('../middleware/auth');

const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  actionStatus,
} = require('./controller');

/* starts with /nominal */

router.use(isLoggedInAdmin);
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);
router.put('/status/:id', actionStatus);

module.exports = router;
