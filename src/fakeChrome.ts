import { fakeStorage } from './fakeChrome/fakeStorage';

export const fakeChrome = {
  runtime: {
    getURL: (path: string) => `chrome://<extensionId>/${path}`,
    id: '<extensionId>',
  },
  storage: {
    local: {
      clear: fakeStorage.clear,
      get: fakeStorage.get,
      remove: fakeStorage.remove,
      set: fakeStorage.set,
    },
  },
  i18n: {
    getMessage: (name: string) => name,
  },
};
