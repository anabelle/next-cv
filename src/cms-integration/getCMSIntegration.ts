import { getEducationalExperiences } from './markdown/educational';
import { getNotableProjects } from './markdown/notable-projects';
import { getLinks } from './markdown/links';
import { getPersonalInformation } from './markdown/personal';
import { getProfessionalExperiences } from './markdown/professional';
import { getSkillCategories } from './markdown/skills';

type CMS = 'markdown';

const getCMSIntegration = async (cms: CMS) => {
  if (cms === 'markdown') {
    return {
      education: await getEducationalExperiences(),
      notableProjects: await getNotableProjects(),
      links: await getLinks(),
      personalInformation: await getPersonalInformation(),
      professional: await getProfessionalExperiences(),
      skills: await getSkillCategories(),
    };
  }
  return null;
};

export default getCMSIntegration;
