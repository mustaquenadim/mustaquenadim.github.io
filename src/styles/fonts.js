import { css } from 'styled-components';

const calibreNormalWeights = {
  400: ['/fonts/Calibre/Calibre-Regular.woff', '/fonts/Calibre/Calibre-Regular.woff2'],
  500: ['/fonts/Calibre/Calibre-Medium.woff', '/fonts/Calibre/Calibre-Medium.woff2'],
  600: ['/fonts/Calibre/Calibre-Semibold.woff', '/fonts/Calibre/Calibre-Semibold.woff2'],
};

const calibreItalicWeights = {
  400: ['/fonts/Calibre/Calibre-RegularItalic.woff', '/fonts/Calibre/Calibre-RegularItalic.woff2'],
  500: ['/fonts/Calibre/Calibre-MediumItalic.woff', '/fonts/Calibre/Calibre-MediumItalic.woff2'],
  600: ['/fonts/Calibre/Calibre-SemiboldItalic.woff', '/fonts/Calibre/Calibre-SemiboldItalic.woff2'],
};

const sfMonoNormalWeights = {
  400: ['/fonts/SFMono/SFMono-Regular.woff', '/fonts/SFMono/SFMono-Regular.woff2'],
  600: ['/fonts/SFMono/SFMono-Semibold.woff', '/fonts/SFMono/SFMono-Semibold.woff2'],
};

const sfMonoItalicWeights = {
  400: ['/fonts/SFMono/SFMono-RegularItalic.woff', '/fonts/SFMono/SFMono-RegularItalic.woff2'],
  600: ['/fonts/SFMono/SFMono-SemiboldItalic.woff', '/fonts/SFMono/SFMono-SemiboldItalic.woff2'],
};

const calibre = {
  name: 'Calibre',
  normal: calibreNormalWeights,
  italic: calibreItalicWeights,
};

const sfMono = {
  name: 'SF Mono',
  normal: sfMonoNormalWeights,
  italic: sfMonoItalicWeights,
};

const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff = formats[0];
    const woff2 = formats[1];

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
            url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

const calibreNormal = createFontFaces(calibre);
const calibreItalic = createFontFaces(calibre, 'italic');

const sfMonoNormal = createFontFaces(sfMono);
const sfMonoItalic = createFontFaces(sfMono, 'italic');

const Fonts = css`
  ${calibreNormal + calibreItalic + sfMonoNormal + sfMonoItalic}
`;

export default Fonts;
