import { Actor } from '@cucumber/screenplay';
import { LogIn } from '../../types';

// todo:
// - implement logIn task for e2e tests
// - remove the _ prefix from parameters when implemented
export const logIn: LogIn = (_username, _password) => {
  return (_actor: Actor) => {
    throw new Error(
      'logIn task is not implemented for e2e tests. Please implement it in features/support/tasks/e2e/logIn.ts',
    );

    return {
      isLoginOk: false,
    };
  };
};
