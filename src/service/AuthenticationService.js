import axios from 'axios';

const serviceUrl = 'http://localhost:8081';

const configurations = {
  headers: {
  },
};

export default class AuthenticationService {
  static login(userName, password) {
    return axios.post(`${serviceUrl}/authenticate`, { username: userName, password }).then((resp) => {
      if (resp.data.jwtToken) {
        localStorage.setItem('user', JSON.stringify(resp.data));
      }
      return resp;
    })
      .catch((error) => {
        console.log(error);
      });
  }

  static async getMe() {
    const user = JSON.parse(localStorage.getItem('user'));
    configurations.headers.Authorization = `Bearer ${user.jwtToken}`;
    return axios.get(`${serviceUrl}/users/me`).then((resp) => {
      console.log(resp);
      return resp.data;
    })
      .catch((error) => {
        console.log(error);
      });
  }

  static logout() {
    localStorage.removeItem('user');
  }
}
