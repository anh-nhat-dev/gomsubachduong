const path = require("path");
const config = require("config");
const fs = require("fs");
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

exports.removeFileProduct = (
  fileName,
  _path = config.get("app.upload_product_dir")
) => {
  if (fileName && fs.existsSync(path.resolve(_path, fileName))) {
    fs.unlinkSync(path.resolve(_path, fileName));
  }
};

/**
 *
 * @param {*} tempFile
 * @param {*} slugName
 * @param {*} originalname
 * @param {*} _path
 */
exports.uploadFileProduct = (
  tempFile,
  slugName,
  originalname,
  _path = config.get("app.upload_product_dir")
) => {
  const filename = [slugName, Math.floor(Math.random() * 10000)]
    .join("-")
    .concat(path.extname(originalname));

  fs.renameSync(tempFile, path.resolve(_path, filename));

  return filename;
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
