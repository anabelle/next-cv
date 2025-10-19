import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { CMSPersonalInformation } from '../cms-integration/markdown/personal';
import { getFullName } from '../helpers/utils';
import colors from '../strum-design-system/themes/timbre/colors';

interface PageHeadProps {
  baseURL?: string;
  description: string;
  personalInformation: CMSPersonalInformation;
  title: string;
}

const ogImgColor = `%23${colors.primary.replace('#', '')}`;

const PageHead: React.FC<PageHeadProps> = (props) => {
  const {
    baseURL = typeof window !== 'undefined' ? window.location.origin : '',
    description,
    personalInformation,
    title,
  } = props;
  const { pathname } = useRouter();

  const fullName = getFullName(personalInformation);
  const ogImgTitle = encodeURI(
    `**${fullName.toUpperCase()}** ${personalInformation.attributes.location.toUpperCase()}`,
  );
  const ogImg = `https://ogi.sh/gzzIXzt5-?title=${ogImgTitle}&backgroundColor=${ogImgColor}`;
  const url = baseURL + pathname;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta
        property="og:site_name"
        content={`Professional Résumé for ${fullName}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="profile" />
      <meta property="og:locale" content="en_US" />
      <meta
        property="profile:first_name"
        content={personalInformation.attributes.givenName}
      />
      <meta
        property="profile:last_name"
        content={personalInformation.attributes.familyName}
      />

      {personalInformation.attributes.twitterUsername && (
        <>
          <meta
            name="twitter:site"
            content={`@${personalInformation.attributes.twitterUsername}`}
          />
          <meta
            name="twitter:creator"
            content={`@${personalInformation.attributes.twitterUsername}`}
          />
        </>
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Share images served from https://ogimpact.sh/ */}
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:alt" content={`${fullName} – Resume preview`} />
      <meta name="image" content={ogImg} />
      <meta itemProp="image" content={ogImg} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImg} />

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: fullName,
            jobTitle: personalInformation.attributes.title,
            url,
            email: personalInformation.attributes.email
              ? `mailto:${personalInformation.attributes.email}`
              : undefined,
            address: personalInformation.attributes.location,
          }),
        }}
      />
    </Head>
  );
};

export default PageHead;
