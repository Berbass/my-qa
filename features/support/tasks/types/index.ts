import { Action } from '@cucumber/screenplay';
import {
  PageContains,
  PageContainsHeader,
  PageTitleContains,
} from './e2e/checks';
import { ClickOn } from './e2e/clickOn';
import { fillField } from '../e2e/actions/fillField';

export type LogIn = (
  username: string,
  password: string,
) => Action<{ isLoginOk: boolean }>;

export type Checks = {
  pageTitleContains: PageTitleContains;
  pageContains: PageContains;
  pageContainsHeader: PageContainsHeader;
};

export type Actions = {
  logIn: LogIn;
  clickOn: ClickOn;
  fillField: typeof fillField;
};
