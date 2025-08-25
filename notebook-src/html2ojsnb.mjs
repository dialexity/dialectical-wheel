#!/usr/bin/env node

// Extract OJS from an Observable HTML notebook by concatenating the
// contents of <script type="application/vnd.observable.javascript"> and
// <script type="text/markdown"> tags in document order, separated by blank lines.
//
// Usage:
//   node tools/extract-ojs-from-html.mjs <input.html> [--out <output.ojs>]
//   node tools/extract-ojs-from-html.mjs <input.html> > <output.ojs>

import fs from 'node:fs';
import path from 'node:path';
import { compile, ojs2notebook } from "@hpcc-js/observablehq-compiler";

function printUsageAndExit() {
  console.error('Usage: node extract-ojs-from-html.mjs <input.html> [--out <output.ojs>]');
  process.exit(1);
}

function parseArgs(argv) {
  const args = { input: undefined, output: undefined };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--out' || arg === '-o') {
      if (i + 1 >= argv.length) printUsageAndExit();
      args.output = argv[++i];
    } else if (!args.input) {
      args.input = arg;
    } else {
      // Ignore extra args for simplicity
    }
  }
  if (!args.input) printUsageAndExit();
  return args;
}

function extractCellsFromHtml(html) {
  const results = [];

  // Match <script ...>...</script> blocks.
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    const typeMatch = attrs.match(/type\s*=\s*(["'])(.*?)\1/i);
    const type = (typeMatch ? typeMatch[2] : '').toLowerCase();

    if (type === 'application/vnd.observable.javascript') {
      const content = body.trim();
      if (content.length > 0) results.push(content);
      continue;
    }

    if (type === 'text/markdown') {
      const raw = body.trim();
      if (raw.length === 0) continue;
      // Escape backticks and interpolation markers so this is safe inside a template literal
      const escaped = raw.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      results.push(`md\`${escaped}\``);
      continue;
    }

    if (type === 'module') {
      const content = body.trim();
      if (content.length > 0) results.push(content);
      continue;
    }
  }

  return results;
}

async function main() {
  const { input, output } = parseArgs(process.argv.slice(2));
  const inputPath = path.resolve(process.cwd(), input);
  const html = fs.readFileSync(inputPath, 'utf8');

  const cells = extractCellsFromHtml(html);
  const ojs = cells.join('\n\n') + (cells.length ? '\n' : '');

  if (output) {
    const outPath = path.resolve(process.cwd(), output);
    const ojsnb = ojs2notebook(ojs);
    fs.writeFileSync(outPath, JSON.stringify(ojsnb, null, 2));
  } else {
    process.stdout.write(ojs);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

