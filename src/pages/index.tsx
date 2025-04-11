import { InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import getCMSIntegration from '../cms-integration/getCMSIntegration';
import { CMSPrivateInformation } from '../cms-integration/markdown/private';
import ResumeLayout from '../components/ResumeLayout/ResumeLayout';
import { CMSEducationalExperience } from '../cms-integration/markdown/educational';
import { CMSNotableProjects } from '../cms-integration/markdown/notable-projects';
import { CMSLink } from '../cms-integration/markdown/links';
import { CMSPersonalInformation } from '../cms-integration/markdown/personal';
import { CMSProfessionalExperience } from '../cms-integration/markdown/professional';
import { CMSSkillCategory } from '../cms-integration/markdown/skills';
import { Experiment } from '../../edit-me/data/experiments';

export const getStaticProps = async () => {
  const {
    education,
    notableProjects,
    links,
    personalInformation,
    professional,
    skills,
  } = await getCMSIntegration('markdown');

  return {
    props: {
      education,
      notableProjects,
      links,
      personalInformation,
      professional,
      skills,
    },
  };
};

export interface ResumePageProps
  extends InferGetStaticPropsType<typeof getStaticProps> {
  privateInformation?: CMSPrivateInformation[];
  secret?: string;
  experiments?: Experiment[];
}

const ResumePage: NextPage<ResumePageProps> = (props) => {
  return <ResumeLayout {...props} />;
};

export default ResumePage;
