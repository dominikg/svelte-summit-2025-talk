import type { Slide } from '$lib/slide'

import VitestSvelte from '$assets/images/vitest-svelte.svg'
import PlaywrightSvelte from '$assets/images/playwright-svelte.svg'
import VitestBrowserMode from '$assets/images/vitest-browser-mode.png'
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
    notes: [
      'Who writes tests?',
      'Who likes writing tests?'
    ],

  },
  {
    template: 'Centred',
    h1: 'coming up',
    text: ['setup', 'unit', 'component', 'end to end'],
    notes: [
      'speedrun',
      'little bit of everything'
    ],
  },
  {
    image: VitestSvelte,
    notes: ['Vitest','started in 2021', 'exceptional growth', 'top of the surveys','Zero config'],
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
    notes: [
      'sv is great',
      'Manuel is here!',
      'tested in vitest-ecosystem-ci'
    ],
  },
  {
    h1: 'vitest config',
    h2: 'workspace',
    code: {
      source: `// in vite.config.ts
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
  }`,
      language: 'ts',
    },
    notes: [
      'workspace feature',
      'projects'
    ],
  },
  {
    h1: 'vitest config',
    h2: 'server project',
    code: {
      source: `// in vite.config.ts test.workspace
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
        }
      }`,
      language: 'ts',
    },
    notes: [
      'runs in node environment',
      'excludes .svelte. files!',
    ],
  },
  {
    h1: 'vitest config',
    h2: 'client project',
    code: {
      source: `// in vite.config.ts test.workspace
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()], // testing-library svelte helper
        test: {
          name: 'client',
          environment: 'jsdom',
          clearMocks: true,
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**'],
          setupFiles: ['./vitest-setup-client.ts']
        }
      }`,
      language: 'ts',
    },
    notes: ['runs in jsdom environment', 'plugin', 'adds setup file for mocking'],
  },
  {
    h1: 'mock matchMedia',
    h2: 'used by svelte itself',
    code: {
      source: `// vitest-setup-client.ts      
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// required for svelte5 in jsdom as it does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  enumerable: true,
  value: vi.fn().mockImplementation((query) => ({
    //...
  }))
});`,
      language: 'ts',
    },
    notes: ['you can add more mocks','multiple setup files'],
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
    notes: ['project prefix','rerun on changes!', 'watch mode demo'],
  },
  {
    h1: 'testing runes in svelte modules',
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
    notes: ['$derived in a class','just an example'],
  },
  {
    h1: 'with runes in test modules!',
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
    notes: ['infix notation inspired by request from community', 'rune use in test code', 'reactivity!'],
  },

  {
    h1: 'Test components',
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
    h1: 'with @testing-library/svelte',
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
    notes: ['render is a util around svelte mount'],
  },
  {
    h1: 'runes work in component tests too',
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
    notes: ['needs flushSync to propagate'],
  },
  {
    h1: 'and you can also test SSR output',
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
    notes: ['useful in some cases', 'also for head output', 'faster feedback than e2e test'],
  },
  {
    template: 'Centred',
    h1: 'Testing in a real browser',
    h2: "when a fake dom doesn't cut it",
    text: ['missing apis', 'no visual feedback', 'subtle behavior differences'],
  },

  {
    h1: 'with vitest browser mode',
    code: {
      source: `
pnpm i -D @vitest/browser vitest-browser-svelte playwright

Packages: +7
+++++++
Progress: resolved 328, reused 284, downloaded 0, added 0, done

devDependencies:
+ @vitest/browser 3.1.2
+ playwright 1.52.0
+ vitest-browser-svelte 0.1.0     
`,
      language: 'bash',
    },
  },
  {
    h1: 'vitest config',
    h2: 'client project',
    code: {
      source: `// in vite.config.ts test.workspace
        test:{
          name: 'client',
          environment: 'browser',
          browser:{
            enabled: true,
            provider: 'playwright',
            instances:[{
              browser: 'chromium'
            }]
          },
          //...
        }
`,
      language: 'ts',
    },
    notes: ['browser environment', 'webdriverio provider', 'multiple browsers'],
  },
  {
    h1: 'more matchers, less mocking',
    code: {
      source: `// vitest-setup-client.ts      
/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />`,
      language: 'ts',
    },
  },
  {
    h1: 'use vitest-browser-svelte',
    h2: 'client project',
    code: {
      source: `// Greeter.svelte.test.ts
import { describe, it, expect } from 'vitest';
- import { render } from '@testing-library/svelte';
+ import { render } from 'vitest-browser-svelte';
import Greeter from './Greeter.svelte';
describe('Greeter.svelte', () => {
  //...
});`,
      language: 'diff',
    },
    notes: [
      'fork with a small changes',
      'clear before instead of after',
      'hopefully collaborate for common base',
    ],
  },

  {
    h1: 'demo time',
    image: VitestBrowserMode,
  },
  ///--- playwright
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
    h1: 'run e2e tests',
    code: {
      source: ` ❯ pnpm test:e2e

> svelte-summit-testing@0.0.1 test:e2e /home/dominikg/develop/svelte-summit-2025/test-app
> playwright test
Running 4 tests using 3 workers

  ✓  1 e2e/demo.test.ts:3:1 › home page has expected h1 (107ms)
  ✓  2 e2e/about.test.ts:4:2 › /about › does not use clientside javascript (342ms)
  ✓  3 e2e/api.test.ts:4:2 › /api/data.json › returns message (341ms)
  ✓  4 e2e/about.test.ts:10:2 › /about › has a heading containing About (83ms)

  4 passed (4.0s)`,
      language: 'bash',
    },
  },

  {
    h1: 'api test',
    code: {
      source: `import {test,expect} from '@playwright/test';

test.describe('/api/data.json',()=>{
  test('returns message', async ({ request }) => {
    const response = await request.get('/api/data.json');
    const data = await response.json();
    expect(data.message).toBe('Hello Svelte Summit')
  })
})`,
      language: 'ts',
    },
  },

  {
    h1: 'about test',
    code: {
      source: `test.describe('/about',()=>{
  test('does not use clientside javascript', async ({ request }) => {
    const response = await request.get('/about',{headers:{accept:'text/html'}});
    const html = (await response.body()).toString();
    expect(html).not.toContain('<script')
    expect(html).toContain('<body')
  })
  test('has a heading containing About',async ({page})=>{
    await page.goto('/about');
    await expect(page.getByRole('heading')).toContainText('About');
  })
})`,
      language: 'ts',
    },
  },

  {
    h1: 'multiple local servers',
    code: {
      source: `// playwright.config.ts
  webServer: [{
    commmand: 'npm run start:backend',
    port: 3000
  } , {
    command: 'npm run build && node build/index.js',
    env: {PORT: '4173'}
    port: 4173,
  }],`,
      language: 'ts',
    },
  },

  {
    h1: 'remote testing',
    code: {
      source: ` // playwright.config.ts
const E2E_BASE_URL = process.env.E2E_BASE_URL;
const localConfig: PlaywrightTestConfig = {
  webServer: [{
      command: 'npm run build && node build/index.js',
      env: { PORT: '4173' }, port: 4173,
    }],
}
const remoteConfig: PlaywrightTestConfig = {
  use: { baseURL: E2E_BASE_URL }
}
export default defineConfig({
  testDir: 'e2e',
  ...(E2E_BASE_URL ? remoteConfig : localConfig)
});`,
      language: 'ts',
    },
  },

  {
    h1: 'execute in docker',
    code: {
      source: `#Dockerfile
ARG E2E_BASE_URL      
FROM mcr.microsoft.com/playwright:v1.52.0-noble
ENV CI=1\\
    E2E_BASE_URL=\${E2E_BASE_URL}
RUN npm i -g pnpm@10.9.0
COPY .npmrc pnpm-lock.yml .
RUN pnpm fetch
COPY . .
RUN pnpm install --frozen-lockfile --offline

# ...`,
      language: 'bash',
    },
    notes: ['also useful for vitest headless browser mode'],
  },
  {
    template: 'Centred',
    h1: 'Thank You',
    text: ['Matias', 'Vladimir', 'Jeppe', 'James', 'All of you!'],
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
      'https://github.com/dominikg/svelte-summit-2025-talk',
    ],
  },
  {
    template: 'Centred',
    h1: 'get in touch',
    h2: 'available for consulting',
    text: [
      'https://goepel.it',
      'https://elk.zone/m.webtoo.ls/@dominikg',
      'https://github.com/dominikg',
      'https://svelte.dev/chat/',
    ],
    notes: ['for hire'],
  },
  // todo: QA ?
  { template: 'End' },
] satisfies Slide[]
