const express = require("express");
const { getBook, getBooksByCategory, readBook } = require("../controller/user");
const router = express.Router();

router.get("/category/:id", getBooksByCategory);
router.get("/:id", getBook);
router.get("/read/:id", readBook);

module.exports = router;