export interface User {
  _id?: string | any;
  username: string;
  password: string;
  drivingLisense: string;
  email: string;
  bankAccountNumber: string;
  address: string;
  phoneNumber: string;
  creditCardNumber: string;
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
