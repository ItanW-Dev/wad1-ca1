'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';


const employee = {

  store: new JsonStore('./models/employee.json', { employees: [] }),
  collection: 'employees',
  array: 'creators',

  getAllEmployees() {
    return this.store.findAll(this.collection);
  },
  getEmployee(id) {
    return this.store.findOneBy(this.collection, (employee => employee.id === id));
},


};

export default employee;
