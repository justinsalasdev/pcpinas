const express = require("express");
const list = require("../controllers/categories/list");
const matchJWT = require("../controllers/shared/verifyUser");
const create = require("../controllers/categories/create");
const getUserById = require("../controllers/shared/getUserById");
const verifyAdmin = require("../controllers/shared/verifyAdmin");
const router = express.Router();

router.get("/categories", list);
// router.get("/category/:categoryId", read);
router.post("/category/create/:userId", verifyAdmin, matchJWT, create);
// router.put(
//     "/category/:categoryId/:userId",
//     decodeJWT,
//     isAuth,
//     isAdmin,
//     update
// );
// router.delete(
//     "/category/:categoryId/:userId",
//     decodeJWT,
//     isAuth,
//     isAdmin,
//     remove
// );

// router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

module.exports = router;
