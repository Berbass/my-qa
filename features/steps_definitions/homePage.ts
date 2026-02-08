import { Then } from '@cucumber/cucumber';
import { Actor } from '@cucumber/screenplay';

import World from '../support/World';

Then(
  '{actor} should see the home page content elements',
  async function (this: World, actor: Actor<World>) {
    const { pageContainsHeader, pageContains } = this.checks;

    await actor.ask(pageContainsHeader('Home'));
    await actor.ask(pageContains('Home page content'));
  },
);
