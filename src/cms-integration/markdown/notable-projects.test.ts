import { getNotableProjects } from './notable-projects';
import * as originalFs from 'fs/promises';
import { marked as originalMarked } from 'marked';

// --- Mocks ---
jest.mock('fs/promises');
// No longer mocking path
// jest.mock('path');
jest.mock('marked');

// Get references to the mocked modules/functions
const fs = originalFs as jest.Mocked<typeof originalFs>;
// Get reference to the mocked default export
const mockedMarked = originalMarked as jest.MockedFunction<
  typeof originalMarked
>;

describe('getNotableProjects', () => {
  const mockFileContent = '# Mock Project Content';
  const mockHtmlContent = '<p>Mock Project Content</p>';

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock the main marked function
    mockedMarked.mockImplementation((content) => {
      if (content === mockFileContent) {
        return mockHtmlContent;
      }
      return '';
    });

    // Mock fs.readFile
    fs.readFile.mockResolvedValue(Buffer.from(mockFileContent));
  });

  it('should read the file, parse markdown, and return HTML', async () => {
    const result = await getNotableProjects();

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith(expect.any(String));
    // Assert against the main marked function
    expect(mockedMarked).toHaveBeenCalledTimes(1);
    expect(mockedMarked).toHaveBeenCalledWith(mockFileContent);
    expect(result).toEqual({ html: mockHtmlContent });
  });

  it('should throw an error if fs.readFile fails', async () => {
    const mockError = new Error('Failed to read file');
    fs.readFile.mockRejectedValue(mockError);

    await expect(getNotableProjects()).rejects.toThrow(mockError);

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith(expect.any(String));
    // Assert main marked function was not called
    expect(mockedMarked).not.toHaveBeenCalled();
  });

  it('should throw an error if marked fails', async () => {
    const mockError = new Error('Markdown parsing failed');
    // Mock the main marked function to throw
    mockedMarked.mockImplementation(() => {
      throw mockError;
    });

    await expect(getNotableProjects()).rejects.toThrow(mockError);

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith(expect.any(String));
    // Assert main marked function was called
    expect(mockedMarked).toHaveBeenCalledWith(mockFileContent);
  });
});
