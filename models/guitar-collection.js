'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const guitarCollection = {

  store: new JsonStore('./models/guitar-collection.json', { GuitarCollection: [] }),
  collection: 'GuitarCollection',
  array: 'guitars',

  getAllGuitars() {
    return this.store.findAll(this.collection);
  },
  getGuitar(id) {
    return this.store.findOneBy(this.collection, (guitar => guitar.id === id));
},


};

export default guitarCollection;
