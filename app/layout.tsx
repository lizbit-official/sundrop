import React from 'react';
import '@/styles/global.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Sundrop Weather</title>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="application-name" content="Sundrop Weather" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1c6080" />
        <meta
          name="description"
          content="Discover the perfect weather app that provides detailed forecasts,
           data visualization, and all the meteorological information you need."
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sundrop Weather" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1c6080" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#1c6080" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sundrop" />
        <meta property="og:site_name" content="Sundrop Weather" />
        <meta property="og:url" content="https://sundrop.loginchanged.com" />
        <meta property="og:image" content="https://sundrop.loginchanged.com/icons/apple-touch-icon.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
