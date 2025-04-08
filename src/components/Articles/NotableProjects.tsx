import { faDiceD20, faTrophy } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { CMSNotableProjects } from '../../cms-integration/markdown/notable-projects';
import SectionHeader from '../SectionHeader/SectionHeader';

interface NotableProjectsProps {
  notableProjects: CMSNotableProjects;
}

const NotableProjects: React.FC<NotableProjectsProps> = (props) => {
  return (
    <article>
      <SectionHeader icon={faTrophy} text="Awards &amp; Featured Projects" />
      <div dangerouslySetInnerHTML={{ __html: props.notableProjects.html }} />
    </article>
  );
};

export default NotableProjects;
