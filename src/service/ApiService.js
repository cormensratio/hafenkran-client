import axios from 'axios';
import { isNil, forOwn } from 'lodash';
import store from '../store/store';

export default class ApiService {
  static async doGet(url, config) {
    let requestConfig = { headers: {} };
    if (!isNil(config)) {
      requestConfig = config;
    }
    requestConfig.headers = this.computeRequestHeaders(config);

    return axios.get(`${url}`, requestConfig).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static async doPost(url, params, additionalHeaders) {
    const requestConfig = {};
    requestConfig.headers = this.computeRequestHeaders(additionalHeaders);

    return axios.post(`${url}`, params, requestConfig).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static computeRequestHeaders(config) {
    const loggedIn = store.getters.isAuthenticated;
    const headers = {};
    if (loggedIn) {
      headers.Authorization = `Bearer ${store.getters.jwtToken}`;
    }

    if (!isNil(config) && !isNil(config.headers)) {
      forOwn(config, (value, key) => {
        headers[key] = value;
      });
    }

    return headers;
  }
}
