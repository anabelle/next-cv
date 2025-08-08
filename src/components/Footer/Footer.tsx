import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { CMSLink } from '../../cms-integration/markdown/links';
import { CMSPersonalInformation } from '../../cms-integration/markdown/personal';
import { getFullName } from '../../helpers/utils';
import AutoGrid from '../../strum-design-system/components/AutoGrid/AutoGrid';
import AutoGridCell from '../../strum-design-system/components/AutoGrid/AutoGridCell';
import Container from '../../strum-design-system/components/Container/Container';
import { atoms } from '../../strum-design-system/sprinkles.css';
import { visuallyHidden } from '../../strum-design-system/styles/accessibility.css';
import colors from '../../strum-design-system/themes/timbre/colors';
import { footerLinkStyle, footerStyle } from './Footer.css';

interface FooterProps {
  personalInformation: CMSPersonalInformation;
  links?: CMSLink[];
}

const Footer: React.FC<FooterProps> = (props) => {
  const { personalInformation, links } = props;
  const fullName = getFullName(personalInformation);

  return (
    <footer className={footerStyle}>
      <Container>
        {links && (
          <AutoGrid guttersX={2} guttersY={2} horizontalAlign="center">
            {links.map((link) => (
              <AutoGridCell key={link.href}>
                <a
                  className="fa-3x"
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className={visuallyHidden}>
                    {personalInformation.attributes.givenName} on {link.title}
                  </span>
                  {link.iconName === 'custom-svg' &&
                  (link.svgPath || link.svgFile) ? (
                    <span
                      className="fa-layers fa-fw"
                      style={{
                        position: 'relative',
                        width: '1em',
                        height: '1em',
                      }}
                    >
                      {link.svgFile ? (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: '-8px',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backgroundColor: colors.primary,
                              borderRadius: '50%',
                              zIndex: 0,
                            }}
                          ></span>
                          <img
                            src={link.svgFile}
                            alt={link.title}
                            style={{
                              position: 'relative',
                              width: '60%',
                              height: '60%',
                              zIndex: 1,
                              filter: 'brightness(0) invert(1)',
                            }}
                          />
                        </div>
                      ) : (
                        <svg
                          viewBox="0 0 512 512"
                          style={{ width: '100%', height: '100%' }}
                        >
                          <circle
                            cx="256"
                            cy="256"
                            r="256"
                            fill={colors.primary}
                          />
                          <path
                            d={link.svgPath}
                            fill={colors.white}
                            transform="scale(0.5) translate(256, 256)"
                          />
                        </svg>
                      )}
                    </span>
                  ) : (
                    <span className="fa-layers fa-fw">
                      <FontAwesomeIcon
                        color={colors.primary}
                        icon={faCircle}
                        suppressHydrationWarning
                      />
                      <FontAwesomeIcon
                        aria-hidden
                        color={colors.white}
                        icon={['fab', link.iconName as any]}
                        transform="shrink-8"
                        suppressHydrationWarning
                      />
                    </span>
                  )}
                </a>
              </AutoGridCell>
            ))}
          </AutoGrid>
        )}

        <div className={atoms({ marginTop: 4 })}>
          Copyright ©{new Date().getFullYear()} {fullName}
        </div>

        <div>
          <small>
            This CV was built with{' '}
            <a
              className={footerLinkStyle}
              href="https://nextjs.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Next.js
            </a>{' '}
            and deployed on{' '}
            <a
              className={footerLinkStyle}
              href="https://vercel.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vercel
            </a>
            .
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
