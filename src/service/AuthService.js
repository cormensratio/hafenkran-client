import { isEqual, isNil } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import ApiService from './ApiService';

export const jwtToken = {
  token: '',
  expires: 0,
};

export const refreshToken = {
  token: '',
  expires: 0,
};

export default class AuthService {
  static extractTokenInfo(token) {
    if (!isNil(token) && !isEqual(token, '')) {
      const tokenInfo = this.getTokenPayload(token);
      if (!isNil(tokenInfo) && !this.isTokenExpired(tokenInfo.exp)) {
        const output = {};
        output.token = token;
        output.expires = tokenInfo.exp;
        console.log('Successfully extracted token information');
        return output;
      }
    }
    console.log('Failed to extract token info');
    return null;
  }

  static isTokenExpired(expiryTimeStamp) {
    return (Date.now() >= expiryTimeStamp * 1000);
  }

  static getTokenPayload(token) {
    let output;
    try {
      output = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      throw new Error(e);
    }
    return output;
  }

  /**
   * Checks if tokens (refresh-token and user token) already exist in localstorage
   * and if they are expired.
   * If the refresh token is expired, localstorage is cleared.
   * If just the user jwt is invalid, a new token is fetched.
   * @returns {Promise<boolean|Promise<boolean>>}
   */
  static async initAuthentication() {
    const existingRefreshJWT = localStorage.getItem('refresh-token');
    const existingJWT = localStorage.getItem('user');

    if (!isNil(existingRefreshJWT)) {
      const refreshTokenInfo = this.extractTokenInfo(existingRefreshJWT);

      if (!isNil(refreshTokenInfo) && !this.isTokenExpired(refreshTokenInfo.exp)) {
        refreshToken.token = refreshTokenInfo.token;
        refreshToken.expires = refreshTokenInfo.expires;

        const tokenInfo = this.extractTokenInfo(existingJWT);
        if (!isNil(tokenInfo) && !this.isTokenExpired(tokenInfo.exp)) {
          jwtToken.token = tokenInfo.token;
          jwtToken.expires = tokenInfo.expires;
          return true;
        }

        return this.fetchNewJWT();
      }
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('user');
    }
    return false;
  }

  static async fetchRefreshToken(name, password) {
    const response = await ApiService.doPost(`${process.env.USER_SERVICE_URL}/authenticate`,
      { name, password });
    if (!isNil(response) && !isNil(response.jwtToken)) {
      const tokenInfo = this.extractTokenInfo(response.jwtToken);
      refreshToken.token = tokenInfo.token;
      refreshToken.expires = tokenInfo.expires;
      localStorage.setItem('refresh-token', tokenInfo.token);
      console.log('Received refresh token from User-Service');
      return true;
    }
    console.log('Failed fetching initial JWT!');
    return false;
  }

  static async fetchNewJWT() {
    const config = { headers: {} };
    config.headers.Authorization = `Bearer ${refreshToken.token}`;
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/refresh`, config).then(
      resp => resp.data,
    );

    if (!isNil(response) && !isNil(response.jwtToken)) {
      const tokenInfo = this.extractTokenInfo(response.jwtToken);
      jwtToken.token = tokenInfo.token;
      jwtToken.expires = tokenInfo.expires;
      localStorage.setItem('user', jwtToken.token);
      return true;
    }
    console.log('Failed fetching JWT!');
    return false;
  }

  static async checkIfNewJWTRequired() {
    const expires = moment(jwtToken.expires * 1000);
    const secondsUntilExpiry = moment.duration(moment().diff(expires)).asSeconds();

    if (secondsUntilExpiry <= 60) {
      console.log('About to fetch new JWT...');
      return this.fetchNewJWT();
    }
    return false;
  }

  static async login(name, password) {
    let fetchSuccessful = await this.fetchRefreshToken(name, password);
    if (fetchSuccessful) {
      fetchSuccessful = await this.fetchNewJWT();
    }
    return fetchSuccessful;
  }

  static logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('refresh-token');
  }
}
