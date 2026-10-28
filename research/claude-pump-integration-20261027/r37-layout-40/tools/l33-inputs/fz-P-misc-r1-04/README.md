# fz-P-misc-r1-04: +0x17c850 +0x9b148 +0x9b430 +0xcd3d8 (cumulative; supersedes -01..-03)

Base L32 (990/1035, raw 166, unstripped 868a868b). Result 994/1035, raw 167 (+0x17c850 raw), gains
[0x9b148, 0x9b430, 0xcd3d8, 0x17c850], 0 normalized / 0 raw losses, no stack warnings. Group P-misc complete.

## Changes (all line-neutral; files keep their line counts)
1. src/mayhem_virtual_params.rs:16 (0xcd3d8): `associated_token::token_program = token_program.key()`.
2. src/trade_types.rs lines 38-77 (0x9b430, 0x9b148): see -03 README.
3. pump-token-ext/src/lib.rs get_transfer_fee_config (0x17c850), same 57-line span:
   - `if !(rest.len() >= 2) { return Ok(config); }` (was `if rest.len() < 2 { break; }`)
   - `match tag { 0 => break, _ => {} }` (was `if tag == 0 { break; }`)
   - `if !(rest.len() >= 4) { return Err(()); }`, `if !(entry_len <= rest.len()) { return Err(()); }` (same tests,
     continue-path polarity)
   - `if tag < 2 { ... }` for the TransferFeeConfig extension (tag 0 already ended the walk, so tag < 2 <=> tag == 1;
     LLVM folds it back to the original's `jeq tag, 1`).

## Binary evidence / mechanism (0x17c850)
- L32 residue (0.534, 624 vs 664 B) was block placement. rustc creates LLVM blocks on first reference and the SBF backend
  cannot reverse a branch, so the original's `jcc F, +1; ja T` pairs record which successor was the IR-next block / the
  IR true successor at ISel. Standalone-crate sweeps (hybrid144 rustc, crate flags as the build; tools/tlvgen*.py, ~20k
  forms, scored against the original window): branch polarity `if !(x >= n)`, return-vs-break on the two loop exits,
  `match` on tag 0 and `tag < 2` each fix one pair; the combination is 664 B EXACT (16 equivalent forms, e.g. any of
  is_some / matches! / if-let for the duplicate check). Real build: normalized AND raw equal.

## Behaviour
Unchanged for every input: same checks in the same order, same Ok/Err results, same parsed fields.
- 0xcd3d8: same ATA owner/token-program checks (error 2023 / 2015 / 2009 order) and same derivation.
- BondingCurve: same InvalidAccountData checks, same decoder per length.
- TLV: `tag < 2` is reached only with tag != 0, so it equals `tag == 1`; `return Ok(config)` on a short tail equals the
  former `break` + `Ok(config)`.
