import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/tokens.css';
import '../src/styles/base.css';
import 'katex/dist/katex.min.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: 'dark',
        light: 'light',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
  },
};

export default preview;
