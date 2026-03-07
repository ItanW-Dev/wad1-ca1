'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

// Store for managing application-level information
const appStore = {
  // Initialize the store with the app-store.json file
  store: new JsonStore('./models/app-store.json', { info: {} }),
  collection: 'info',
  array: 'creator',

  // Retrieve all application information
  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default appStore;
