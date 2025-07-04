/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';
import Html from 'react-pdf-html';
import { getFullName } from '../../helpers/utils';
import { ResumePageProps } from '../../pages';
import colors from '../../strum-design-system/themes/timbre/colors';
import spacers from '../../strum-design-system/themes/timbre/spacers';

const domain = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';
const fontPath = `${domain}/fonts/SourceSansPro`;
const iconPath = `${domain}/pdf/fa-icons`;

Font.register({
  family: 'Source Sans Pro',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: `${fontPath}/SourceSansPro-Regular.ttf`,
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: `${fontPath}/SourceSansPro-Italic.ttf`,
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: `${fontPath}/SourceSansPro-Bold.ttf`,
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: `${fontPath}/SourceSansPro-BoldItalic.ttf`,
    },
  ],
});

const sidebarWidth = 2.85;
const fontSizes = {
  xl: 18,
  l: 16,
  m: 14,
  s: 12,
  xs: 10,
  xxs: 8,
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'stretch',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontFamily: 'Source Sans Pro',
    fontSize: fontSizes.xxs,
    justifyContent: 'flex-start',
    lineHeight: 1.3,
  },
  sidebar: {
    alignSelf: 'stretch',
    backgroundColor: colors.light,
    display: 'flex',
    color: colors.dark,
    flexBasis: `${sidebarWidth}in`,
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 1,
  },
  sidebarContent: { padding: spacers[4] },
  header: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: `${spacers[6]} ${spacers[4]}`,
    textAlign: 'center',
  },
  headerTitle: { fontSize: fontSizes.l, fontWeight: 700 },
  headerSubtitle: { fontSize: fontSizes.m, fontWeight: 700 },
  main: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    width: '5.65in',
    flexShrink: 0,
    paddingVertical: spacers[4],
    paddingHorizontal: spacers[5],
  },
  section: { marginBottom: spacers[3] },
  sectionHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
  },
  sectionHeadingNonHTML: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    marginBottom: spacers[1],
  },
  sectionHeadingIcon: {
    height: fontSizes.m,
    marginRight: spacers[1],
    width: fontSizes.m,
  },
  sectionHeadingStars: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginRight: spacers[1],
  },
  sectionHeadingStar: {
    height: fontSizes.xxs,
    width: 'auto',
  },
  sectionParagraph: { fontWeight: 400, margin: 0 },
  itemHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.s,
    fontWeight: 700,
    marginBottom: spacers[1],
    marginTop: spacers[2],
  },
  itemSubheadingRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: spacers[1],
  },
  itemSubheading: {
    fontSize: fontSizes.xxs,
    fontStyle: 'italic',
  },
  itemSubheadingIcon: {
    height: fontSizes.xxs,
    marginRight: spacers[1],
  },
  professionalTitle: {
    backgroundColor: colors.dark,
    borderRadius: '3px',
    color: colors.white,
    fontWeight: 700,
    paddingHorizontal: spacers[1],
  },
  bold: { fontWeight: 700 },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  flexRow: { alignItems: 'center', display: 'flex', flexDirection: 'row' },
  flexRowAlignStart: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },
  a: {
    color: colors.primary,
    textDecoration: 'underline',
  },
});

const htmlProps = {
  style: { fontSize: fontSizes.xxs },
  stylesheet: {
    a: styles.a,
    p: { ...styles.sectionParagraph, marginBottom: spacers[3] },
    ul: { marginBottom: spacers[1] },
    li: { marginBottom: spacers[1] },
  },
};

