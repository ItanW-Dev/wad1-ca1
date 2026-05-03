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
  getGuitarList(id) {
    return this.store.findOneBy(this.collection, (guitar => guitar.id === id));
},

addGuitar(id, guitar) {
    this.store.addItem(this.collection, id, this.array, guitar);
},

addGuitarList(guitarList) {
    this.store.addCollection(this.collection, guitarList);
},
removeGuitar(id, guitarId) {
    this.store.removeItem(this.collection, id, this.array, guitarId);
},
removeGuitarList(id) {
    const guitarList = this.getGuitarList(id);
    this.store.removeCollection(this.collection, guitarList);
},
editGuitar(id, guitarId, updatedGuitar) {
    this.store.editItem(this.collection, id, guitarId, this.array, updatedGuitar);
},

searchGuitars(search) {
    return this.store.findBy(
      this.collection,
      (guitar => guitar.series.toLowerCase().includes(search.toLowerCase()))
    );
},

};

export default guitarCollection;
