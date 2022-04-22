const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate('banks');

      res.render('admin/payment/view_payment', {
        payment,
        alert,
        name: req.session.user.name,
        title: 'Payment Method',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render('admin/payment/create', {
        banks,
        name: req.session.user.name,
        title: 'Add Payment Method',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;
      const payment = await Payment({ type, banks });
      await payment.save();

      req.flash('alertMessage', 'Success Create Payment Method');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id).populate('banks');
      const banks = await Bank.find();
      res.render('admin/payment/edit', {
        payment,
        banks,
        name: req.session.user.name,
        title: 'Edit Payment Method',
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { type, banks });

      req.flash('alertMessage', 'Success Update Payment Method');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Success Delete Payment Method');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id);
      const status = payment.status === 'Y' ? 'N' : 'Y';
      await Payment.findByIdAndUpdate(id, { status });

      req.flash('alertMessage', 'Success Update Payment Status');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
};
