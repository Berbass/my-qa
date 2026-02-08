import { Then } from '@cucumber/cucumber';
import { Actor } from '@cucumber/screenplay';

import World from '../support/World';

Then(
  '{actor} should see the Playwright installation page',
  async function (this: World, actor: Actor<World>) {
    const { pageTitleContains } = this.checks;

    await actor.ask(pageTitleContains(['Playwright', 'Installation']));
  },
);
