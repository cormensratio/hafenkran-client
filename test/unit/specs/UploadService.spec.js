import UploadService from '../../../src/service/UploadService';

describe('UploadService', () => {
  it('should only accept files with the right file type', () => {
    const mockFileName = 'test.tar';

    expect(UploadService.checkFileType(mockFileName)).toBe(true);
  });

  it('should reject file names with no ending', () => {
    const mockFileNameWithoutEnding = 'test';

    expect(UploadService.checkFileType(mockFileNameWithoutEnding)).toBe(false);
  });

  it('should reject file names with the wrong file type', () => {
    const mockFileNameWrongType = 'test.jar';

    expect(UploadService.checkFileType(mockFileNameWrongType)).toBe(false);
  });
});
