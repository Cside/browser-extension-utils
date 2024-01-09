import { fakeStorage } from './fakeChrome/fakeStorage';

export const fakeChrome = {
  runtime: {
    getURL: (path: string) => `chrome://<extensionId>/${path}`,
    id: '<extensionId>',
  },
  storage: {
    local: fakeStorage,
    sync: fakeStorage,
  },
  i18n: {
    getMessage: (name: string) => name,
    getUILanguage: () => 'en-US',
  },
};
