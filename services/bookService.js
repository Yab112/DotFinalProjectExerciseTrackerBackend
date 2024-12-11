import bookRepository from '../repositories/bookRepository.js';

const createBook = async (bookData) => {
    try {
      return await bookRepository.createBook(bookData);
    } catch (error) {
      console.error("Error creating book:", error);
      throw new Error("Failed to create book");
    }
  };
 

const getBooks = async (userId) => {
  return await bookRepository.getBooksByUser(userId);
};

const checkIfBookExists = async (title, userId) => {
  return await bookRepository.findBookByTitleAndUser(title, userId);
};


const findBookByIdAndUser = async (bookId, userId) => {
  return await bookRepository.findBookByIdAndUser(bookId, userId);
};

const deleteBook = async (bookId) => {
  try {
    return await bookRepository.deleteBook(bookId);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
};

  
export default {
  createBook,
  getBooks,
  checkIfBookExists,
  deleteBook,
  findBookByIdAndUser,
};


