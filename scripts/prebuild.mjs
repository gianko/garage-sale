import { rmSync } from 'fs';
try { rmSync('wrangler.json'); } catch (_) {}
