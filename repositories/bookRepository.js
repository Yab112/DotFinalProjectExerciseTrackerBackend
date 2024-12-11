import Book from '../models/bookModel.js';

const findBookByTitleAndUser = async (title, userId) => {
  return await Book.findOne({ title, userId });
};

const createBook = async (data) => {
  return await Book.create(data);
};

const getBooksByUser = async (userId) => {
  return await Book.find({ userId });
};  

const findBookByIdAndUser = async (bookId, userId) => {
    return await Book.findOne({ _id: bookId, userId });
  };
  
const deleteBook = async (bookId) => {
    return await Book.findByIdAndDelete(bookId);
  };

export default {
  findBookByTitleAndUser,
  createBook,
  getBooksByUser,
  deleteBook,
  findBookByIdAndUser
  
};
