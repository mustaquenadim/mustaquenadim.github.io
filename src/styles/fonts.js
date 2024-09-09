import localFont from 'next/font/local';
import { css } from 'styled-components';

const calibreNormal = localFont({
  src: [
    {
      path: '../../public/fonts/Calibre/Calibre-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

const calibreItalic = localFont({
  src: [
    {
      path: '../../public/fonts/Calibre/Calibre-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-SemiboldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Calibre/Calibre-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
});

const sfMonoNormal = localFont({
  src: [
    {
      path: '../../public/fonts/SFMono/SFMono-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFMono/SFMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFMono/SFMono-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFMono/SFMono-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

const sfMonoItalic = localFont({
  src: [
    {
      path: '../../public/fonts/SFMono/SFMono-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFMono/SFMono-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFMono/SFMono-SemiboldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFMono/SFMono-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
});

const Fonts = css`
  ${calibreNormal + calibreItalic + sfMonoNormal + sfMonoItalic}
`;

export default Fonts;
