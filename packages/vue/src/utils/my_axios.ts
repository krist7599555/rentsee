import axios, { AxiosInstance } from 'axios';
import { ToastProgrammatic as Toast } from 'buefy';
import * as ls from 'local-storage';
import * as _ from 'lodash';

const TOKEN = 'token';

export const token = {
  set: val => ls.set(TOKEN, val),
  get: () => ls.get(TOKEN),
  clear: () => ls.remove(TOKEN)
};

export const my_axios: AxiosInstance & MyAxiosInstance = axios.create({
  // baseURL: 'http://0.0.0.0:19888'
}) as any;

my_axios.interceptors.request.use(req => {
  req.headers['Authorization'] = `Bearer ${token.get()}`;
  return req;
});

my_axios.interceptors.response.use(
  res => {
    const conf = res.config;
    const msg = `${conf.method!.toUpperCase()} ${conf.url}`;
    Toast.open({ type: 'is-success', message: msg, queue: false });
    return res;
  },
  err => {
    console.error(err);
    const data = err.response.data;
    const conf = err.response.config;
    const msg = `${conf.method.toUpperCase()} ${conf.url}`;
    Toast.open({
      type: 'is-danger',
      message: msg + ': ' + (_.isString(data) ? data : data.message),
      queue: false
    });
    return Promise.reject(err);
  }
);

//* AXIOS Extension $get, $post

interface MyAxiosInstance {
  $get(url: string): Promise<any>;
  $post(url: string, body?: any): Promise<any>;
  $patch(url: string, body?: any): Promise<any>;
  $delete(url: string): Promise<any>;
}

for (let method of ['get', 'post', 'patch', 'delete']) {
  my_axios[`$` + method] = function() {
    return my_axios[method](...arguments).then(
      res => Promise.resolve(res.data),
      err => {
        console.log(err);
        return Promise.reject(err.response.data);
      }
    );
  };
}
