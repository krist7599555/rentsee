import { reactive } from '@vue/composition-api';

import {
  my_axios as axi,
  token as tok,
} from '../utils/my_axios';
import {
  LoginDto,
  RegisterDto,
} from './types';

export const auth = reactive({
  //* state
  user: null as User | null,
  //* function
  logout,
  profile,
  login,
  register
});

async function logout() {
  auth.user = null;
  tok.clear();
}

async function profile() {
  auth.user = await axi.$get('/api/profile');
}

async function login(body: LoginDto) {
  const { user, token } = await axi.$post('/api/login', body);
  auth.user = user;
  tok.set(token);
}

async function register(body: RegisterDto) {
  const { user, token } = await axi.$post('/api/register', body);
  auth.user = user;
  tok.set(token);
}

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
