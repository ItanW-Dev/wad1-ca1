'use strict';

import logger from '../utils/logger.js';
import guitarCollection from '../models/guitar-collection.js';

const guitars = {
  createView(request, response) {
    // Extract the guitar ID from the URL parameters
    const guitarId = request.params.id;
    logger.debug(`Guitar id = ${guitarId}`);
    
    // Retrieve the specific guitar from the collection
    const viewData = {
      title: 'Guitar',
      singleGuitar: guitarCollection.getGuitar(guitarId)
    };

    response.render('guitarlist', viewData);
  },
};

export default guitars ;
