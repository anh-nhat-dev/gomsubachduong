const mongoose = require("mongoose");
const joi = require("joi");
const CategoryModel = mongoose.model("Category");
const ProductModel = mongoose.model("Product");
const CommentModel = mongoose.model("Comment");
const OrderModel = mongoose.model("Order");

// const paginate = require("../../../common/paginate");

exports.getProductsWithCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({ parent: null }).populate({
      path: "products",
      options: { sort: { _id: -1 }, limit: 7 },
    });
    res.json({
      status: "success",
      docs: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await CategoryModel.findById(id)
      .populate("tree")
      .populate({
        path: "childrend",
        select: "slug name",
      });

    const attributes = await ProductModel.aggregate([
      {
        $match: {
          cate_id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: { _id: 0, attributes: 1 },
      },
      {
        $unwind: "$attributes",
      },
      {
        $group: {
          _id: "$attributes.slug",
          values: { $push: "$attributes.value" },
          names: { $push: "$attributes.name" },
        },
      },
      {
        $project: {
          _id: 1,
          values: 1,
          name: { $first: "$names" },
        },
      },
    ]);

    res.json({
      item: category,
      attributes,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMenus = async (req, res, next) => {
  try {
    const menus = await CategoryModel.find({ parent: null });

    res.json({
      docs: menus,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const query = req.query;

    const allowFillterField = [
      "is_promotion",
      "cate_id",
      "limit",
      "page",
      "is_new",
      "is_selling",
      "sort",
      "q",
      "tag",
      "attributes",
    ];

    Object.keys(query).forEach((key) => {
      if (!allowFillterField.includes(key)) {
        delete query[key];
      }
    });

    const filter = {
      status: "publish",
    };

    let sort = "-_id";

    if (query.sort) {
      if (query.sort === "price-desc") {
        sort = "-price_original";
      }
      if (query.sort === "price-asc") {
        sort = "price_original";
      }

      if (query.sort === "view") {
        sort = "-view";
      }

      if (query.sort === "name") {
        sort = {
          slug: 1,
        };
      }
    }

    if (query.attributes) {
      const attributes = JSON.parse(query.attributes);
      const slugs = [],
        values = [];

      Object.keys(attributes).forEach((key) => {
        slugs.push(key);
        values.push(attributes[key]);
      });

      if (slugs.length && values.length) {
        filter.$and = [
          {
            "attributes.slug": {
              $in: slugs,
            },
          },
          {
            "attributes.value": {
              $in: values,
            },
          },
        ];
      }
    }

    if (query.tag) {
      filter["tags.slug"] = query.tag;
    }

    if (query.q && query.q.length) {
      filter.$text = { $search: query.q };
    }

    if (query.is_promotion === "true") {
      filter.price_discount = {
        $gt: 0,
      };
    }

    if (query.is_new === "true") {
      filter.is_new = true;
    }

    if (query.is_selling === "true") {
      filter.is_selling = true;
    }

    if (query.cate_id) {
      const cate_ids = await CategoryModel.find({ tree: query.cate_id }).lean();

      filter.cate_id = {
        $in: [
          String(query.cate_id),
          ...cate_ids.map((cate) => String(cate._id)),
        ],
      };
    }

    // Lấy ra trang hiện tại nếu không có đặt mặc định là 1
    const page = parseInt(query.page) || 1;
    // Số documents trên 1 trang
    const limit = parseInt(query.limit) || 10;
    // Tính số documents sẽ bị bỏ qua
    const skip = limit * page - limit;

    // Lấy ra tổng số bản ghi
    const total = await ProductModel.find(filter).countDocuments();
    // Tính tổng số trang
    // const totalPage = Math.ceil(total / limit);

    const products = await ProductModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      docs: products,
      pages: {
        current: page,
        total: total,
      },
    });
  } catch (error) {}
};

exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    await ProductModel.findByIdAndUpdate(id, { $inc: { view: 1 } });

    const product = await ProductModel.findOne({
      _id: id,
      status: "publish",
    }).populate({
      path: "cate_id",
      populate: "tree",
    });

    res.json({
      item: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    // Số documents trên 1 trang
    const limit = parseInt(query.limit) || 10;
    // Tính số documents sẽ bị bỏ qua
    const skip = limit * page - limit;

    const filter = {
      product_id: query.product_id,
      reply_id: null,
    };

    // Lấy ra tổng số bản ghi
    const total = await CommentModel.find(filter).countDocuments();
    const comments = await CommentModel.find(filter)
      .populate("replies")
      .skip(skip)
      .limit(limit)
      .sort("-_id");

    res.json({
      docs: comments,
      pages: {
        current: page,
        total: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.comment = async (req, res, next) => {
  const bodySchema = joi.object({
    body: joi.string().empty(""),
    email: joi.string().email().required(),
    full_name: joi.string().required(),
    product_id: joi.string().required(),
    reply_id: joi.string().empty(""),
    rate: joi.number().max(5).min(1).default(1),
  });

  try {
    const value = await bodySchema.validateAsync(req.body);

    if (mongoose.Types.ObjectId.isValid(value.product_id)) {
      const comment = new CommentModel({
        body: value.body,
        email: value.email,
        full_name: value.full_name,
        product_id: value.product_id,
        reply_id: value.reply_id,
        rate: value.rate,
      });

      await comment.save();

      res.json({
        item: comment,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.order = async (req, res, next) => {
  const bodySchema = joi.object({
    items: joi.array().items({
      product: joi.string().required(),
      qty: joi.number().required(),
    }),
    phone: joi.string().required(),
    full_name: joi.string().required(),
    email: joi.string().required(),
    address: joi.string().required(),
    note: joi.string().empty(""),
  });

  try {
    const value = await bodySchema.validateAsync(req.body);

    const ids = value.items.map((item) => item.product);

    const order = new OrderModel({
      phone: value.phone,
      full_name: value.full_name,
      email: value.email,
      address: value.address,
      note: value.note,
    });

    const products = await ProductModel.find({ _id: { $in: ids } });

    const items = [];

    products.forEach((item) => {
      const qty = value.items.find((i) => String(item._id) === i.product).qty;
      items.push({
        product: String(item._id),
        price: item.price,
        qty,
      });
    });

    order.set("items", items);
    await order.save();

    res.json({
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
