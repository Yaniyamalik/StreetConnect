import dotenv from 'dotenv';
import connectDB from './databases/index.js';
import app from './app.js';

dotenv.config({ path: './.env' }); // ✅ FIXED PATH

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
  });
