const { Router } = require("express");
const apiController = require("../app/controllers/api");
const router = Router();

router.get(
  "/home-categories-products",
  apiController.getProductsWithCategories
);

router.get("/products", apiController.getProducts);
router.get("/products/:id", apiController.getProduct);
router.get("/categories/:id", apiController.getCategory);
router.get("/comments", apiController.getComments);
router.get("/menus", apiController.getMenus);
router.post("/comments", apiController.comment);
router.post("/order", apiController.order);

router.post("/test", (req, res) => {
  res.json(req.body);
});

module.exports = router;
