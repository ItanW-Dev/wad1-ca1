'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    
    // Gather app info to display on the about page
    const viewData = {
      title: "Welcome to the Playlist app!",
      info: appStore.getAppInfo()
    };
    
    response.render('about', viewData);   
  },
};

export default about;
