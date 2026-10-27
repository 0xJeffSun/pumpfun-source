# Mayhem reconstruction completion ledger

Repo: `/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source`
Candidate: `repro/mayhem/initializer-current-20261027/candidate.so`
Original (oracle): `evidence/original/mayhem/deployed.so`
Tools: `~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-{objcopy,readelf}`. No build run.

## 1. Artifact identity
- Candidate: sha256 `8dac1ff7575e3aa74ffa1ab4c4db2152781f0c644665dbf1c278e284751b19cb`, 620168 bytes. Matches `status.json mayhem.candidate_sha256` + `candidate_bytes` -> auditing the referenced artifact.
- Original: sha256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`, 777408 bytes.
- e_machine = **263** (Solana Bytecode Format) on BOTH (raw bytes[18:19] LE); ELF64, Type DYN. Entry: cand `0x541C0`, orig `0x82CF8`.
- `.text` (`llvm-objcopy -O binary --only-section=.text`): cand **558200** (0x88478 @ off 0x120) vs orig **706744**. Delta **148544** (orig larger); cand/orig = **0.7898** (candidate .text is ~79% of original).

## 2. Dispatch / handler completeness
- Handler set = **25**, enumerated from `#[program] mod mayhem_recovered` (`programs/mayhem/src/lib.rs:22-237`); identical to `status.json mayhem.implemented_handlers` (25). No Anchor IDL exists in-repo (only `programs/mayhem/target/**/*fingerprint*.json` build artifacts).
- disc = `sha256("global:"+name)[:8]`, searched contiguous (whole .so) AND lddw split (`low4@i, high4@i+8`) in `.text`:
  - **CANDIDATE: 25/25 present**, every handler via lddw split (contiguous=0 for all; anchor loads the 8-byte disc as a 64-bit immediate, not a rodata array).
  - **ORIGINAL (authoritative): 25/25 present**, identical discriminator bytes, and **identical lddw multiplicity**: `buy`=3, `sell`=3, `buy_v2`=2, `sell_v2`=2, all other 21 =1 — matched slot-for-slot between cand and orig.
  - CPI-only/dormant `initialize_mayhem_state` (lib.rs:220, disc `9dbd5e485545cc2d`) dispatches in both (1 lddw each).
- Authoritative-set closure: original's embedded `Instruction: <Name>` log strings enumerate only names inside the 25 (Sell/SellV2/BuyV2/.../InitializeMayhemState...); no unknown dispatch arm. **Mismatches: 0.**

## 3. Behavioral validation inventory
- `stats.json`: 21 baseline suites, `baseline_case_count` **9592**, `baseline_instruction_comparisons` **9595** (3 burn sequences run twice), `baseline_identical_message_pairs` **9595/9595**, `baseline_transaction_count` 19190, `verified_signature_count` 38286.
- Per-family `mismatches: 0` (status.json): sell_v2 (native/token/token22 = 473 ea), buy_v2 (613 ea), buy_pump_swap (419 ea), sell_pump_swap (413 ea), plus sell(396)/buy(486). Family success/reject splits agree on both sides, incl. the all-reject token22 pump_swap families (0 successes / 419 & 413 rejects, mismatches 0).
- Initializer: 16 cases, 9 successes, 62 txns, driven through the **genuine original Pump `invoke_signed`** on both sides; all result fields + full account snapshots agree after compute-line + source-coordinate normalization (README.md:9).
- **Known differences are METADATA, not behavioral** (`diagnostic-differences.json`): (a) compute-unit lines — e.g. sell/interval_overflow cand **46410** vs orig **47974** CU, same `attempt to add with overflow` outcome; (b) panic source-coordinate — orig `programs/mayhem-program/src/state.rs at 562:32` vs cand `src/instructions/sell.rs at 73:41`; one edge case also differs in panic message text (orig silent panic `state.rs:398:90` vs cand `Option::unwrap() on None` `sell.rs:93:77`) but identical FAILED outcome. No success/failure or state-transition divergence found.
- **Verdict (3):** behavioral reconstruction is **complete on the tested surface** (9595/9595 identical modulo CU + source-coord normalization). Scope caveat, not a behavioral gap: every report has `historical_replay: false` — validated against a synthetic LiteSVM corpus + 16 real-Pump-CPI initializer cases, NOT a replay of captured historical mainnet transactions.

