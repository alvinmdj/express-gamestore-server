/* eslint-disable no-underscore-dangle */
const Player = require('./model');
const Voucher = require('../voucher/model');
const Category = require('../category/model');
const Bank = require('../bank/model');
const Payment = require('../payment/model');
const Nominal = require('../nominal/model');
const Transaction = require('../transaction/model');

module.exports = {
  index: async (req, res) => {
    try {
      const players = await Player.find();
      res.render('admin/player/view_player', {
        players,
        name: req.session.user.name,
        title: 'Player',
      });
    } catch (error) {
      res.redirect('/dashboard');
    }
  },
  landingPage: async (_req, res) => {
    try {
      const voucher = await Voucher.find()
        .select('_id name status category thumbnail')
        .populate('category');

      res.status(200).json({
        data: voucher,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id)
        .populate('category')
        .populate('nominals')
        .populate('user', '_id name phoneNumber');

      if (!voucher) {
        return res.status(404).json({
          message: 'Game voucher not found',
        });
      }

      return res.status(200).json({
        data: voucher,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  checkOut: async (req, res) => {
    try {
      const {
        userAccount, name, nominal, voucher, payment, bank,
      } = req.body;

      const resVoucher = await Voucher.findById(voucher)
        .select('_id name category thumbnail user')
        .populate('category')
        .populate('user');
      if (!resVoucher) return res.status(404).json({ message: 'Voucher not found' });

      const resNominal = await Nominal.findById(nominal);
      if (!resNominal) return res.status(404).json({ message: 'Nominal not found' });

      const resPayment = await Payment.findById(payment);
      if (!resPayment) return res.status(404).json({ message: 'Payment not found' });

      const resBank = await Bank.findById(bank);
      if (!resBank) return res.status(404).json({ message: 'Bank not found' });

      const tax = (10 / 100) * resNominal._doc.price;
      const value = resNominal._doc.price + tax;

      const payload = {
        topUpHistory: {
          gameName: resVoucher._doc.name,
          category: resVoucher._doc.category ? resVoucher._doc.category.name : '',
          thumbnail: resVoucher._doc.thumbnail,
          coinName: resNominal._doc.coinName,
          coinQuantity: resNominal._doc.coinQuantity,
          price: resNominal._doc.price,
        },
        paymentHistory: {
          name: resBank._doc.name,
          type: resPayment._doc.type,
          bankName: resBank._doc.bankName,
          accountNumber: resBank._doc.accountNumber,
        },
        name,
        userAccount,
        tax,
        value,
        player: req.player._id,
        category: resVoucher._doc.category._id,
        voucherTopUp: resVoucher._doc._id,
        user: resVoucher._doc.user?._id,
        userHistory: {
          name: resVoucher._doc.user?.name,
          phoneNumber: resVoucher._doc.user?.phoneNumber,
        },
      };

      const transaction = new Transaction(payload);
      await transaction.save();

      return res.status(201).json({ data: transaction });
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  history: async (req, res) => {
    try {
      const { status = '' } = req.query;

      let criteria = {};

      // filter by status (pending, success, failed) if any
      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: 'i' },
        };
      }

      // filter by player
      if (req.player._id) {
        criteria = {
          ...criteria,
          player: req.player._id,
        };
      }

      const history = await Transaction.find(criteria);

      // get total value of transaction
      const total = await Transaction.aggregate([
        { $match: criteria },
        { $group: { _id: null, value: { $sum: '$value' } } },
      ]);

      return res.status(200).json({
        data: history,
        total: total.length ? total[0].value : 0,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  historyDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const history = await Transaction.findById(id);
      if (!history) {
        return res.status(404).json({
          message: 'Transaction not found',
        });
      }

      return res.status(200).json({ data: history });
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
