import type { ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const stack = [
  'TypeScript',
  'React',
  'Next.js',
  'Vue',
  'Node.js',
  'GraphQL',
  'D3.js',
  'Three.js',
  'Accessibility (WCAG/ARIA)',
  'Performance',
  'Testing & CI',
  'OWASP',
];

type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo?: string;
  image?: string;
  width?: number;
  height?: number;
};

const projects: Project[] = [
  {
    title: 'Pixel Survivor',
    description:
      'An autonomous AI artist with a public Bitcoin Lightning canvas. One agent runs it; another writes and ships its code changes.',
    tags: ['Pi agent-core', 'Lightning', 'Nostr'],
    image: '/images/pixel.png',
    width: 1703,
    height: 1371,
    href: 'https://pixel.xx.kg',
    repo: 'https://github.com/anabelle/pixel',
  },
  {
    title: 'ACARS',
    description:
      'Open-source airline-management MMO on Nostr with no central database. Game state is computed from signed events. Built agent-first.',
    tags: ['Nostr', 'React 19', 'TypeScript'],
    href: 'https://acars.pub',
    repo: 'https://github.com/anabelle/acars.pub',
  },
  {
    title: 'TetrisTwist',
    description: '3D Tetris in Three.js with physics and touch controls.',
    tags: ['Three.js', 'WebGL'],
    image: '/images/tetris.png',
    width: 715,
    height: 808,
    href: 'https://tetristwist.heyanabelle.com',
    repo: 'https://github.com/anabelle/TetrisTwist3D',
  },
  {
    title: 'Multiplayer Snake',
    description: 'Real-time multiplayer over Socket.IO, with leaderboards.',
    tags: ['Socket.IO', 'Node.js'],
    image: '/images/snake.png',
    width: 677,
    height: 462,
    href: 'https://snake.heyanabelle.com',
    repo: 'https://github.com/anabelle/p2p-snake',
  },
];

const featured = [
  {
    title: 'Biblioteca Abierta del Proceso de Paz',
    href: 'https://bapp.com.co',
    description: "Open archive of Colombia's peace process.",
  },
  {
    title: '45SNA · Salón Nacional de Artistas',
    href: 'https://45sna.com',
    description: "The national art salon's first online exhibition.",
  },
  {
    title: 'Cerosetenta',
    href: 'https://cerosetenta.uniandes.edu.co',
    description:
      'Independent journalism, Universidad de los Andes. Premio Gabo 2020.',
  },
  {
    title: 'Consonante',
    href: 'https://consonante.org',
    description: 'Local journalism for Colombian towns without news coverage.',
  },
  {
    title: 'Volcánicas',
    href: 'https://volcanicas.com',
    description: 'Feminist investigative journalism, Latin America.',
  },
];

const experience = [
  {
    company: 'Publicis Groupe · Razorfish',
    role: 'Experience Technology Architect',
    period: 'Jul 2025 – Present',
    bullets: [
      'Set architecture standards used by several delivery teams.',
      "Lead the company's global AI usage guidelines; give internal talks on AI tooling.",
      'Used agent orchestration on a client project to reach 100% unit test coverage and WCAG 2.2 AA, checked by Cypress end-to-end tests.',
    ],
  },
  {
    company: 'Publicis Groupe · Razorfish',
    role: 'Senior Experience Technology Engineer',
    period: 'Oct 2023 – Jul 2025',
    bullets: [
      'Led front-end for the website redesign of a healthcare brand serving 120M+ people, a site used by millions, under strict accessibility, privacy, and performance requirements.',
      'Shipped it WCAG AA, legal, and security compliant.',
    ],
  },
  {
    company: 'Publicis Groupe · Razorfish',
    role: 'Senior Front-End Engineer',
    period: 'Jun 2022 – Oct 2023',
    bullets: [
      'React and TypeScript interfaces for global brands; accessibility and conversion work on ecommerce flows.',
    ],
  },
  {
    company: '8manos S.A.S',
    role: 'Founder & Technical Director',
    period: 'Sep 2010 – Jul 2022',
    bullets: [
      'Founded and ran a software studio. Clients included Banco de la República, Ministerio de Cultura, and Federación Nacional de Cafeteros.',
      'Built Cerosetenta (Premio Gabo 2020, Lápiz de Acero Best Website 2015).',
    ],
  },
  {
    company: 'La Gente Del Común',
    role: 'Technical Lead',
    period: 'Jun 2013 – Jun 2022',
    bullets: [
      "Full-stack lead on Colombia's Peace Process Open Library, plus APIs and D3.js visualizations for Universidad de los Andes and press-freedom groups.",
    ],
  },
  {
    company: 'La Cápsula Ltda.',
    role: 'Lead Web Developer',
    period: 'Mar 2005 – Dec 2012',
    bullets: [
      'A 24/7 streaming service and interactive sites for film studios and universities.',
    ],
  },
];

