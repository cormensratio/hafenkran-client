import axios from 'axios';

export const configurations = {
  headers: {
  },
};

const serviceUrl = 'http://localhost:8081';

export default class ApiService {
  static async doGet(url) {
    const requestConfig = configurations;
    requestConfig.headers.Authentication = localStorage.getItem('user');
    return axios.get(`${serviceUrl}${url}/`).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }

  static async doPost(url, params) {
    const requestConfig = configurations;
    requestConfig.headers.Authentication = localStorage.getItem('user');
    // forEach(headers, h => requestConfig.headers.push(h));


    return axios.post(`${serviceUrl}${url}`, params, requestConfig).then((resp) => {
      console.log('Received response from: ', url);
      return resp.data;
    })
      .catch((error) => {
        console.log(`Response to ${url} failed: `, error);
      });
  }
}
