import ExperimentStore from '../../../src/store/ExperimentStore';
import ApiService from '../../../src/service/ApiService';

const mockServiceUrl = process.env.CLUSTER_SERVICE_URL;

const mockExperiments = [
  { id: 1,
    name: 'TestDockerfile',
    createdAt: '01.01.20',
    size: '500',
    ownerId: 1,
  },
  { id: 2,
    name: 'TestDockerfile',
    createdAt: '01.01.20',
    size: '500',
    ownerId: 1,
  },
  { id: 3,
    name: 'TestDockerfile',
    createdAt: '01.01.20',
    size: '500',
    ownerId: 1,
  },
];

jest.mock('../../../src/service/ApiService', () => jest.fn());

// vuex mocks
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
});
