import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { inventory } from '../scripts/inventory.mjs';

test('inventory rejects incomplete parsing while retaining diagnostic output', async () => {
 const root=await mkdtemp(path.join(tmpdir(),'pump-inventory-'));
 try {
  await mkdir(path.join(root,'evidence/web'),{recursive:true});
  await mkdir(path.join(root,'contracts'));
  const source='throw new Error("Captured input must not execute"); (globalThis.TURBOPACK ??= []).push(["chunk.js",42,function(module){module.exports=1;}]);';
  await writeFile(path.join(root,'evidence/web/good.js'),source);
  const records=[{url:'https://pump.fun/good.js',status:200,path:'evidence/web/good.js'}];
  const manifest=path.join(root,'evidence/web/manifest.json');
  await writeFile(manifest,JSON.stringify({records}));
  const successful=await inventory(root);
  assert.equal(successful.modules.length,1);
  assert.equal(successful.failures.length,0);
  await writeFile(path.join(root,'evidence/web/bad.js'),'const = ;');
  records.push({url:'https://pump.fun/bad.js',status:200,path:'evidence/web/bad.js'});
  await writeFile(manifest,JSON.stringify({records}));
  await assert.rejects(inventory(root),/AST inventory failed for 1 captured script/);
  const partial=JSON.parse(await readFile(path.join(root,'recovered/modules.json'),'utf8'));
  assert.equal(partial.modules.length,1);
  assert.equal(partial.failures.length,1);
  assert.equal(partial.failures[0].source,'evidence/web/bad.js');
 } finally { await rm(root,{recursive:true,force:true}); }
});
