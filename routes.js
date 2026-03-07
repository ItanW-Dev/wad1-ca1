'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import guitars from './controllers/guitarlist.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
// Route to display a specific guitar by ID
router.get('/guitar/:id', guitars.createView);

// Catch-all route for handling 404 errors
router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
