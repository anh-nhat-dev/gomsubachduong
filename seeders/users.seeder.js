const { Seeder } = require("mongoose-data-seed");
const { hashPassword } = require("../server/helpers/auth");
const Model = require("../server/app/models/user");

class UsersSeeder extends Seeder {
  async shouldRun() {
    return Model.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    const data = [
      {
        email: "admin@domain.com",
        password: await hashPassword("123456"),
      },
    ];
    return Model.create(data);
  }
}

module.exports = UsersSeeder;
