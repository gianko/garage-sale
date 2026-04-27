import { readFileSync, writeFileSync } from 'fs';
const config = JSON.parse(readFileSync('dist/server/wrangler.json', 'utf8'));
config.main = 'dist/server/entry.mjs';
config.assets.directory = 'dist/client';
writeFileSync('wrangler.json', JSON.stringify(config, null, 2));
