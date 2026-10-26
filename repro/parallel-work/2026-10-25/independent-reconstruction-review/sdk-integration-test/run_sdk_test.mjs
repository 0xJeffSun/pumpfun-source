import { Connection, Keypair, Transaction, ComputeBudgetProgram, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import * as Pump from '@pump-fun/pump-sdk';
import BN from 'bn.js';

const RPC = 'http://127.0.0.1:8899';
const conn = new Connection(RPC, 'confirmed');
const log = (...a) => console.log(...a);
const ok = (s) => log('  ✅', s);
const fail = (s, e) => log('  ❌', s, '\n     ', (e?.message || e || '').toString().split('\n').slice(0,4).join('\n      '));

function asIxList(x) { return Array.isArray(x) ? x : [x]; }
// Pre-fund any writable, non-signer account the instructions touch that is currently empty,
// so a trade output (e.g. creator vault / fee recipient) can't end below rent-exemption on a
// small test buy. Localnet fixture detail only; mainnet accounts are already rent-funded.
async function prefund(payer, ixs) {
  const seen = new Set();
  const out = [];
  for (const ix of ixs) for (const k of ix.keys) {
    const b = k.pubkey.toBase58();
    if (!k.isWritable || k.isSigner || seen.has(b)) continue;
    seen.add(b);
    const info = await conn.getAccountInfo(k.pubkey);
    if (!info || info.lamports === 0) out.push(SystemProgram.transfer({ fromPubkey: payer.publicKey, toPubkey: k.pubkey, lamports: 3_000_000 }));
  }
  if (out.length) { const t = new Transaction(); out.forEach(i => t.add(i)); t.feePayer = payer.publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(payer); await conn.confirmTransaction(await conn.sendRawTransaction(t.serialize()), 'confirmed'); }
  return out.length;
}
function buildTx(ixs, signers, cu) {
  const tx = new Transaction();
  tx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: cu }));
  for (const ix of ixs) tx.add(ix);
  tx.feePayer = signers[0].publicKey;
  return tx;
}
async function send(ixs, signers, label, cu = 400000) {
  // Pre-fund, via targeted simulation, any trade-output account the runtime flags as ending
  // below rent-exemption (e.g. a creator vault credited a sub-rent fee on a small test buy).
  // Localnet fixture detail; mainnet vaults are already rent-funded. Never touches a to-be-
  // created token ATA because that account isn't the one the runtime reports.
  const payer = signers[0];
  for (let attempt = 0; attempt < 6; attempt++) {
    const tx = buildTx(ixs, signers, cu);
    tx.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;
    tx.sign(...signers);
    const sim = await conn.simulateTransaction(tx);
    const err = sim.value.err;
    if (err && JSON.stringify(err).includes('InsufficientFundsForRent')) {
      const idx = err.InsufficientFundsForRent.account_index;
      const key = tx.compileMessage().accountKeys[idx];
      const t = new Transaction().add(SystemProgram.transfer({ fromPubkey: payer.publicKey, toPubkey: key, lamports: 3_000_000 }));
      t.feePayer = payer.publicKey; t.recentBlockhash = (await conn.getLatestBlockhash()).blockhash; t.sign(payer);
      await conn.confirmTransaction(await conn.sendRawTransaction(t.serialize()), 'confirmed');
      continue; // re-simulate; another account may also be under-rent
    }
    break;
  }
  const tx = buildTx(ixs, signers, cu);
  tx.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;
  tx.sign(...signers);
  const sig = await conn.sendRawTransaction(tx.serialize(), { skipPreflight: false });
  await conn.confirmTransaction(sig, 'confirmed');
  return sig;
}

const results = {};
const sdk = new Pump.PumpSdk(conn);
const online = new Pump.OnlinePumpSdk ? new Pump.OnlinePumpSdk(conn) : null;

const user = Keypair.generate();
const mint = Keypair.generate();
log('user', user.publicKey.toBase58(), '\nmint', mint.publicKey.toBase58());

// 0. fund user
try {
  const s = await conn.requestAirdrop(user.publicKey, 50 * LAMPORTS_PER_SOL);
  await conn.confirmTransaction(s, 'confirmed');
  const bal = await conn.getBalance(user.publicKey);
  ok(`airdrop: user balance ${bal / LAMPORTS_PER_SOL} SOL`); results.airdrop = true;
} catch (e) { fail('airdrop', e); results.airdrop = false; }

