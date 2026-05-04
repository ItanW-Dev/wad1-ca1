'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import guitars from './controllers/guitarlist.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
// Route to display a specific guitar by ID
router.get('/guitar/:id', guitars.createView);
router.post('/guitar/:id/addguitar', guitars.addGuitar);
router.post('/guitar/:id/updateguitar/:guitarid', guitars.updateGuitar);
router.post('/dashboard/addguitarlist', dashboard.addGuitarList);
router.get('/guitar/:id/deleteguitar/:guitarid', guitars.deleteGuitar);
router.get('/dashboard/deleteguitarlist/:id', dashboard.deleteGuitarList);
router.get('/stats', stats.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// Catch-all route for handling 404 errors
router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
