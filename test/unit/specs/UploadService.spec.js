import UploadService from '../../../src/service/UploadService';

describe('UploadService', () => {
  it('should only accept files with the right file type', () => {
    const mockFileType = { type: 'application/x-tar' };

    expect(UploadService.checkFileType(mockFileType)).toBe(true);
  });

  it('should reject file names with the wrong file type', () => {
    const mockWrongFileType = { type: 'application/zip' };

    expect(UploadService.checkFileType(mockWrongFileType)).toBe(false);
  });
});
