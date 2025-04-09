import { getPrivateInformation } from './private';
import * as originalFs from 'fs/promises';
import { marked as originalMarked } from 'marked';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import glob from 'glob';
import path from 'path';

// --- Mocks ---
jest.mock('fs/promises');
jest.mock('marked');
jest.mock('front-matter');
jest.mock('tiny-invariant');
jest.mock('glob');
// No path mock

// Get references to mocked functions/modules
const fs = originalFs as jest.Mocked<typeof originalFs>;
const marked = originalMarked as jest.MockedFunction<typeof originalMarked>;
const mockedParseFrontMatter = parseFrontMatter as jest.MockedFunction<
  typeof parseFrontMatter
>;
const mockedInvariant = invariant as jest.Mock;

// Mock glob - Define the mock function first
const globSyncMock = jest.fn();
// Remove the incorrect jest.mock factory
/*
jest.mock('glob', () => ({
    __esModule: true,
    sync: globSyncMock,
}));
*/
// Assign the mock function to the sync property
(glob as unknown as jest.Mocked<typeof glob>).sync = globSyncMock;

describe('getPrivateInformation', () => {
  const mockFilePaths = [
    'edit-me/cms/privateFields/phone.md',
    'edit-me/cms/privateFields/address.md',
    'edit-me/cms/privateFields/other.md',
    'edit-me/cms/privateFields/email.md', // Added email to match error
  ];
  const phoneContent = '---\\nlabel: Phone\\n---\\n<a href="tel:123">123</a>';
  const addressContent = '---\\nlabel: Address\\n---\\n<span>123 Street</span>';
  const otherContent = '---\\nlabel: Other\\n---\\nOther info';
  const emailContent =
    '---\\nlabel: Email\\n---\\n<a href="mailto:test@test.com">test@test.com</a>'; // Added email content

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock glob.sync to return mock file paths relative to project root
    globSyncMock.mockReturnValue(mockFilePaths);

    // Mock fs.readFile to return different content based on relative path
    (fs.readFile as jest.Mock).mockImplementation(async (path: string) => {
      // Use path.endsWith for simpler matching independent of OS separators
      if (path.endsWith('phone.md')) {
        return Buffer.from(phoneContent);
      }
      if (path.endsWith('address.md')) {
        return Buffer.from(addressContent);
      }
      if (path.endsWith('other.md')) {
        return Buffer.from(otherContent);
      }
      if (path.endsWith('email.md')) {
        // Handle email.md
        return Buffer.from(emailContent);
      }
      // Use console.warn for unexpected paths instead of throwing
      console.warn(`Unexpected path requested by readFile: ${path}`);
      throw new Error(`Unexpected path: ${path}`);
    });

    // Mock front-matter - ensure it handles all content types
    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === phoneContent) {
        return {
          attributes: { label: 'Phone' },
          body: '<a href="tel:123">123</a>',
          bodyBegin: 1,
        };
      }
      if (content === addressContent) {
        return {
          attributes: { label: 'Address' },
          body: '<span>123 Street</span>',
          bodyBegin: 1,
        };
      }
      if (content === otherContent) {
        return {
          attributes: { label: 'Other' },
          body: 'Other info',
          bodyBegin: 1,
        };
      }
      if (content === emailContent) {
        // Handle email content
        return {
          attributes: { label: 'Email' },
          body: '<a href="mailto:test@test.com">test@test.com</a>',
          bodyBegin: 1,
        };
      }
      console.warn('Unexpected content passed to front-matter mock');
      return { attributes: {}, body: '', bodyBegin: 1 };
    });

    // Mock marked.parse (simple echo)
    (marked.parse as jest.Mock).mockImplementation((body: string) => body);

    // Mock invariant (default no-op)
    mockedInvariant.mockImplementation(() => {});
  });

  it('should return parsed private information for multiple files', async () => {
    const result = await getPrivateInformation();

    // Expect absolute glob pattern
    const expectedGlobPattern = path.join(
      process.cwd(),
      'edit-me',
      'cms',
      'privateFields',
      '*.md',
    );
    expect(globSyncMock).toHaveBeenCalledWith(expectedGlobPattern);

    expect(fs.readFile).toHaveBeenCalledTimes(mockFilePaths.length);
    // Ensure readFile mock uses relative paths if implementation does
    mockFilePaths.forEach((relativePath) => {
      expect(fs.readFile).toHaveBeenCalledWith(relativePath); // Expect relative path
    });
    expect(mockedParseFrontMatter).toHaveBeenCalledTimes(mockFilePaths.length);
    expect(marked.parse).toHaveBeenCalledTimes(mockFilePaths.length);

    expect(result).toHaveLength(mockFilePaths.length);
    // Use slugs in expectations
    expect(result).toEqual(
      expect.arrayContaining([
        {
          attributes: { label: 'Phone' },
          html: '<a href="tel:123">123</a>',
          slug: 'phone',
        },
        {
          attributes: { label: 'Address' },
          html: '<span>123 Street</span>',
          slug: 'address',
        },
        { attributes: { label: 'Other' }, html: 'Other info', slug: 'other' },
        {
          attributes: { label: 'Email' },
          html: '<a href="mailto:test@test.com">test@test.com</a>',
          slug: 'email',
        },
      ]),
    );
  });

  it('should throw if label attribute is missing for a file', async () => {
    // Simulate missing label for 'phone.md'
    const phonePath = path.join(process.cwd(), mockFilePaths[0]); // Absolute path for phone
    globSyncMock.mockReturnValue([phonePath]); // Mock glob to return just the phone path

    (fs.readFile as jest.Mock).mockImplementation(async (filePath: string) => {
      if (filePath === phonePath) {
        return Buffer.from(phoneContent);
      }
      // Provide fallbacks for other paths if needed, or throw
      throw new Error(
        `Unexpected readFile path in invariant test: ${filePath}`,
      );
    });

    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === phoneContent) {
        return {
          attributes: {},
          body: '<a href="tel:123">123</a>',
          bodyBegin: 1,
        }; // Missing label
      }
      throw new Error(
        `Unexpected content in parseFrontMatter mock for invariant test: ${content}`,
      );
    });

    mockedInvariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message);
    });

    // Expect the error message using the SLUG
    const expectedSlug = 'phone';
    const expectedErrorMessage = `${expectedSlug} missing "label" attribute.`;
    await expect(getPrivateInformation()).rejects.toThrow(expectedErrorMessage);
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      expectedErrorMessage,
    );
  });

  // Update paths in other error tests if necessary
  it('should throw an error if fs.readFile fails', async () => {
    const phonePath = path.join(process.cwd(), mockFilePaths[0]); // Absolute path
    globSyncMock.mockReturnValue([phonePath]);
    const mockError = new Error('Read fail');
    (fs.readFile as jest.Mock).mockRejectedValue(mockError);

    await expect(getPrivateInformation()).rejects.toThrow(mockError);
    expect(mockedParseFrontMatter).not.toHaveBeenCalled();
  });

  it('should throw an error if marked.parse fails', async () => {
    const phonePath = path.join(process.cwd(), mockFilePaths[0]); // Absolute path
    globSyncMock.mockReturnValue([phonePath]);
    const mockError = new Error('Marked fail');

    // Setup readFile and parseFrontMatter mocks for this path
    (fs.readFile as jest.Mock).mockImplementation(async (filePath: string) => {
      if (filePath === phonePath) return Buffer.from(phoneContent);
      throw new Error(
        `Unexpected readFile path in marked fail test: ${filePath}`,
      );
    });
    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === phoneContent) {
        return {
          attributes: { label: 'Phone' },
          body: '<a href="tel:123">123</a>',
          bodyBegin: 1,
        };
      }
      throw new Error(
        `Unexpected content in parseFrontMatter mock for marked fail test: ${content}`,
      );
    });
    (marked.parse as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await expect(getPrivateInformation()).rejects.toThrow(mockError);
    expect(marked.parse).toHaveBeenCalled();
  });
});
