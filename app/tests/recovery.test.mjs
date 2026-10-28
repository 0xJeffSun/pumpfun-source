import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { formatBundles } from '../scripts/format-bundles.mjs';
const root=new URL('../',import.meta.url);

test('formatting retains distinct bundles with the same basename',async()=>{
 const directory=await mkdtemp(path.join(tmpdir(),'pump-format-'));
 try {
  await mkdir(path.join(directory,'evidence/web'),{recursive:true});
  const records=[];
  for(const [index,url] of ['https://pump.fun/a/shared.js','https://pump.fun/b/shared.js'].entries()){
   const source=`const bundle${index}=${index};`;
   const sourcePath=`evidence/web/source-${index}.js`;
   await writeFile(path.join(directory,sourcePath),source);
   records.push({url,path:sourcePath,status:200,sha256:createHash('sha256').update(source).digest('hex')});
  }
  await writeFile(path.join(directory,'evidence/web/manifest.json'),JSON.stringify({records}));
  await formatBundles(directory);
  const report=JSON.parse(await readFile(path.join(directory,'recovered/pretty/manifest.json'),'utf8'));
  assert.equal(report.records.length,2);
  assert.equal(new Set(report.records.map(record=>record.output)).size,2);
  for(const [index,record] of report.records.entries()){
   assert.equal(record.status,'formatted');
   assert.match(await readFile(path.join(directory,record.output),'utf8'),new RegExp(`const bundle${index} = ${index};`));
  }
 } finally { await rm(directory,{recursive:true,force:true}); }
});
test('recovered factory provenance resolves to exact captured source ranges',()=>{
 const report=JSON.parse(readFileSync(new URL('recovered/modules.json',root),'utf8'));
 const sources=new Map();
 assert.equal(report.failures.length,0);
 for(const module of report.modules){
  for(const origin of module.origins){
   if(!sources.has(origin.source))sources.set(origin.source,readFileSync(new URL(origin.source,root),'utf8'));
   const factory=sources.get(origin.source).slice(origin.start,origin.end);
   assert.equal(createHash('sha256').update(factory).digest('hex'),module.sha256);
  }
 }
});
