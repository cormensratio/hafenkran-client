import ApiService from './ApiService';

const API_URL = 'http://localhost:8081/';

export default class AuthenticationService {
  static login(userName, password) {
    ApiService.doPost(`${API_URL}/authenticate`, { username: userName, password })
      .then((response) => {
        if (response.data.jwtToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      });
  }

  static register(userName, password) {
    ApiService.doPost(`${API_URL}/signup`, { username: userName, password });
  }

  static logout() {
    localStorage.removeItem('user');
  }
}
