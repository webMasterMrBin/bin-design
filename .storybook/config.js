import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withInfo, setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

addParameters({
  options: {
    name: 'bin-design',
    isFullScreen: false,
  }
});

addDecorator(withInfo({
  header: true
}))

addDecorator(withKnobs);

function loadStories() {
  require('../src/stories/index.tsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
