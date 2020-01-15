import { isNil, forEach } from 'lodash';
import csv2json from 'csvjson-csv2json';

export default class ResultService {
  static extractFileObjectFromBase64String(fileString, fileName) {
    if (!isNil(fileString) && !isNil(fileName) && fileString !== '') {
      const decoded = atob(fileString);

      if (!isNil(decoded)) {
        return new File([decoded], fileName);
      }
    }
    return null;
  }

  static convertCsVToJson(csvString) {
    if (!isNil(csvString)) {
      try {
        const jsonObj = csv2json(csvString, { parseNumbers: true });

        if (!isNil(jsonObj)) {
          return jsonObj;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }

  /**
   * Converts metrics list to chart data
   * @param metrics the metrics list
   * @param key the key for the specific metric (cpu or ram)
   * @returns {Array}
   */
  static convertMetricsToChartData(metrics, key) {
    if (!isNil(metrics) && metrics.length > 0 && !isNil(metrics[0][key])) {
      const metricChartData = [];
      forEach(metrics, (metric) => {
        const dateTime = metric.timeStamp * 1000; // times 1000 to convert it to milliseconds
        metricChartData.push({ timestamp: dateTime, y: metric[key] });
      });

      return metricChartData;
    }
    return null;
  }

  /**
   * Extracts text content from file object and then calls the given callback function with the
   * extraction result as parameter
   * @param fileObject
   * @param callBack function that is called as soon as file reading is finished
   */
  static extractFileContent(fileObject, callBack) {
    if (!isNil(fileObject)) {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const reader = new FileReader();
        reader.readAsText(fileObject);
        reader.onload = () => callBack(reader.result);
      } else {
        console.log('[ERROR] The browser does not support file reading!');
      }
    }
  }
}
