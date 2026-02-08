import { Actor, eventually } from '@cucumber/screenplay';

import { Locator } from '@playwright/test';
import World from '../../../World';
import { PageContainsHeader } from '../../types/e2e/checks';

// todo: maybe replace by pageContains with getByRole('heading') as selector ?
export const pageContainsHeader: PageContainsHeader = (
  expectedHeader: string,
) => {
  return async (actor: Actor<World>) => {
    let matchedHeader: Locator | null = null;

    await eventually(async () => {
      const headingElements = actor.world.page.locator(
        'h1, h2, h3, h4, h5, h6',
      );

      matchedHeader = headingElements.filter({ hasText: expectedHeader });

      if ((await matchedHeader.count()) === 0) {
        throw new Error(
          `Expected page to contain header "${expectedHeader}", but it was not found.`,
        );
      }
    });

    return {
      matchedHeader,
    };
  };
};
