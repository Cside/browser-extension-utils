#!/usr/bin/env node
import { cyan } from 'colorette';
import fs from 'fs';
import open from 'open';
import process from 'process';

import {
  getSubmissionUrlForChromeStore,
  getSubmissionUrlForEdgeStore,
  getSubmissionUrlForFirefoxStore,
  getSubmissionUrlForGreasyFork,
} from '../module/index.js';

const ids = JSON.parse(fs.readFileSync(process.cwd() + '/ids.json').toString());

open(getSubmissionUrlForChromeStore(ids.chrome.id, ids.chrome.developerId));
if (ids.edge) {
  open(getSubmissionUrlForEdgeStore(ids.edge.productId));
} else {
  console.log(cyan('Edge is not registered.'));
}
if (ids.firefox) {
  open(getSubmissionUrlForFirefoxStore(ids.firefox.slug));
} else {
  console.log(cyan('Firefox is not registered.'));
}
if (ids.greasyFork) {
  open(getSubmissionUrlForGreasyFork(ids.greasyFork.id));
} else {
  console.log(cyan('Greasy Fork is not registered.'));
}
