const { Router } = require("express");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const config = require("config");
/**
 * Controller
 */
const homeController = require("../app/controllers/admin/home");
const authController = require("../app/controllers/admin/auth");
const productController = require("../app/controllers/admin/product");
const categoryController = require("../app/controllers/admin/category");
const orderController = require("../app/controllers/admin/order");
const clientController = require("../app/controllers/home");
/**
 * Middleware
 */
const authMiddleware = require("../app/middlewares/auth");
const uploadMiddleware = multer({
  dest: path.resolve(config.get("app.temp_dir")),
});
const router = Router();

router
  .route("/panel/login")
  .all(authMiddleware.isLogout)
  .get(authController.login)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/panel/login",
      failureFlash: true,
      successRedirect: "/panel/dashboard",
      successFlash: true,
    })
  );

router.get("/panel/logout", authController.logout);

// Admin Manager
router.use("/panel", authMiddleware.isLogin);
router.get("/panel/dashboard", homeController.dashboard);
router.get("/panel/products", productController.index);
router
  .route("/panel/products/create")
  .get(productController.create)
  .post(
    uploadMiddleware.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "photos", maxCount: 8 },
    ]),
    productController.store
  );

router
  .route("/panel/products/:id/edit")
  .get(productController.edit)
  .post(
    uploadMiddleware.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "photos", maxCount: 8 },
    ]),
    productController.update
  );

router.get("/panel/products/:id/delete", productController.destroy);

// Cate
router.get("/panel/categories", categoryController.index);
router.post(
  "/panel/categories/create",
  uploadMiddleware.fields([
    {
      name: "background",
      maxCount: 1,
    },
    {
      name: "icon",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  categoryController.store
);
router.get("/panel/categories/:id/delete", categoryController.destroy);
router
  .route("/panel/categories/:id/edit")
  .get(categoryController.edit)
  .post(
    uploadMiddleware.fields([
      {
        name: "background",
        maxCount: 1,
      },
      {
        name: "icon",
        maxCount: 1,
      },
      {
        name: "banner",
        maxCount: 1,
      },
    ]),
    categoryController.update
  );

router.get("/panel/orders", orderController.index);
router.post("/panel/orders/:id/edit", orderController.update);

router.get("*", clientController.home);

module.exports = router;
