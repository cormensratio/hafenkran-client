import ApiService from './ApiService';
import { serviceUrl } from '../store/ExecutionStore';

export default class ExecutionResultService {
  static getExecutionResultsbyId(id) {
    const result = ApiService.doGet(`${serviceUrl}/executions/${id}`);
    return result;
  }
}
