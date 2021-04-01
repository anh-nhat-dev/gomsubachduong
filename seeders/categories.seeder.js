const faker = require("faker/locale/vi");
const slug = require("slug");
const { Seeder } = require("mongoose-data-seed");
const Model = require("../server/app/models/category");
const mongoose = require("mongoose");

class CategoriesSeeder extends Seeder {
  async beforeRun() {
    this.categoriesData = this._generateCategories();
  }

  async shouldRun() {
    return Model.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Model.create(this.categoriesData);
  }

  _generateCategories() {
    return [
      "Chum sành ngâm rượu",
      "Phong Thủy, trang trí",
      "Ấm chén Bát Tràng",
      "Gốm sứ da dụng",
      "Bộ đồ ăn gia đình",
      "Gốm sứ tâm linh",
      "Lọ Lộc bình",
      "Tượng gốm sứ",
      "Tranh gốm sứ",
      "Gốm sứ xây sựng",
      "Quà tặng gốm sứ",
      "Khách sạn, Resot, Nhà hàng",
    ].map((name) => {
      return {
        name,
        slug: slug(name, { lower: true }),
        description: faker.lorem.paragraphs(),
      };
    });
  }
}

module.exports = CategoriesSeeder;
