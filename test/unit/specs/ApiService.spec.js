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
    // arrange
    axios.get.mockResolvedValue(response);

    // act
    ApiService.doGet().then((data) => {
      // assert
      expect(data).toEqual(response.data);
    });
  });

  it('makes a POST request and returns the response data', () => {
    // arrange
    axios.post.mockResolvedValue(response);

    // act
    ApiService.doPost().then((data) => {
      // assert
      expect(data).toEqual(response.data);
    });
  });
});
