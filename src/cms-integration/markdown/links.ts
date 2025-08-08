import { IconName } from '@fortawesome/free-brands-svg-icons';
import { links } from '../../../edit-me/cms/links';

export interface CMSLink {
  href: string;
  iconName: IconName | 'custom-svg';
  title: string;
  svgPath?: string; // Optional SVG path for custom icons
  svgFile?: string; // Optional SVG file path for custom icons
}

export const getLinks = async (): Promise<CMSLink[]> => {
  return new Promise((resolve) => {
    return resolve(links);
  });
};
