#!/usr/bin/env node
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
if (ids.edge) open(getSubmissionUrlForEdgeStore(ids.edge.productId));
if (ids.firefox) open(getSubmissionUrlForFirefoxStore(ids.firefox.slug));
if (ids.greasyFork) open(getSubmissionUrlForGreasyFork(ids.greasyFork.id));
