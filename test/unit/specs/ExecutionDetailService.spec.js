import axios from 'axios';
import ExecutionResultService from '../../../src/service/ExecutionDetailService';

jest.mock('axios');

const executionDetails = [{
  id: '1',
  experimentId: '1',
  name: 'Test Execution',
  createdAt: new Date(),
  terminatedAt: new Date(),
  status: '',
  ram: '',
  cpu: '',
  bookedTime: '',
}];

const response = { data: executionDetails };

describe('ExecutionDetailSerivce', () => {
  it('should get the mocked logs', () => {
    axios.get.mockResolvedValue(response);

    ExecutionResultService.getExecutionResultsbyId(executionDetails.id)
      .then((data) => {
        expect(data)
          .toEqual(response.data);
      });
  });
});
