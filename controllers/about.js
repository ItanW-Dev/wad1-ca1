'use strict';

import logger from "../utils/logger.js";
import employee from "../models/employee.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    
     const viewData = {
      title: "Welcome to the Playlist app!",
      info: employee.getAppInfo()
    };
    
    response.render('about', viewData);   
  },
};


export default about;
