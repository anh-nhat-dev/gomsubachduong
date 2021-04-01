const { Seeder } = require("mongoose-data-seed");
const Model = require("../server/app/models/product");
const ModelCategory = require("../server/app/models/category");
const faker = require("faker/locale/vi");
const slug = require("slug");

class ProductsSeeder extends Seeder {
  async beforeRun() {
    this.cates = await ModelCategory.find({}).lean();
    this.productsData = this._generateProducts();
  }

  async shouldRun() {
    return Model.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Model.create(this.productsData);
  }

  _generateProducts() {
    return Array.apply(null, Array(100)).map(() => {
      const name = faker.commerce.productName();
      const randomCate = faker.random.arrayElement(this.cates);
      return {
        title: name,
        slug: slug(name, { lower: true }),
        cate_id: randomCate._id,
        code: faker.random.uuid(),
        price_original: faker.random.float(),
        description: faker.commerce.productDescription(),
        thumbnail: {
          url: faker.image.image(),
        },
        status: ["draft", "publish"][Math.ceil(Math.random() * 2)],
      };
    });
  }
}

module.exports = ProductsSeeder;
