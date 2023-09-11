#!/usr/bin/env node
import { cyan } from 'colorette';
import fs from 'fs';
import open from 'open';
import process from 'process';

import { URL_OF, format, getReviewUrl } from '../src';

const ids = JSON.parse(fs.readFileSync(process.cwd() + '/ids.json').toString());

await open(getReviewUrl(ids.chrome.id, ids));
if (ids.edge) {
  await open(getReviewUrl(ids.edge.crxId, ids));
} else {
  console.log(cyan('Edge is not registered.'));
}
if (ids.firefox) {
  await open(getReviewUrl(ids.firefox.id, ids));
} else {
  console.log(cyan('Firefox is not registered.'));
}
if (ids.greasyFork) {
  await open(format(URL_OF.GREASY_FORK.STORE, { id: ids.greasyFork.id }));
} else {
  console.log(cyan('Greasy Fork is not registered.'));
}
