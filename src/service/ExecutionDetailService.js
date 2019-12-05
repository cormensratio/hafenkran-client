import { isNil } from 'lodash';
import { serviceUrl } from '../store/ExecutionStore';
import ApiService from './ApiService';

export default class ExecutionDetailService {
  static async getExecutionLogsbyId(id) {
    const result = await ApiService.doGet(`${serviceUrl}/executions/${id}/logs`);
    if (result !== undefined) {
      return result;
    }
    return 'No new logs';
  }
  static async postUserInput(userInput, executionId) {
    let responseData;
    if (!isNil(userInput) && !isNil(executionId)) {
      const formData = new FormData();
      formData.append('input', userInput);
      responseData = await ApiService.doPost(`${serviceUrl}/executions/${executionId}/stdin`, formData);
    }
    return !!responseData;
  }
  static async downloadResults(executionId, executionName) {
    if (!isNil(executionId)) {
      const base64FileString = await ApiService.doGet(`${serviceUrl}/executions/${executionId}/results`);
      const decoded = atob(base64FileString);
      if (!isNil(base64FileString)) {
        const file = new Blob([decoded], { type: 'octet/stream' });
        this.saveFileDialog(file, `${executionName}.tar`);
        return true;
      }
    }
    return false;
  }

  static saveFileDialog(data, name) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
