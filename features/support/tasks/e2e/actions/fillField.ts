import { Actor } from '@cucumber/screenplay';
import World from '../../../World';

export const fillField = (label: string, value: string | string[]) => {
  return async (actor: Actor<World>) => {
    const { page } = actor.world;

    const field = page.getByLabel(label);

    if (!field) {
      throw new Error(`Field with label "${label}" not found.`);
    }

    if (value instanceof Array) {
      await field.click();

      for (const option of value) {
        const optionElement = page.getByLabel(option);
        await optionElement.click();
      }
    } else {
      await field.fill(value);
    }

    return { field };
  };
};
