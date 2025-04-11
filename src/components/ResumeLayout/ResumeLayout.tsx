import {
  faBriefcase,
  faCheck,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import indefinite from 'indefinite';
import React from 'react';
import { getFullName } from '../../helpers/utils';
import { ResumePageProps } from '../../pages';
import Box from '../../strum-design-system/components/Box/Box';
import Column from '../../strum-design-system/components/Layout/Column';
import Row from '../../strum-design-system/components/Layout/Row';
import Heading from '../../strum-design-system/components/Heading/Heading';
import AboutMe from '../Articles/AboutMe';
import ContactInformation from '../Articles/ContactInformation';
import NotableProjects from '../Articles/NotableProjects';
import EducationItem from '../EducationItem/EducationItem';
import Header from '../Header/Header';
import PageHead from '../PageHead';
import ProfessionalItem from '../ProfessionalItem/ProfessionalItem';
import Section from '../Section/Section';
import SectionHeader from '../SectionHeader/SectionHeader';
import Skills from '../Skills/Skills';
import { PersonalExperiments } from '../PersonalExperiments';
import dynamic from 'next/dynamic';

// Define Footer dynamically
const Footer = dynamic(() => import('../Footer/Footer'), { ssr: false });

const ResumeLayout: React.FC<ResumePageProps> = (props) => {
  const {
    education,
    notableProjects,
    links,
    personalInformation,
    privateInformation,
    professional,
    secret,
    skills,
  } = props;
  const fullName = getFullName(personalInformation);
  const jobTitle = indefinite(personalInformation.attributes.title);

  // Filter skills
  const managementSkill = skills.find(
    (skill) => skill.attributes.title === 'Management & Leadership',
  );
  const languagesSkill = skills.find(
    (skill) => skill.attributes.title === 'Languages',
  );
  const otherSkills = skills.filter(
    (skill) =>
      skill.attributes.title !== 'Management & Leadership' &&
      skill.attributes.title !== 'Languages',
  );

  return (
    <>
      <PageHead
        description={`Professional résumé for ${fullName}, ${jobTitle} living in ${personalInformation.attributes.location}.`}
        personalInformation={personalInformation}
        title={`CV | ${fullName} | ${personalInformation.attributes.location}`}
      />

      <Header secret={secret} {...props} />

      <Section color="standard">
        <Row>
          {/* Main Content Column - Wider */}
          <Column width={{ xs: 12, lg: 8 }}>
            <AboutMe personalInformation={personalInformation} />
          </Column>
          {/* Sidebar Column - Narrower */}
          <Column width={{ xs: 12, lg: 4 }}>
            {/* Render Personal Projects FIRST */}
            <PersonalExperiments />

            <ContactInformation
              personalInformation={personalInformation}
              privateInformation={privateInformation}
            />
            {/* Render Languages skill */}
            {languagesSkill && (
              <Box marginTop={4}>
                <Heading level={4}>{languagesSkill.attributes.title}</Heading>
                <div
                  dangerouslySetInnerHTML={{ __html: languagesSkill.html }}
                />
              </Box>
            )}
          </Column>
        </Row>

        {/* Render remaining skills in the main grid (now below the first row) */}
        {otherSkills.length > 0 && <Skills skills={otherSkills} />}
      </Section>

      <Section color="alternate">
        <Box marginBottom={6}>
          <SectionHeader icon={faBriefcase} text="Professional Experience" />
        </Box>

        {professional.map((experience) => (
          <ProfessionalItem key={experience.slug} {...experience} />
        ))}
      </Section>

      <Section color="standard">
        <Box marginBottom={6}>
          <SectionHeader icon={faGraduationCap} text="Education" />
        </Box>

        {education.map((experience) => (
          <EducationItem key={experience.slug} {...experience} />
        ))}
      </Section>

      <Section color="alternate">
        <NotableProjects notableProjects={notableProjects} />
      </Section>

      <Footer links={links} personalInformation={personalInformation} />
    </>
  );
};

export default ResumeLayout;
