"use strict";
import logger from "../utils/logger.js";
import guitarCollection from "../models/guitar-collection.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const guitarLists = guitarCollection.getAllGuitars();

    let numGuitarLists = guitarLists.length;
    
    let numGuitars = guitarLists.reduce((total, guitarList) => total + guitarList.guitars.length, 0);
	
    let average = numGuitarLists > 0 ? (numGuitars / numGuitarLists).toFixed(2) : 0;

    const statistics = {
      displayNumGuitarLists: numGuitarLists,
      displayNumGuitars: numGuitars,
      displayAverage: average
    };

    const viewData = {
      title: "Guitar Collection Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);
  },
};

export default stats;
