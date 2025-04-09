import { getProfessionalExperiences } from './professional';
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

describe('getProfessionalExperiences', () => {
  const mockPath1 = 'content/professional/job1.md';
  const mockPath2 = 'content/professional/job2.md';
  const mockFileName1 = 'job1.md';
  const mockFileName2 = 'job2.md';
  const mockFileContent1 = `---\r\norganization: Company A\r\nstartDate: '2020-01-01'\r\ntitle: Dev\r\n---\r\nDid stuff`;
  const mockFileContent2 = `---\r\norganization: Company B\r\nstartDate: '2022-01-01'\r\nendDate: '2023-01-01'\r\ntitle: Senior Dev\r\n---\r\nDid more stuff`;
  const mockBody1 = 'Did stuff';
  const mockBody2 = 'Did more stuff';
  const mockHtmlContent1 = '<p>Did stuff</p>';
  const mockHtmlContent2 = '<p>Did more stuff</p>';
  const mockAttributes1 = {
    organization: 'Company A',
    startDate: '2020-01-01',
    title: 'Dev',
  };
  const mockAttributes2 = {
    organization: 'Company B',
    startDate: '2022-01-01',
    endDate: '2023-01-01',
    title: 'Senior Dev',
  };
  const mockSlug1 = 'job1';
  const mockSlug2 = 'job2';

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock glob.sync
    globSyncMock.mockReturnValue([mockPath1, mockPath2]);

    // Mock fs.readFile to use constants based on full path
    (fs.readFile as jest.Mock).mockImplementation(async (path: string) => {
      if (path === mockPath1) {
        return Buffer.from(mockFileContent1);
      }
      if (path === mockPath2) {
        return Buffer.from(mockFileContent2);
      }
      throw new Error(`Unexpected path in readFile mock: ${path}`);
    });

    // Mock front-matter to use constants based on content
    mockedParseFrontMatter.mockImplementation((content: string) => {
      if (content === mockFileContent1) {
        return { attributes: mockAttributes1, body: mockBody1, bodyBegin: 1 };
      }
      if (content === mockFileContent2) {
        return { attributes: mockAttributes2, body: mockBody2, bodyBegin: 1 };
      }
      throw new Error(
        `Unexpected content in parseFrontMatter mock: ${content}`,
      );
    });

    // Mock marked.parse to use constants based on body
    (marked.parse as jest.Mock).mockImplementation((body: string) => {
      if (body === mockBody1) return mockHtmlContent1;
      if (body === mockBody2) return mockHtmlContent2;
      throw new Error(`Unexpected body in marked.parse mock: ${body}`);
    });

    // Mock invariant (default no-op)
    mockedInvariant.mockImplementation(() => {});
  });

  it('should return parsed professional experiences for multiple files', async () => {
    const result = await getProfessionalExperiences();

    expect(globSyncMock).toHaveBeenCalledTimes(1);
    const expectedGlobPattern = path.join(
      process.cwd(),
      'edit-me',
      'cms',
      'professionalExperiences',
      '*.md',
    );
    expect(globSyncMock).toHaveBeenCalledWith(expectedGlobPattern);

    expect(fs.readFile).toHaveBeenCalledTimes(2);
    expect(fs.readFile).toHaveBeenCalledWith(mockPath1);
    expect(fs.readFile).toHaveBeenCalledWith(mockPath2);
    expect(mockedParseFrontMatter).toHaveBeenCalledTimes(2);
    expect(marked.parse).toHaveBeenCalledTimes(2);
    expect(mockedInvariant).toHaveBeenCalledTimes(6);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      attributes: mockAttributes1,
      html: mockHtmlContent1,
      slug: mockSlug1,
    });
    expect(result[1]).toEqual({
      attributes: mockAttributes2,
      html: mockHtmlContent2,
      slug: mockSlug2,
    });
  });

  it('should return an empty array if the directory is empty', async () => {
    globSyncMock.mockReturnValue([]);
    const result = await getProfessionalExperiences();
    expect(result).toEqual([]);
    expect(globSyncMock).toHaveBeenCalledTimes(1);
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  const setupInvariantErrorTest = (
    missingAttribute: string,
    attributes: object,
  ) => {
    globSyncMock.mockReturnValue([mockPath1]);
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
        return { attributes: attributes, body: mockBody1, bodyBegin: 1 };
      }
      throw new Error(
        `Unexpected content in parseFrontMatter mock for error test: ${content}`,
      );
    });
    mockedInvariant.mockImplementation((condition, message) => {
      if (!condition) throw new Error(message);
    });
    const expectedSlug = mockSlug1;
    return `${expectedSlug} missing "${missingAttribute}" attribute.`;
  };

  it('should throw if organization attribute is missing', async () => {
    const expectedErrorMessage = setupInvariantErrorTest('organization', {
      startDate: '2020',
      title: 'Dev',
    });
    await expect(getProfessionalExperiences()).rejects.toThrow(
      expectedErrorMessage,
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      expectedErrorMessage,
    );
  });

  it('should throw if startDate attribute is missing', async () => {
    const expectedErrorMessage = setupInvariantErrorTest('startDate', {
      organization: 'Co',
      title: 'Dev',
    });
    await expect(getProfessionalExperiences()).rejects.toThrow(
      expectedErrorMessage,
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      expectedErrorMessage,
    );
  });

  it('should throw if title attribute is missing', async () => {
    const expectedErrorMessage = setupInvariantErrorTest('title', {
      organization: 'Co',
      startDate: '2020',
    });
    await expect(getProfessionalExperiences()).rejects.toThrow(
      expectedErrorMessage,
    );
    expect(mockedInvariant).toHaveBeenCalledWith(
      undefined,
      expectedErrorMessage,
    );
  });

  it('should throw an error if fs.readFile fails', async () => {
    globSyncMock.mockReturnValue([mockPath1]);
    const mockError = new Error('Read fail');
    (fs.readFile as jest.Mock).mockRejectedValue(mockError);

    await expect(getProfessionalExperiences()).rejects.toThrow(mockError);
    expect(mockedParseFrontMatter).not.toHaveBeenCalled();
  });

  it('should throw an error if marked.parse fails', async () => {
    globSyncMock.mockReturnValue([mockPath1]);
    const mockError = new Error('Marked fail');
    (marked.parse as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await expect(getProfessionalExperiences()).rejects.toThrow(mockError);
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(mockedParseFrontMatter).toHaveBeenCalledTimes(1);
  });
});
