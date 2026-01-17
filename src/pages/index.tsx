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
      'Architecting omni-channel experiences for global brands. Own technical direction across performance, accessibility, privacy, and security.',
    bullets: [
      'Define architecture standards adopted across multiple delivery teams.',
      'Drive Core Web Vitals and OWASP-aligned security reviews.',
      'Partner with design and product leadership on strategic initiatives.',
    ],
  },
  {
    company: 'Publicis Groupe · Razorfish',
    role: 'Senior Experience Technology Engineer',
    period: 'Oct 2023 – Jul 2025',
    summary:
      'Led frontend engineering for a healthcare platform redesign serving 120M+ users with strict performance, privacy, and accessibility requirements.',
    bullets: [
      'Delivered performance optimization playbooks adopted org-wide.',
      'Mentored engineers and led PGD OnChain innovation initiatives.',
      'Integrated frontend and backend systems across distributed teams.',
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

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Anabelle Handdoek · Senior Software Architect</title>
        <meta
          name="description"
          content="Senior Software Architect with 20+ years shipping accessible, secure, high-performance web applications for global brands. Currently leading technical direction at Publicis Groupe."
        />
        <meta
          name="keywords"
          content="Senior Software Architect, Full Stack Engineer, React, Next.js, TypeScript, accessibility, WCAG, OWASP, web3, AI"
        />
        <meta name="author" content="Anabelle Handdoek" />
        <meta name="theme-color" content="#0b0c14" />
      </Head>

      <div className="page">
        <a className="skip-link" href="#content">
          Skip to content
        </a>

        <header className="hero">
          <div className="hero__intro">
            <p className="eyebrow">Senior Software Architect</p>
            <h1 className="title">Anabelle Handdoek</h1>
            <p className="subtitle">
              Two decades shipping accessible, secure, and high-performance web
              applications. Trusted by global brands to lead technical direction
              where quality, compliance, and user experience converge.
            </p>
            <p className="subtitle">
              Founder of 8manos. Creator of award-winning platforms including
              Colombia&apos;s Peace Process Open Library. Currently architecting
              omni-channel experiences at Publicis Groupe for 120M+ users.
            </p>
            <p className="subtitle">
              Deep expertise in React, Next.js, TypeScript, accessibility
              (WCAG/ARIA), and security (OWASP). Passionate about FOSS, AI
              agents, web3, and building technology that matters.
            </p>
            <div className="hero__actions">
              <a className="button" href="mailto:ana@8manos.com">
                Start a Conversation
              </a>
              <a className="button button--ghost" href="#experience">
                View Experience
              </a>
            </div>
          </div>

          <div className="hero__aside">
            <div className="portrait">
              <Image
                src="/images/pixel_avatar.png"
                alt="Pixel Survivor avatar"
                width={226}
                height={224}
                priority
              />
            </div>
            <div className="contact-card">
              <div>
                <span className="label">Location</span>
                <p>Bogotá, Colombia</p>
              </div>
              <div>
                <span className="label">E-mail</span>
                <a href="mailto:ana@8manos.com">ana@8manos.com</a>
              </div>
              <div>
                <span className="label">Languages</span>
                <ul>
                  {languages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <main id="content" className="content">
          <section className="section">
            <div className="section__header">
              <h2>At a Glance</h2>
              <p>Proven impact across enterprise-scale platforms.</p>
            </div>
            <div className="stats">
              {achievements.map((achievement) => (
                <div key={achievement.label} className="stat">
                  <span className="stat__label">{achievement.label}</span>
                  <span className="stat__description">
                    {achievement.description}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="section section--accent">
            <div className="section__header">
              <h2>Expertise</h2>
              <p>Daily practice across the full product lifecycle.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.title} className="skill-card">
                  <h3>{skill.title}</h3>
                  <ul>
                    {skill.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="section">
            <div className="section__header">
              <h2>Experience</h2>
              <p>
                Leading technical direction, mentoring engineers, and delivering
                global-scale digital products.
              </p>
            </div>
            <div className="experience-list">
              {experience.map((item) => (
                <article
                  key={`${item.company}-${item.role}`}
                  className="experience"
                >
                  <div className="experience__meta">
                    <div>
                      <h3>{item.role}</h3>
                      <p className="experience__company">{item.company}</p>
                    </div>
                    <span className="experience__period">{item.period}</span>
                  </div>
                  <p className="experience__summary">{item.summary}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>Featured Work</h2>
              <p>Flagship platforms with national and international reach.</p>
            </div>
            <div className="featured-grid">
              {featured.map((item) => (
                <a
                  key={item.href}
                  className="featured-card"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="featured-link">{item.href}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="section section--grid">
            <div className="section__header">
              <h2>Personal Projects</h2>
              <p>
                Autonomous systems, experimental games, and real-time platforms.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-card__image">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={project.width}
                      height={project.height}
                    />
                  </div>
                  <div className="project-card__body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="tag-list">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <a
                      className="project-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Project
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section section--accent">
            <div className="section__header">
              <h2>Recognition</h2>
              <p>Selected awards and industry acknowledgment.</p>
            </div>
            <div className="awards">
              {awards.map((item) => (
                <div key={item.title} className="award-card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section section--grid">
            <div className="section__header">
              <h2>Education & Certifications</h2>
              <p>Continuous investment in craft and leadership.</p>
            </div>
            <ul className="two-column">
              {education.map((item) => (
                <li key={`${item.title}-${item.org}`}>
                  <span className="item-title">{item.title}</span>
                  <span className="item-subtitle">{item.org}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>Connect</h2>
              <p>Find me across platforms.</p>
            </div>
            <div className="links">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
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
