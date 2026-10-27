# pump_amm (PumpSwap) Reconstruction Completion Ledger

Audit date: 2026-10-27. Read-only. No build run. Scratch: `/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bbe1e9ca-a0cb-4dc9-94a6-b53f77f2799c/scratchpad/audit/pump_amm/`.

## ARTIFACT DISCREPANCY (resolved, read first)
The task names candidate `repro/pump_amm/dependency-liquidity-recovery-20261027/.../candidate.so`
(sha `5cd7879af0d9733d1f7d3847be46aa4c5ff214fca2250d1c69d03c49cbc85d1a` — **verified exact match**). The
**live** `repro/status.json` `pump_amm.candidate_artifact`, however, now points at a newer checkpoint
`structural-tlv-recovery-20261027` (`candidate_sha256 5c1e8b18ead27d0b3c1840f37b24ef5044adb65e2a3a566d5be7694ff8737c05`,
1,312,208 B); dependency-liquidity is its `prior_checkpoint`. I audited the **task-specified** binary. The
task's quoted metrics are a mix: `raw_function_matches:123`, `586`, `785` = dependency-liquidity's own
`measurement.json.gz`; `remaining_unmatched:201` + `raw:124` = the newer structural-tlv checkpoint. The two
checkpoints have a near-identical match profile (see §4).

## 1. Artifact identity
| artifact | sha256 | size (B) | .text (B) | e_machine |
|---|---|---|---|---|
| candidate.so (audited) | `5cd7879af0d9733d1f7d3847be46aa4c5ff214fca2250d1c69d03c49cbc85d1a` ✓expected | 1,309,576 | 1,201,240 | 263 ✓ |
| unstripped.so | `197b94c277dacd88aa839f4ba360afa1186c9cb298a041aa9b0d0c5eb62daba2` | 1,835,472 | — | 263 |
| original deployed.so (oracle) | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` | 10,485,715 | 1,162,040 | 263 |
- Both ELF64/LE/DYN, Machine "Solana Bytecode Format" = e_machine **263** (raw bytes @offset 18 confirm). Candidate entry 0xE7240; original entry 0xEE028.
- `.text` extracted via `llvm-objcopy -O binary --only-section=.text`. Original .text (1,162,040) == status.json `total_text_bytes:1162040`. Original 10 MB file is a padded programdata dump: 9,217,211 trailing zero bytes (`measurement.json.gz original_allocation_zero_suffix_bytes`).
- **.text delta: candidate − original = +39,200 B (+3.37%); candidate is larger.**

## 2. Dispatch / handler completeness
Oracle = `evidence/upstream/pump_amm.json` → **38 instructions**. Source `#[program] mod pump_amm_recovered` at `programs/pump-amm/src/lib.rs:45-46` implements all 38 (status.json `implemented_handlers` lists 37 + `create_config` static-only = 38).
- For all 38, computed `sha256("global:"+name)[:8]` **== IDL discriminator** (0 mismatches).
- Presence scan (contiguous AND lddw split-immediate low4@i / high4@i+8):
  - **Candidate: 38/38 found. Original: 38/38 found. Dispatch sets identical; no mismatch.**
  - **Every one found only via lddw-split; contiguous grep finds 0/38** (confirms the warned false-negative). Discriminators sit in a contiguous 32-B-stride lddw dispatch chain (candidate ~685,212–686,412; original ~900,396–901,596), same order in both.

## 3. Behavioral validation inventory
- `validated_cases:17462`, `verified_transaction_signatures:35418`. Independently aggregated the 25 runtime report families in `.../results/runtime/*.json.gz`: Σ case_count = 17,487, **mismatches = 0 everywhere**; minus `progress.json.gz`(25 meta) = **17,462, 0 mismatch**. Corroborated by `structural-tlv-recovery-20261027/direct-comparison.json`: `cases 17462, transactions 35074, signature_fields 35418, mismatches [] (0)`. Largest families: admin 8331, legacy_buy 1011, trade_v2 870, incentives_claim 807, multi_hop 735, liquidity 680.
- Gap (a) **create_config — static-only, 0 runtime successes** (`repro/pump_amm/create-config-shared-methods-v144/scratch/prebuild/REPORT.md`):
  - Genuinely reachable: IDL disc `c9cff3724b6f2fbd`; original dispatch @0xdbd28 → block 0xdc318 → wrapper 0xe0bf8 → handler 0x16d88 (my scan: create_config split @900,396 original / @685,212 candidate). Not a dead handler.
  - It is the **GlobalConfig initializer**: Anchor `init` of the 949-B `global_config` PDA, gated on fixed admin `8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8` (custom `InvalidAdmin`). On mainnet it succeeds **exactly once at deploy**; no genuine successful-init transaction/logs were retained.
  - Gap type = **missing fixture, not a logic gap**. A complete behavioral source proposal exists (22 files; its handler static-matches 109/112 direct callsites, only the 3 scalar setters differ). The negative path (non-admin signer rejection) is exercised.
  - Source-level path to a runtime success: **none that is in-repo-closeable.** A positive run needs EITHER the fixed-admin private key signing a fresh init against an uninitialized PDA on a local SVM, OR a retained authentic historical init tx+logs. Both are external; the admin key is not derivable. Source is complete-but-unexerciseable.
