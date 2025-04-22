const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { addBook, updateBook, deleteBook, addCategory, getCategories, addBookAndGenre,
    addGenre, getGenres,
    addPlease} = require("../controller/admin");
const please = require("../middleware/please");

    router.post("/upload", please, addPlease)
router.post("/", upload, addBook);
router.put("/:id", upload, updateBook);
router.delete("/:id", deleteBook);

router.post("/category", upload, addCategory);
router.get("/category", getCategories);

router.post("/genre", addGenre);
router.get("/genre", getGenres);

router.post("/bookGenre", addBookAndGenre);




module.exports = router;