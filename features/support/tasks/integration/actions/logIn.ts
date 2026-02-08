import { Actor } from '@cucumber/screenplay';
import { LogIn } from '../../types';

// todo:
// - implement logIn task for integration tests
// - remove the _ prefix from parameters when implemented
export const logIn: LogIn = (_username, _password) => {
  return (_actor: Actor) => {
    return {
      isLoginOk: true,
    };
  };
};
