// Incentive admin/claim: the SDK builds adminUpdateTokenIncentives + claimTokenIncentives on
// offlinePumpProgram. Before the recovery these returned InstructionFallbackNotFound (pump was
// 53/56). This proves they now DISPATCH to the recovered handlers and execute.
import { Connection, Keypair, Transaction, ComputeBudgetProgram, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import * as Pump from '@pump-fun/pump-sdk';
import {
  TOKEN_2022_PROGRAM_ID as T22, ExtensionType, getMintLen, createInitializeMint2Instruction,
  getAssociatedTokenAddressSync, createAssociatedTokenAccountIdempotentInstruction, createMintToInstruction,
} from '@solana/spl-token';
import BN from 'bn.js'; import fs from 'fs';
const conn = new Connection('http://127.0.0.1:8899', 'confirmed');
const ok = s => console.log('  ✅', s), bad = (s, e) => console.log('  ❌', s, '\n     ', (e?.message || e || '').toString().split('\n').slice(0, 5).join('\n      '));
const SC = '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/5536bcf9-de4c-4b36-b7ea-df650cc87c74/scratchpad';
const kp = n => Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(`${SC}/key_${n}.json`))));
async function send(ixs, signers, cu = 500000) {
  for (let a = 0; a < 6; a++) { const t = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: cu })); ixs.forEach(i => t.add(i)); t.feePayer = signers[0].publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(...signers); const s = await conn.simulateTransaction(t); if (s.value.err && JSON.stringify(s.value.err).includes('InsufficientFundsForRent')) { const k = t.compileMessage().accountKeys[s.value.err.InsufficientFundsForRent.account_index]; const f = new Transaction().add(SystemProgram.transfer({ fromPubkey: signers[0].publicKey, toPubkey: k, lamports: 3000000 })); f.feePayer = signers[0].publicKey; f.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; f.sign(signers[0]); await conn.confirmTransaction(await conn.sendRawTransaction(f.serialize()), 'confirmed'); continue; } break; }
  const t = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: cu })); ixs.forEach(i => t.add(i)); t.feePayer = signers[0].publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(...signers); const sig = await conn.sendRawTransaction(t.serialize()); await conn.confirmTransaction(sig, 'confirmed'); return sig;
}
const sdk = new Pump.PumpSdk(conn);
const online = new Pump.OnlinePumpSdk(conn);
const admin = kp('admin'), payer = kp('payer');
const incentiveMint = Keypair.generate();
const r = {};
await conn.confirmTransaction(await conn.requestAirdrop(admin.publicKey, 50 * LAMPORTS_PER_SOL), 'confirmed');
await conn.confirmTransaction(await conn.requestAirdrop(payer.publicKey, 50 * LAMPORTS_PER_SOL), 'confirmed');
const now = (await conn.getBlockTime(await conn.getSlot())) || Math.floor(Date.now() / 1000);

// 1. create an incentive mint (Token-2022), admin-owned
try {
  const len = getMintLen([]); const lam = await conn.getMinimumBalanceForRentExemption(len);
  await send([
    SystemProgram.createAccount({ fromPubkey: admin.publicKey, newAccountPubkey: incentiveMint.publicKey, space: len, lamports: lam, programId: T22 }),
    createInitializeMint2Instruction(incentiveMint.publicKey, 6, admin.publicKey, null, T22),
  ], [admin, incentiveMint], 200000);
  ok('incentive mint created'); r.incentiveMint = true;
} catch (e) { bad('incentive mint', e); r.incentiveMint = false; }

// 2. adminUpdateTokenIncentives — DISPATCH check (was InstructionFallbackNotFound before recovery)
try {
  const ix = await online.adminUpdateTokenIncentives(new BN(now + 5), new BN(now + 10 * 86400), new BN(0), new BN('1000000000000'), new BN(86400), incentiveMint.publicKey, T22);
  const sig = await send([ix], [admin], 400000);
  ok(`adminUpdateTokenIncentives dispatched + confirmed: ${sig.slice(0, 16)}…`); r.adminUpdateIncentives = true;
} catch (e) { bad('adminUpdateTokenIncentives', e); r.adminUpdateIncentives = false; }

// 3. fund the global incentive vault so a claim can pay out
try {
  const vault = getAssociatedTokenAddressSync(incentiveMint.publicKey, Pump.GLOBAL_PDA, true, T22);
  await send([
    createAssociatedTokenAccountIdempotentInstruction(admin.publicKey, vault, Pump.GLOBAL_PDA, incentiveMint.publicKey, T22),
    createMintToInstruction(incentiveMint.publicKey, vault, admin.publicKey, 100_000_000_000_000n, [], T22),
  ], [admin], 200000);
  ok('global incentive vault funded'); r.fundVault = true;
} catch (e) { bad('fund vault', e); r.fundVault = false; }

// 4. create a coin + accrue user volume (init accumulator + buy)
const coinMint = Keypair.generate();
try {
  const cix = await sdk.createV2Instruction({ mint: coinMint.publicKey, name: 'INC', symbol: 'INC', uri: 'u', creator: payer.publicKey, user: payer.publicKey });
  await send(Array.isArray(cix) ? cix : [cix], [payer, coinMint], 500000);
  const initIx = await sdk.initUserVolumeAccumulator({ user: payer.publicKey, payer: payer.publicKey });
  await send(Array.isArray(initIx) ? initIx : [initIx], [payer], 200000).catch(() => {});
  const bcPda = PublicKey.findProgramAddressSync([Buffer.from('bonding-curve'), coinMint.publicKey.toBuffer()], Pump.PUMP_PROGRAM_ID)[0];
  const bc = sdk.decodeBondingCurve(await conn.getAccountInfo(bcPda));
  const g = sdk.decodeGlobal(await conn.getAccountInfo(Pump.GLOBAL_PDA));
  const assoc = getAssociatedTokenAddressSync(coinMint.publicKey, payer.publicKey, true, T22);
  const buy = await sdk.buyV2Instructions({ global: g, bondingCurveAccountInfo: await conn.getAccountInfo(bcPda), bondingCurve: bc, associatedUserAccountInfo: await conn.getAccountInfo(assoc), mint: coinMint.publicKey, user: payer.publicKey, amount: new BN('5000000000000'), quoteAmount: new BN(5 * LAMPORTS_PER_SOL), slippage: 50, tokenProgram: T22, quoteTokenProgram: T22 });
  await send(Array.isArray(buy) ? buy : [buy], [payer], 700000);
  ok('coin created + user volume accrued (buy)'); r.accrueVolume = true;
} catch (e) { bad('accrue volume', e); r.accrueVolume = false; }

// 5. claimTokenIncentives — DISPATCH check
try {
  const unclaimed = await online.getTotalUnclaimedTokens(payer.publicKey).catch(() => null);
  const ixs = await online.claimTokenIncentives(payer.publicKey, payer.publicKey);
  const sig = await send(Array.isArray(ixs) ? ixs : [ixs], [payer], 500000);
  ok(`claimTokenIncentives dispatched + confirmed: ${sig.slice(0, 16)}… (unclaimed hint ${unclaimed?.toString?.() ?? 'n/a'})`); r.claimIncentives = true;
} catch (e) { bad('claimTokenIncentives', e); r.claimIncentives = false; }

console.log('\n=== INCENTIVES ===\n' + JSON.stringify(r, null, 2));
