import { reactive } from '@vue/composition-api';

import { my_axios as axi } from '../utils/my_axios';

export const rents = reactive({
  values: [],
  find,
  create,
  _clear
});

function create(carId: string) {
  return axi.$post(`/api/rents/${carId}`);
}
async function find() {
  return (rents.values = await axi.$get('/api/rents'));
}
function _clear() {
  return axi.$delete('/api/rents');
}

export interface Rent {
  _id?: any;
  carId: string;
  renterId: string;
  lessorId: string;
  pickUpDateTime: Date;
  pickUpLocation: string;
  returnDateTime: Date;
  returnLocation: string;
}

const RENT_INTERFACE = [
  // { field: 'carId', type: 'string' },
  // { field: 'renterId', type: 'string' },
  // { field: 'lessorId', type: 'string' },
  { field: 'pickUpDateTime', type: 'date' },
  { field: 'pickUpLocation', type: 'string' },
  { field: 'returnDateTime', type: 'date' },
  { field: 'returnLocation', type: 'string' }
];
