import { fakeStorage } from './fakeChrome/fakeStorage';

const storage = {
  clear: fakeStorage.clear,
  get: fakeStorage.get,
  remove: fakeStorage.remove,
  set: fakeStorage.set,
};

export const fakeChrome = {
  runtime: {
    getURL: (path: string) => `chrome://<extensionId>/${path}`,
    id: '<extensionId>',
  },
  storage: {
    local: storage,
    sync: storage,
  },
  i18n: {
    getMessage: (name: string) => name,
  },
};
