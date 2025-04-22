const fs = require("fs");

const deleteUploads = (image, book, audio) => {
    
    if (audio) {
        fs.unlinkSync(audio.path ? audio.path : audio);
    };
    if (image) {
        fs.unlinkSync(image.path ? image.path : image);   
    };
    if (book) {
        fs.unlinkSync(book.path ? book.path : book);   
    };

};

module.exports = deleteUploads;
    
