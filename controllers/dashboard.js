'use strict';

import logger from "../utils/logger.js";
import guitarCollection from "../models/guitar-collection.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    // Fetch all guitars from the collection to display on dashboard
    const viewData = {
      title: "Guitar App Dashboard",
      guitars: guitarCollection.getAllGuitars()
    };
    
    // Log the guitars data for debugging
    logger.debug(viewData.guitars);
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;
