// Use jest.mock for hoisting
jest.mock('fs/promises');
jest.mock('path');
jest.mock('marked'); // Mock the entire module
jest.mock('front-matter');
jest.mock('tiny-invariant');

// Import originals for types and necessary named exports
import * as originalFs from 'fs/promises';
import * as originalPath from 'path';
import { marked } from 'marked'; // Import the function that is actually used
import originalParseFrontMatter from 'front-matter';
import originalInvariant from 'tiny-invariant';
import { getEducationalExperiences } from './educational'; // Import the function to test

// Define constants
const mockBasePath = '/mock/base/path';
const mockEducationPath = '/mock/base/path/edit-me/cms/educationalExperiences';
const mockFileName1 = 'experience1.md';
const mockFileName2 = 'experience2.md';
const mockFileContent1 = `---\nachievement: BSc Computer Science\ncompletionYear: '2020'\ninstitution: Mock University\n---\nBody 1`;
const mockFileContent2 = `---\nachievement: MSc AI\ncompletionYear: '2022'\ninstitution: Another Mock Uni\n---\nBody 2`;

// Mock process.cwd() early, before describe block
jest.spyOn(process, 'cwd').mockReturnValue(mockBasePath);

// Mock path.join implementation EARLY
(originalPath.join as jest.Mock).mockImplementation((...args) =>
  args.join('/'),
);

// Cast the imported 'marked' function AFTER jest.mock runs
const mockedMarked = marked as jest.MockedFunction<typeof marked>;

