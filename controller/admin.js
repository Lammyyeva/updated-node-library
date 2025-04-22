
const { Book, Category, bookGenre, Genre } = require("../models");
const deleteUploads = require("../services/deleteUploads");

const addPlease = async (req, res) => {
    const image = req.files['image'] ? req.files['image'][0] : null;
    const audio = req.files['audio'] ? req.files['audio'][0] : null;
    const book = req.files['book'] ? req.files['book'][0] : null;
    try {

        const result = {
            image: image.path,
            book: book.path,
            audio: audio.path,
        }
        return res.status(201).json(result);
    }
    catch (error) {
        //deleteUploads(image, book, audio);
        console.log("error occured while posting book", error);
        return res.status(500).json({ "error occured while posting book": error })
    }
}
  


const addBook = async (req, res) => {  
    const image = req.files['image'] ? req.files['image'][0] : null;
    const audio = req.files['audio'] ? req.files['audio'][0] : null;
    const book = req.files['book'] ? req.files['book'][0] : null;
    try {
        if (!image || !book || !req.body.title || !req.body.author || !req.body.description || !req.body.categoryId) {
            deleteUploads(image, book, audio);
            return res.status(400).json({ error: 'Please provide all required credentials correctly' });

        };

        const result = await Book.create({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            categoryId: parseInt(req.body.categoryId),
            image: image.path,
            audio: audio ? audio.path : null,
            audioDuration: req.body.audioDuration ? req.body.audioDuration : null,
            bookUrl: book.path
        });
        return res.status(201).json(result);
    }
    catch (error) {
        deleteUploads(image, book, audio);
        console.log("error occured while posting book", error);
        return res.status(500).json({"error occured while posting book": error})
    }
  
};

const updateBook = async(req, res) => {
    const id = req.params.id;
    const image = req.files ? req.files.image[0] : null
    const audio = req.files ? req.files.audio[0] : null
    const book = req.files ? req.files.book[0] : null
    try {
        const previous = await Book.findByPk(id);
        if (previous.length === 0) return res.status(400).json({ error: 'there is not a book with this id' });

        if (!image || !book || !req.body.title || !req.body.author || !req.body.description || !req.body.categoryId) {
            deleteUploads(image, book, audio);
            return res.status(400).json({ error: 'Please provide all required credentials correctly' });
        };
    
        const result = await Book.update({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            categoryId: parseInt(req.body.categoryId),
            image: image.path,
            audio: audio ? audio.path : null,
            audioDuration: req.body.audioDuration ? req.body.audioDuration : null,
            bookUrl: book.path
        }, {
            where: { id: id }
        });
        console.log(previous.image);
        
        deleteUploads(previous.image, previous.bookUrl, previous.audio);
        
        return res.status(201).json(result);
    }
    catch (error) {
        deleteUploads(image, book, audio);
        console.log("error occured while updating book", error);
        return res.status(500).json({"error occured while updating book": error})
    }
}

const deleteBook = async (req, res) => {
    const [id] = req.params.id;
    try {
        const book = await Book.findByPk(id);
        if (!book) return res.status(404).json({ error: "book you want to delete wasn't found" })
        
        const result = await Book.destroy(book);
        if (!result) return res.status(400).json({ error: "deletion was unseccessful" })
        
        return res.status(200).json(result);
    }
    catch (error) {
        console.log("error occured while deleting book", error);
        return res.status(500).json({"error occured while deleting book": error})
    }
}

const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const image = req.files.image[0] ? req.files.image[0] : null;        
        if (!image) return res.status(400).json({ error: "please provide a category image" });

        const category = await Category.create({
            name,
            image: image.path
        });
        return res.status(201).json(category);
    }
    catch (error) {
        console.log("error occured while adding category", error);
        return res.status(500).json({"error occured while adding category": error})
    }
    
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories.length === 0) return res.status(400).json("no category was found");
        
        return res.status(200).json(categories);
    }
    catch (error) {
        console.log("error occured while getting category", error);
        return res.status(500).json({"error occured while getting category": error})
    }
};

const addGenre = async (req, res) => {
    const name = req.body.name;
    try {
        const result = await Genre.create({
            name
        });

        if (result.length === 0) return res.status(400).json("posting genre was uncessfull");
        return res.status(201).json(result);
    }
    catch (error) {
        console.log("error occured while adding genre", error);
        return res.status(500).json({ "error occured while adding genre": error })
    }
};

const getGenres = async (req, res) => {
    const name = req.body.name;
    try {
        const result = await Genre.findAll();

        if (result.length === 0) return res.status(400).json("getting genre was uncessfull");
        return res.status(201).json(result);
    }
    catch (error) {
        console.log("error occured while adding genre", error);
        return res.status(500).json({"error occured while adding genre": error})
    }
}

const addBookAndGenre = async (req, res) => {
    const { bookId, genreId } = req.body;
    try {
        const result = await bookGenre.create({
        bookId,
        genreId
        });
        if (result.length === 0) return res.status(400).json("posting book genre was unccessful");

        return res.status(201).json(result);
    }
    catch (error) {
        console.log("error occured while adding book genre", error);
        return res.status(500).json({"error occured while adding book genre": error})
    }
}

module.exports = {
    addPlease,
    addBook,
    updateBook,
    deleteBook,
    addCategory,
    getCategories,
    addGenre,
    getGenres,
    addBookAndGenre
}