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

async addGuitarList(guitarList, file, response) {
  try {
    guitarList.image = await this.store.addToCloudinary(file);
    this.store.addCollection(this.collection, guitarList);
    response();
  } catch (error) {
    logger.error("Error processing guitar list:", error);
    response(error);
  }
},
removeGuitar(id, guitarId) {
    this.store.removeItem(this.collection, id, this.array, guitarId);
},
async removeGuitarList(id, response) {
    const guitarList = this.getGuitarList(id);

    if (guitarList.image && guitarList.image.public_id) {
      try {
        await this.store.deleteFromCloudinary(guitarList.image.public_id);
        logger.info("Cloudinary image deleted");
      } catch (error) {
        logger.error("Error deleting Cloudinary image:", error);
      }
    }
    this.store.removeCollection(this.collection, guitarList);
    response();
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

getUserGuitars(userid) {
  return this.store.findBy(this.collection, (guitar => guitar.userid === userid));
},

searchUserGuitars(search, userid) {
  return this.store.findBy(
    this.collection,
    (guitar => guitar.userid === userid && guitar.series.toLowerCase().includes(search.toLowerCase()))
  );
},

};

export default guitarCollection;
