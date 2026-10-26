// Mayhem create: initialize mayhem global_params, then createV2(mayhemMode) which CPIs the
// recovered mayhem initialize_mayhem_state. Then verify the mayhem_state PDA was created.
import { Connection, Keypair, Transaction, TransactionInstruction, ComputeBudgetProgram, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import * as Pump from '@pump-fun/pump-sdk';
import crypto from 'crypto'; import BN from 'bn.js'; import fs from 'fs';
const conn = new Connection('http://127.0.0.1:8899', 'confirmed');
const ok = s => console.log('  ✅', s), bad = (s, e) => console.log('  ❌', s, '\n     ', (e?.message || e || '').toString().split('\n').slice(0, 6).join('\n      '));
const SC = '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/5536bcf9-de4c-4b36-b7ea-df650cc87c74/scratchpad';
const kp = n => Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(`${SC}/key_${n}.json`))));
const MAYHEM = new PublicKey('MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e');
const disc = n => crypto.createHash('sha256').update(`global:${n}`).digest().subarray(0, 8);
const sys = SystemProgram.programId;
async function send(ixs, signers, cu = 700000) {
  for (let a = 0; a < 6; a++) { const t = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: cu })); ixs.forEach(i => t.add(i)); t.feePayer = signers[0].publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(...signers); const s = await conn.simulateTransaction(t); if (s.value.err && JSON.stringify(s.value.err).includes('InsufficientFundsForRent')) { const k = t.compileMessage().accountKeys[s.value.err.InsufficientFundsForRent.account_index]; const f = new Transaction().add(SystemProgram.transfer({ fromPubkey: signers[0].publicKey, toPubkey: k, lamports: 3000000 })); f.feePayer = signers[0].publicKey; f.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; f.sign(signers[0]); await conn.confirmTransaction(await conn.sendRawTransaction(f.serialize()), 'confirmed'); continue; } break; }
  const t = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: cu })); ixs.forEach(i => t.add(i)); t.feePayer = signers[0].publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(...signers); const sig = await conn.sendRawTransaction(t.serialize()); await conn.confirmTransaction(sig, 'confirmed'); return sig;
}
const sdk = new Pump.PumpSdk(conn);
const admin = kp('admin'), user = kp('payer'), mint = Keypair.generate();
const r = {};
await conn.confirmTransaction(await conn.requestAirdrop(admin.publicKey, 50 * LAMPORTS_PER_SOL), 'confirmed');
await conn.confirmTransaction(await conn.requestAirdrop(user.publicKey, 50 * LAMPORTS_PER_SOL), 'confirmed');
const globalParams = PublicKey.findProgramAddressSync([Buffer.from('global-params')], MAYHEM)[0];

// 1. mayhem initialize_global_params (admin becomes mayhem admin) — idempotent-ish
try {
  if (!(await conn.getAccountInfo(globalParams))) {
    const ix = new TransactionInstruction({ programId: MAYHEM, data: Buffer.from(disc('initialize_global_params')), keys: [
      { pubkey: admin.publicKey, isSigner: true, isWritable: true },
      { pubkey: globalParams, isSigner: false, isWritable: true },
      { pubkey: sys, isSigner: false, isWritable: false },
    ]});
    await send([ix], [admin], 200000);
  }
  ok('mayhem global_params initialized'); r.initGlobalParams = true;
} catch (e) { bad('initialize_global_params', e); r.initGlobalParams = false; }

// 2. createV2 with mayhemMode = true -> CPIs mayhem initialize_mayhem_state
try {
  const ix = await sdk.createV2Instruction({ mint: mint.publicKey, name: 'MAYH', symbol: 'MAYH', uri: 'u', creator: user.publicKey, user: user.publicKey, mayhemMode: true });
  const sig = await send(Array.isArray(ix) ? ix : [ix], [user, mint], 800000);
  ok(`createV2(mayhemMode) confirmed: ${sig.slice(0, 16)}…`); r.createMayhem = true;
} catch (e) { bad('createV2 mayhemMode', e); r.createMayhem = false; }

// 3. verify mayhem_state PDA created by the CPI
try {
  const mayhemState = PublicKey.findProgramAddressSync([Buffer.from('mayhem-state'), mint.publicKey.toBuffer()], MAYHEM)[0];
  const info = await conn.getAccountInfo(mayhemState);
  if (info && info.owner.equals(MAYHEM)) { ok(`mayhem_state created by CPI (owner mayhem, ${info.data.length} B)`); r.mayhemState = true; }
  else throw new Error('mayhem_state missing/owner wrong');
} catch (e) { bad('mayhem_state verify', e); r.mayhemState = false; }

console.log('\n=== MAYHEM ===\n' + JSON.stringify(r, null, 2));
