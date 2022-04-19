const Category = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Category.find();
      res.render('admin/category/view_category', { categories });
    } catch (error) {
      console.log(error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create');
    } catch (error) {
      console.error(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category({ name });
      await category.save();
      res.redirect('/category');
    } catch (error) {
      console.error(error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById({ _id: id });
      res.render('admin/category/edit', { category });
    } catch (error) {
      console.error(error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: id }, { name });
      res.redirect('/category');
    } catch (error) {
      console.error(error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findOneAndRemove({ _id: id });
      res.redirect('/category');
    } catch (error) {
      console.error(error);
    }
  },
};
