import { isEqual, isNil } from 'lodash';
import ApiService from './ApiService';
import store from '../store/store';

export const jwtToken = {
  token: '',
  expires: 0,
};

export default class AuthService {
  static extractTokenInfo(token) {
    if (!isNil(token) && !isEqual(token, '')) {
      const tokenInfo = JSON.parse(atob(token.split('.')[1]));
      if (!isNil(tokenInfo) && !AuthService.isTokenExpired(tokenInfo.exp)) {
        jwtToken.token = token;
        jwtToken.expires = tokenInfo.exp;
        localStorage.setItem('user', token);
        console.log('Successfully extracted token information');
        return true;
      }
    }
    console.log('Failed to extract token info');
    return false;
  }

  static isTokenExpired(expiryTimeStamp) {
    return (Date.now() >= expiryTimeStamp * 1000);
  }

  static async checkTokenValidity() {
    const valid = !isEqual(jwtToken.token, '')
      && (jwtToken.expires > 0)
      && !AuthService.isTokenExpired(jwtToken.expires);

    if (!valid) {
      console.log('Fetching new token');
      const userInfo = store.getters.user;
      const newToken = await this.fetchToken(userInfo.name, userInfo.password);
      this.extractTokenInfo(newToken);
    }
  }

  static async fetchToken(name, password) {
    const response = await ApiService.doPost(`${process.env.USER_SERVICE_URL}/authenticate`,
      { name, password });
    if (!isNil(response)) {
      console.log('Received Token from User-Service');
      return response.jwtToken;
    }
    console.log('Failed fetching JWT!');
    return null;
  }

  static async login(name, password) {
    const token = await this.fetchToken(name, password);
    if (!isNil(token) && !isEqual(token, '')) {
      this.extractTokenInfo(token);
      return true;
    }
    return false;
  }

  static logout() {
    localStorage.removeItem('user');
  }
}
