"use strict";

import logger from "../utils/logger.js";
import guitarCollection from "../models/guitar-collection.js";
import accounts from "./accounts.js";

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (!loggedInUser) {
      return response.redirect("/");
    }

    logger.info("Stats page loading!");

    const allGuitarLists = guitarCollection.getAllGuitars();

    const totalListsAll = allGuitarLists.length;

    const totalGuitarsAll = allGuitarLists.reduce(
      (total, list) => total + (list.guitars ? list.guitars.length : 0),
      0
    );

    const avgAll =
      totalListsAll > 0 ? (totalGuitarsAll / totalListsAll).toFixed(2) : 0;

    const globalStats = {
      totalLists: totalListsAll,
      totalGuitars: totalGuitarsAll,
      average: avgAll
    };


    const userGuitarLists = guitarCollection.getUserGuitars(loggedInUser.id);

    const totalListsUser = userGuitarLists.length;

    const totalGuitarsUser = userGuitarLists.reduce(
      (total, list) => total + (list.guitars ? list.guitars.length : 0),
      0
    );

    const avgUser =
      totalListsUser > 0 ? (totalGuitarsUser / totalListsUser).toFixed(2) : 0;

    const userStats = {
      totalLists: totalListsUser,
      totalGuitars: totalGuitarsUser,
      average: avgUser
    };

    const viewData = {
      title: "Guitar Collection Statistics",
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      globalStats: globalStats,
      userStats: userStats
    };

    response.render("stats", viewData);
  }
};

export default stats;