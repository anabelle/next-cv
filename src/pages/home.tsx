import type { ReactNode } from 'react';
import Head from 'next/head';

const links = [
  { label: 'CV / Resume', href: 'https://cv.heyanabelle.com/' },
  { label: 'GitHub', href: 'https://github.com/anabelle' },
  {
    label: 'Nostr',
    href: 'https://primal.net/p/nprofile1qqsdcmn9eaw7pfykhwr2uq3ps39nkj9a8k3xg0xahn35ucr4ftzmn9czsqwxy',
  },
  { label: 'X', href: 'https://x.com/heyanabelle' },
];

const Line = ({ children }: { children: ReactNode }) => (
  <span className="line">{children}</span>
);

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Anabelle Handdoek</title>
        <meta
          name="description"
          content="Software architect and builder. Two decades of web, and still at it."
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

      <main className="page" id="content">
        <header className="hero">
          <h1 className="title">
            Anabelle <em>Handdoek</em>
          </h1>
          <p className="home-sub">Software architect. Builder of small and large things on the web since 2004.</p>
        </header>

        <ul className="home-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer">
        <span>© 2026</span>
      </footer>
    </>
  );
};

export default HomePage;
