import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
 
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Server environment:', process.env.NODE_ENV || 'development');
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM signal. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); 
  }
};

startServer();