import ExperimentStore from '../../../src/store/ExperimentStore';
import ApiService from '../../../src/service/ApiService';

const mockServiceUrl = process.env.CLUSTER_SERVICE_URL;

const mockExperiments = [
  {
    id: 1,
    name: 'TestDockerfile',
    createdAt: '01.01.20',
    size: '500',
    ownerId: 1,
  },
  {
    id: 2,
    name: 'TestDockerfile',
    createdAt: '01.01.20',
    size: '500',
    ownerId: 1,
  },
  {
    id: 3,
    name: 'TestDockerfile',
    createdAt: '01.01.20',
    size: '500',
    ownerId: 1,
  },
];

const mockExecutionDetails = {
  experimentId: '1',
  ram: '',
  cpu: '',
  bookedTime: '',
};

const mockExecutions = [
  {
    id: '1',
    experimentId: '1',
    name: 'Test Execution',
    createdAt: new Date(),
    startedAt: new Date(),
    terminatedAt: new Date(),
    status: '',
    ram: '',
    cpu: '',
    bookedTime: '',
  },
];

jest.mock('../../../src/service/ApiService', () => jest.fn());

// vuex mocks
let dispatch;
let commit;


describe('ExperimentStore', () => {
  describe('fetch Experiments', () => {
    beforeEach(() => {
      commit = jest.fn();
    });

    test('successfully', async () => {
      // arrange
      ApiService.doGet = jest.fn(() => mockExperiments);

      // act
      await ExperimentStore.actions.fetchExperiments({ commit });

      // assert
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(ApiService.doGet.mock.calls[0][0]).toBe(`${mockServiceUrl}/experiments`);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit.mock.calls[0][0]).toBe('updateExperiments');
      expect(commit.mock.calls[0][1]).toBe(mockExperiments);
    });

    test('with error', async () => {
      // arrange
      ApiService.doGet = jest.fn(() => null);

      // act
      await ExperimentStore.actions.fetchExperiments({ commit });

      // assert
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(ApiService.doGet.mock.calls[0][0]).toBe(`${mockServiceUrl}/experiments`);
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });

  describe('starts an execution', () => {
    beforeEach(() => {
      dispatch = jest.fn();
    });

    test('successfully', async () => {
      // arrange
      ApiService.doPost = jest.fn(() => mockExecutions[0]);

      // act
      const response = await ExperimentStore.actions.runExecution(
        { dispatch }, mockExecutionDetails);

      // assert
      expect(response).toBe(mockExecutions[0]);
      expect(ApiService.doPost).toHaveBeenCalledTimes(1);
      expect(ApiService.doPost.mock.calls[0][0]).toBe(`${mockServiceUrl}/experiments/${mockExecutionDetails.experimentId}/execute`);
    });

    test('with error', async () => {
      // arrange
      ApiService.doPost = jest.fn(() => null);

      // act
      const response = await ExperimentStore.actions.runExecution(
        { dispatch }, mockExecutionDetails);

      // assert
      expect(response).toBe(null);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
