import getCMSIntegration from './getCMSIntegration';
import { getEducationalExperiences } from './markdown/educational';
import { getNotableProjects } from './markdown/notable-projects';
import { getLinks } from './markdown/links';
import { getPersonalInformation } from './markdown/personal';
import { getProfessionalExperiences } from './markdown/professional';
import { getSkillCategories } from './markdown/skills';

// Mock the imported getter functions
jest.mock('./markdown/educational');
jest.mock('./markdown/notable-projects');
jest.mock('./markdown/links');
jest.mock('./markdown/personal');
jest.mock('./markdown/professional');
jest.mock('./markdown/skills');

// Define mock return values
const mockEducation = [{ school: 'Mock University' }];
const mockProjects = [{ name: 'Mock Project' }];
const mockLinks = [{ label: 'Mock Link', url: 'mock.url' }];
const mockPersonalInfo = { name: 'Mock Person' };
const mockProfessional = [{ company: 'Mock Company' }];
const mockSkills = [{ category: 'Mock Category' }];

describe('getCMSIntegration', () => {
  beforeEach(() => {
    // Reset mocks and set return values before each test
    (getEducationalExperiences as jest.Mock).mockResolvedValue(mockEducation);
    (getNotableProjects as jest.Mock).mockResolvedValue(mockProjects);
    (getLinks as jest.Mock).mockResolvedValue(mockLinks);
    (getPersonalInformation as jest.Mock).mockResolvedValue(mockPersonalInfo);
    (getProfessionalExperiences as jest.Mock).mockResolvedValue(
      mockProfessional,
    );
    (getSkillCategories as jest.Mock).mockResolvedValue(mockSkills);
  });

  it('should call all getter functions and return the combined data for markdown CMS', async () => {
    const result = await getCMSIntegration('markdown');

    // Check if getters were called
    expect(getEducationalExperiences).toHaveBeenCalledTimes(1);
    expect(getNotableProjects).toHaveBeenCalledTimes(1);
    expect(getLinks).toHaveBeenCalledTimes(1);
    expect(getPersonalInformation).toHaveBeenCalledTimes(1);
    expect(getProfessionalExperiences).toHaveBeenCalledTimes(1);
    expect(getSkillCategories).toHaveBeenCalledTimes(1);

    // Check the structure and content of the result
    expect(result).toEqual({
      education: mockEducation,
      notableProjects: mockProjects,
      links: mockLinks,
      personalInformation: mockPersonalInfo,
      professional: mockProfessional,
      skills: mockSkills,
    });
  });

  // Optional: Test the null path, although current type prevents it
  // it('should return null for an unsupported CMS type', async () => {
  //   const result = await getCMSIntegration('unsupported' as any);
  //   expect(result).toBeNull();
  //   // Optionally check that no getter functions were called
  //   expect(getEducationalExperiences).not.toHaveBeenCalled();
  //   // ... etc for other getters
  // });
});
