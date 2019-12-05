import axios from 'axios';
import { isNil, forOwn } from 'lodash';
import { jwtToken } from './AuthService';

export default class ApiService {
  static async doGet(url, config) {
    let requestConfig = { headers: {} };
    if (!isNil(config)) {
      requestConfig = config;
    }
    requestConfig.headers = await this.computeRequestHeaders(config);

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
    requestConfig.headers = await this.computeRequestHeaders(additionalHeaders);

    return axios.post(`${url}`, params, requestConfig).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static async doDelete(url, data, additionalHeaders) {
    const requestConfig = {};
    requestConfig.headers = await this.computeRequestHeaders(additionalHeaders);

    if (!isNil(data)) {
      requestConfig.data = data;
    }
    debugger;
    return axios.delete(`${url}`, requestConfig).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static async computeRequestHeaders(config) {
    const loggedIn = !isNil(localStorage.getItem('user'));
    const headers = {};
    if (loggedIn) {
      // TODO enable refetching of token if it expires soon
      // check if token is still valid, if not, fetch new one
      // await AuthService.checkTokenValidity();
      headers.Authorization = `Bearer ${jwtToken.token}`;
    }

    if (!isNil(config)) {
      forOwn(config, (value, key) => {
        headers[key] = value;
      });
    }

    return headers;
  }
}
