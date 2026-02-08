import { Actor, eventually } from '@cucumber/screenplay';
import World from '../../../World';
import { PageTitleContains } from '../../types/e2e/checks';

export const pageTitleContains: PageTitleContains = (
  expectedTitle: string | string[],
) => {
  let expectedArray =
    typeof expectedTitle === 'string' ? [expectedTitle] : expectedTitle;

  return async (actor: Actor<World>) => {
    let actualTitle = '';

    await eventually(async () => {
      actualTitle = await actor.world.page.title();

      expectedArray.forEach((title) => {
        if (!actualTitle.includes(title)) {
          throw new Error(
            `Expected page title to contain "${expectedTitle}", but got "${actualTitle}"`,
          );
        }
      });
    });

    return {
      pageTitle: actualTitle,
    };
  };
};
