import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const require=createRequire(new URL('../packages/sdk/package.json',import.meta.url));
const BN=require('bn.js');
const published=mkdtempSync(join(tmpdir(),'pump-sdk-reference-'));
mkdirSync(join(published,'swap'));
symlinkSync(join(root,'packages/sdk/node_modules'),join(published,'node_modules'),'dir');
for(const sub of ['index.js','swap/index.js'])writeFileSync(join(published,sub),execFileSync('tar',['-xOf',join(root,'evidence/sdk/pump-sdk-4.3.1.tgz'),`package/dist/${sub}`]));
process.on('exit',()=>rmSync(published,{recursive:true,force:true}));
for(const sub of ['index','swap/index']) {
 test(`rebuilt ${sub} retains published exports in CJS and ESM`,async()=>{
  const reference=require(join(published,`${sub}.js`));
  const rebuilt=require(join(root,'packages/sdk/dist',`${sub}.js`));
  const esm=await import(new URL(`../packages/sdk/dist/${sub}.mjs`,import.meta.url));
  assert.deepEqual(Object.keys(rebuilt).sort(),Object.keys(reference).sort());
  assert.deepEqual(Object.keys(esm).sort(),Object.keys(reference).sort());
 });
}
test('rebuilt transfer fee math matches published root and swap across caps and rounding',()=>{
 const original=require(join(published,'index.js')), built=require(join(root,'packages/sdk/dist/index.js'));
 const originalSwap=require(join(published,'swap/index.js')),builtSwap=require(join(root,'packages/sdk/dist/swap/index.js'));
 for(const bps of [0,1,100,2500,9999,10000])for(const cap of [0,1,100,1000000])for(const amount of [0,1,99,100,10001,1000000000]){
  const fee={basisPoints:bps,maximumFee:new BN(cap)};
  for(const fn of ['transferFeeWithheld','transferFeeNetOf','transferFeeGrossFor'])assert.equal(built[fn](fee,new BN(amount)).toString(),original[fn](fee,new BN(amount)).toString(),`${fn}: ${bps}/${cap}/${amount}`);
  for(const fn of ['grossForTransferFee','netOfTransferFee'])assert.equal(builtSwap[fn](fee,new BN(amount)).toString(),originalSwap[fn](fee,new BN(amount)).toString());
 }
});
