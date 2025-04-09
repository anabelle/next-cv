import { getPersonalInformation } from './personal';
import * as originalFs from 'fs/promises';
import { marked as originalMarked } from 'marked';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';

// --- Mocks ---
jest.mock('fs/promises');
jest.mock('marked');
jest.mock('front-matter');
jest.mock('tiny-invariant');
// No path mock needed for this strategy

// Get references to mocked functions/modules
const fs = originalFs as jest.Mocked<typeof originalFs>;
const marked = originalMarked as jest.MockedFunction<typeof originalMarked>;
const mockedParseFrontMatter = parseFrontMatter as jest.MockedFunction<
  typeof parseFrontMatter
>;
const mockedInvariant = invariant as jest.Mock;

describe('getPersonalInformation', () => {
  const mockFileContent = `---\\nlocation: Mock City\\nfamilyName: Person\\ngivenName: Mock\\n---\\nAbout Mock Person`;
  const mockHtmlContent = '<p>About Mock Person</p>';
  const mockAttributes = {
    location: 'Mock City',
    familyName: 'Person',
    givenName: 'Mock',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock fs.readFile
    (fs.readFile as jest.Mock).mockResolvedValue(Buffer.from(mockFileContent));

    // Mock front-matter
    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === mockFileContent) {
        return {
          attributes: mockAttributes,
          body: 'About Mock Person',
          bodyBegin: 1,
        };
      }
      return { attributes: {}, body: '', bodyBegin: 1 };
    });

    // Mock marked.parse
    (marked.parse as jest.Mock).mockImplementation((body: string) => {
      if (body === 'About Mock Person') {
        return mockHtmlContent;
      }
      return '';
    });

    // Mock invariant (default no-op)
    mockedInvariant.mockImplementation(() => {});
  });

  it('should read file, parse, and return personal information', async () => {
    const result = await getPersonalInformation();

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith(expect.any(String)); // Path is internal
    expect(mockedParseFrontMatter).toHaveBeenCalledWith(mockFileContent);
    expect(marked.parse).toHaveBeenCalledWith('About Mock Person');
    expect(mockedInvariant).toHaveBeenCalledTimes(3); // Location, FamilyName, GivenName
    expect(mockedInvariant).toHaveBeenCalledWith(
      mockAttributes.location,
      expect.any(String),
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      mockAttributes.familyName,
      expect.any(String),
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      mockAttributes.givenName,
      expect.any(String),
    );
    expect(result).toEqual({
      attributes: mockAttributes,
      html: mockHtmlContent,
    });
  });

  it('should throw if location attribute is missing', async () => {
    mockedParseFrontMatter.mockReturnValueOnce({
      attributes: { familyName: 'Person', givenName: 'Mock' },
      body: 'Body',
      bodyBegin: 1,
    });
    mockedInvariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message);
    });

    await expect(getPersonalInformation()).rejects.toThrow(
      'personal.md missing "location" attribute.',
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      'personal.md missing "location" attribute.',
    );
  });

  it('should throw if familyName attribute is missing', async () => {
    mockedParseFrontMatter.mockReturnValueOnce({
      attributes: { location: 'City', givenName: 'Mock' },
      body: 'Body',
      bodyBegin: 1,
    });
    mockedInvariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message);
    });

    await expect(getPersonalInformation()).rejects.toThrow(
      'personal.md missing "familyName" attribute.',
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      expect.anything(),
      'personal.md missing "location" attribute.',
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      'personal.md missing "familyName" attribute.',
    );
  });

  it('should throw if givenName attribute is missing', async () => {
    mockedParseFrontMatter.mockReturnValueOnce({
      attributes: { location: 'City', familyName: 'Person' },
      body: 'Body',
      bodyBegin: 1,
    });
    mockedInvariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message);
    });

    await expect(getPersonalInformation()).rejects.toThrow(
      'personal.md missing "givenName" attribute.',
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      expect.anything(),
      'personal.md missing "location" attribute.',
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      expect.anything(),
      'personal.md missing "familyName" attribute.',
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      'personal.md missing "givenName" attribute.',
    );
  });

  it('should throw an error if fs.readFile fails', async () => {
    const mockError = new Error('Read fail');
    (fs.readFile as jest.Mock).mockRejectedValue(mockError);

    await expect(getPersonalInformation()).rejects.toThrow(mockError);
    expect(mockedParseFrontMatter).not.toHaveBeenCalled();
    expect(marked.parse).not.toHaveBeenCalled();
  });

  it('should throw an error if marked.parse fails', async () => {
    const mockError = new Error('Marked fail');
    (marked.parse as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await expect(getPersonalInformation()).rejects.toThrow(mockError);
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(mockedParseFrontMatter).toHaveBeenCalledTimes(1);
    expect(marked.parse).toHaveBeenCalledTimes(1);
  });
});
