# Readme

One of the problems you can run into with storybook relates to global css.  
Each story is rendered within an iframe, but any css imported into a component
will be visible to all components across all stories.  
This can be be problem for example if you want to try out different tailwind themes under different stories but the global css overlaps

  * https://github.com/storybookjs/storybook/issues/16016

As a workaround to this we can use decorators to manipulate the style block within the head section of the iframe.  
The idea being instead of importing the global css within the component, import it inlined within the story then pass it to the decorator to insert

  * `removeHeadStyle` - searches for a style block with a given id (defaults to id of 'custom') then removes any style blocks found with that id
  * `addHeadStyle` - inserts a stlye block with the given css and id (defaults to id of 'custom')
  * `replaceHeadStyle` - performs a remove then a add, the same as the above but within a single statement.

## Examples

In both of the below examples tailwind v4 will be separately built independently for each story with a different theme
without any form of overlap between the stories

### Example using Replace

`ExampleComponent1.css`

```css
@import "tailwindcss";
@theme {
  --color-primary-100: #007c90;
}
```

`ExampleComponent1.stories.tsx`

```tsx
import preview from "#.storybook/preview";
import { ExampleComponent1 } from "./ExampleComponent1";
// Import the css as inline
import css from './ExampleComponent1.css?inline';
// Import the decorators
import { replaceHeadStyle } from 'storybook-head-decorator';

const meta = preview.meta({
  title: "Examples/ExampleComponent1",
  component: ExampleComponent1,
  //https://storybook.js.org/docs/writing-docs/autodocs
  //tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // Add the decorators
  // Remove any existing style block in the head with the id of 'tailwind'
  // Then add a new style block using the inline css imported above
  decorators: [replaceHeadStyle(css, 'tailwind')],
});
export const Default = meta.story();
```

### Example using Add / Remove

`ExampleComponent2.css`

```css
@import "tailwindcss";
@theme {
  --color-primary-100: #756d3b;
}
```

`ExampleComponent2.stories.tsx`

```tsx
import preview from "#.storybook/preview";
import { ExampleComponent2 } from "./ExampleComponent2";
// Import the css as inline
import css from './ExampleComponent2.css?inline';
// Import the decorators
import { removeHeadStyle, addHeadStyle } from 'storybook-head-decorator';

const meta = preview.meta({
  title: "Layouts/Pricing/ExampleComponent2",
  component: ExampleComponent2,
  //https://storybook.js.org/docs/writing-docs/autodocs
  //tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // Add the decorators
  // Remove any existing style block in the head with the id of 'tailwind'
  // Then add a new style block using the inline css imported above
  decorators: [addHeadStyle(css, 'tailwind'), removeHeadStyle('tailwind')],
});
export const Default = meta.story();
```
