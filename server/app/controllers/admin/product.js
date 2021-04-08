const mongoose = require("mongoose");
const joi = require("joi");
const slug = require("slug");
const fs = require("fs");
const config = require("config");

const paginate = require("../../../common/paginate");
const {
  removeImageResize,
  uploadImageResize,
  getCategoriesByLevel,
} = require("../../../helpers");

const ProductModel = mongoose.model("Product");
const CategoryModel = mongoose.model("Category");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.index = async (req, res, next) => {
  try {
    // Lấy ra trang hiện tại nếu không có đặt mặc định là 1
    const page = parseInt(req.query.page) || 1;
    // Số documents trên 1 trang
    const limit = 10;
    // Tính số documents sẽ bị bỏ qua
    const skip = limit * page - limit;

    // Lấy ra tổng số bản ghi
    const total = await ProductModel.find({}).countDocuments();
    // Tính tổng số trang
    const totalPage = Math.ceil(total / limit);

    const products = await ProductModel.find({})
      .populate({
        path: "cate",
        select: "name",
      })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.render("products/index", {
      products,
      page,
      totalPage,
      pages: paginate(page, totalPage),
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({ parent: null }).lean();

    res.render("products/add", {
      categories: getCategoriesByLevel(categories),
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.edit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categories = await CategoryModel.find({ parent: null }).lean();
    const product = await ProductModel.findById(id);

    if (!product) throw new Error("Không tìm thấy sản phẩm");

    res.render("products/edit", {
      categories: getCategoriesByLevel(categories),
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.store = async (req, res, next) => {
  const bodySchema = joi.object({
    title: joi.string().required(),
    code: joi.string().required(),
    price_original: joi.number(),
    price_discount: joi
      .number()
      .max(joi.ref("price_original"))
      .message(
        "The promotional price cannot be greater than the original price"
      ),
    description: joi.string().empty(""),
    status: joi.string().valid("publish", "draft"),
    submit: joi.string().valid("save", "apply"),
    stock: joi.string().valid("stocking", "out_of_stock"),
    cate_id: joi.string(),
    youtube_video_id: joi.string().empty(""),
    attributes: joi.object({
      names: joi.array(),
      values: joi.array(),
    }),
    warranty: joi.string().empty("").default(""),
    promotion: joi.string().empty("").default(""),
    is_new: joi.string().empty(""),
    is_selling: joi.string().empty(""),
    price_negotiable: joi.string().empty(),
    tags: joi.string().empty(""),
    note: joi.string().empty(""),
  });

  try {
    const value = await bodySchema.validateAsync(req.body);
    //  Check product is exitst
    const slugName = slug(value.title, { lower: true });
    const isProductExit = await ProductModel.findOne({
      $or: [{ slug: slugName }, { code: value.code }],
    }).countDocuments();

    if (isProductExit) throw new Error("Product code or slug have exist");
    const thumbnail =
      req.files && req.files.thumbnail && req.files.thumbnail[0];
    const photos = req.files && req.files.photos;

    const attributes = [];

    if (
      value.attributes &&
      value.attributes.names &&
      Array.isArray(value.attributes.names)
    ) {
      value.attributes.names.forEach((name, index) => {
        attributes.push({
          name: name,
          value: value.attributes.values[index],
          slug: slug(name, { lower: true }),
        });
      });
    }

    const product = new ProductModel({
      slug: slugName,
      title: value.title,
      code: value.code,
      cate_id: value.cate_id,
      description: value.description,
      price_original: value.price_original,
      price_discount: value.price_discount,
      status: value.status,
      stock: value.stock,
      video_id: value.youtube_video_id,
      warranty: value.warranty,
      promotion: value.promotion,
      attributes,
      is_new: value.is_new === "on",
      is_selling: value.is_selling === "on",
      price_negotiable: value.price_negotiable === "on",
      tags: value.tags
        ? value.tags
            .split(",")
            .map((tag) => ({ name: tag, slug: slug(tag, { lower: true }) }))
        : [],
      note: value.note,
    });

    if (thumbnail) {
      const _thumbnail = await uploadImageResize(
        thumbnail.path,
        slugName,
        thumbnail.originalname
      );
      product.set("thumbnail", _thumbnail);
    }

    if (photos) {
      const _photos = [];
      for (const photo of photos) {
        const _photo = await uploadImageResize(
          photo.path,
          slugName,
          photo.originalname
        );

        _photos.push(_photo);
      }
      product.set("photos", _photos);
    }

    await product.save();

    req.flash("success", "Thêm sản phẩm thành công");

    if (value.submit === "save") {
      res.redirect("/panel/products");
    }

    if (value.submit === "apply") {
      res.redirect(`/panel/products/${product._id}/edit`);
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.update = async (req, res, next) => {
  const bodySchema = joi.object({
    title: joi.string().required(),
    price_original: joi.number(),
    price_discount: joi
      .number()
      .max(joi.ref("price_original"))
      .message(
        "The promotional price cannot be greater than the original price"
      ),
    description: joi.string().empty("").default(""),
    status: joi.string().valid("publish", "draft").default("draft"),
    submit: joi.string().valid("save", "apply").default("save"),
    stock: joi
      .string()
      .valid("stocking", "out_of_stock")
      .default("out_of_stock"),
    cate_id: joi.string().required(),
    youtube_video_id: joi.string().empty("").default(""),
    delete_photos: joi.string().empty("").default(""),
    attributes: joi.object({
      names: joi.array(),
      values: joi.array(),
    }),
    warranty: joi.string().empty("").default(""),
    promotion: joi.string().empty("").default(""),
    is_new: joi.string().empty(""),
    is_selling: joi.string().empty(""),
    price_negotiable: joi.string().empty(""),
    tags: joi.string().empty(""),
    note: joi.string().empty(""),
  });

  try {
    const id = req.params.id;

    const product = await ProductModel.findById(id).lean();
    if (!product) throw new Error("Không tìm thấy sản phẩm");
    const value = await bodySchema.validateAsync(req.body);

    const slugName = slug(value.title, { lower: true });
    const isProductExit = await ProductModel.findOne({
      $or: [{ slug: slugName }, { code: value.code }],
      _id: { $nin: [id] },
    }).countDocuments();

    if (isProductExit) throw new Error("Product code or slug have exist");

    const thumbnail =
      req.files && req.files.thumbnail && req.files.thumbnail[0];
    const photos = req.files && req.files.photos;

    const attributes = [];

    if (
      value.attributes &&
      value.attributes.names &&
      Array.isArray(value.attributes.names)
    ) {
      value.attributes.names.forEach((name, index) => {
        attributes.push({
          name: name,
          value: value.attributes.values[index],
          slug: slug(name, { lower: true }),
        });
      });
    }

    const _product = {
      $set: {
        slug: slugName,
        title: value.title,
        cate_id: value.cate_id,
        description: value.description,
        price_original: value.price_original,
        price_discount: value.price_discount,
        status: value.status,
        stock: value.stock,
        video_id: value.youtube_video_id,
        attributes,
        warranty: value.warranty,
        promotion: value.promotion,
        is_new: value.is_new === "on",
        is_selling: value.is_selling === "on",
        price_negotiable: value.price_negotiable === "on",
        tags: value.tags
          ? value.tags
              .split(",")
              .map((tag) => ({ name: tag, slug: slug(tag, { lower: true }) }))
          : [],
        note: value.note,
      },
      $push: {},
    };

    // Upload thumbnail
    if (thumbnail) {
      const _thumbnail = await uploadImageResize(
        thumbnail.path,
        slugName,
        thumbnail.originalname
      );
      console.log(_thumbnail);
      _product.$set.thumbnail = _thumbnail;

      removeImageResize(product.thumbnail);
    }

    // Upload photos
    if (photos) {
      const _photos = [];

      for (const photo of photos) {
        const _photo = await uploadImageResize(
          photo.path,
          slugName,
          photo.originalname
        );
        _photos.push(_photo);
      }

      _product.$push.photos = { $each: _photos };
    }

    await ProductModel.updateOne({ _id: id }, _product);

    // Remove photos delete

    const delete_photos_ids = value.delete_photos
      .split(",")
      .filter((photo_id) => mongoose.Types.ObjectId.isValid(photo_id));

    if (Array.isArray(delete_photos_ids) && delete_photos_ids.length) {
      await ProductModel.updateOne(
        { _id: id },
        { $pull: { photos: { _id: { $in: delete_photos_ids } } } }
      );
      product.photos
        .filter((photo) => delete_photos_ids.includes(String(photo._id)))
        .forEach((photo) => {
          removeImageResize(photo);
        });
    }

    req.flash("success", "Cập nhật sản phẩm thành công");

    if (value.submit === "save") {
      res.redirect("/panel/products");
    }

    if (value.submit === "apply") {
      res.redirect(`/panel/products/${product._id}/edit`);
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await ProductModel.deleteOne({ _id: id });
    req.flash("success", "Xóa sản phẩm thành công");
    res.redirect("/panel/products");
  } catch (error) {
    next(error);
  }
};
