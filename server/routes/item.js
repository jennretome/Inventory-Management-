const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

/**
 *  Items Routes
 */
router.get("/", itemController.homepage);
router.get("/about", itemController.about);
router.get("/add", itemController.addItem);
router.post("/add", itemController.postItem);
router.get("/view/:id", itemController.view);
router.get("/edit/:id", itemController.edit);
router.put("/edit/:id", itemController.editPost);
router.delete("/edit/:id", itemController.deleteItem);

router.post("/search", itemController.searchItems);

module.exports = router;
