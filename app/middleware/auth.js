const jwt = require('jsonwebtoken');
const config = require('../../config');
const Player = require('../player/model');

module.exports = {
  isLoggedInAdmin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash('alertMessage', 'Sorry, your session has expired. Please login again.');
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    } else {
      next();
    }
  },
  isLoggedInPlayer: async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      const data = jwt.verify(token, config.jwtKey);

      const player = await Player.findById(data.player.id);
      if (!player) {
        throw new Error();
      }

      req.player = player;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).json({
        message: error || 'Unauthorized access to this resource',
      });
    }
  },
};
