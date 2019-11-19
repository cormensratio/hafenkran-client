import axios from 'axios';
import ApiService from '../../../src/service/ApiService';


jest.mock('axios');

const users = [{
  userId: 1,
  name: 'Rick',
  experiment: 'test',
}];
const response = { data: users };

describe('ApiService', () => {
  it('makes a GET request and returns the response data', () => {
    axios.get.mockResolvedValue(response);

    ApiService.doGet().then((data) => {
      expect(data).toEqual(response.data);
    });
  });

  it('makes a POST request and returns the response data', () => {
    axios.post.mockResolvedValue(response);

    ApiService.doPost().then((data) => {
      expect(data).toEqual(response.data);
    });
  });
});
