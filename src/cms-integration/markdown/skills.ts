import parseFrontMatter from 'front-matter';
import fs from 'fs/promises';
import { marked } from 'marked';
import path from 'path';
import invariant from 'tiny-invariant';
import glob from 'glob';

export interface SkillsMarkdownAttributes {
  title: string;
}

export interface CMSSkillCategory {
  attributes: SkillsMarkdownAttributes;
  html: string;
  slug: string;
}

const basePath = process.cwd();
const skillsPath = path.join(basePath, 'edit-me', 'cms', 'skills');

export const getSkillCategories = async (): Promise<CMSSkillCategory[]> => {
  const files = glob.sync(path.join(skillsPath, '*.md'));

  return Promise.all(
    files.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath);
      const { attributes, body } = parseFrontMatter<SkillsMarkdownAttributes>(
        fileContent.toString(),
      );

      const filename = path.basename(filePath);
      const slug = filename.replace(/\.md$/, '');

      invariant(attributes?.title, `${slug} missing "title" attribute.`);

      const html = marked(body);

      return {
        attributes,
        html,
        slug: slug,
      };
    }),
  );
};
