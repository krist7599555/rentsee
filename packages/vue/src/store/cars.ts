import { reactive } from '@vue/composition-api';

import { my_axios as axi } from '../utils/my_axios';

export const cars = reactive({
  values: [],
  find,
  create,
  remove
});

async function find() {
  return (cars.values = await axi.$get('/api/cars'));
}
function create(car: any) {
  return axi.$post('/api/cars', car);
}
function remove(carId: string) {
  return axi.$delete(`/api/cars/${carId}`);
}

export interface Car {
  _id?: any;
  ownerId: string;
  licensePlate: string;
  capacity: number;
  photoOfCar: string;
  photoOfCarDocument: string;
  carModel: string;
  carType: string;
  carDescription: string;
  pricePerDay: number;
}
export const CAR_INTERFACE = [
  // { field: 'ownerId', type: 'string' },
  { field: 'licensePlate', type: 'string' },
  { field: 'capacity', type: 'number' },
  { field: 'photoOfCar', type: 'string' },
  { field: 'photoOfCarDocument', type: 'string' },
  { field: 'carModel', type: 'string' },
  { field: 'carType', type: 'string' },
  { field: 'carDescription', type: 'string' },
  { field: 'pricePerDay', type: 'number' }
];
