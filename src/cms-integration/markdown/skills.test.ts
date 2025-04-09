import { getSkillCategories } from './skills';
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

// Get references to mocked functions/modules
const fs = originalFs as jest.Mocked<typeof originalFs>;
const marked = originalMarked as jest.MockedFunction<typeof originalMarked>;
const mockedParseFrontMatter = parseFrontMatter as jest.MockedFunction<
  typeof parseFrontMatter
>;
const mockedInvariant = invariant as jest.Mock;

// Mock glob
const globSyncMock = jest.fn();
(glob as unknown as jest.Mocked<typeof glob>).sync = globSyncMock;

describe('getSkillCategories', () => {
  // Define mock paths and slugs
  const mockPath1 = 'edit-me/cms/skills/languages.md';
  const mockPath2 = 'edit-me/cms/skills/frameworks.md';
  const mockSlug1 = 'languages';
  const mockSlug2 = 'frameworks';
  // Keep existing content/attribute mocks
  const mockFileContent1 = `---\\ntitle: Languages\\n---\\n- JS\\n- TS`;
  const mockFileContent2 = `---\\ntitle: Frameworks\\n---\\n- React\\n- Next`;
  const mockBody1 = '- JS\\n- TS';
  const mockBody2 = '- React\\n- Next';
  const mockHtmlContent1 = '<ul><li>JS</li><li>TS</li></ul>';
  const mockHtmlContent2 = '<ul><li>React</li><li>Next</li></ul>';
  const mockAttributes1 = { title: 'Languages' };
  const mockAttributes2 = { title: 'Frameworks' };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock glob.sync (default: return both paths)
    globSyncMock.mockReturnValue([mockPath1, mockPath2]);

    // Mock fs.readFile based on full path
    (fs.readFile as jest.Mock).mockImplementation(async (filePath) => {
      if (filePath === mockPath1) {
        return Buffer.from(mockFileContent1);
      }
      if (filePath === mockPath2) {
        return Buffer.from(mockFileContent2);
      }
      throw new Error(`Unexpected readFile call: ${filePath}`);
    });

    // Mock front-matter based on exact content
    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === mockFileContent1) {
        return { attributes: mockAttributes1, body: mockBody1, bodyBegin: 1 };
      }
      if (content === mockFileContent2) {
        return { attributes: mockAttributes2, body: mockBody2, bodyBegin: 1 };
      }
      // Throw error for unexpected content
      throw new Error(
        `Unexpected content in parseFrontMatter mock: ${content}`,
      );
      // return { attributes: {}, body: '', bodyBegin: 1 }; // Old fallback
    });

    // Mock marked.parse based on exact body
    (marked.parse as jest.Mock).mockImplementation((body: string) => {
      if (body === mockBody1) {
        return mockHtmlContent1;
      }
      if (body === mockBody2) {
        return mockHtmlContent2;
      }
      // Throw error for unexpected body
      throw new Error(`Unexpected body in marked.parse mock: ${body}`);
      // return ''; // Old fallback
    });

    // Mock invariant (default no-op)
    mockedInvariant.mockImplementation(() => {});

    // Remove fs.readdir mock - it's not used
    // (fs.readdir as jest.Mock).mockResolvedValue([]);
  });

  it('should return parsed skill categories for multiple files', async () => {
    // Remove fs.readdir setup - not needed
    // (fs.readdir as jest.Mock).mockResolvedValue([mockFileName1, mockFileName2] as any);

    const result = await getSkillCategories();

    // Check glob.sync call
    expect(globSyncMock).toHaveBeenCalledTimes(1);
    // Expect the absolute path pattern used in the implementation
    const expectedGlobPattern = path.join(
      process.cwd(),
      'edit-me',
      'cms',
      'skills',
      '*.md',
    );
    expect(globSyncMock).toHaveBeenCalledWith(expectedGlobPattern);

    // Remove fs.readdir assertions
    // expect(fs.readdir).toHaveBeenCalledTimes(1);
    // expect(fs.readdir).toHaveBeenCalledWith(expect.any(String));

    // Check other mocks with full paths/constants
    expect(fs.readFile).toHaveBeenCalledTimes(2);
    expect(fs.readFile).toHaveBeenCalledWith(mockPath1);
    expect(fs.readFile).toHaveBeenCalledWith(mockPath2);
    expect(mockedParseFrontMatter).toHaveBeenCalledTimes(2);
    expect(marked.parse).toHaveBeenCalledTimes(2);
    expect(mockedInvariant).toHaveBeenCalledTimes(2); // 1 check * 2 files

    expect(result).toHaveLength(2);
    // Order depends on glob.sync result, assuming mockPath1 then mockPath2
    expect(result[0]).toEqual({
      attributes: mockAttributes1,
      html: mockHtmlContent1,
      slug: mockSlug1, // Use constant
    });
    expect(result[1]).toEqual({
      attributes: mockAttributes2,
      html: mockHtmlContent2,
      slug: mockSlug2, // Use constant
    });
  });

  it('should return an empty array if the directory is empty', async () => {
    globSyncMock.mockReturnValue([]); // Mock glob to return empty
    const result = await getSkillCategories();
    expect(result).toEqual([]);
    expect(globSyncMock).toHaveBeenCalledTimes(1);
    // Remove fs.readdir assertion
    // expect(fs.readdir).toHaveBeenCalledTimes(1);
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  it('should throw if title attribute is missing', async () => {
    globSyncMock.mockReturnValue([mockPath1]); // Mock glob to return one file
    // Correct the path used in the mock implementation to match the implementation's lookup
    (fs.readFile as jest.Mock).mockImplementation(async (filePath: string) => {
      if (filePath === mockPath1) {
        return Buffer.from(mockFileContent1);
      }
      throw new Error(
        `Unexpected path in readFile mock for invariant test: ${filePath}`,
      );
    });
    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === mockFileContent1) {
        return { attributes: {}, body: mockBody1, bodyBegin: 1 }; // Missing title
      }
      throw new Error(
        `Unexpected content in parseFrontMatter mock for error test: ${content}`,
      );
    });
    mockedInvariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message);
    });

    // Error message should use the slug derived from the path
    const expectedSlug = mockSlug1; // From mockPath1
    const expectedErrorMessage = `${expectedSlug} missing "title" attribute.`;

    await expect(getSkillCategories()).rejects.toThrow(expectedErrorMessage);
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      expectedErrorMessage,
    );
  });

  it('should throw an error if fs.readFile fails', async () => {
    globSyncMock.mockReturnValue([mockPath1]); // Mock glob
    const mockError = new Error('Read fail');
    (fs.readFile as jest.Mock).mockRejectedValue(mockError);

    await expect(getSkillCategories()).rejects.toThrow(mockError);
    expect(mockedParseFrontMatter).not.toHaveBeenCalled();
  });

  it('should throw an error if marked.parse fails', async () => {
    globSyncMock.mockReturnValue([mockPath1]); // Mock glob
    const mockError = new Error('Marked fail');
    // Ensure frontmatter mock is set up correctly for this path using absolute path
    (fs.readFile as jest.Mock).mockImplementation(async (filePath: string) => {
      if (filePath === mockPath1) {
        return Buffer.from(mockFileContent1);
      }
      throw new Error(
        `Unexpected path in readFile mock for marked fail test: ${filePath}`,
      );
    });
    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === mockFileContent1) {
        return { attributes: mockAttributes1, body: mockBody1, bodyBegin: 1 };
      }
      throw new Error(
        `Unexpected content in parseFrontMatter mock for marked fail test: ${content}`,
      );
    });
    (marked.parse as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await expect(getSkillCategories()).rejects.toThrow(mockError);
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(mockedParseFrontMatter).toHaveBeenCalledTimes(1);
  });

  // Invalid tests for level/category are already removed
});
