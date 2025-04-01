import express from 'express';
import cors from 'cors';
import 'dotenv/config'

import connectDB from './config/db.js';
import logger from './logger.js'
import { ClerkWebhooks } from './controller/Webhooks.js';


const app = express();

// Connect to DB before starting the server
await connectDB()
  .then(() => {
    app.use(cors());
    app.use(express.json());

    // Routes
    app.get('/', (req, res) => {
      res.send('API Working');
    });

    app.post('/webhooks', ClerkWebhooks);

    // Error Handling Middleware (should be placed **after** routes)
    app.use((err, req, res, next) => {
      logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }); 

    // Start server only if DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('❌ Failed to connect to DB:', err);
    process.exit(1); // Ensures the server doesn't start in a broken state
  });
