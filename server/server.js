import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectDB from './config/db.js';  // fixed spelling
import logger from './logger.js';        // you forgot this import
import { ClerkWebhooks } from './controller/Webhooks.js';

const app = express();

// Fix 1: make sure DB connects before server starts
connectDB()
  .then(() => {
    app.use(cors());
    app.use(express.json());

    // Logger for errors
    app.use((err, req, res, next) => {
      logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    app.get('/', (req, res) => {
      res.send('Hello World');
    });
    app.post('/webhook',ClerkWebhooks)

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });
