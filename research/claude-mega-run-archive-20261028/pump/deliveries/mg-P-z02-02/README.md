# mg-P-z02-02 (L13 port of mg-P-z02-01): extend_account body 0x3b8d8 (5240 B) byte-identical (normalized)

Based on L13 (962/165) -> 963/165; gain 0x3b8d8; no normalized or raw losses; runtime_valid, no stack warnings.
Only file changed vs L13: `src/extend_account.rs` = lines 1-110 of mg-P-z02-01 + L13 lines 111-161 (z03 fund_bonding_curve_rent, site 141 unchanged). Built with mg-P-int nbuild.py (nested pump-token-ext crate).

## What changed (vs r5-z02-02 / L12)
- New size computed by an inlined private helper `fn get_account_size(&AccountInfo) -> Result<usize>`: `require!(data_len >= 8,
  AccountTypeNotSupported)` at line 84, try_borrow_data, discriminator if-chain against `&[u8]` consts (Global 1088,
  BondingCurve 166, GlobalVolumeAccumulator 600, UserVolumeAccumulator 137), `return err!(AccountTypeNotSupported)` at line 107
  (from r5-z02 c6; binary evidence: the line-84 error, the borrow error and the success join in one `jne r2,2` before `current==new`).
- NEW: the rent top-up CPI lives in an inlined private helper `fn transfer_lamports(accounts: &ExtendAccount, lamports: u64)
  -> Result<()> { if lamports > 0 { system_program::transfer(CpiContext::new(system_program, Transfer{from: user, to: account}),
  lamports)?; } Ok(()) }`, called unconditionally with `delta = rent.minimum_balance(new).saturating_sub(rent.minimum_balance(cur))`.
  Binary evidence: (1) the original's first (shallowest) frame object is the 184-byte transfer CpiContext at -0xb8 (every other
  slot sits 0xb8 deeper than in the inline form) = allocas of the LAST inlined callee are hoisted to the top of the entry block;
  (2) the saturating select is computed BEFORE the `jle new_min,cur_min` branch (not sunk into the transfer path): the branch only
  appears after inlining, when the transfer block is already split by the inlined AccountInfo clones.
  Variants measured in one multiplexed build (gen/ext_v1.py): helper over &AccountInfo/&Signer args = 0.86, Rent+transfer helper
  = 0.58, accounts-struct helper = 1.000.
- Layout: transfer_lamports + execute moved ABOVE get_account_size (lines 25-68), get_account_size at 83-110; lines 111+ free.
  COMPOSE NOTE: r5-z03-07 adds fund_bonding_curve_rent to this file at lines ~120-161 (site 141): keep my lines 1-110 and
  append z03's block from line 111 on (no overlap).

## Behaviour
Same checks, errors (6010 at lines 84/107), msgs, CPI order (system transfer, realloc, emit!, emit_cpi!) as the original by
construction; tools/refcmp.py (lanes/mg-P-z02): all 19 lddw references (strings, fmt pieces, error constant) and all 32 call
targets agree with the original's (call targets = windows matched to the same symbols).
