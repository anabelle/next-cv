import fs from 'fs/promises';
import { marked } from 'marked';
import path from 'path';

export interface CMSNotableProjects {
  html: string;
}

const basePath = process.cwd();
const notableProjectsPath = path.join(
  basePath,
  'edit-me',
  'cms',
  'notable-projects.md',
);

export const getNotableProjects = async (): Promise<CMSNotableProjects> => {
  const file = await fs.readFile(notableProjectsPath);

  const html = marked(file.toString());

  return {
    html,
  };
};
