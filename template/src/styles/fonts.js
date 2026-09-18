import { css } from 'styled-components';

import JetBrainsMonoRegularWoff2 from '@fonts/JetBrainsMono/JetBrainsMono-Regular.woff2';
import JetBrainsMonoMediumWoff2 from '@fonts/JetBrainsMono/JetBrainsMono-Medium.woff2';
import JetBrainsMonoSemiboldWoff2 from '@fonts/JetBrainsMono/JetBrainsMono-SemiBold.woff2';

import JetBrainsMonoRegularItalicWoff2 from '@fonts/JetBrainsMono/JetBrainsMono-Italic.woff2';
import JetBrainsMonoMediumItalicWoff2 from '@fonts/JetBrainsMono/JetBrainsMono-MediumItalic.woff2';
import JetBrainsMonoSemiboldItalicWoff2 from '@fonts/JetBrainsMono/JetBrainsMono-SemiBoldItalic.woff2';

const jetBrainsMonoNormalWeights = {
  400: [JetBrainsMonoRegularWoff2],
  500: [JetBrainsMonoMediumWoff2],
  600: [JetBrainsMonoSemiboldWoff2],
};

const jetBrainsMonoItalicWeights = {
  400: [JetBrainsMonoRegularItalicWoff2],
  500: [JetBrainsMonoMediumItalicWoff2],
  600: [JetBrainsMonoSemiboldItalicWoff2],
};

const jetBrainsMono = {
  name: 'JetBrains Mono',
  normal: jetBrainsMonoNormalWeights,
  italic: jetBrainsMonoItalicWeights,
};

const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff2 = formats[0];

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

const jetBrainsMonoNormal = createFontFaces(jetBrainsMono);
const jetBrainsMonoItalic = createFontFaces(jetBrainsMono, 'italic');

const Fonts = css`
  ${jetBrainsMonoNormal + jetBrainsMonoItalic}
`;

export default Fonts;
