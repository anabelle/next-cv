import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import '../helpers/fontawesomeConfig';
import '../strum-design-system';
import StrumProvider from '../strum-design-system/components/StrumProvider/StrumProvider';
import colors from '../strum-design-system/themes/timbre/colors';
import '../styles/app.css';
import dynamic from 'next/dynamic';

// Avoid SSR for spotlight to prevent mismatch and unnecessary work on server
const CursorSpotlight = dynamic(
  () => import('../components/CursorSpotlight/CursorSpotlight'),
  { ssr: false },
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={colors.primary} />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-512.png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/favicon-512.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <ErrorBoundary>
        <StrumProvider>
          <CursorSpotlight />
          <Component {...pageProps} />
        </StrumProvider>
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
