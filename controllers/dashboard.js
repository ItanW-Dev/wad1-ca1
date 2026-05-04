'use strict';

import logger from "../utils/logger.js";
import guitarCollection from "../models/guitar-collection.js";
import { v4 as uuidv4 } from 'uuid';
import guitars from "./guitarlist.js";
import accounts from './accounts.js';

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);
if (loggedInUser) {
    const searchTerm = request.query.searchTerm || "";

    const guitars = searchTerm
      ? guitarCollection.searchUserGuitars(searchTerm, loggedInUser.id)
      : guitarCollection.getUserGuitars(loggedInUser.id);

    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;

    let sorted = guitars;

    if (sortField) {
      sorted = guitars.slice().sort((a, b) => {
        if (sortField === "title") {
          return a.series.localeCompare(b.series) * order;
        }

        return 0;
      });
    }

    const viewData = {
      title: "Guitar Collection Dashboard",
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      guitars: sortField ? sorted : guitars,
      search: searchTerm,
      titleSelected: request.query.sort === "title",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    logger.info('about to render' + viewData.guitars);

    response.render("dashboard", viewData);
  }
  else response.redirect('/');
},
  addGuitarList(request, response) {
     const loggedInUser = accounts.getCurrentUser(request);
     const timestamp = new Date();

    const newGuitarList = {
      userid: loggedInUser.id,
      id: uuidv4(),
      series: request.body.series,
      date: timestamp,
      guitars: [],
    };
    guitarCollection.addGuitarList(newGuitarList, request.files.picture, function(){
      response.redirect('/dashboard');
    });
},
deleteGuitarList(request, response) {
    const guitarListId = request.params.id;
    logger.debug(`Deleting Guitar List ${guitarListId}`);
    guitarCollection.removeGuitarList(guitarListId, function(){
      response.redirect("/dashboard");
    });
},

};

export default dashboard;
