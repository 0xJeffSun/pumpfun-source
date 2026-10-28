import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const require=createRequire(new URL('../packages/sdk/package.json',import.meta.url));
const BN=require('bn.js');
const published=mkdtempSync(join(tmpdir(),'pump-sdk-reference-'));
mkdirSync(join(published,'swap'));
symlinkSync(join(root,'packages/sdk/node_modules'),join(published,'node_modules'),process.platform==='win32'?'junction':'dir');
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
test('rebuilt PDA constants and derivations match published root and swap',()=>{
 const {PublicKey}=require('@solana/web3.js');
 const original=require(join(published,'index.js')), built=require(join(root,'packages/sdk/dist/index.js'));
 const originalSwap=require(join(published,'swap/index.js')), builtSwap=require(join(root,'packages/sdk/dist/swap/index.js'));
 const keys=[]; for(let i=0;i<8;i++)keys.push(new PublicKey(createHash('sha256').update(`pump-sdk-pda-probe-${i}`).digest()));
 keys.push(new PublicKey(new Uint8Array(32)),original.PUMP_PROGRAM_ID,original.PUMP_AMM_PROGRAM_ID,original.PUMP_FEE_PROGRAM_ID);
 const eq=(label,a,b)=>assert.equal(a.toBase58(),b.toBase58(),label);
 for(const [label,reference,rebuilt] of [['root',original,built],['swap',originalSwap,builtSwap]])
  for(const name of Object.keys(reference)) if(reference[name]&&typeof reference[name].toBase58==='function') eq(`${label} constant ${name}`,reference[name],rebuilt[name]);
 const oneKey=['bondingCurvePda','bondingCurveV2Pda','creatorVaultPda','holderRewardsPda','pumpPoolAuthorityPda','canonicalPumpPoolPda','boostVaultAuthorityPda','getMayhemStatePda','getTokenVaultPda','feeSharingConfigPda','ammCreatorVaultPda','getEventAuthorityPda'];
 for(const fn of oneKey)for(const key of keys)eq(`${fn} ${key.toBase58()}`,original[fn](key),built[fn](key));
 for(const base of keys.slice(0,4))for(const quote of keys.slice(4,6)){
  eq('canonicalPumpPoolPdaWithQuote',original.canonicalPumpPoolPdaWithQuote(base,quote),built.canonicalPumpPoolPdaWithQuote(base,quote));
  eq('donationFeePda',original.donationFeePda(base,quote),built.donationFeePda(base,quote));
  eq('userVolumeAccumulatorPda',original.userVolumeAccumulatorPda(base),built.userVolumeAccumulatorPda(base));
  for(const program of [original.DONATION_RELAY_PROGRAM_ID_MAINNET,original.DONATION_RELAY_PROGRAM_ID_DEVNET]){
   eq('donationRelayEpochTrackerPda',original.donationRelayEpochTrackerPda(base,quote,program),built.donationRelayEpochTrackerPda(base,quote,program));
   eq('donationRelayDebouncerPda',original.donationRelayDebouncerPda(base,quote,program),built.donationRelayDebouncerPda(base,quote,program));
  }
 }
 for(const program of [original.DONATION_RELAY_PROGRAM_ID_MAINNET,original.DONATION_RELAY_PROGRAM_ID_DEVNET]){
  eq('donationRelayMintWhitelistPda',original.donationRelayMintWhitelistPda(program),built.donationRelayMintWhitelistPda(program));
  eq('donationRelayEventAuthorityPda',original.donationRelayEventAuthorityPda(program),built.donationRelayEventAuthorityPda(program));
 }
 for(const platform of [0,1,2,3,255])eq(`socialFeePda ${platform}`,original.socialFeePda('user-42',platform),built.socialFeePda('user-42',platform));
 for(const key of keys.slice(0,4))eq('swap lpMintPda',originalSwap.lpMintPda(key),builtSwap.lpMintPda(key));
});
test('rebuilt transfer fee math matches published root and swap across caps and rounding',()=>{
 const original=require(join(published,'index.js')), built=require(join(root,'packages/sdk/dist/index.js'));
 const originalSwap=require(join(published,'swap/index.js')),builtSwap=require(join(root,'packages/sdk/dist/swap/index.js'));
 for(const bps of [0,1,100,2500,9999,10000])for(const cap of [0,1,100,1000000])for(const amount of [0,1,99,100,10001,1000000000]){
  const fee={basisPoints:bps,maximumFee:new BN(cap)};
  for(const fn of ['transferFeeWithheld','transferFeeNetOf','transferFeeGrossFor'])assert.equal(built[fn](fee,new BN(amount)).toString(),original[fn](fee,new BN(amount)).toString(),`${fn}: ${bps}/${cap}/${amount}`);
  for(const fn of ['grossForTransferFee','netOfTransferFee'])assert.equal(builtSwap[fn](fee,new BN(amount)).toString(),originalSwap[fn](fee,new BN(amount)).toString());
 }
});
