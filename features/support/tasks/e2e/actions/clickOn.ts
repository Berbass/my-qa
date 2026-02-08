import { Actor, eventually } from '@cucumber/screenplay';
import World from '../../../World';
import { ClickOn } from '../../types/e2e/clickOn';

export const clickOn: ClickOn = (action, trigger, strictTriggerMatch) => {
  return async (actor: Actor<World>) => {
    const { page } = actor.world;

    let actionTrigger = page.getByRole(trigger || 'button', {
      name: action,
    });

    if (!strictTriggerMatch && (await actionTrigger.count()) === 0) {
      actionTrigger = page.locator(`text=${action}`);

      if ((await actionTrigger.count()) === 0) {
        throw new Error(
          `No element found with ${trigger ? `role "${trigger}" and ` : ''}name "${action}"`,
        );
      }
    }

    await actionTrigger.click();

    return {
      actionTrigger,
    };
  };
};
