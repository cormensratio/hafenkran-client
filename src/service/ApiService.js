import axios from 'axios';
import { isNil } from 'lodash';

export const configurations = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

export default class ApiService {
  static doGet(url, params) {
    return axios.get(url, params).then((response) => {
      console.log('Received response from: ', url);
      return response;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static doPost(url, params, config) {
    let requestConfig = config;
    if (isNil(config)) {
      requestConfig = configurations;
    }

    return axios.post(url, params, requestConfig).then((response) => {
      console.log('Received response from: ', url);
      return response;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }
}
