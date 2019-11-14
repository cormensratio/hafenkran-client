import axios from 'axios';
import { isNil, forOwn } from 'lodash';
import store from '../store/store';

export const configurations = {
  headers: {
  },
};

export default class ApiService {
  static async doGet(url, additionalHeaders) {
    const requestConfig = configurations;
    requestConfig.headers = this.computeRequestHeaders(additionalHeaders);

    return axios.get(`${url}`, requestConfig).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static async doPost(url, params, additionalHeaders) {
    const requestConfig = configurations;
    requestConfig.headers = this.computeRequestHeaders(additionalHeaders);

    return axios.post(`${url}`, params, requestConfig).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static computeRequestHeaders(additionalHeaders) {
    const loggedIn = store.getters.isAuthenticated;
    const headers = {};
    if (loggedIn) {
      headers.Authorization = `Bearer ${store.getters.jwtToken}`;
    }

    if (!isNil(additionalHeaders)) {
      forOwn(additionalHeaders, (value, key) => {
        headers[key] = value;
      });
    }

    return headers;
  }
}
