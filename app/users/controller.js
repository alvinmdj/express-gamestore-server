const bcrypt = require('bcryptjs');
const User = require('./model');

module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_signin', { alert });
      } else {
        res.redirect('/dashboard');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  actionSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        if (user.status === 'Y') {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            req.session.user = {
              id: user.id,
              email: user.email,
              status: user.status,
              name: user.name,
            };
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', 'Invalid email or password');
            req.flash('alertStatus', 'danger');
            res.redirect('/');
          }
        } else {
          req.flash('alertMessage', 'Your account is not activated');
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', 'Invalid email or password');
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  actionSignOut: async (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
};
