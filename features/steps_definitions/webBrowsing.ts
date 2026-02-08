import { When } from '@cucumber/cucumber';
import { Actor } from '@cucumber/screenplay';

import World from '../support/World';

// the first 'string' parameter is for the page title, the second is for the URL
When(
  '{actor} browses to {string} at {string}',
  { timeout: (process.env.PWDEBUG ? 30 : 6) * 1000 },
  async function (
    this: World,
    actor: Actor<World>,
    title: string,
    url: string,
  ) {
    let appUrl = null;

    // if the url is relative, prepend the APP_HOST
    if (!url.startsWith('http')) {
      appUrl = this.APP_HOST + url;
    }

    const { pageTitleContains } = this.checks;

    const target = appUrl || url;

    await actor.attemptsTo(async () => this.page.goto(target));

    if (target?.includes(this.APP_HOST)) {
      await this.page.waitForLoadState('networkidle'); // as networkidle is discouraged, use it only for our own app
    }

    await actor.ask(pageTitleContains(title));
  },
);

When(
  `{actor} navigates to the app's home page`,
  async function (this: World, actor: Actor<World>) {
    const { pageTitleContains } = this.checks;

    await actor.attemptsTo(async () => this.page.goto(this.APP_HOST));
    await actor.ask(pageTitleContains('Home - EasyDok'));
  },
);

When(
  '{actor} clicks on {string}',
  async function (this: World, actor: Actor<World>, action: string) {
    const { clickOn } = this.actions;

    await actor.attemptsTo(clickOn(action));
  },
);
