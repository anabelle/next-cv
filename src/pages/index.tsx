import type { ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const achievements = [
  {
    label: '20+ Years',
    description: 'Shipping production software at scale',
  },
  {
    label: '120M+ Users',
    description: 'Healthcare platform redesign',
  },
  {
    label: 'WCAG 2.1 AA',
    description: 'Accessibility-first architecture',
  },
  {
    label: 'OWASP',
    description: 'Security and privacy by default',
  },
];

const skills = [
  {
    title: 'AI-Assisted Engineering',
    items: [
      'Agent orchestration & multi-agent workflows',
      'Human-in-the-loop review & evaluation',
      'Persistent context & knowledge continuity',
      'Safeguards for agent execution',
    ],
  },
  {
    title: 'Core Technologies',
    items: [
      'JavaScript, TypeScript, CSS, HTML',
      'React, Next.js, Vue.js',
      'Node.js, REST, GraphQL',
      'D3.js, Three.js, WebGL',
    ],
  },
  {
    title: 'Quality & Delivery',
    items: [
      'Accessibility (WCAG/ARIA, ADA)',
      'Performance & Core Web Vitals',
      'CI/CD, TDD, test automation',
      'Security (OWASP), privacy compliance',
    ],
  },
  {
    title: 'Leadership',
    items: [
      'Technical direction & architecture',
      'Cross-functional team leadership',
      'Mentoring & engineer growth',
      'Stakeholder alignment & delivery',
    ],
  },
];

const agentic = {
  lead: 'Extending software architecture into AI-assisted engineering: designing how humans and coding agents divide, review, and verify work.',
  focus: [
    {
      title: 'Orchestration',
      text: 'Directs experiments integrating interactive coding agents and persistent assistants across local and remote environments.',
    },
    {
      title: 'Workflow design',
      text: 'Shapes workflows around explicit briefs, bounded delegation, independent review, artifact verification, and retained context.',
    },
    {
      title: 'Reliability',
      text: 'Explores operational safeguards for agent execution, including model identity, cost boundaries, uncertain dispatch, and recovery.',
    },
  ],
  practices: [
    'Explicit briefs',
    'Bounded delegation',
    'Independent review',
    'Artifact verification',
    'Retained context',
    'Human sign-off',
  ],
};

const projects = [
  {
    title: 'Pixel Survivor',
    description:
      'Autonomous AI agent that promotes art and sells pixels via Bitcoin Lightning. Full-stack system with real-time canvas, social-aware AI content generation, and self-improvement algorithms.',
    tags: ['Autonomous AI', 'Bitcoin', 'Lightning', 'Nostr'],
    image: '/images/pixel.png',
    width: 1703,
    height: 1371,
    href: 'https://pixel.xx.kg',
  },
  {
    title: 'TetrisTwist',
    description:
      '3D Tetris in Three.js/WebGL with physics simulation, smooth transforms, and responsive touch controls.',
    tags: ['Three.js', 'WebGL', 'React', 'TypeScript'],
    image: '/images/tetris.png',
    width: 715,
    height: 808,
    href: 'https://tetristwist.heyanabelle.com',
  },
  {
    title: 'Multiplayer Snake',
    description:
      'Real-time multiplayer game with client-server sync, collision detection, and persistent leaderboards.',
    tags: ['Socket.IO', 'Canvas API', 'Node.js', 'React'],
    image: '/images/snake.png',
    width: 677,
    height: 462,
    href: 'https://snake.heyanabelle.com',
  },
];

const featured = [
  {
    title: '45SNA · Salón Nacional de Artistas',
    href: 'https://45sna.com',
    description:
      "Colombia's first interactive digital art exhibition. Performance-tuned rich media experience.",
  },
  {
    title: 'Biblioteca Abierta del Proceso de Paz',
    href: 'https://bapp.com.co',
    description:
      "Open library documenting Colombia's Peace Process. Civic storytelling at national scale.",
  },
  {
    title: 'Cerosetenta',
    href: 'https://cerosetenta.uniandes.edu.co',
    description:
      'Award-winning independent journalism. Recognized with Premio Gabo 2020.',
  },
  {
    title: 'Consonante',
    href: 'https://consonante.org',
    description:
      'Journalism lab combating information silence across Colombia.',
  },
  {
    title: 'Volcánicas',
    href: 'https://volcanicas.com',
    description:
      'Feminist investigative journalism platform for Latin America.',
  },
];

const experience = [
  {
    company: 'Publicis Groupe · Razorfish',
    role: 'Experience Technology Architect',
    period: 'Jul 2025 – Present',
    summary:
      'Architecting tomorrow’s experiences through innovation, accessibility, and technical excellence.',
    bullets: [
      'Define architecture standards adopted across multiple delivery teams.',
      'Lead global AI usage guidelines and enablement across the organization.',
      'Deliver internal talks on AI tooling, workflows, and best practices.',
    ],
  },
  {
    company: 'Publicis Groupe · Razorfish',
    role: 'Senior Experience Technology Engineer',
    period: 'Oct 2023 – Jul 2025',
    summary:
      "Led the front-end engineering team for the redesign of a major healthcare brand's website serving 120M+ users with strict performance, privacy, and accessibility requirements.",
    bullets: [
      'Ensured AA accessibility, legal, and security compliance.',
      'Integrated frontend and backend systems with cross-functional teams.',
      'Collaborated with designers and product managers on user-centered delivery.',
    ],
  },
  {
    company: 'Publicis Groupe · Razorfish',
    role: 'Senior Front-End Engineer',
    period: 'Jun 2022 – Oct 2023',
    summary:
      'Built and maintained interfaces for global brands using React and TypeScript.',
    bullets: [
      'Improved accessibility and conversion metrics for ecommerce flows.',
      'Reduced regressions through CI/TDD and analytics validation.',
    ],
  },
  {
    company: 'La Gente Del Común',
    role: 'Technical Lead',
    period: 'Jun 2013 – Jun 2022',
    summary:
      "Led full-stack development for social impact, arts, and environmental projects including Colombia's Peace Process Open Library.",
    bullets: [
      'Built APIs and D3.js visualizations for Universidad de los Andes and press freedom organizations.',
      'Delivered platforms recognized for civic and cultural significance.',
    ],
  },
  {
    company: '8manos S.A.S',
    role: 'Founder & Technical Director',
    period: 'Sep 2010 – Jul 2022',
    summary:
      'Founded and led a software studio delivering projects for public and private sector clients at national scale.',
    bullets: [
      'Delivered for Banco de la República, Ministerio de Cultura, and Federación Nacional de Cafeteros.',
      'Contributed to open source and built a portfolio of award-winning work.',
    ],
  },
  {
    company: 'La Cápsula Ltda.',
    role: 'Lead Web Developer',
    period: 'Mar 2005 – Dec 2012',
    summary:
      'Built high-impact web platforms including a 24/7 streaming service and interactive experiences for film studios and universities.',
    bullets: [
      'Pushed early web technology boundaries to deliver production-grade results.',
    ],
  },
];

const education = [
  { title: 'AI for Engineers', org: 'Publicis Groupe' },
  { title: 'AI for Programmers', org: 'Publicis Groupe' },
  { title: 'Epic React', org: 'Kent C Dodds' },
  { title: 'Ethereum for Developers', org: 'Platzi' },
  { title: 'Advanced JavaScript TDD', org: 'Udemy' },
  { title: 'Scrum Fundamentals Certified', org: 'ScrumStudy' },
];

const awards = [
  {
    title: 'Premio Gabo 2020 · Reconocimiento Clemente Manuel Zabala',
    detail: 'Cerosetenta – excellence in digital journalism.',
  },
  {
    title: 'Lápiz de Acero · Best Website 2015',
    detail: "Cerosetenta – recognized as Colombia's best website.",
  },
  {
    title: 'PautaVisible',
    detail:
      'Award-winning government transparency platform with D3.js data visualization.',
  },
  {
    title: 'Brutalist Websites · Mention of Honor',
    detail: 'montenegrojaramillo.info – recognized for bold design.',
  },
];

const links = [
  { label: 'GitHub', href: 'https://github.com/anabelle' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/heyanabelle/' },
  { label: 'X', href: 'https://x.com/heyanabelle' },
  {
    label: 'Nostr',
    href: 'https://primal.net/p/nprofile1qqsdcmn9eaw7pfykhwr2uq3ps39nkj9a8k3xg0xahn35ucr4ftzmn9czsqwxy',
  },
  { label: 'lagentedelcomun.info', href: 'https://lagentedelcomun.info/' },
  { label: '8manos.com/trabajo', href: 'https://8manos.com/trabajo/' },
];

const languages = [
  'Spanish (Native)',
  'English (Bilingual C1)',
  'French (A2)',
  'Japanese (Basic)',
];

const nav = [
  { label: 'Agents', href: '#agentic' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

type SectionProps = {
  id?: string;
  index: string;
  title: string;
  intro: string;
  children: ReactNode;
};

const Section = ({ id, index, title, intro, children }: SectionProps) => (
  <section id={id} className="section" aria-labelledby={`${id ?? index}-title`}>
    <div className="section__header">
      <span className="section__index">{index}</span>
      <h2 id={`${id ?? index}-title`}>{title}</h2>
      <p>{intro}</p>
    </div>
    <div className="section__body">{children}</div>
  </section>
);

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Anabelle Handdoek · Senior Software Architect</title>
        <meta
          name="description"
          content="Senior Software Architect with 20+ years shipping accessible, secure, high-performance web applications for global brands. Currently leading technical direction at Publicis Groupe and experimenting hands-on with agentic engineering and AI workflow architecture."
        />
        <meta
          name="keywords"
          content="Senior Software Architect, Full Stack Engineer, React, Next.js, TypeScript, accessibility, WCAG, OWASP, agentic engineering, AI-assisted engineering, agent orchestration, human-in-the-loop, web3"
        />
        <meta name="author" content="Anabelle Handdoek" />
        <meta
          name="theme-color"
          content="#f5f3ee"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#111110"
          media="(prefers-color-scheme: dark)"
        />
      </Head>

      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <nav className="topbar" aria-label="Primary">
        <div className="topbar__inner">
          <a className="topbar__name" href="#top">
            Anabelle Handdoek
          </a>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="page" id="top">
        <header className="hero">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Software Architect · Agentic Engineering · Bogotá
          </p>
          <h1 className="title">
            Anabelle <em>Handdoek</em>
          </h1>

          <div className="hero__grid">
            <div className="hero__intro">
              <p className="lead">
                Two decades shipping accessible, secure, and high-performance
                web applications. Trusted by global brands to lead technical
                direction where quality, compliance, and user experience
                converge.
              </p>
              <p className="hero__agentic">
                Extends software architecture into AI-assisted engineering,
                experimenting hands-on with persistent agents, multi-agent
                workflows, and human-in-the-loop delivery.
              </p>
              <p>
                Founder of 8manos. Creator of award-winning platforms including
                Colombia&apos;s Peace Process Open Library. Currently
                architecting omni-channel experiences at Publicis Groupe for
                120M+ users.
              </p>
              <p>
                Deep expertise in React, Next.js, TypeScript, accessibility
                (WCAG/ARIA), and security (OWASP). Committed to FOSS, web3, and
                building technology that matters.
              </p>
              <div className="hero__actions">
                <a className="button" href="mailto:ana@8manos.com">
                  Start a conversation
                  <span aria-hidden="true">→</span>
                </a>
                <a className="button button--ghost" href="#agentic">
                  Agentic engineering
                </a>
              </div>
            </div>

            <aside className="hero__aside" aria-label="Contact details">
              <div className="portrait">
                <Image
                  src="/images/pixel_avatar.png"
                  alt="Pixel Survivor avatar"
                  width={226}
                  height={224}
                  priority
                />
              </div>
              <dl className="facts">
                <div>
                  <dt>Location</dt>
                  <dd>Bogotá, Colombia</dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>
                    <a href="mailto:ana@8manos.com">ana@8manos.com</a>
                  </dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>
                    <ul>
                      {languages.map((language) => (
                        <li key={language}>{language}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <ul className="stats" aria-label="At a glance">
            {achievements.map((achievement) => (
              <li key={achievement.label} className="stat">
                <span className="stat__label">{achievement.label}</span>
                <span className="stat__description">
                  {achievement.description}
                </span>
              </li>
            ))}
          </ul>
        </header>

        <main id="content" className="content">
          <Section
            id="agentic"
            index="01"
            title="Agentic Engineering"
            intro="Independent R&D. The current extension of two decades of software architecture."
          >
            <div className="agentic">
              <p className="agentic__lead">{agentic.lead}</p>
              <ol className="agentic__focus">
                {agentic.focus.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
              <ul className="tag-list" aria-label="Working principles">
                {agentic.practices.map((practice) => (
                  <li key={practice}>{practice}</li>
                ))}
              </ul>
              <p className="agentic__note">
                Personal lab, run separately from employer work. Public example:{' '}
                <a href="#projects">Pixel Survivor</a>, an autonomous agent
                operating in the open.
              </p>
            </div>
          </Section>

          <Section
            index="02"
            title="Expertise"
            intro="Daily practice across the full product lifecycle."
          >
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.title} className="skill">
                  <h3>{skill.title}</h3>
                  <ul>
                    {skill.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="experience"
            index="03"
            title="Experience"
            intro="Leading technical direction, mentoring engineers, and delivering global-scale digital products."
          >
            <ol className="timeline">
              {experience.map((item) => (
                <li key={`${item.company}-${item.role}`} className="role">
                  <span className="role__period">{item.period}</span>
                  <div className="role__body">
                    <h3>{item.role}</h3>
                    <p className="role__company">{item.company}</p>
                    <p className="role__summary">{item.summary}</p>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section
            id="work"
            index="04"
            title="Featured Work"
            intro="Flagship platforms with national and international reach."
          >
            <ul className="rows">
              {featured.map((item) => (
                <li key={item.href}>
                  <a
                    className="row"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="row__title">{item.title}</span>
                    <span className="row__desc">{item.description}</span>
                    <span className="row__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="projects"
            index="05"
            title="Personal Projects"
            intro="Autonomous systems, experimental games, and real-time platforms."
          >
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.title} className="project">
                  <a
                    className="project__image"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={project.image}
                      alt=""
                      width={project.width}
                      height={project.height}
                      sizes="(max-width: 720px) 100vw, 360px"
                    />
                  </a>
                  <h3>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.title}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </h3>
                  <p>{project.description}</p>
                  <ul className="tag-list" aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section
            index="06"
            title="Recognition"
            intro="Selected awards and industry acknowledgment."
          >
            <ul className="rows rows--static">
              {awards.map((item) => (
                <li key={item.title} className="row">
                  <span className="row__title">{item.title}</span>
                  <span className="row__desc">{item.detail}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            index="07"
            title="Education"
            intro="Continuous investment in craft and leadership."
          >
            <ul className="two-column">
              {education.map((item) => (
                <li key={`${item.title}-${item.org}`}>
                  <span className="item-title">{item.title}</span>
                  <span className="item-subtitle">{item.org}</span>
                </li>
              ))}
            </ul>
          </Section>

          <section
            id="contact"
            className="contact"
            aria-labelledby="contact-title"
          >
            <span className="section__index">08</span>
            <h2 id="contact-title" className="contact__title">
              Let&apos;s build something <em>that matters.</em>
            </h2>
            <a className="contact__email" href="mailto:ana@8manos.com">
              ana@8manos.com
            </a>
            <ul className="links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="footer">
          <div>
            <span className="footer__name">Anabelle Handdoek</span>
            <span>Senior Software Architect</span>
          </div>
          <span>© 2026</span>
        </footer>
      </div>
    </>
  );
};

export default IndexPage;