// 0b. global decodes (proves seeded config parses with the reconstructed program's layout)
try {
  const gi = await conn.getAccountInfo(Pump.GLOBAL_PDA);
  const g = sdk.decodeGlobal(gi);
  ok(`decodeGlobal: initialized=${g.initialized} feeBps=${g.feeBasisPoints?.toString?.() ?? g.feeBasisPoints} createV2Enabled=${g.createV2Enabled}`);
  results.decodeGlobal = true;
  globalThis.__g = g; globalThis.__gi = gi;
} catch (e) { fail('decodeGlobal', e); results.decodeGlobal = false; }

// 1. create a coin via createV2
try {
  let ix = await sdk.createV2Instruction({
    mint: mint.publicKey, name: 'ReconTest', symbol: 'RCN', uri: 'https://example.com/m.json',
    creator: user.publicKey, user: user.publicKey,
  });
  const sig = await send(asIxList(ix), [user, mint], 'createV2');
  ok(`createV2 confirmed: ${sig}`); results.createV2 = true;
} catch (e) { fail('createV2', e); results.createV2 = false; }

// 2. fetch + decode the new bonding curve
try {
  const bcPda = PublicKey.findProgramAddressSync([Buffer.from('bonding-curve'), mint.publicKey.toBuffer()], Pump.PUMP_PROGRAM_ID)[0];
  const bci = await conn.getAccountInfo(bcPda);
  const bc = sdk.decodeBondingCurve(bci);
  ok(`bondingCurve: vTok=${bc.virtualTokenReserves?.toString()} vSol=${bc.virtualQuoteReserves?.toString?.() ?? bc.virtualSolReserves?.toString?.()} realTok=${bc.realTokenReserves?.toString()} complete=${bc.complete}`);
  results.bondingCurve = true; globalThis.__bc = bc; globalThis.__bci = bci; globalThis.__bcPda = bcPda;
} catch (e) { fail('decode bondingCurve', e); results.bondingCurve = false; }

// 3. buy via buyV2
try {
  const assocUser = PublicKey.findProgramAddressSync(
    [user.publicKey.toBuffer(), new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb').toBuffer(), mint.publicKey.toBuffer()],
    new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'))[0];
  const assocInfo = await conn.getAccountInfo(assocUser);
  const TOKEN22 = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
  const ixs = await sdk.buyV2Instructions({
    global: globalThis.__g, bondingCurveAccountInfo: globalThis.__bci, bondingCurve: globalThis.__bc,
    associatedUserAccountInfo: assocInfo, mint: mint.publicKey, user: user.publicKey,
    amount: new BN('1000000000000'), quoteAmount: new BN(5 * LAMPORTS_PER_SOL), slippage: 50,
    tokenProgram: TOKEN22, quoteTokenProgram: TOKEN22,
  });
  const sig = await send(asIxList(ixs), [user], 'buyV2', 600000);
  ok(`buyV2 confirmed: ${sig}`); results.buyV2 = true;
} catch (e) { fail('buyV2', e); results.buyV2 = false; }

// 4. sell via sellV2
try {
  const bci2 = await conn.getAccountInfo(globalThis.__bcPda);
  const bc2 = sdk.decodeBondingCurve(bci2);
  const assocUser = PublicKey.findProgramAddressSync(
    [user.publicKey.toBuffer(), new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb').toBuffer(), mint.publicKey.toBuffer()],
    new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'))[0];
  const assocInfo = await conn.getAccountInfo(assocUser);
  const TOKEN22 = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
  const ixs = await sdk.sellV2Instructions({
    global: globalThis.__g, bondingCurveAccountInfo: bci2, bondingCurve: bc2,
    associatedUserAccountInfo: assocInfo, mint: mint.publicKey, user: user.publicKey,
    amount: new BN('100000000000'), quoteAmount: new BN(0), slippage: 50,
    tokenProgram: TOKEN22, quoteTokenProgram: TOKEN22,
  });
  const sig = await send(asIxList(ixs), [user], 'sellV2', 600000);
  ok(`sellV2 confirmed: ${sig}`); results.sellV2 = true;
} catch (e) { fail('sellV2', e); results.sellV2 = false; }

log('\n=== RESULTS ===');
log(JSON.stringify(results, null, 2));
const passed = Object.values(results).filter(Boolean).length, total = Object.keys(results).length;
log(`${passed}/${total} steps passed`);
process.exit(passed === total ? 0 : 1);
