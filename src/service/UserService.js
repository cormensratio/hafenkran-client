import { isEqual, isNil } from 'lodash';
import ApiService from './ApiService';

const serviceUrl = process.env.USER_SERVICE_URL;

export default class UserService {
  static async postUserRegistrateFormInput(userName, userEmail, userPassword) {
    let response;
    if (!isNil(userName) && !isNil(userEmail) && !isNil(userPassword)) {
      response = await ApiService.doPost(`${serviceUrl}/users/create`, { name: userName, password: userPassword, email: userEmail });
    }
    return !isNil(response) && !isEqual(response, '');
  }

  static async validateUserName(userName) {
    if (!isNil(userName)) {
      const isValid = await ApiService.doGet(`${serviceUrl}/users/${userName}`);

      if (isValid) {
        return true;
      }
    }
    return false;
  }
}
