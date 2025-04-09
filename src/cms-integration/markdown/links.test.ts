import { getLinks } from './links';
import { type IconName } from '@fortawesome/free-brands-svg-icons';

// Mock the imported links data
jest.mock('../../../edit-me/cms/links', () => ({
  __esModule: true,
  links: [
    {
      href: 'https://mock.link',
      iconName: 'github' as IconName, // Cast needed for specific IconName type
      title: 'Mock GitHub',
    },
    {
      href: 'https://another.mock',
      iconName: 'linkedin' as IconName,
      title: 'Mock LinkedIn',
    },
  ],
}));

describe('getLinks', () => {
  it('should return the mocked links array', async () => {
    const result = await getLinks();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        href: 'https://mock.link',
        iconName: 'github',
        title: 'Mock GitHub',
      },
      {
        href: 'https://another.mock',
        iconName: 'linkedin',
        title: 'Mock LinkedIn',
      },
    ]);
  });
});
