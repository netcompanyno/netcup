import { setupStore } from './auth/redux-integration';

const listeners = [
  { integration: 'auth', registerStore: setupStore },
];

const registerListeners = store =>
  listeners.forEach(listener => {
    listener.registerStore(store);
    console.log('module', listener.integration, 'registered with firebase');
  });

export default registerListeners;
