'use strict';

import logger from '../utils/logger.js';
import guitarCollection from '../models/guitar-collection.js';

const guitars = {
  createView(request, response) {
    const guitarId = request.params.id;
    logger.debug(`Guitar id = ${guitarId}`);
    
    const viewData = {
      title: 'Guitar',
      singleGuitar: guitarCollection.getGuitar(guitarId)
    };

    response.render('guitarlist', viewData);
  },
};

export default guitars ;
