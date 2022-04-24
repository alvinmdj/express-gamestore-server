const Player = require('./model');
const Voucher = require('../voucher/model');

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
};