## 4. Byte-gap quantification + root cause
(`status.json` comparison: `normalized_window_count` = "not measured for this checkpoint"; metrics below computed here over 8-byte .text slots.)
- Slots: cand **69775** vs orig **88343** (**-18568, -21%**). text delta 148544.
- UNMASKED multiset Jaccard **0.5315** (inter 54877 / union 103241).
- MASKED multiset Jaccard **0.6568** (mask: call 0x85 imm[4:7]; branch/JMP-class offset[2:3]; lddw 0x18 imm[4:7] of both halves).
- MASKED set Jaccard **0.5399** (7425 shared / 13752 distinct). OPCODE-counter Jaccard **0.7859**.
- **Layout/addressing portion:** masking lifts multiset Jaccard 0.5315 -> 0.6568 (**+0.125**). That ~12.5-point band is pure relocation / PC-relative / 64-bit-immediate layout — not a source gap; it moves with any relink.
- **Genuine codegen/source gap (dominant):** even masked, Jaccard is only **0.657**, and the candidate emits **21% fewer** instructions. OPCODE-counter Jaccard (0.786) ~= size ratio (0.790), and the top opcode deltas are all common ops shrinking ~proportionally (0x79 ldxdw +5454, 0x7b stxdw +3619, 0xbf mov +2060, 0x07 add_imm +1306, 0x85 call +776). Signature = "same instruction-kind shape, ~21% less of it" -> a genuinely smaller/partial program, not a relocated copy. **Byte-identity is NOT reachable by re-layout alone.**
- **Root cause:** (a) historical compiler/recipe unresolved — candidate is native **v1.54** direct-Cargo; original family v1.52-v1.56, exact toolchain unknown (`status.json` `compiler`, `compiler_recipe_note`; `historical_source_recovered:false`, `dependencies:unresolved`). (b) Partial independent reimplementation — condensed module layout, opaque fields kept as byte arrays (lib.rs:1-3), and a reduced error surface: original embeds ~18 error-message strings / ~19 error idents (incl. SolReservesTooLow, MayhemModeEnded/NotEnded, OverallRiskExceeded, InvalidBump, SweepFeeRateLimit, TradeRateLimit, Pump/PumpSwapCpi{Failed,MathOverflow,Slippage}) vs the reconstruction's 6-variant `MayhemError` (lib.rs:300-313).

## 5. Path-string check
- ORIGINAL embeds **9** distinct fully-qualified `programs/mayhem-program/src/*.rs`: `instructions/{admin,burn,extend_account,fee_recipients,pump_amm_interface,pump_interface,pump_interface_v2}.rs`, `lib.rs`, `state.rs`.
- CANDIDATE embeds **0 of 9**. Its own crate self-paths are bare `src/*.rs`: `lib.rs`, `state.rs`, `instructions/{burn,buy,buy_pump_swap,buy_v2,sell,sell_pump_swap,sell_v2}.rs` (dependency bare paths e.g. `src/encode.rs`, `src/syscalls.rs` appear in both and are not mayhem).
- **Bounded byte-win NOT needing lost source:** (i) build the crate from a dir named `programs/mayhem-program/` (reconstruction sits at `programs/mayhem/`, stats.json:7-20) without a path-prefix remap, so rustc records the `programs/mayhem-program/src/` prefix; (ii) re-split modules into the original's KNOWN filenames (admin.rs, fee_recipients.rs, pump_interface.rs, pump_interface_v2.rs, pump_amm_interface.rs) — all readable straight from the oracle's own strings. Filenames differ because the reconstruction grouped trades by op (buy/sell/v2/pump_swap); only `lib.rs`/`state.rs`/`burn.rs` are shared.
- **Bounded BY lost source:** exact file:line/col inside those paths (state.rs 562:32, 321:26, 398:90, ...) requires the original's exact file contents; the differing module split re-maps panic sites.

## 6. Verdict
(a) Behavioral reconstruction is **complete** over the validated surface — 9595/9595 identical instruction-message pairs, 0 mismatches across 21 suites + 16 genuine-Pump initializer cases; the only recorded differences (compute-unit counts, panic source coordinates) are metadata, not behavior.
(b) **Not byte-identical** (`full_byte_equality:false`): .text is 21% smaller (−148544 B) with masked-instruction Jaccard 0.66; the exact external blocker is the **unresolved historical compiler/recipe + unrecovered original source** (candidate = native v1.54 of a partial reimplementation).
(c) One genuinely closeable gap: the path-string prefix/filenames (Task 5) — rename the crate dir to `programs/mayhem-program/` and mirror the original module filenames, both inferable from the oracle's strings, closing 9 missing path strings without lost source.
(d) Overall status = **externally bounded by lost source + lost compiler**, not finishable by grind: beyond the bounded path-string win, matching the remaining ~21% instruction gap and exact panic file:line requires the original source and its exact toolchain, neither of which is available.

### Blockers (as-is)
- Cannot reach byte-identity: historical source + exact compiler/deps unavailable (`historical_source_recovered:false`, `dependencies:unresolved`, compiler family v1.52-v1.56 only).
- No build was run (hard constraint); all numbers are from committed binaries/reports.
