// PumpSwap AMM: create a pool (base mint + WSOL quote) via the SDK on the reconstructed pump_amm.
import { Connection, Keypair, Transaction, ComputeBudgetProgram, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import * as Amm from '@pump-fun/pump-swap-sdk';
import {
  TOKEN_PROGRAM_ID, NATIVE_MINT, getMintLen, createInitializeMint2Instruction, getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction, createMintToInstruction, createSyncNativeInstruction,
} from '@solana/spl-token';
import BN from 'bn.js'; import fs from 'fs';
const conn = new Connection('http://127.0.0.1:8899', 'confirmed');
const ok = s => console.log('  ✅', s), bad = (s, e) => console.log('  ❌', s, '\n     ', (e?.message || e || '').toString().split('\n').slice(0, 6).join('\n      '));
const SC = '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/5536bcf9-de4c-4b36-b7ea-df650cc87c74/scratchpad';
const kp = n => Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(`${SC}/key_${n}.json`))));
const TK = TOKEN_PROGRAM_ID;
async function send(ixs, signers, cu = 700000) {
  for (let a = 0; a < 6; a++) { const t = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: cu })); ixs.forEach(i => t.add(i)); t.feePayer = signers[0].publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(...signers); const s = await conn.simulateTransaction(t); if (s.value.err && JSON.stringify(s.value.err).includes('InsufficientFundsForRent')) { const k = t.compileMessage().accountKeys[s.value.err.InsufficientFundsForRent.account_index]; const f = new Transaction().add(SystemProgram.transfer({ fromPubkey: signers[0].publicKey, toPubkey: k, lamports: 3000000 })); f.feePayer = signers[0].publicKey; f.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; f.sign(signers[0]); await conn.confirmTransaction(await conn.sendRawTransaction(f.serialize()), 'confirmed'); continue; } break; }
  const t = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: cu })); ixs.forEach(i => t.add(i)); t.feePayer = signers[0].publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(...signers); const sig = await conn.sendRawTransaction(t.serialize()); await conn.confirmTransaction(sig, 'confirmed'); return sig;
}
const amm = new Amm.PumpAmmSdk(conn);
const online = new Amm.OnlinePumpAmmSdk(conn);
const creator = kp('payer'), baseMint = Keypair.generate();
const r = {};
await conn.confirmTransaction(await conn.requestAirdrop(creator.publicKey, 200 * LAMPORTS_PER_SOL), 'confirmed');

// 1. base mint (Tokenkeg) + fund creator
try {
  const len = getMintLen([]); const lam = await conn.getMinimumBalanceForRentExemption(len);
  const baseAta = getAssociatedTokenAddressSync(baseMint.publicKey, creator.publicKey, true, TK);
  await send([
    SystemProgram.createAccount({ fromPubkey: creator.publicKey, newAccountPubkey: baseMint.publicKey, space: len, lamports: lam, programId: TK }),
    createInitializeMint2Instruction(baseMint.publicKey, 6, creator.publicKey, null, TK),
    createAssociatedTokenAccountIdempotentInstruction(creator.publicKey, baseAta, creator.publicKey, baseMint.publicKey, TK),
    createMintToInstruction(baseMint.publicKey, baseAta, creator.publicKey, 1_000_000_000_000_000n, [], TK),
  ], [creator, baseMint], 300000);
  ok('base mint + creator funded'); r.baseMint = true;
} catch (e) { bad('base mint', e); r.baseMint = false; }

// 2. wrap SOL -> WSOL ATA
try {
  const wsol = getAssociatedTokenAddressSync(NATIVE_MINT, creator.publicKey, true, TK);
  await send([
    createAssociatedTokenAccountIdempotentInstruction(creator.publicKey, wsol, creator.publicKey, NATIVE_MINT, TK),
    SystemProgram.transfer({ fromPubkey: creator.publicKey, toPubkey: wsol, lamports: 100 * LAMPORTS_PER_SOL }),
    createSyncNativeInstruction(wsol, TK),
  ], [creator], 200000);
  ok('wrapped 100 WSOL'); r.wsol = true;
} catch (e) { bad('wrap wsol', e); r.wsol = false; }

// 3. create the pool (base + WSOL), seed initial liquidity
try {
  const index = Amm.CANONICAL_POOL_INDEX ?? 0;
  const baseAta = getAssociatedTokenAddressSync(baseMint.publicKey, creator.publicKey, true, TK);
  const wsol = getAssociatedTokenAddressSync(NATIVE_MINT, creator.publicKey, true, TK);
  const state = await online.createPoolSolanaState(index, creator.publicKey, baseMint.publicKey, NATIVE_MINT, baseAta, wsol);
  const ixs = await amm.createPoolInstructions(state, new BN('100000000000000'), new BN(50 * LAMPORTS_PER_SOL));
  const sig = await send(Array.isArray(ixs) ? ixs : [ixs], [creator], 900000);
  ok(`createPool confirmed: ${sig.slice(0, 16)}… pool ${state.poolKey.toBase58().slice(0, 12)}…`); r.createPool = true;
  globalThis.__pool = state.poolKey;
} catch (e) { bad('createPool', e); r.createPool = false; }

// 4. buy base with WSOL
try {
  const baseAta = getAssociatedTokenAddressSync(baseMint.publicKey, creator.publicKey, true, TK);
  const wsol = getAssociatedTokenAddressSync(NATIVE_MINT, creator.publicKey, true, TK);
  const st = await online.swapSolanaState(globalThis.__pool, creator.publicKey, baseAta, wsol);
  const ixs = await amm.buyInstructions(st, new BN('1000000000000'), new BN(10 * LAMPORTS_PER_SOL));
  const sig = await send(Array.isArray(ixs) ? ixs : [ixs], [creator], 800000);
  ok(`AMM buy confirmed: ${sig.slice(0, 16)}…`); r.ammBuy = true;
} catch (e) { bad('AMM buy', e); r.ammBuy = false; }

// 5. sell base for WSOL
try {
  const baseAta = getAssociatedTokenAddressSync(baseMint.publicKey, creator.publicKey, true, TK);
  const wsol = getAssociatedTokenAddressSync(NATIVE_MINT, creator.publicKey, true, TK);
  const st = await online.swapSolanaState(globalThis.__pool, creator.publicKey, baseAta, wsol);
  const ixs = await amm.sellInstructions(st, new BN('500000000000'), new BN(0));
  const sig = await send(Array.isArray(ixs) ? ixs : [ixs], [creator], 800000);
  ok(`AMM sell confirmed: ${sig.slice(0, 16)}…`); r.ammSell = true;
} catch (e) { bad('AMM sell', e); r.ammSell = false; }

console.log('\n=== AMM ===\n' + JSON.stringify(r, null, 2));
