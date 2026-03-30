'use strict';

import logger from "../utils/logger.js";
import guitarCollection from "../models/guitar-collection.js";
import { v4 as uuidv4 } from 'uuid';
import guitars from "./guitarlist.js";

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
  addGuitarList(request, response) {
    const newGuitarList = {
      id: uuidv4(),
      series: request.body.series,
      guitars: [],
    };
    guitarCollection.addGuitarList(newGuitarList);
    response.redirect('/dashboard');
},
deleteGuitarList(request, response) {
    const guitarListId = request.params.id;
    logger.debug(`Deleting Guitar List ${guitarListId}`);
    guitarCollection.removeGuitarList(guitarListId);
    response.redirect("/dashboard");
},

};

export default dashboard;
