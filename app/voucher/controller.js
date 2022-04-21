const path = require('path');
const fs = require('fs');
const config = require('../../config');

// Models
const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find().populate('category').populate('nominals');

      res.render('admin/voucher/view_voucher', { voucher, alert });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render('admin/voucher/create', { category, nominal });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        const tmpPath = req.file.path; // file path in tmpdir (C:\Users\Username\AppData\Local\Temp\filename)
        const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        const fileName = `${req.file.filename}.${originalExt}`;
        const targetPath = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const voucher = new Voucher({
              name, category, nominals, thumbnail: fileName,
            });
            await voucher.save();

            req.flash('alertMessage', 'Success Create Voucher');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
          }
        });
      } else {
        const voucher = new Voucher({ name, category, nominals });
        await voucher.save();

        req.flash('alertMessage', 'Success Create Voucher');
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      const voucher = await Voucher.findById(id).populate('category').populate('nominals');
      res.render('admin/voucher/edit', { voucher, category, nominal });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

      if (req.file) {
        const tmpPath = req.file.path; // file path in tmpdir (C:\Users\Username\AppData\Local\Temp\filename)
        const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        const fileName = `${req.file.filename}.${originalExt}`;
        const targetPath = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const voucher = await Voucher.findById(id);

            const currThumbnail = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currThumbnail)) {
              fs.unlinkSync(currThumbnail);
            }

            await Voucher.findOneAndUpdate({ _id: id }, {
              name, category, nominals, thumbnail: fileName,
            });

            req.flash('alertMessage', 'Success Update Voucher');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
          }
        });
      } else {
        await Voucher.findByIdAndUpdate(id, {
          name, category, nominals,
        });

        req.flash('alertMessage', 'Success Update Voucher');
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  // actionDelete: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     await Nominal.findOneAndRemove({ _id: id });

  //     req.flash('alertMessage', 'Success Delete Nominal');
  //     req.flash('alertStatus', 'success');

  //     res.redirect('/nominal');
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/nominal');
  //   }
  // },
};