- Gap (b) **update_fee_config — 12/16 immediate targets matched.** Original handler window `[120992,123904]` (0x1d8e0, 2912 B) has **exactly 16 immediate call-sites** (`repro/pump_amm/scalar-guard-order-v144/scratch/prebuild/evidence.json original_handler.calls`). I recomputed normalized match for all 16 against the audited binary (`norm.py`) → **12 match, 4 unmatched = status.json figure.** The 4 unmatched callees are the 4 GlobalConfig fee setters (called in order @121072/121176/121248/121320):
  1. `lp_fee` setter @0x61630 (398896) — 616 B orig vs 608 B cand
  2. `protocol_fee` setter @0x61898 (399512) — 616 B vs 608 B
  3. `creator_fee` setter @0x61b00 (400128) — 616 B vs 608 B
  4. `recipients` setter @0x61d68 (400744) — 2336 B
  The 12 matched are shared helpers (Update* state fn @561480, anchor Error @1060928, sol_log_data @1075840, invoke_signed @1075896, clock sysvar @1076792, Instruction::new @1104720, raw_vec/alloc handlers @1119048/1119072, panic_fmt @1124880, memcpy @1153176). The handler **body itself normalized-matches** (`update_fee_config_body_normalized_match:true`); `update_fee_config_recursive_data_complete:false`. Root cause of the 4: compiler monomorphization/specialization (616 vs 608 B scalar setters, labelled `historical_specialization`; recipients setter data closure unproven), i.e. the §5(b) toolchain blocker — not a source-logic error.

## 4. Byte-gap quantification + root cause
- **Size:** .text +39,200 B (candidate larger); 150,155 vs 145,255 8-byte slots (+4,900 slots).
- **8-byte-slot multiset (Counter) Jaccard** over .text (`bytegap.py`):
  - RAW (unmasked): inter 121,412 / union 173,998 = **0.6978**
  - MASKED (call 0x85 imm[4:8], jump offset[2:4], lddw 0x18 both imm halves): inter 133,205 / union 162,205 = **0.8212**
  - Interpretation: masking lifts Jaccard +0.1234 → that ~12 pts is pure **addressing/relocation/layout** (call targets, branch displacements, 64-bit immediates shift because the candidate is laid out differently). The residual **~0.179 (17.9 pts) is genuine codegen/source gap** — extra/larger functions (+39.2 KB), different instruction selection/scheduling/inlining, different monomorphization.
- **remaining_unmatched windows:** audited binary `measurement.json.gz` = 785 windows, 123 raw, **586 normalized, 199 unmatched** (status.json's `201`/`124` are the newer structural-tlv checkpoint — a 2-window regression / 1 extra raw). My independent normalized reproduction = **785/123/586/199, exact** (mask validated). The 199 unmatched = original functions with **no normalized-equal candidate body** (matches list empty), **517,584 B = 44.5% of .text** (= 1,162,040 − `matched_text_bytes:644456`). Size spread: 13 windows ≥8 KB (largest 16,912 / 15,512 / 12,936 B), 29 @4–8 KB, 28 @2–4 KB, 42 @1–2 KB, 87 <1 KB — the byte mass is in the large trade/swap/liquidity/curve-math handlers, which are runtime-validated (§3, 0 mismatch) but not byte-normalized-equal.

## 5. Verdict
(a) **Behavioral reconstruction is effectively complete:** all 38 handlers present with a dispatch set byte-identical to the oracle (§2); 17,462 differential runtime cases over 35,418 signatures pass with **zero** mismatches (§3). The sole behavioral hole is create_config's missing *positive* runtime case, which is a missing authentic fixture (fixed-admin signature / retained deploy-time init), not a logic defect.
(b) **Byte-identical is NOT achieved** (`full_byte_equality:false`): only 586/785 function windows and 55.5% of .text bytes normalized-match; masked Jaccard 0.82 vs raw 0.70. The exact external blocker is **unresolved historical build provenance** — the authentic compiler toolchain/SDK/flags and exact source spelling (status.json: v1.44 is the strongest *measured stock* candidate but "historical provenance unresolved"); without it the specialization/codegen differences (e.g. the 616-vs-608 B setters) cannot be reproduced.
(c) **Neither prime gap is closeable without authentic external input.** create_config runtime success: not closeable — needs the admin private key or a genuine init fixture (not reconstructable from source). update_fee_config's 4 setters: not closeable — source is already behaviorally complete; closing requires the authentic compiler to emit the 616-B specialization. No source-level edit closes either.
(d) **Finishable vs externally bounded:** the behavioral lane is essentially finished; the byte-identical lane is **externally bounded** by (i) missing authentic compiler/flags provenance and (ii) the missing create_config admin fixture. Further grinding on reconstructed source will not reach byte-equality — the named missing inputs are the authentic historical toolchain and the create_config deploy credential/fixture.

### Blockers encountered
None to the audit. HARD CONSTRAINT honored: no build run; repo read-only; all scratch under the session audit dir. One broad `grep -r` timed out (backgrounded, discarded) and was replaced with scoped lookups.
