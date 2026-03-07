'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

// Store for managing guitar collection data
const guitarCollection = {
  // Initialize the store with the guitar-collection.json file
  store: new JsonStore('./models/guitar-collection.json', { GuitarCollection: [] }),
  collection: 'GuitarCollection',
  array: 'guitars',

  // Retrieve all guitar collections/series
  getAllGuitars() {
    return this.store.findAll(this.collection);
  },
  
  // Find a specific guitar series by ID
  getGuitar(id) {
    return this.store.findOneBy(this.collection, (guitar => guitar.id === id));
},


};

export default guitarCollection;
