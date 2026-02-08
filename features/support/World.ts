import {
  After,
  Before,
  BeforeAll,
  defineParameterType,
  IWorldOptions,
  setWorldConstructor,
  World as BaseWorld,
} from '@cucumber/cucumber';
import { Actor, ActorParameterType } from '@cucumber/screenplay';
import ActorLookup from '@cucumber/screenplay/dist/src/ActorLookup';
import {
  Browser,
  BrowserContext,
  chromium,
  defineConfig,
  Page,
} from '@playwright/test';

import 'dotenv/config';

import { assignTasks } from './setupUtils';
import { Checks, Actions } from './tasks/types';

defineParameterType(ActorParameterType);

/**
 * A recreation of the `ActorWorld` from `@cucumber/screenplay`
 * The aim is to better handle the loading of tasks dynamically
 */
export default class World extends BaseWorld {
  // Playwright specific properties
  browser!: Browser;
  browserContext!: BrowserContext;
  page!: Page;

  // to allow tasks loading
  [key: string]: any;

  // Tasks typing
  actions!: Actions;
  checks!: Checks;

  APP_HOST = process.env.APP_HOST || 'http://localhost:8080';

  public readonly actorLookup = new ActorLookup();

  constructor(props: IWorldOptions) {
    super(props);
  }

  public async assignTasks(): Promise<void> {
    if (this.parameters.tasks) {
      console.log(`Loading tasks from: ${this.parameters.tasks}`);
      await assignTasks(this, this.parameters.tasks);
    }
  }

  async initBrowserContext() {
    this.browser = await chromium.launch({
      headless: this.parameters.headless || false,
    });
    this.browserContext = await this.browser.newContext();
    this.page = await this.browserContext.newPage();
  }

  async destroyBrowserContext() {
    await this.page.close();
    await this.browserContext.close();
    await this.browser.close();
  }

  public findOrCreateActor(actorName: string): Actor {
    return this.actorLookup.findOrCreateActor(this, actorName);
  }
}

setWorldConstructor(World);

BeforeAll(() => {
  defineConfig({
    use: {
      screenshot: 'on',
    },
    snapshotPathTemplate: 'reports/screenshots/{testFilePath}/{arg}{ext}',
  });
});

Before(async function () {
  let actions = [];

  if (this.parameters.tasks?.includes('e2e')) {
    actions.push(this.initBrowserContext());
  } else {
    console.log(
      'Skipping browser context initialization as tasks do not include "e2e"',
    );
  }

  if (this.parameters.tasks) {
    actions.push(this.assignTasks());
  }

  await Promise.all(actions);
});

After(async function () {
  if (!process.env.PWDEBUG && this.parameters.tasks?.includes('e2e')) {
    await this.destroyBrowserContext();
  }
});
