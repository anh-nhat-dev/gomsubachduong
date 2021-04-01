const mongoose = require("mongoose");
const OrderModel = mongoose.model("Order");
const Joi = require("joi");
const slug = require("slug");
const paginate = require("../../../common/paginate");

exports.index = async (req, res, next) => {
  try {
    // Lấy ra trang hiện tại nếu không có đặt mặc định là 1
    const page = parseInt(req.query.page) || 1;
    // Số documents trên 1 trang
    const limit = 10;
    // Tính số documents sẽ bị bỏ qua
    const skip = limit * page - limit;

    // Lấy ra tổng số bản ghi
    const total = await OrderModel.find({}).countDocuments();
    // Tính tổng số trang
    const totalPage = Math.ceil(total / limit);

    const orders = await OrderModel.find({})
      .populate({
        path: "items.product",
        select: "thumbnail title slug code",
      })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.render("order/index", {
      orders,
      page,
      totalPage,
      pages: paginate(page, totalPage),
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const bodySchema = Joi.object({
    page: Joi.string(),
    status: Joi.string().valid("new", "cancel", "success", "confirmed"),
  });
  try {
    const value = await bodySchema.validateAsync(req.body);
    const id = req.params.id;

    await OrderModel.updateOne({ _id: id }, { status: value.status });

    req.flash("success", "Cập nhật đơn hàng thành công");

    res.redirect(`/panel/orders?page=${value.page}`);
  } catch (error) {
    next(error);
  }
};
