import { Then, When } from '@cucumber/cucumber';
import { Actor } from '@cucumber/screenplay';
import assert from 'assert';

import World from '../support/World';

When('{actor} has valid login credentials', function (actor: Actor<World>) {
  actor.remember('username', 'validUser');
  actor.remember('password', 'validPassword');
});

When(
  '{actor} enters valid login credentials',
  function (this: World, actor: Actor<World>) {
    const { logIn } = this.actions;

    const loginResult = actor.attemptsTo(
      logIn(actor.recall('username'), actor.recall('password')),
    );

    actor.remember('isLoggedIn', loginResult.isLoginOk);
  },
);

Then(
  '{actor} should be logged in successfully',
  function (actor: Actor<World>) {
    assert.ok(
      actor.recall('isLoggedIn'),
      `Actor ${actor.name} should be logged in successfully`,
    );
  },
);
