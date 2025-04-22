const { Book } = require("../models");

const getBooksByCategory = async (req, res) => {
    const id = +req.params.id;
    
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 1;
    
    try {
        if (isNaN(id) || isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) return res.status(400).json("invalid input of parameters")
        
        const offset = (page - 1) * pageSize;
        if (req.query.genre) {
            const selectBook = await Book.findAll({
                where: { categoryId: id},
                limit: pageSize,
                offset: offset,
                attributes: ['title', 'image', 'author', 'description', 'audio', 'id'],
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            console.log("hellooooooo", selectBook);
            
            if (selectBook.length === 0) return res.status(400).json({ error: "there are no books related to wanted category or genre" });
            
            console.log("helloooo",selectBook);
            
            
            return res.status(200).json({ books: selectBook, currentPage: page });
        };
        const result = await Book.findAll({
            where: { categoryId: id },
            limit: pageSize,
            offset: offset,
            attributes: ['title', 'image', 'author', 'description', 'audio']

        });
        if (result.length === 0) return res.status(400).json({ error: "there are no books related to wanted category" });

        return res.status(200).json({ books: result, currentPage: page });
    }
    catch (error) {
        console.log("error while fetching books: ", error);
        
        return res.status(500).json({"error occured while fetching book: " :error})
    }
};

const getBook = async (req, res) => {
    const { id } = req.params;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    try {
        const result = await Book.findAll({
            where: { id: id },
            limit: pageSize,
            offset: offset,
            attributes: ['title', 'image', 'author', 'audioDuration', 'description'],
            include: {
                model: Category,
                attributes: ['name']
            }

        });
        if (!result) return res.status(400).json({ error: "there are no books under this id" });

        return res.status(200).json({ books: result, currentPage: page });
    }
    catch (error) {
        return res.status(500).json(error)
    }
};

const readBook = async (req, res) => {
    const { id } = req.params;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    try {
        const result = await Book.findAll({
            where: { id: id },
            limit: pageSize,
            offset: offset,
            attributes: ['title', 'bookUrl', 'audio'],
        });
        if (!result) return res.status(400).json({ error: "there are no books related to wanted category" });

        return res.status(200).json({ books: result, currentPage: page });
    }
    catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    getBooksByCategory,
    getBook,
    readBook
}