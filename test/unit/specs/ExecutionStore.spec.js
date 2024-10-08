import ExecutionStore from '../../../src/store/ExecutionStore';
import ApiService from '../../../src/service/ApiService';

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
    ownerId: '1',
  },
  {
    id: '2',
    experimentId: '1',
    name: 'Test Execution',
    createdAt: new Date(),
    startedAt: new Date(),
    terminatedAt: new Date(),
    status: '',
    ram: '',
    cpu: '',
    bookedTime: '',
    ownerId: '1',
  },
  {
    id: '3',
    experimentId: '2',
    name: 'Test Execution',
    createdAt: new Date(),
    startedAt: new Date(),
    terminatedAt: new Date(),
    status: '',
    ram: '',
    cpu: '',
    bookedTime: '',
    ownerId: '1',
  },
];

const mockServiceUrl = process.env.CLUSTER_SERVICE_URL;

jest.mock('../../../src/service/ApiService', () => jest.fn());

// vuex mocks
let dispatch;
let commit;

describe('ExecutionStore', () => {
  describe('fetches all executions of a user', () => {
    beforeEach(() => {
      commit = jest.fn();
    });

    test('successfully', async () => {
      // arrange
      ApiService.doGet = jest.fn(() => mockExecutions);

      // act
      await ExecutionStore.actions.fetchAllExecutionsOfUser({ commit });

      // assert
      // check that Api is called only one time
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);

      // check that Api is called with the correct url
      expect(ApiService.doGet).toHaveBeenCalledWith(`${mockServiceUrl}/executions`);

      // check that commit was called exactly one time
      expect(commit).toHaveBeenCalledTimes(1);

      // check if the right mutation is called with correct parameters
      expect(commit).toHaveBeenCalledWith('updateExecutions', mockExecutions);
    });

    test('with error', () => {
      // arrange
      ApiService.doGet = jest.fn(() => null);

      // act
      ExecutionStore.actions.fetchAllExecutionsOfUser({ commit });

      // assert
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });

  describe('fetches executions by experiment id', () => {
    beforeEach(() => {
      commit = jest.fn();
    });

    test('successfully', async () => {
      // arrange
      const mockResponse = [mockExecutions[0], mockExecutions[1]];
      const experimentId = 1;
      ApiService.doGet = jest.fn(() => mockResponse);

      // act
      await ExecutionStore.actions.fetchExecutionsByExperimentId({ commit }, experimentId);

      // assert
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(ApiService.doGet).toHaveBeenCalledWith(`${mockServiceUrl}/experiments/${1}/executions`);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('updateExecutions', mockResponse);
    });

    test('with error', async () => {
      // arrange
      const experimentId = 1;
      ApiService.doGet = jest.fn(() => null);

      // act
      await ExecutionStore.actions.fetchExecutionsByExperimentId({ commit }, experimentId);

      // assert
      expect(ApiService.doGet).toHaveBeenCalledTimes(1);
      expect(ApiService.doGet).toHaveBeenCalledWith(`${mockServiceUrl}/experiments/${1}/executions`);
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });

  describe('cancels an execution', () => {
    beforeEach(() => {
      dispatch = jest.fn();
    });

    test('successfully', async () => {
      // arrange
      const executionId = 1;
      ApiService.doPost = jest.fn(() => mockExecutions[0]);

      // act
      const returnValue = await ExecutionStore.actions.cancelExecution(
        { dispatch }, executionId);

      // assert
      expect(returnValue).toBe(mockExecutions[0]);
      expect(ApiService.doPost).toHaveBeenCalledTimes(1);
      expect(ApiService.doPost).toHaveBeenCalledWith(`${mockServiceUrl}/executions/${executionId}/cancel`);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('fetchAllExecutionsOfUser');
    });

    test('with error', async () => {
      // arrange
      const executionId = 1;
      ApiService.doPost = jest.fn(() => null);

      // act
      const returnValue = await ExecutionStore.actions.cancelExecution(
        { dispatch }, executionId);

      // assert
      expect(returnValue).toBe(null);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
