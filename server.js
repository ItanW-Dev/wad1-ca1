'use strict';

import express from 'express';
import routes from "./routes.js";
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';
import bodyParser from "body-parser";


const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, }));

// Configure Handlebars as the templating engine
const handlebars = create({extname: '.hbs'});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// Use the main router for all incoming requests
app.use("/", routes);

// Start the server and listen on the specified port
app.listen(port, () => logger.info(`Your app is listening on port ${port}`));
