export interface RegisterDto {
  username: string;
  password: string;
  drivingLisense: string;
  email: string;
  bankAccountNumber: string;
  address: string;
  phoneNumber: string;
  creditCardNumber: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
