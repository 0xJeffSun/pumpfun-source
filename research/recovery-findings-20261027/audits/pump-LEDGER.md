# pump reconstruction completion ledger

Audit date 2026-10-27. Read-only; analysis of committed `.so` binaries + JSON reports. No build run.
Scratch: `/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bbe1e9ca-a0cb-4dc9-94a6-b53f77f2799c/scratchpad/audit/pump/`

Pointer note: `repro/status.json:pump.candidate_artifact` (working tree) already points at **round16** (`candidate_sha256` `6faafcf1…`), not round13 as the task brief stated. round13 is `prior_checkpoint`. Both inspected below; round16 is further along (Task 4).

## 1. Artifact identity

| artifact | sha256 | file size | `.text` size | e_machine | e_type / class |
|---|---|---|---|---|---|
| round13 candidate.so | `95ac14b455059c483bd23ba2b5245877901178d21f83e3baf042993d573ac31a` | 1,817,824 | 1,681,072 | 263 | 3 (ET_DYN) / ELF64 |
| round16 candidate.so | `6faafcf1164cf78336f7b2cd49032048ae0771f386119bb8f03a22996a1db0c1` | 1,808,936 | 1,672,696 | 263 | 3 (ET_DYN) / ELF64 |
| original deployed.so | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` | 10,485,715 | 1,792,208 | 263 | 3 (ET_DYN) / ELF64 |

- round13 sha matches the brief's expected value; round16 sha matches `repro/status.json`.
- Candidate e_machine = 263 (SBF) confirmed for both candidates and original.
- Original is a 10 MiB padded on-chain programdata dump (`.text` 1,792,208 + `.rodata` 0x7d1f + `.data.rel.ro` 0x2870, rest zero padding); whole-file size is not comparable. Extracted `.text` 1,792,208 == `status.json:pump.original_text_bytes` 1,792,208 — extraction pipeline consistent with the repo's.
- `.text` delta: round16 −119,512 B (6.67% smaller than original); round13 −111,136 B.

## 2. Dispatch / handler completeness

- Authoritative handler set = **56**, agreeing across three sources: `evidence/upstream/pump.json` (56 instructions, with embedded discriminators), `programs/pump/src/lib.rs:69-171` (56 `pub fn` in `#[program] mod pump_recovered`), and the IDL. IDL discriminators == `sha256("global:"+name)[:8]` for all 56 (**0 mismatches**).
- Discriminator scan (contiguous bytes OR split-lddw: `disc[0:4]` at i and `disc[4:8]` at i+8):
  - round16 candidate: **56/56 present** · round13: 56/56 · original: 56/56.
  - All 56 are present as the **split-lddw** form in every binary; opcode `0x18` confirmed at offset i−4 for spot-checked handlers (`initialize`, `buy`, `sell`, `create`, `admin_cto`) in both original and round16 — genuine `lddw` immediates, not coincidence.
  - Handlers in original **missing from candidate: NONE**. In candidate but not original: NONE. Authoritative original set == candidate set == all 56.
- Caveat: `status.json:pump.implemented_handlers` lists only **48** names. That is the behavioral-classification subset (`coverage_limitations`: "48/56 baseline handler classification"), NOT the dispatch set. The 8 not in that list (`create_v2`, `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3`, `multi_hop_curve_swap`, `claim_token_incentives`, `admin_update_token_incentives`, `set_mayhem_virtual_params`) are nonetheless wired and discriminator-present. Dispatch completeness is **56/56**.
- Discriminator presence proves the handler is wired/dispatched; it does not by itself prove the body is byte-identical (see Task 4).

## 3. Behavioral validation inventory

Methodology (`full.json.gz:diagnostics.scope`): differential in-VM replay of each case against `evidence/original/pump/deployed.so`, comparing captured error payloads + logs with account names and operands preserved.

- `repro/pump/main-contract-round16-20261027/full.json.gz`: **10,468** cases / 44 suites, **0 mismatches** (top-level `mismatches:[]`, `diagnostics.mismatches:0`, and every one of the 44 suites `mismatches:0`). `log_bearing_cases` 10,464.
- `…/additional.json.gz`: **4,584** cases / 78 suites, **0 mismatches**, 0 flagged results.
- Combined **15,052** differential cases, **0 mismatches** (`status.json:pump.paired_diagnostic_cases` 15,048 strict-log subset).
- Per-suite `original_successes` is populated for only 2 suites — `incentive_schedule` 191/575, `tokenkeg_two_curve` 16/20; it is `null` for the other 42 (not recorded at suite level), so it is **not** a 0-runtime-success signal. The corpus is heavily error-path/guard-case by design (e.g. `multi_hop_curve_partial` 56/56 passed, original returns `Custom(6002)`, candidate reproduces it exactly). No handler is static-only with a mismatch; every handler appears in matched differential cases.
- `promotion.json:additional_cases` 3,187 is a narrower count than the run's 4,584 (`additional.json.gz:case_count` and `status.json` agree at 4,584) — noted, non-blocking.
- **State: behaviorally complete over the validated corpus** (0/15,052 mismatches, 56/56 dispatch). The only limits are disclosed scope, not a failing handler: synthetic local signed fixtures with no current-chain acceptance proof; strict diagnostics exclude source coordinates and compute-unit usage; full and focused corpora overlap (`status.json:pump.coverage_limitations`).

