#!/usr/bin/env tsx

import { build } from './build.js';
import { publish } from './publish.js';
import { test } from './test.js';

const task = process.argv[2];
const [who] = process.argv.slice(3);
if (task === '--publish') {
  const ovsx = process.argv.includes('--ovsx');
  const vsce = process.argv.includes('--vsce');
  publish(who, { ovsx, vsce });
} else if (task === '--build') {
  build(who);
} else if (task === '--test-build') {
  build(who, true);
} else if (task === '--test') {
  test(who);
} else {
  console.error(`Unknown task: ${task}`);
}
