#!/usr/bin/env node
import { cyan } from 'colorette';
import fs from 'fs';
import open from 'open';
import process from 'process';

import { getGreasyForkUrl, getReviewUrl } from '../module/index.js';

const ids = JSON.parse(fs.readFileSync(process.cwd() + '/ids.json').toString());

open(getReviewUrl(ids.chrome.id, ids));
if (ids.edge) {
  open(getReviewUrl(ids.edge.crxId, ids));
} else {
  console.log(cyan('Edge is not registered.'));
}
if (ids.firefox) {
  open(getReviewUrl(ids.firefox.id, ids));
} else {
  console.log(cyan('Firefox is not registered.'));
}
if (ids.greasyFork) {
  open(getGreasyForkUrl(ids.greasyFork.id));
} else {
  console.log(cyan('Greasy Fork is not registered.'));
}
