'use strict';

import logger from "../utils/logger.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    // Set up page title for the start/home page
    const viewData = {
      title: "Welcome to the Playlist app!",
    };

    response.render('start', viewData);   
  },
};

export default start;
