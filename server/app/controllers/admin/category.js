const mongoose = require("mongoose");
const CategoryModel = mongoose.model("Category");
const Joi = require("joi");
const slug = require("slug");
const fs = require("fs");
const config = require("config");

const {
  getCategoriesByLevel,
  removeImageNotResize,
  uploadImageNotResize,
} = require("../../../helpers/index");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.index = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({ parent: null })
      .populate("childrend")
      .sort("-_id");

    res.render("categories/index", {
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
    const category = await CategoryModel.findById(id).lean();

    if (!category) throw new Error("Không tìm thấy danh mục");

    const categories = await CategoryModel.find({ parent: null })
      .populate("childrend")
      .sort("-_id")
      .lean();
    res.render("categories/edit", {
      categories: getCategoriesByLevel(categories, id),
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    parent_id: Joi.string().empty(""),
    description: Joi.string().empty(""),
    submit: Joi.string().valid("save", "apply").default("save"),
  });
  const id = req.params.id;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("Không tìm thấy danh mục");

    const bg = req.files && req.files.background && req.files.background[0];
    const icon = req.files && req.files.icon && req.files.icon[0];
    const banner = req.files && req.files.banner && req.files.banner[0];

    const value = await bodySchema.validateAsync(req.body);
    const cate_slug = slug(value.name, { lower: true });
    const isCateExist = await CategoryModel.findOne({
      $or: [{ slug: cate_slug }],
      _id: { $nin: [id] },
    }).countDocuments();

    if (isCateExist) throw new Error("Danh mục đã tồn tại");

    let parent = null,
      tree = [];

    if (value.parent_id && mongoose.Types.ObjectId.isValid(value.parent_id)) {
      parent = await CategoryModel.findById(value.parent_id).lean();
      tree = (parent && Array.isArray(parent.tree) && parent.tree) || tree;
      tree.push(parent._id);
      parent = parent._id;
    }

    const oldTree = category.tree.map((_tree) => String(_tree));

    const _category = {
      $set: {
        name: value.name,
        slug: cate_slug,
        description: value.description,
        tree,
        parent,
      },
    };

    // Upload thumbnail
    if (bg) {
      const filename = await uploadImageNotResize(
        bg.path,
        cate_slug,
        bg.originalname,
        config.get("app.upload_category_dir")
      );

      _category.$set.bg = {
        filename,
      };

      removeImageNotResize(
        category.bg && category.bg.filename,
        config.get("app.upload_category_dir")
      );
    }

    // Upload thumbnail
    if (icon) {
      const filename = await uploadImageNotResize(
        icon.path,
        cate_slug,
        icon.originalname,
        config.get("app.upload_category_dir")
      );

      _category.$set.icon = {
        filename,
      };

      removeImageNotResize(
        category.icon && category.icon.filename,
        config.get("app.upload_category_dir")
      );
    }
    // Upload thumbnail
    if (banner) {
      const filename = await uploadImageNotResize(
        banner.path,
        cate_slug,
        banner.originalname,
        config.get("app.upload_category_dir")
      );

      _category.$set.banner = {
        filename,
      };

      removeImageNotResize(
        category.banner && category.banner.filename,
        config.get("app.upload_category_dir")
      );
    }

    await CategoryModel.updateOne({ _id: id }, _category);

    await CategoryModel.updateMany(
      {
        tree: id,
      },
      [
        {
          $set: {
            tree: {
              $filter: {
                input: "$tree",
                as: "item",
                cond: { $not: [{ $in: [{ $toString: "$$item" }, oldTree] }] },
              },
            },
          },
        },
        {
          $set: {
            tree: {
              $concatArrays: [tree, "$tree"],
            },
          },
        },
      ]
    );

    req.flash("success", "Cập nhật danh mục thành công");

    if (value.submit === "save") {
      res.redirect("/panel/categories");
    }

    if (value.submit === "apply") {
      res.redirect(`/panel/categories/${id}/edit`);
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
exports.store = async (req, res, next) => {
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    parent_id: Joi.string().empty(""),
    description: Joi.string().empty(""),
    submit: Joi.string().valid("save", "apply").default("save"),
  });

  try {
    const value = await bodySchema.validateAsync(req.body);
    const cate_slug = slug(value.name, { lower: true });

    const bg = req.files && req.files.background && req.files.background[0];
    const icon = req.files && req.files.icon && req.files.icon[0];
    const banner = req.files && req.files.banner && req.files.banner[0];

    const isCateExist = await CategoryModel.findOne({
      slug: cate_slug,
    }).countDocuments();

    if (isCateExist) throw new Error("Danh mục đã tồn tại");

    // Check folder exist.

    let parent = null,
      tree = [];

    if (value.parent_id && mongoose.Types.ObjectId.isValid(value.parent_id)) {
      parent = await CategoryModel.findById(value.parent_id).lean();
      tree = (parent && Array.isArray(parent.tree) && parent.tree) || tree;
      tree.push(parent._id);
      parent = parent._id;
    }

    const category = new CategoryModel({
      name: value.name,
      slug: cate_slug,
      description: value.description,
      tree,
      parent,
    });

    if (bg) {
      const filename = await uploadImageNotResize(
        bg.path,
        cate_slug,
        bg.originalname,
        config.get("app.upload_category_dir")
      );
      category.set("bg", {
        filename: filename,
      });
    }

    if (icon) {
      const filename = await uploadImageNotResize(
        icon.path,
        cate_slug,
        icon.originalname,
        config.get("app.upload_category_dir")
      );
      category.set("icon", {
        filename: filename,
      });
    }

    if (banner) {
      const filename = await uploadImageNotResize(
        banner.path,
        cate_slug,
        banner.originalname,
        config.get("app.upload_category_dir")
      );
      category.set("banner", {
        filename: filename,
      });
    }

    await category.save();

    req.flash("success", "Thêm mới danh mục thành công");

    if (value.submit === "save") {
      res.redirect("/panel/categories");
    }

    if (value.submit === "apply") {
      res.redirect(`/panel/categories/${category._id}/edit`);
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
    await CategoryModel.updateMany({ tree: id }, [
      {
        $set: {
          tree: {
            $filter: {
              input: "$tree",
              as: "item",
              cond: {
                $ne: ["$$item", { $toObjectId: id }],
              },
            },
          },
        },
      },
      {
        $set: {
          parent: { $last: "$tree" },
        },
      },
    ]);
    await CategoryModel.deleteOne({ _id: id });

    req.flash("success", "Xóa danh mục  thành công");
    res.redirect("/panel/categories");
  } catch (error) {
    next(error);
  }
};
