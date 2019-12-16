import { isNil } from 'lodash';
import { serviceUrl } from '../store/ExecutionStore';
import ApiService from './ApiService';

export default class ExecutionDetailService {
  static async getExecutionLogsbyId(id) {
    const result = await ApiService.doGet(`${serviceUrl}/executions/${id}/logs?withTimestamp=ulllul`);
    if (result !== undefined) {
      return result;
    }
    return null;
  }
  static async postUserInput(userInput, executionId) {
    let responseData;
    if (!isNil(userInput) && !isNil(executionId)) {
      responseData = await ApiService.doPost(`${serviceUrl}/executions/${executionId}/stdin`, { input: userInput });
    }
    return !!responseData;
  }
  static async downloadResults(executionId, executionName) {
    if (!isNil(executionId)) {
      const base64FileString = await ApiService.doGet(`${serviceUrl}/executions/${executionId}/results`);
      const decoded = atob(base64FileString);
      if (!isNil(decoded)) {
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
