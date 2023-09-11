#!/usr/bin/env node
import { cyan } from 'colorette';
import fs from 'fs';
import open from 'open';
import process from 'process';

import { URL_OF, format, validateIds } from '../src';

const ids = JSON.parse(fs.readFileSync(process.cwd() + '/ids.json').toString());
validateIds(ids);

await open(
  format(URL_OF.CHROME.SUBMISSION, { id: ids.chrome.id, developerId: ids.chrome.developerId }),
);
if (ids.edge) {
  await open(format(URL_OF.EDGE.SUBMISSION, { productId: ids.edge.productId }));
} else {
  console.log(cyan('Edge is not registered.'));
}
if (ids.firefox) {
  await open(format(URL_OF.FIREFOX.SUBMISSION, { slug: encodeURIComponent(ids.firefox.slug) }));
} else {
  console.log(cyan('Firefox is not registered.'));
}
if (ids.greasyFork) {
  await open(format(URL_OF.GREASY_FORK.SUBMISSION, { id: ids.greasyFork.id }));
} else {
  console.log(cyan('Greasy Fork is not registered.'));
}
