import UploadService from '../../../src/service/UploadService';

describe('UploadService', () => {
  it('should only accept files with the right file type', () => {
    const mockFileType = 'application/x-tar';

    expect(UploadService.checkFileType(mockFileType)).toBe(true);
  });

  it('should reject file names with the wrong file type', () => {
    const mockWrongFileType = 'application/zip';

    expect(UploadService.checkFileType(mockWrongFileType)).toBe(false);
  });
});