const PDF: React.FC<ResumePageProps> = (props) => {
  const {
    education,
    experiments,
    notableProjects,
    personalInformation,
    privateInformation,
    professional,
    skills,
  } = props;
  const fullName = getFullName(personalInformation);
  const year = new Date().getFullYear();

  return (
    // @ts-ignore
    <Document author={fullName} title={`CV for ${fullName}, ${year}`}>
      {/* @ts-ignore */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{fullName}</Text>
            <Text style={styles.headerSubtitle}>
              {personalInformation.attributes.title}
            </Text>
          </View>
          <View style={styles.sidebarContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <Image
                  src={`${iconPath}/circle-user.png`}
                  style={styles.sectionHeadingIcon}
                />
                <Text>About Me</Text>
              </View>
              <Html {...htmlProps}>{personalInformation.html}</Html>
            </View>
            {experiments && experiments.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeadingNonHTML}>
                  <Text>Personal Projects</Text>
                </View>
                {experiments.map((experiment) => (
                  <View
                    key={experiment.name}
                    style={{ marginBottom: spacers[1] }}
                  >
                    <Text style={styles.itemHeading}>{experiment.name}</Text>
                    <Text style={styles.sectionParagraph}>
                      {experiment.description}
                    </Text>
                    {experiment.technologies &&
                      experiment.technologies.length > 0 && (
                        <Text
                          style={{
                            ...styles.itemSubheading,
                            marginTop: spacers[1],
                          }}
                        >
                          Technologies: {experiment.technologies.join(', ')}
                        </Text>
                      )}
                    <Link
                      src={experiment.link}
                      style={{ ...styles.a, marginTop: spacers[1] }}
                    >
                      <Text>View Live Demo</Text>
                    </Link>
                  </View>
                ))}
              </View>
            )}
            <View style={{ ...styles.section, marginTop: spacers[4] }}>
              <View style={styles.sectionHeadingNonHTML}>
                <Image
                  src={`${iconPath}/circle-id-card.png`}
                  style={styles.sectionHeadingIcon}
                />
                <Text>Contact Information</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Location:</Text>
                <Text>&nbsp;{personalInformation.attributes.location}</Text>
              </View>
              {privateInformation?.map((privateField) => (
                <View key={privateField.slug} style={styles.flexRowAlignStart}>
                  <Text style={styles.bold}>
                    {privateField.attributes.label}:&nbsp;
                  </Text>
                  <Html {...htmlProps}>{privateField.html}</Html>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeading}>
                <Image
                  src={`${iconPath}/circle-checkmark.png`}
                  style={styles.sectionHeadingIcon}
                />
                <Text>Skills &amp; Expertise</Text>
              </View>
              {skills.map((skill, skillIndex) => (
                <View key={skill.slug}>
                  <View style={styles.itemHeading}>
                    <Text style={styles.bold}>{skill.attributes.title}</Text>
                  </View>
                  <Html {...htmlProps}>{skill.html}</Html>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Image
                src={`${iconPath}/circle-briefcase.png`}
                style={styles.sectionHeadingIcon}
              />
              <Text>Professional Experience</Text>
            </View>
            {professional.map((professionalExperience) => (
              <View key={professionalExperience.slug}>
                <View style={styles.itemHeading}>
                  <Text style={styles.professionalTitle}>
                    {professionalExperience.attributes.title}
                  </Text>
                  <Text>
                    &nbsp;at {professionalExperience.attributes.organization}
                  </Text>
                </View>
                <View style={styles.itemSubheadingRow}>
                  <Image
                    src={`${iconPath}/calendar.png`}
                    style={styles.itemSubheadingIcon}
                  />
                  <Text style={styles.itemSubheading}>
                    {professionalExperience.attributes.startDate}—
                    {professionalExperience.attributes.endDate
                      ? professionalExperience.attributes.endDate
                      : 'Current'}
                  </Text>
                </View>
                <Html {...htmlProps}>{professionalExperience.html}</Html>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Image
                src={`${iconPath}/circle-graduation-cap.png`}
                style={styles.sectionHeadingIcon}
              />
              <Text>Education</Text>
            </View>
            {education.map((educationExperience) => (
              <View key={educationExperience.slug}>
                <View style={styles.itemHeading}>
                  <Text style={styles.bold}>
                    {educationExperience.attributes.achievement}
                  </Text>
                </View>
                <View style={styles.itemSubheadingRow}>
                  <Image
                    src={`${iconPath}/university.png`}
                    style={styles.itemSubheadingIcon}
                  />
                  <Text style={styles.itemSubheading}>
                    {educationExperience.attributes.institution}
                  </Text>
                </View>
                <Html {...htmlProps}>{educationExperience.html}</Html>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <View
              style={{ ...styles.sectionHeading, marginBottom: spacers[3] }}
            >
              <Image
                src={`${iconPath}/circle-pen-paintbrush.png`}
                style={styles.sectionHeadingIcon}
              />
              <Text>Awards &amp; Featured Projects</Text>
            </View>
            <Html
              {...htmlProps}
              stylesheet={{
                ...htmlProps.stylesheet,
                p: { ...styles.sectionParagraph, marginBottom: 0, paddingRight: spacers[4] },
              }}
            >
              {notableProjects.html}
            </Html>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
