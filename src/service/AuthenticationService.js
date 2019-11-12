import axios from 'axios';

const serviceUrl = 'http://localhost:8081';

const configurations = {
  headers: {
  },
};

export default class AuthenticationService {
  static async login(userName, password) {
    const loginSuccess = await axios.post(`${serviceUrl}/authenticate`, { username: userName, password }).then((resp) => {
      if (resp.data.jwtToken) {
        localStorage.setItem('user', JSON.stringify(resp.data));
        return true;
      }
      return false;
    })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (loginSuccess) {
      alert('Login Successful!');
    } else {
      alert('Login failed');
    }
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
