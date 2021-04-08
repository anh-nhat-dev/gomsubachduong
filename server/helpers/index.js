const path = require("path");
const config = require("config");
const fs = require("fs");
const Jimp = require("jimp");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const { cloneDeep } = require("lodash");

exports.getFullUrlMediaUpload = (fileName, _path = "products") => {
  const file = path.resolve(
    `server/storage/public/uploads/${_path}/${fileName}`
  );

  if (fs.existsSync(file)) {
    return [config.get("app.storage_domain"), _path, fileName].join("/");
  } else {
    return [config.get("app.static_url"), "img/no-img.png"].join("/");
  }
};

exports.removeImageResize = (
  photo,
  _path = config.get("app.upload_product_dir")
) => {
  Object.keys(photo).forEach((key) => {
    if (
      photo[key] &&
      photo[key].filename &&
      fs.existsSync(path.resolve(_path, photo[key].filename))
    ) {
      fs.unlinkSync(path.resolve(_path, photo[key].filename));
    }
  });
};

const compress = async (filepath, min = 0.6, max = 0.8) => {
  try {
    const files = await imagemin([`${filepath}`], {
      destination: config.get("app.temp_dir"),
      plugins: [
        imageminMozjpeg({
          quality: 50,
        }),
        imageminPngquant({
          quality: [min, max],
        }),
      ],
    });
    return files[0] || null;
  } catch (error) {
    return null;
  }
};

/**
 *
 * @param {*} tempFile
 * @param {*} slugName
 * @param {*} originalname
 * @param {*} _path
 */
exports.uploadImageResize = async (
  tempFile,
  slugName,
  originalname,
  _path = config.get("app.upload_product_dir")
) => {
  const fileHasCompress = await compress(tempFile);
  const filename = [slugName, Math.floor(Math.random() * 10000)].join("-");
  const sizes = {};
  if (fileHasCompress) {
    await Jimp.read(fileHasCompress.destinationPath).then((file) => {
      [
        {
          type: "large",
          size: 600,
        },
        {
          type: "small",
          size: 300,
        },
        {
          type: "thumbnail",
          size: 150,
        },
      ].map((size) => {
        sizes[size.type] = {
          filename: [filename, size.size, size.size]
            .join("-")
            .concat(path.extname(originalname)),
        };

        file
          .resize(size.size, size.size)
          .write(path.resolve(_path, sizes[size.type].filename));
      });
    });

    sizes["full"] = {
      filename: filename.concat(path.extname(originalname)),
    };

    fs.renameSync(tempFile, path.resolve(_path, sizes["full"].filename));
  }
  return sizes;
};

/**
 *
 * @param {*} tempFile
 * @param {*} slugName
 * @param {*} originalname
 * @param {*} _path
 * @returns
 */
exports.uploadImageNotResize = async (
  tempFile,
  slugName,
  originalname,
  _path = config.get("app.upload_category_dir")
) => {
  const fileHasCompress = await compress(tempFile);
  const filename = [slugName, Math.floor(Math.random() * 10000)]
    .join("-")
    .concat(path.extname(originalname));

  fs.renameSync(
    (fileHasCompress && fileHasCompress.destinationPath) || tempFile,
    path.resolve(_path, filename)
  );

  return filename;
};

/**
 *
 * @param {*} fileName
 * @param {*} _path
 */
exports.removeImageNotResize = async (
  fileName,
  _path = config.get("app.upload_category_dir")
) => {
  if (fileName && fs.existsSync(path.resolve(_path, fileName))) {
    fs.unlinkSync(path.resolve(_path, fileName));
  }
};

exports.getCategoriesByLevel = (
  categories = [],
  hiddenId = null,
  prefix = "--"
) => {
  function extractChildren(cates = []) {
    let _cates = [];

    for (let cate of cates) {
      const childrend = cloneDeep(cate.childrend);
      const hidden =
        cate.tree.map((id) => String(id)).includes(hiddenId) ||
        String(cate._id) === hiddenId;
      delete cate.childrend;
      cate.hidden = hidden;
      const lengthTree = cate.tree.length;
      cate.name = Array(lengthTree).fill(prefix).join("|") + cate.name;
      _cates.push(cate);
      _cates = _cates.concat(extractChildren(childrend));
    }

    return _cates;
  }

  return extractChildren(categories);
};
