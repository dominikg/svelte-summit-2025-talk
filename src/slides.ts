import type { Slide } from '$lib/slide'

import VitestSvelte from '$assets/images/vitest-svelte.svg'
import PlaywrightSvelte from '$assets/images/playwright-svelte.svg'
export default [
  { template: 'Start' },
  {
    template: 'CentredText',
    text: "Hi, I'm Dominik",
    notes: [
      'dominikg',
      '20 years of experience',
      'freelancer',
      'maintainer at svelte and vite',
      'vite-plugin-svelte',
      'tsconfck',
      'vite-ecosystem-ci',
    ],
  },
  {
    h1: 'Testing, 1 2 3 4',
    notes: [],
  },
  {
    template: 'Centred',
    h1: 'coming up',
    text: ['setup', 'unit', 'component', 'end to end'],
    notes: [],
  },
  {
    image: VitestSvelte,
    notes: ['started in 2021', 'exceptional growth', 'top of the surveys'],
  },
  {
    h1: 'setup vitest with `sv` cli',
    code: {
      source: `pnpm dlx sv add

┌  Welcome to the Svelte CLI! (v0.8.3)
│
◆  What would you like to add to your project? (use arrow keys / space bar)
...
│  ◼ vitest (unit testing - https://vitest.dev)
...
`,
      language: 'bash',
    },
    notes: ['sv is great', 'tested in vitest-ecosystem-ci'],
  },
  {
    h1: 'vitest config',
    h2: 'workspace',
    code: {
      source: `
// in vite.config.ts
  test: {
    workspace: [ // a workspace can contain multiple projects
    {
      extends: './vite.config.ts',
      test: { name: 'server',...}
    },
    {
      extends: './vite.config.ts',
      test: { name: 'client',...}
    },    
    ]
  }    
`,
      language: 'ts',
    },
    notes: ['workspace feature'],
  },
  {
    h1: 'vitest config',
    h2: 'server project',
    code: {
      source: `
// in vite.config.ts test.workspace
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
        }
      }, 
`,
      language: 'ts',
    },
    notes: ['runs in node environment','excludes .svelte. files!'],
  },
  {
    h1: 'vitest config',
    h2: 'client project',
    code: {
      source: `
// in vite.config.ts test.workspace
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()],
        test: {
          name: 'client',
          environment: 'jsdom',
          clearMocks: true,
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**'],
          setupFiles: ['./vitest-setup-client.ts']
        }
      },
`,
      language: 'ts',
    },
    notes: ['runs in jsdom environment','plugin','adds se'],
  },
  {
    h1: 'run unit tests',
    code: {
      source: `> pnpm test:unit

 ✓  server  src/lib/math.spec.ts (4 tests) 4ms
 ✓  client  src/lib/doubler.svelte.test.ts (2 tests) 4ms
 ✓  client  src/routes/page.svelte.test.ts (1 test) 63ms

 Test Files  3 passed (3)
      Tests  7 passed (7)

 PASS  Waiting for file changes...
       press h to show help, press q to quit`,
      language: 'bash',
    },
    notes: ['project prefix', 'watch mode demo'],
  },
  {
    h1: 'testing runes in .svelte.js',
    code: {
      source: ` // doubler.svelte.ts
export class Doubler {
  #getNumber;
  #double = $derived(this.#getNumber() * 2);
  constructor(getNumber: () => number) {
    this.#getNumber = getNumber;
  }
  get value() {
    return this.#double;
  }
}`,
      language: 'ts',
    },
    notes: ['$derived in a class'],
  },
  {
    h1: 'with runes in tests',
    h2: 'client project',
    code: {
      source: ` // in doubler.svelte.test.ts
describe('doubler.svelte.ts', () => {
  it('should be reactive', () => {
    let value = $state(0);
    let doubler = new Doubler(() => value);
    expect(doubler.value).toBe(0);
    value = 2;
    expect(doubler.value).toBe(4);
  });
});`,
      language: 'ts',
    },
    notes: ['infix notation','rune use in test code', 'reactivity!'],
  },

  {
    h1: 'Component',
    code: {
      source: ` // Greeter.svelte
<script lang="ts">
  let { name }: { name: string } = $props();
</script>

Hello, {name}!`,
      language: 'svelte',
    },
  },
  {
    h1: 'Component test',
    h2: 'client project',
    code: {
      source: `// Greeter.svelte.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Greeter from './Greeter.svelte';
describe('Greeter.svelte', () => {
  it('shows name', () => {
    const { container } = render(Greeter, { props: { name: 'Svelte Summit' } });
    expect(container).toHaveTextContent('Svelte Summit');
  });
});`,
      language: 'ts',
    },
    notes: ['render uses svelte mount'],
  },
  {
    h1: 'can also use runes',
    h2: 'client project',
    code: {
      source: `// in Greeter.svelte.test.ts describe
  it('can be tested with reactive state', () => {
    const props = $state({ name: 'Svelte Summit' });
    const { container } = render(Greeter, { props });
    expect(container).toHaveTextContent('Svelte Summit');
    props.name = 'Barcelona';
    flushSync();
    expect(container).not.toHaveTextContent('Svelte Summit');
    expect(container).toHaveTextContent('Barcelona');
  });`,
      language: 'ts',
    },
    notes: ['render uses svelte mount'],
  },
  {
    h1: 'or server output',
    h2: 'server project',
    code: {
      source: `// Greeter.ssr.test.ts
import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import Greeter from './Greeter.svelte';
describe('Greeter.svelte SSR', () => {
  it('renders name',()=>{
    const {body} = render(Greeter,{props:{name:'foo'}});
    expect(body).toContain('foo')
  })
});`,
      language: 'ts',
    },
    notes: ['useful in some cases','also for head output','faster feedback than e2e test'],
  },

  {
    image: PlaywrightSvelte,
    notes: ['started in 2021', 'exceptional growth', 'top of the surveys'],
  },
  {
    h1: 'setup playwright with `sv` cli',
    code: {
      source: `pnpm dlx sv add

┌  Welcome to the Svelte CLI! (v0.8.3)
│
◆  What would you like to add to your project? (use arrow keys / space bar)
...
│  ◼ playwright (browser testing - https://playwright.dev)
...
`,
      language: 'bash',
    },
  },

  {
    h1: 'playwright config',
    code: {
      source: `
// in playwright.config.ts
export default defineConfig({
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
  },
  testDir: 'e2e'
});   
`,
      language: 'ts',
    },
    notes: ['builtin start server script'],
  },
  {
    template: 'Centred',
    h1: 'Resources',
    text: [
      'https://vitest.dev',
      'https://playwright.dev',
      'https://testing-library.com/docs/svelte-testing-library',
      'https://svelte.dev/docs/svelte/testing',
      'https://github.com/dominikg/svelte-summit-testing',
    ],
  },
  {
    template: 'Centred',
    h1: 'Thank You',
    text: ['Matias', 'Vladimir', 'Jeppe', 'James', 'All of you!'],
  },
  {
    template: 'Centred',
    h1: 'get in touch',
    text: [
      'https://elk.zone/m.webtoo.ls/@dominikg',
      'https://github.com/dominikg',
      'https://svelte.dev/chat/',
      'https://goepel.it',
    ],
  },
  { template: 'End' },
] satisfies Slide[]
