const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: { type: String, required: true }, // 移除 unique: true 以测试
    name: { type: String, required: true },
    author: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;