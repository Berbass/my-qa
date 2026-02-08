import { PromiseAction } from '@cucumber/screenplay';
import World from '../../../World';
import { Locator } from '@playwright/test';

export type PageTitleContains = (
  expectedTitle: string | string[],
) => PromiseAction<{ pageTitle: string }, World>;

export type PageContainsHeader = (
  expectedHeader: string,
) => PromiseAction<{ matchedHeader: Locator | null }, World>;

export type PageContains = (
  expectedContent: string,
  matchingSection?: string | Locator,
) => PromiseAction<{ matchedElement: Locator | null }, World>;
