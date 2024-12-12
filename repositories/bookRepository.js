import Book from '../models/bookModel.js';

const findBookByTitleAndUser = async (title, userId) => {
  return await Book.findOne({ title, userId });
};


const createBook = async (data) => {
  try {
    return await Book.create(data);
  } catch (error) {
    console.error('Error in repository:', error);
    throw new Error('Database error: Failed to create book');
  }
};

export const checkIfBookExists = async (title, userId) => {
  try {
    const existingBook = await Book.findOne({ title, userId });
    return existingBook;
  } catch (error) {
    console.error("Error checking for existing book:", error);
    throw new Error("Database error: Unable to check for existing book");
  }
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
