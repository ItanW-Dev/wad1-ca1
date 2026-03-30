'use strict';

import logger from '../utils/logger.js';
import guitarCollection from '../models/guitar-collection.js';
import { v4 as uuidv4 } from 'uuid';

const guitars = {
  createView(request, response) {
    // Extract the guitar ID from the URL parameters
    const guitarId = request.params.id;
    logger.debug(`Guitar id = ${guitarId}`);
    
    // Retrieve the specific guitar from the collection
    const viewData = {
      title: 'Guitar',
      singleGuitar: guitarCollection.getGuitarList(guitarId)
    };

    response.render('guitarlist', viewData);
  },
  addGuitar(request, response) {
    const guitarId = request.params.id;
    const guitar = guitarCollection.getGuitarList(guitarId);
    const newGuitar = {
      id: uuidv4(),
      title: request.body.title,
      description: request.body.description,
    };
    guitarCollection.addGuitar(guitarId, newGuitar);
    response.redirect('/guitar/' + guitarId);
},
deleteGuitar(request, response) {
    const guitarlistId = request.params.id;
    const guitarId = request.params.guitarid;
    logger.debug(`Deleting Guitar ${guitarId} from List ${guitarlistId}`);
    guitarCollection.removeGuitar(guitarlistId, guitarId);
    response.redirect('/guitar/' + guitarlistId);
},

};

export default guitars ;