describe('getEducationalExperiences', () => {
  const fs = originalFs as jest.Mocked<typeof originalFs>;
  const path = originalPath as jest.Mocked<typeof originalPath>;
  const parseFrontMatter = originalParseFrontMatter as jest.MockedFunction<
    typeof originalParseFrontMatter
  >;
  const invariant = originalInvariant as jest.MockedFunction<
    typeof originalInvariant
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    // --- Mock Implementations ---

    // Mock fs.readdir
    fs.readdir.mockResolvedValue([]); // Default to empty, override in tests

    // Mock fs.readFile
    fs.readFile.mockImplementation(async (filePath) => {
      const normalizedPath = (filePath as string).replace(/\\/g, '/');
      if (normalizedPath.endsWith(mockFileName1)) {
        return Buffer.from(mockFileContent1);
      }
      if (normalizedPath.endsWith(mockFileName2)) {
        return Buffer.from(mockFileContent2);
      }
      // Throw error for unexpected calls ONLY if fs.readdir returned files
      // This prevents errors when readdir returns []
      if ((await fs.readdir(mockEducationPath)).length > 0) {
        throw new Error(`Unexpected readFile call: ${filePath}`);
      }
      // Should not be reached if readdir is empty, but return undefined for safety
      return undefined;
    });

    // Mock front-matter
    parseFrontMatter.mockImplementation((content: string) => {
      if (content === mockFileContent1) {
        return {
          attributes: {
            achievement: 'BSc Computer Science',
            completionYear: '2020',
            institution: 'Mock University',
          },
          body: 'Body 1',
          frontmatter:
            "achievement: BSc Computer Science\ncompletionYear: '2020'\ninstitution: Mock University",
          bodyBegin: 1,
        };
      }
      if (content === mockFileContent2) {
        return {
          attributes: {
            achievement: 'MSc AI',
            completionYear: '2022',
            institution: 'Another Mock Uni',
          },
          body: 'Body 2',
          frontmatter:
            "achievement: MSc AI\ncompletionYear: '2022'\ninstitution: Another Mock Uni",
          bodyBegin: 1,
        };
      }
      return { attributes: {}, body: '', frontmatter: '', bodyBegin: 1 };
    });

    // Mock marked
    mockedMarked.mockImplementation((body: string) => `<p>${body}</p>`);

    // Mock invariant
    invariant.mockImplementation(() => {});
  });

  // --- Tests ---

  it('should return parsed educational experiences', async () => {
    // Override fs.readdir for this test
    fs.readdir.mockResolvedValue([mockFileName1, mockFileName2] as any);

    const experiences = await getEducationalExperiences();

    // Assertions
    expect(fs.readdir).toHaveBeenCalledTimes(1);
    expect(fs.readdir).toHaveBeenCalledWith(mockEducationPath); // Check the correctly joined path
    expect(fs.readFile).toHaveBeenCalledTimes(2);
    // Assert readFile calls with the correctly joined paths
    expect(fs.readFile).toHaveBeenCalledWith(
      mockEducationPath + '/' + mockFileName1,
    );
    expect(fs.readFile).toHaveBeenCalledWith(
      mockEducationPath + '/' + mockFileName2,
    );
    expect(parseFrontMatter).toHaveBeenCalledTimes(2);
    expect(mockedMarked).toHaveBeenCalledTimes(2);
    expect(mockedMarked).toHaveBeenCalledWith('Body 1');
    expect(mockedMarked).toHaveBeenCalledWith('Body 2');
    expect(invariant).toHaveBeenCalledTimes(6); // 3 checks * 2 files

    expect(experiences).toHaveLength(2);
    // Note: readdir result is reversed in the original code
    expect(experiences[0]).toEqual({
      attributes: {
        achievement: 'MSc AI',
        completionYear: '2022',
        institution: 'Another Mock Uni',
      },
      html: '<p>Body 2</p>',
      slug: 'experience2',
    });
    expect(experiences[1]).toEqual({
      attributes: {
        achievement: 'BSc Computer Science',
        completionYear: '2020',
        institution: 'Mock University',
      },
      html: '<p>Body 1</p>',
      slug: 'experience1',
    });
  });

  it('should return an empty array if the directory is empty', async () => {
    // fs.readdir already mocked to return [] in beforeEach
    const experiences = await getEducationalExperiences();

    expect(experiences).toEqual([]);
    expect(fs.readdir).toHaveBeenCalledTimes(1);
    expect(fs.readdir).toHaveBeenCalledWith(mockEducationPath);
    expect(fs.readFile).not.toHaveBeenCalled();
    expect(parseFrontMatter).not.toHaveBeenCalled();
  });

  it('should throw error if achievement is missing', async () => {
    fs.readdir.mockResolvedValue([mockFileName1] as any);
    parseFrontMatter.mockReturnValueOnce({
      attributes: { completionYear: '2020', institution: 'Mock Uni' }, // Missing achievement
      body: 'Body 1',
      frontmatter: '',
      bodyBegin: 1,
    });
    invariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message as string);
    });

    await expect(getEducationalExperiences()).rejects.toThrow(
      `${mockFileName1} missing "achievement" attribute.`,
    );
    expect(invariant).toHaveBeenCalledWith(
      undefined,
      `${mockFileName1} missing "achievement" attribute.`,
    );
  });

  it('should throw error if completionYear is missing', async () => {
    fs.readdir.mockResolvedValue([mockFileName1] as any);
    parseFrontMatter.mockReturnValueOnce({
      attributes: { achievement: 'BSc', institution: 'Mock Uni' }, // Missing completionYear
      body: 'Body 1',
      frontmatter: '',
      bodyBegin: 1,
    });
    invariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message as string);
    });

    await expect(getEducationalExperiences()).rejects.toThrow(
      `${mockFileName1} missing "completionYear" attribute.`,
    );
    expect(invariant).toHaveBeenCalledWith(
      'BSc',
      `${mockFileName1} missing "achievement" attribute.`,
    ); // Previous check passes
    expect(invariant).toHaveBeenCalledWith(
      undefined,
      `${mockFileName1} missing "completionYear" attribute.`,
    ); // This one fails
  });

  it('should throw error if institution is missing', async () => {
    fs.readdir.mockResolvedValue([mockFileName1] as any);
    parseFrontMatter.mockReturnValueOnce({
      attributes: { achievement: 'BSc', completionYear: '2020' }, // Missing institution
      body: 'Body 1',
      frontmatter: '',
      bodyBegin: 1,
    });
    invariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message as string);
    });

    await expect(getEducationalExperiences()).rejects.toThrow(
      `${mockFileName1} missing "institution" attribute.`,
    );
    expect(invariant).toHaveBeenCalledWith(
      'BSc',
      `${mockFileName1} missing "achievement" attribute.`,
    );
    expect(invariant).toHaveBeenCalledWith(
      '2020',
      `${mockFileName1} missing "completionYear" attribute.`,
    );
    expect(invariant).toHaveBeenCalledWith(
      undefined,
      `${mockFileName1} missing "institution" attribute.`,
    );
  });

  it('should throw if fs.readFile fails', async () => {
    fs.readdir.mockResolvedValue([mockFileName1] as any);
    const mockReadError = new Error('FS Read Error');
    fs.readFile.mockRejectedValueOnce(mockReadError); // Simulate readFile failing

    await expect(getEducationalExperiences()).rejects.toThrow(mockReadError);
    expect(parseFrontMatter).not.toHaveBeenCalled(); // Should fail before parsing
  });

  it('should throw if marked fails', async () => {
    fs.readdir.mockResolvedValue([mockFileName1] as any);
    const mockMarkedError = new Error('Marked Error');
    // Use the cast reference for mockImplementationOnce
    mockedMarked.mockImplementationOnce(() => {
      throw mockMarkedError;
    });

    await expect(getEducationalExperiences()).rejects.toThrow(mockMarkedError);
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(parseFrontMatter).toHaveBeenCalledTimes(1);
  });
});
