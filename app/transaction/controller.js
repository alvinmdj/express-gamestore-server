const Transaction = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find();
      // .populate('player');

      // console.log('transaction >>');
      // console.log(transaction);

      res.render('admin/transaction/view_transaction', {
        transaction,
        alert,
        name: req.session.user.name,
        title: 'Transaction',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },
};
