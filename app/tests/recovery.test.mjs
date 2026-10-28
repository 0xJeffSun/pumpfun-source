import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root=new URL('../',import.meta.url);
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
