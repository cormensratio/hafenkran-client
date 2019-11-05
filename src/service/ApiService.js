import axios from 'axios';
import { forEach } from 'lodash';

export const configurations = {
  headers: {
  },
};

export default class ApiService {
  static doGet(url) {
    const requestConfig = configurations;
    requestConfig.headers.Authentication = localStorage.getItem('user');
    return axios.get(url, requestConfig).then((response) => {
      console.log('Received response from: ', url);
      return response;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static doPost(url, params, headers) {
    const requestConfig = configurations;
    requestConfig.headers.Authentication = localStorage.getItem('user');
    //forEach(headers, h => requestConfig.headers.push(h));

    return axios.post(url, params, requestConfig).then((response) => {
      console.log('Received response from: ', url);
      return response;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }
}
