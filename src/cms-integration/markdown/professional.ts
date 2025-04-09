import parseFrontMatter from 'front-matter';
import fs from 'fs/promises';
import { marked } from 'marked';
import path from 'path';
import invariant from 'tiny-invariant';
import glob from 'glob';

export interface ProfessionalExperienceMarkdownAttributes {
  organization: string;
  endDate?: string;
  startDate: string;
  title: string;
}

export interface CMSProfessionalExperience {
  attributes: ProfessionalExperienceMarkdownAttributes;
  html: string;
  slug: string;
}

const basePath = process.cwd();
const professionalPath = path.join(
  basePath,
  'edit-me',
  'cms',
  'professionalExperiences',
);

export const getProfessionalExperiences = async (): Promise<
  CMSProfessionalExperience[]
> => {
  const files = glob.sync(path.join(professionalPath, '*.md'));

  return Promise.all(
    files.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath);
      const { attributes, body } =
        parseFrontMatter<ProfessionalExperienceMarkdownAttributes>(
          fileContent.toString(),
        );

      const filename = path.basename(filePath);
      const slug = filename.replace(/\.md$/, '');

      invariant(
        attributes?.organization,
        `${slug} missing "organization" attribute.`,
      );
      invariant(
        attributes?.startDate,
        `${slug} missing "startDate" attribute.`,
      );
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