## 4. Byte-gap quantification + root cause (round16 vs original `.text`)

(a) Size delta: original 1,792,208 B (224,026 8-B slots) vs round16 1,672,696 B (209,087 slots) = **−119,512 B / −14,939 slots**.

(b) Masked-instruction-multiset Jaccard (mask: call `0x85` imm bytes 4-7; branch `(op&7)==5` offset bytes 2-3; lddw `0x18` imm both halves):

| metric | round16 vs orig | round13 vs orig |
|---|---|---|
| UNMASKED multiset Jaccard | 0.6255 | 0.6197 |
| MASKED multiset Jaccard | **0.7423** | 0.7369 |
| masking lift | +0.1168 | +0.1172 |
| orig slots with no masked counterpart | 39,497 (**17.63%** of 224,026) | 39,835 (17.78%) |
| cand slots with no masked counterpart | 24,558 | 25,943 |

Corroborated at function granularity (`inventory.json.gz:counts`, 1,035 original function windows, masking internal direct-call operands + known-ELF-section pointers): raw byte-equal **114 (11.0%)**, normalized-equal **670 (64.7%)**, **unmatched 365 (35.3%)**.

Interpretation:
- **Layout/addressing (relocation/ordering) component** = the unmasked→masked lift: ~0.117 Jaccard points, ~17,869 slot-matches recovered purely by zeroing call/branch/lddw targets. At function level this is the raw→normalized lift of 556 functions (53.7%). This is link-order / section-layout / pointer-relocation difference — *not* codegen error, and inherent to not having identical build inputs.
- **Genuine codegen/source component** = the residual after masking: **~17.6% of `.text` slots / 35.3% of functions** differ in content or are absent. This is the real gap, and it tracks the 119 KB-smaller `.text` and the function-count shortfall (209,087 vs 224,026 slots). Root cause: the reconstructed source is behaviorally equivalent but not source-identical — different internal factoring/inlining/monomorphization and some original helper functions not reproduced, compounded by unresolved dependency identity (`status.json:pump.dependencies` "pinned Cargo.lock; complete original identity unresolved"; `source_reconstruction` "partial_main_contract_reproduced").

Net: ~65% of functions reproduce modulo relocations; ~35% is genuine source/codegen difference. The build itself is deterministic — `build-parity.json` shows round16, round16-clean, and canonical rebuilds all hash to `6faafcf1…` (unstripped `093e897b…`), `build.json:returncode` 0, `source_unchanged` true — so the residual is input-provenance, not nondeterminism.

round16 vs round13: round16 is further along — `matched_text_bytes` 777,368 (round16 `status.json`) vs 738,800 (round13 `CHECKPOINT.json`), masked Jaccard 0.7423 vs 0.7369, fewer unmatched slots. round16 added `src/fee_cpi.rs` and refined `distribution.rs`/`sweep.rs` (`promotion.json`, `integration-plan.json`).

## 5. Verdict

(a) **Behavioral reconstruction is complete** over the validated corpus: 0 mismatches across 15,052 differential cases and 56/56 Anchor dispatch discriminators present; the boundary is disclosed validation scope (synthetic local fixtures, no on-chain acceptance, compute-units excluded), not any failing or missing handler.
(b) **Byte-identical is not achieved** (`full_byte_equality` false; only 114/1,035 functions byte-equal, masked slot-Jaccard 0.742) and the exact external blocker is the **lost historical inputs — the exact original source tree plus the exact `Cargo.lock` dependency identity and build metadata**; `status.json` records "historical_source_recovered: false" and "complete original identity unresolved", and the build is already deterministic (`build-parity.json`), so provenance of inputs is the sole blocker.
(c) **No single source-level fix closes it**: the 365 unmatched functions are distributed internal helpers, not a missing handler, so the only genuinely closeable work is the per-function instruction-level recovery already in flight (`integration-plan.json`: SharingConfig decoder → `distribution.rs`, Sweep parser → `sweep.rs`; round16 added `fee_cpi.rs`), each closing a sliver (round13→round16 gained +38,568 matched_text_bytes).
(d) The residual is **externally bounded by lost source / Cargo.lock identity**; beyond continued incremental helper recovery there is no finishable work that reaches byte-identity without those lost inputs.
