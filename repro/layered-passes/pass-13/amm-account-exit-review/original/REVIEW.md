# AMM application near-match: accumulator claim exit

**No application source correction is justified yet.** The selected complete952-byte exit window differs at one non-relocated instruction: original advances a context pointer by656 bytes, current by560. All12 actual direct-call sites/target bodies and the remaining normalized instructions match. This is a strong account-context layout lead, but no evidence here establishes that the current field selected by the generated exit code is wrong.

This pass chose the most specific remaining non-diagnostic application near-match found in the current admitted ledger, outside scalar helpers. It examines the AMM `ClaimTokenIncentives` exit only; it does not examine or change stopped Pump incentives handlers. Current AMM candidate is `d3dacf1bd54e0b7b825557d01adfe158bc229753fb4b945618c5eabf2bdb1bab`.

## Complete body and role evidence

Original window `[0xcc2a0,0xcc658)` is an entry-inferred range, not a recovered historical symbol. Original wrapper window beginning0xe62b8 calls it at0xe64c0. Its corresponding current symbol is `ClaimTokenIncentives as AccountsExit::exit`, `[0x60af8,0x60eb0)`. Complete original/current rows, all direct targets, raw disassembly, source and immutable input hashes are retained.

The sole normalized instruction difference is at relative608: `r8 += 656` versus `r8 += 560`. Both are pointer additions into their account-context representation, not a serialized data offset or asserted account size. Both then pass that pointer to the same-sized complete normalized exit target. The failure wrapper subsequently attaches the same exact23-byte field label **`user_volume_accumulator`**. Both pass the same exact32-byte program ID to the exit target. This supports the same logical field role, despite different generated context placement.

The other11 direct-call positions also align. Across all12 calls, the corresponding complete target windows have equal length and normalized hashes; relocation patterns for the entire exit body match. Branches, return/error propagation and the rest of the cleanup sequence match under the existing method. Normalization does not prove target data equality or recursive indirect behavior.

Current source declares the accumulator as a mutable `Account<UserVolumeAccumulator>` with PDA seeds, alongside a boxed GlobalVolumeAccumulator, token interfaces, unchecked accounts, programs and payer. Generated Rust account-context layout can vary with the representation of those earlier fields and dependency types. A96-byte pointer difference alone does not identify which historical declaration differed. Changing boxing, account order or adding storage to force656 would be a layout experiment, not a semantic repair.

## What remains unknown

Original source-level context declarations and exact field layout have not been recovered by this pass. The wrapper supplies a generated context, so establishing the pointer's original member provenance would require its complete parser return/spill/field construction mapping, including all intervening members. Merely finding a neighboring symbol or reproducing a byte offset would not prove the role. Current label/program-id/exit-target correspondence makes a wrong-account claim unsupported.

The pass neither assumes all unmatched bodies are harmless nor treats successful runtime receipts as proof of this exit path. This original row remains unmatched; no count or acceptance claim changes. A future natural correction must be based on an actual parser/type/ownership discrepancy, not the fact that656 differs from560.

Run `python3 -B work/amm-application-next-review/verify.py` from repository root to recheck all input hashes, the entire normalized body, its one pointer-add difference, all12 complete target pairs, field label and program ID. The verifier runs no build, VM, fixture or transaction and writes no source. No new opaque original windows were decoded.