const awards = [
  {
    title: 'Premio Gabo 2020 · Reconocimiento Clemente Manuel Zabala',
    detail: 'Cerosetenta, built by 8manos.',
  },
  {
    title: 'Lápiz de Acero · Best Website 2015',
    detail: 'Cerosetenta, built by 8manos.',
  },
  {
    title: 'PautaVisible',
    detail: 'Government ad-spend transparency platform.',
  },
  {
    title: 'Brutalist Websites · Honorable Mention',
    detail: 'montenegrojaramillo.info',
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
  { label: '8manos.com/trabajo', href: 'https://8manos.com/trabajo/' },
];

const languages = ['Spanish (Native)', 'English (C1)', 'French (A2)'];

const nav = [
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

type SectionProps = {
  id?: string;
  index: string;
  title: string;
  children: ReactNode;
};

const Section = ({ id, index, title, children }: SectionProps) => (
  <section id={id} className="section" aria-labelledby={`${id ?? index}-title`}>
    <div className="section__header">
      <span className="section__index">{index}</span>
      <h2 id={`${id ?? index}-title`}>{title}</h2>
    </div>
    <div className="section__body">{children}</div>
  </section>
);

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Anabelle Handdoek · Software Architect</title>
        <meta
          name="description"
          content="Software architect in Bogotá, 20 years building for the web. Currently at Razorfish. Previously founded 8manos."
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
            Software Architect · Bogotá
          </p>
          <h1 className="title">
            Anabelle <em>Handdoek</em>
          </h1>

          <div className="hero__grid">
            <div className="hero__intro">
              <p className="lead">
                I&apos;ve built for the web for 20 years, mostly on projects
                where accessibility and security weren&apos;t optional. Right
                now I&apos;m an architect at Razorfish, where I set front-end
                standards and lead how teams use AI. Before that I ran my own
                studio, 8manos, for twelve years, and built Colombia&apos;s
                Peace Process Open Library.
              </p>
              <p className="hero__agentic">
                Lately I build pipelines where coding agents do the work and
                humans review it. On a recent client project that got us to 100%
                unit test coverage and WCAG 2.2 AA.
              </p>
              <div className="hero__actions">
                <a className="button" href="mailto:ana@8manos.com">
                  Email me
                  <span aria-hidden="true">→</span>
                </a>
                <a className="button button--ghost" href="#work">
                  See the work
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
        </header>

        <main id="content" className="content">
          <Section id="experience" index="01" title="Experience">
            <ol className="timeline">
              {experience.map((item) => (
                <li key={`${item.company}-${item.role}`} className="role">
                  <span className="role__period">{item.period}</span>
                  <div className="role__body">
                    <h3>{item.role}</h3>
                    <p className="role__company">{item.company}</p>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="tag-list stack" aria-label="Stack">
              {stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section id="work" index="02" title="Selected Work">
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

          <Section id="projects" index="03" title="Side Projects">
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
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt=""
                        width={project.width}
                        height={project.height}
                        sizes="(max-width: 720px) 100vw, 360px"
                      />
                    ) : (
                      <span className="project__placeholder">
                        <span>{project.title}</span>
                        <span>{new URL(project.href).host}</span>
                      </span>
                    )}
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
                  {project.repo && (
                    <a
                      className="project__repo"
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source on GitHub <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </Section>

          <Section index="04" title="Recognition">
            <ul className="rows rows--static">
              {awards.map((item) => (
                <li key={item.title} className="row">
                  <span className="row__title">{item.title}</span>
                  <span className="row__desc">{item.detail}</span>
                </li>
              ))}
            </ul>
          </Section>

          <section
            id="contact"
            className="contact"
            aria-labelledby="contact-title"
          >
            <span className="section__index">05</span>
            <h2 id="contact-title" className="contact__title">
              Get in <em>touch.</em>
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
            <span>Software Architect</span>
          </div>
          <span>© 2026</span>
        </footer>
      </div>
    </>
  );
};

export default IndexPage;
