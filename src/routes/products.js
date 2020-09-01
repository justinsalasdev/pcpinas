const express = require("express");
const router = express.Router();

const verifyUser = require("../controllers/shared/verifyUser");
const verifyAdmin = require("../controllers/shared/verifyAdmin");
const getUserById = require("../controllers/shared/getUserById");
const create = require("../controllers/products/create");
const list = require("../controllers/products/list");
const getProductById = require("../controllers/shared/getProductById");
const getPhoto = require("../controllers/products/getPhoto");
const detemineCollections = require("../controllers/shared/determineCollection");
const remove = require("../controllers/products/remove");
const edit = require("../controllers/products/edit");

// router.get("/product/:productId", read);
router.get("/products/:collection", list);
// router.get("/products/categories", listCategories);
// router.get("/products/related/:productId", listRelated);
router.get("/product/photo/:collection/:productId", getPhoto);
// router.post("/products/by/search", listBySearch);
router.post(
  "/product/create/:collection/:userId",
  verifyUser,
  verifyAdmin,
  create
);
router.delete(
  "/product/delete/:collection/:userId/:productId",
  verifyUser,
  verifyAdmin,
  remove
);
router.put(
  "/product/edit/:collection/:userId/:prodId",
  verifyUser,
  verifyAdmin,
  edit
);

router.param("collection", detemineCollections);
router.param("userId", getUserById);
router.param("productId", getProductById);

module.exports = router;
