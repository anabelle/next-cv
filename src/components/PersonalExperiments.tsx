import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faCode } from '@fortawesome/free-solid-svg-icons';
// import { Carousel } from 'react-responsive-carousel'; // Removed Carousel import
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Removed Carousel styles import
import * as styles from './PersonalExperiments.css'; // Reverted import back to .css
// Import data from the new file
import { experiments } from '../../edit-me/data/experiments';

// Remove local interface and data definitions
// interface Experiment {
//   name: string;
//   description: string;
//   link: string;
//   imageUrl: string;
//   technologies: string[];
// }
//
// const experiments: Experiment[] = [
//   {
//     name: 'TetrisTwist',
//     description:
//       "A 3D puzzle game combining Tetris mechanics with Rubik's Cube rotations and perspective shifts inspired by Fez.",
//     link: 'https://tetristwist.heyanabelle.com',
//     imageUrl: '/images/tetris.png',
//     technologies: ['Three.js', 'WebGL', 'React', 'TypeScript'],
//   },
//   {
//     name: 'Multiplayer Snake',
//     description:
//       'Real-time multiplayer implementation of the classic Snake game with competitive gameplay and leaderboards.',
//     link: 'https://snake.heyanabelle.com',
//     imageUrl: '/images/snake.png',
//     technologies: ['Socket.IO', 'Canvas API', 'Node.js', 'React'],
//   },
// ];

export function PersonalExperiments() {
  const featured = experiments.find((e) => (e as any).featured);
  const others = experiments.filter((e) => !(e as any).featured);

  return (
    <section className={styles.sectionStyle}>
      <h2 className={styles.sectionTitleStyle}>
        <FontAwesomeIcon icon={faCode} className={styles.titleIconStyle} />
        <span>Personal Projects</span>
      </h2>
      <div className={styles.projectContainerStyle}>
        {featured && (
          <Link
            key={featured.name}
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectCardFeatured}
            aria-label={`${featured.name} (opens in new tab)`}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.imageBannerFeaturedStyle}>
              <Image
                src={featured.imageUrl}
                alt={`${featured.name} screenshot`}
                fill
                sizes="100vw"
                className=""
              />
              {featured.avatarUrl && (
                <div className={styles.featuredAvatarWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.avatarUrl}
                    alt={`${featured.name} avatar`}
                    className={styles.featuredAvatarImg}
                  />
                </div>
              )}
            </div>

            <div className={styles.contentAreaStyle}>
              <span className={styles.imageTitleStyle}>{featured.name}</span>

              <div className={styles.techListStyle}>
                {featured.technologies.map((tech) => (
                  <span key={tech} className={styles.techTagStyle}>
                    {tech}
                  </span>
                ))}
              </div>
              <p className={styles.descriptionStyle}>{featured.description}</p>
              <span className={styles.viewLinkStyle}>
                Meet Pixel
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className={styles.viewLinkIconStyle}
                />
              </span>
            </div>
          </Link>
        )}

        {others.map((exp) => (
          <Link
            key={exp.name}
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectCardNonLink}
            aria-label={`${exp.name} (opens in new tab)`}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.imageBannerStyle}>
              <Image
                src={exp.imageUrl}
                alt={`${exp.name} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className=""
              />
            </div>

            <div className={styles.contentAreaStyle}>
              <span className={styles.imageTitleStyle}>{exp.name}</span>

              <div className={styles.techListStyle}>
                {exp.technologies.map((tech) => (
                  <span key={tech} className={styles.techTagStyle}>
                    {tech}
                  </span>
                ))}
              </div>
              <p className={styles.descriptionStyle}>{exp.description}</p>
              <span className={styles.viewLinkStyle}>
                View Project
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className={styles.viewLinkIconStyle}
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
