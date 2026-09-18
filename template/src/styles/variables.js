import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #000000;
    --navy: #0a0a0e;
    --light-navy: #16161d;
    --lightest-navy: #27272f;
    --navy-shadow: rgba(0, 0, 0, 0.7);
    --dark-slate: #4c4c56;
    --slate: #90909c;
    --light-slate: #b2b2be;
    --lightest-slate: #d6d6de;
    --white: #e8e8ee;
    --green: #64e9ee;
    --green-tint: rgba(100, 233, 238, 0.1);
    --pink: #f57dff;
    --blue: #57cbff;

    --font-sans: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Roboto Mono', monospace;
    --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
