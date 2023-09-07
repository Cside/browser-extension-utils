#!/usr/bin/env node
import { cyan } from 'colorette';
import fs from 'fs';
import open from 'open';
import process from 'process';

import {
  getChromeStoreUrl,
  getEdgeStoreUrl,
  getFirefoxStoreUrl,
  getGreasyForkUrl,
} from '../module/index.js';

const ids = JSON.parse(fs.readFileSync(process.cwd() + '/ids.json').toString());

open(getChromeStoreUrl(ids.chrome.id));
if (ids.edge) {
  open(getEdgeStoreUrl(ids.edge.crxId));
} else {
  console.log(cyan('Edge is not registered.'));
}
if (ids.firefox) {
  open(getFirefoxStoreUrl(ids.firefox.slug));
} else {
  console.log(cyan('Firefox is not registered.'));
}
if (ids.greasyFork) {
  open(getGreasyForkUrl(ids.greasyFork.id));
} else {
  console.log(cyan('Greasy Fork is not registered.'));
}
