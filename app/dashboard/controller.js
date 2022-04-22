module.exports = {
  index: async (req, res) => {
    try {
      // console.log(req.session.user);
      res.render('index', {
        name: req.session.user.name,
        title: 'Dashboard',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
