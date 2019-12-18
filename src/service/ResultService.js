import { isNil } from 'lodash';
import csvjson from 'csvjson';

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

  static convertCsVToJson(csvFile) {
    if (!isNil(csvFile)) {
      try {
        debugger;
        const jsonObj = csvjson.toObject(csvFile);

        if (!isNil(jsonObj)) {
          return jsonObj;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }

  static extractFileFromResult(resultObject) {
    if (!isNil(resultObject)) {
      const file = this.extractFileObjectFromBase64String(resultObject.file, resultObject.id);

      if (!isNil(file)) {
        return file;
      }
    }
    return null;
  }

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
