import parseFrontMatter from 'front-matter';
import fs from 'fs/promises';
import { marked } from 'marked';
import path from 'path';
import invariant from 'tiny-invariant';
import glob from 'glob';

export interface PrivateInformationMarkdownAttributes {
  label: string;
}

export interface CMSPrivateInformation {
  attributes: PrivateInformationMarkdownAttributes;
  html: string;
  slug: string;
}

const basePath = process.cwd();
const privateInformationPath = path.join(
  basePath,
  'edit-me',
  'cms',
  'privateFields',
);

export const getPrivateInformation = async (): Promise<
  CMSPrivateInformation[]
> => {
  const files = glob.sync(path.join(privateInformationPath, '*.md'));

  return Promise.all(
    files.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath);
      const { attributes, body } =
        parseFrontMatter<PrivateInformationMarkdownAttributes>(
          fileContent.toString(),
        );

      const filename = path.basename(filePath);
      const slug = filename.replace(/\.md$/, '');

      invariant(attributes?.label, `${slug} missing "label" attribute.`);

      const html = marked(body);

      return {
        attributes,
        html,
        slug: slug,
      };
    }),
  );
};
