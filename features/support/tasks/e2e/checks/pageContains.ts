import { Actor, eventually } from '@cucumber/screenplay';

import { Locator } from '@playwright/test';
import World from '../../../World';
import { PageContains } from '../../types/e2e/checks';

export const pageContains: PageContains = (
  expectedContent: string,
  matchingSection,
) => {
  return async (actor: Actor<World>) => {
    const matchedElement = await eventually(async () => {
      const { page } = actor.world;
      let locator: Locator;
      const fieldsSelector = `input[value="${expectedContent}"], textarea[value="${expectedContent}"]`;

      if (matchingSection) {
        const sectionLocator: Locator =
          typeof matchingSection === 'string'
            ? page.locator(matchingSection)
            : matchingSection;
        const sectionCount = await sectionLocator.count();

        if (sectionCount === 0) {
          throw new Error(`No section found matching: ${matchingSection}`); // Ensure the section exists
        }

        locator = sectionLocator
          .locator(`text=${expectedContent}`)
          .or(sectionLocator.locator(fieldsSelector));
      } else {
        locator = page
          .locator(`text=${expectedContent}`)
          .or(page.locator(fieldsSelector));
      }

      if ((await locator.count()) < 1) {
        throw new Error(
          `No matches found for content "${expectedContent}"` +
            (matchingSection ? ` in section "${matchingSection}"` : ''),
        );
      }

      return locator;
    });

    return {
      matchedElement,
    };
  };
};
