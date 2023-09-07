#!/usr/bin/env node
import fs from 'fs';
import open from 'open';
import process from 'process';

import {
  getChromeStoreUrl,
  getEdgeStoreUrl,
  getFirefoxStoreUrl,
  getGreasyForkStoreUrl,
} from '../module/index.js';

const ids = JSON.parse(fs.readFileSync(process.cwd() + '/ids.json').toString());

open(getChromeStoreUrl(ids.chrome.id));
if (ids.edge) open(getEdgeStoreUrl(ids.edge.crxId));
if (ids.firefox) open(getFirefoxStoreUrl(ids.firefox.slug));
if (ids.greasyFork) open(getGreasyForkStoreUrl(ids.greasyFork.id));
