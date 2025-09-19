#!/usr/bin/env node

// Extract cells from an Observable HTML notebook and transpile them using
// @observablehq/notebook-kit, emitting an Observable-compiled module that
// resembles hpcc's compiler output (functions + define wiring).
//
// Usage:
//   node tools/extract-ojs-from-html.mjs <input.html> [--out <output.js>]
//   node tools/extract-ojs-from-html.mjs <input.html> > <output.js>

import fs from 'node:fs';
import path from 'node:path';
import { transpile } from '@observablehq/notebook-kit';

function printUsageAndExit() {
  console.error('Usage: node extract-ojs-from-html.mjs <input.html> [--out <output.js>]');
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
    }
  }
  if (!args.input) printUsageAndExit();
  return args;
}

function typeToMode(type) {
  switch (type) {
    case 'application/vnd.observable.javascript':
      return 'ojs';
    case 'text/markdown':
      return 'md';
    case 'text/html':
      return 'html';
    case 'application/x-tex':
      return 'tex';
    case 'application/sql':
      return 'sql';
    case 'text/vnd.graphviz':
      return 'dot';
    case 'application/vnd.node.javascript':
      return 'node';
    case 'text/x-python':
      return 'python';
    case 'text/x-typescript':
      return 'ts';
    case 'module':
    default:
      return 'js';
  }
}

function extractCellsFromHtml(html) {
  const cells = [];
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  let nextId = 1;
  while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    const typeMatch = attrs.match(/type\s*=\s*(["'])(.*?)\1/i);
    const type = (typeMatch ? typeMatch[2] : 'module').toLowerCase();
    const mode = typeToMode(type);
    const value = body.trim();
    if (value.length === 0) continue;
    const outputAttr = (attrs.match(/\boutput\s*=\s*(["'])(.*?)\1/i) || [])[2];
    const hidden = /\bhidden\b/i.test(attrs);
    cells.push({ id: nextId++, mode, value, output: outputAttr, hidden });
  }
  return cells;
}

function toFunctionName(rawName, unnamedIndex) {
  if (rawName && rawName.trim()) {
    const normalized = rawName.replace(/^viewof\s+/i, 'viewof$').replace(/\s+/g, '$');
    return `_${normalized.replace(/[^\w$]/g, '$')}`;
  }
  return `_${unnamedIndex}`;
}

function toObserverName(rawName) {
  if (!rawName) return undefined;
  // Restore space after viewof for Observable module API
  return rawName.replace(/^viewof\$/i, 'viewof ');
}

async function main() {
  const { input, output } = parseArgs(process.argv.slice(2));
  const inputPath = path.resolve(process.cwd(), input);
  const html = fs.readFileSync(inputPath, 'utf8');

  const cells = extractCellsFromHtml(html);

  const headerJs = [];
  const functionDecls = [];
  const registry = [];

  let unnamedCounter = 1;

  for (const cell of cells) {
    if (cell.mode === 'js' || cell.mode === 'node') {
      headerJs.push(cell.value);
      continue;
    }

    const t = await transpile(cell, { resolveFiles: true });
    const deps = Array.isArray(t.inputs) ? t.inputs : [];
    const observerName = toObserverName(t.output ?? cell.output);

    const funcName = toFunctionName(observerName, unnamedCounter);
    if (!observerName) unnamedCounter++;

    const bodyExpr = t.body && t.body.trim() ? t.body.trim() : '() => {}';

    // Avoid double-wrapping: assign the transpiled function expression directly
    functionDecls.push(`const ${funcName} = ${bodyExpr};\n`);

    registry.push({ observerName, deps, funcName });
  }

  const lines = [];
  if (headerJs.length) {
    lines.push(headerJs.join('\n\n'));
    lines.push('');
  }
  lines.push(functionDecls.join('\n'));

  const footer = [];
  footer.push('export default function define(runtime, observer) {');
  footer.push('  const main = runtime.module();');
  footer.push('');
  footer.push('  function toString() { return this.url; }');
  footer.push('  const fileAttachments = new Map([');
  footer.push('    ');
  footer.push('  ]);');
  footer.push('  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));');
  footer.push('');
  for (const { observerName, deps, funcName } of registry) {
    const depList = `[${deps.map(d => JSON.stringify(d)).join(', ')}]`;
    if (observerName) {
      footer.push(`  main.variable(observer(${JSON.stringify(observerName)})).define(${JSON.stringify(observerName)}, ${depList}, ${funcName});`);
    } else {
      footer.push(`  main.variable(observer()).define(${depList}, ${funcName});`);
    }
  }
  footer.push('');
  footer.push('  return main;');
  footer.push('}');

  lines.push(footer.join('\n'));

  const outText = lines.join('\n');

  if (output) {
    const outPath = path.resolve(process.cwd(), output);
    fs.writeFileSync(outPath, outText);
  } else {
    process.stdout.write(outText);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

