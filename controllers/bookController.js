import bookService from '../services/bookService.js';

export const getBooks = async (req, res) => {
const userId = req.user.id;
  try {
    if (!req.user || !userId) {
      throw new Error('User information is not available.');
    }
    
    const books = await bookService.getBooks(userId);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

export const createBook = async (req, res) => {
    const userId = req.user.id; 
    try {
      const { title, author, description, price } = req.body; 
  
      
      const existingBook = await bookService.checkIfBookExists(title, userId);
  
      if (existingBook) {
        return res.status(400).json({ error: `Book with title "${title}" already exists for the user.` });
      }
  
     
      const book = await bookService.createBook({
        title,
        author,
        description,
        price,
        userId,
      });
  
      res.status(201).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create book' });
    }
  };


  export const deleteBook = async (req, res) => {
    const userId = req.user.id; 
    const { bookId } = req.body;
  
    try {
     
      const book = await bookService.findBookByIdAndUser(bookId, userId);
      
      if (!book) {
        return res.status(404).json({ error: "Book not found or you don't have permission to delete it." });
      }
  
      // Delete the book
      await bookService.deleteBook(bookId);
  
      res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete book." });
    }
  };
  
  