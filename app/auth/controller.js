const path = require('path');
const fs = require('fs');
const config = require('../../config');

const Player = require('../player/model');

module.exports = {
  // eslint-disable-next-line consistent-return
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;

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
            const player = new Player({ ...payload, avatar: fileName });

            await player.save();

            // remove password from response
            delete player._doc.password; // eslint-disable-line no-underscore-dangle

            res.status(201).json({ data: player });
          } catch (error) {
            if (error && error.name === 'ValidationError') {
              res.status(422).json({
                error: 1,
                message: error.message,
                fields: error.errors,
              });
            }
            next(error);
          }
        });
      } else {
        const player = new Player(payload);

        await player.save();

        // remove password from response
        delete player._doc.password; // eslint-disable-line no-underscore-dangle

        res.status(201).json({ data: player });
      }
    } catch (error) {
      if (error && error.name === 'ValidationError') {
        return res.status(422).json({
          error: 1,
          message: error.message,
          fields: error.errors,
        });
      }
      next(error);
    }
  },
};
