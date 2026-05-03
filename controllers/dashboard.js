'use strict';

import logger from "../utils/logger.js";
import guitarCollection from "../models/guitar-collection.js";
import { v4 as uuidv4 } from 'uuid';
import guitars from "./guitarlist.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const searchTerm = request.query.searchTerm || "";

    const guitars = searchTerm
      ? guitarCollection.searchGuitars(searchTerm)
      : guitarCollection.getAllGuitars();

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
      guitars: sortField ? sorted : guitars,
      search: searchTerm,
      titleSelected: request.query.sort === "title",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    logger.debug(viewData.guitars);

    response.render("dashboard", viewData);
  },
  addGuitarList(request, response) {
     const timestamp = new Date();

    const newGuitarList = {
      id: uuidv4(),
      series: request.body.series,
      date: timestamp,
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
