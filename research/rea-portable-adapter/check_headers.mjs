// Exercise the real adapter header reader, without an analysis engine or execution.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [packageDirectory, output] = process.argv.slice(2);
if (!packageDirectory) throw new Error('Usage: node check_headers.mjs ADAPTER_DIRECTORY [NEW_REPORT.json]');
const modulePath = resolve(packageDirectory, 'dist/domain/elfFixedHeader.js');
const { readElfFixedHeader } = await import(pathToFileURL(modulePath));
const digest = data => createHash('sha256').update(data).digest('hex');
assert.equal(digest(await readFile(modulePath)), 'ebc8ff41c9bee294bdc4aae7f1a502580dd1b534e79f517596b66c48d2235d29');

function header({ bits = 64, little = true, machine = 263, type = 3, flags = 0 } = {}) {
  const bytes = Buffer.alloc(bits === 64 ? 64 : 52);
  bytes.set([0x7f, 0x45, 0x4c, 0x46, bits === 64 ? 2 : 1, little ? 1 : 2, 1]);
  const u16 = (value, offset) => little ? bytes.writeUInt16LE(value, offset) : bytes.writeUInt16BE(value, offset);
  const u32 = (value, offset) => little ? bytes.writeUInt32LE(value, offset) : bytes.writeUInt32BE(value, offset);
  u16(type, 16); u16(machine, 18); u32(1, 20);
  u32(flags, bits === 64 ? 48 : 36);
  u16(bytes.length, bits === 64 ? 52 : 40);
  return bytes;
}

const cases = [];
for (const [name, options, expected] of [
  ['captured-profile', {}, 'sbpf'],
  ['big-endian-sbf', { little: false }, false],
  ['32-bit-sbf', { bits: 32 }, false],
  ['executable-sbf', { type: 2 }, false],
  ['relocatable-sbf', { type: 1 }, false],
  ['nonzero-flags-sbf', { flags: 1 }, false],
  ['em-bpf-remains-unclassified', { machine: 247 }, null],
  ['x86-64-is-unchanged', { machine: 62 }, 'x86_64'],
]) {
  const bytes = header(options);
  const before = digest(bytes);
  const result = readElfFixedHeader(bytes);
  if (expected === false) assert.equal(result.ok, false, name);
  else { assert.equal(result.ok, true, name); assert.equal(result.value.architecture, expected, name); }
  assert.equal(digest(bytes), before, 'reader must not change the input');
  cases.push({ name, input_sha256: before, result });
}
const truncated = header().subarray(0, 63);
const result = readElfFixedHeader(truncated);
assert.equal(result.ok, false);
cases.push({ name: 'truncated-sbf', input_sha256: digest(truncated), result });
const report = { node: process.version, tests_passed: cases.length, cases,
  scope: 'Real fixed-header reader only. No Ghidra, disassembly, decompilation, or reconstruction claim.' };
if (output) await writeFile(output, JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify(report, null, 2));
