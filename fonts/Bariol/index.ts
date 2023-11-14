import localFont from 'next/font/local';

export const Bariol = localFont({
  src: './bariol_regular-webfont.woff2',
  display: 'fallback',
  fallback: [
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Helvetica Neue',
    'sans-serif',
  ],
});
