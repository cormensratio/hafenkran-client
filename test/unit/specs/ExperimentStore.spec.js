import ExperimentStore from '../../../src/store/ExperimentStore';

jest.mock('axios');

const experiments = [{
  id: 1,
  name: 'TestDockerfile',
  createdAt: '01.01.20',
  size: '500',
  userId: 1,
}];

describe('actions', () => {
  it('should fetch all experiments', () => {
    expect(ExperimentStore.fetchExperiments()).toBe(experiments);
  });
});
