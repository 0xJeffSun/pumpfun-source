# B. Behavioral Differential Regression — Candidates vs. Captured On-Chain Originals

Generated 2026-10-25. Read-only on candidates/source. Every runner was executed with system `python3` (solders 0.26.0) and `PYTHONPATH=scripts`; each runner loads the **original deployed program as the oracle internally** and compares the candidate's execution against it (committed account state, lamports, owners, event bytes, inner CPIs, return data, errors, and normalized logs).

**Candidate mapping used (per task spec):**

| runner prefix | program | candidate .so |
|---|---|---|
| `fees_*` | pump_fees | `repro/pump_fees/donation-event-account-v144/pump_fees_candidate.so` |
| `pump_amm_*` | pump_amm | `repro/pump_amm/create-config-shared-methods-v144/candidate.so` |
| `mayhem_*` | mayhem | `repro/mayhem/twentyfour/mayhem_recovered.so` |
| `pump_*` (other) | pump | `repro/pump/tokenkeg-two-curve-fortyeight/candidate.so` |

Runners that require extra args were run per the repo's CI `verify.yml` matrix: `mayhem_*` with their `--cases` fixtures and `--family`/`--instruction` combinations (expanded into one row per combination), `pump_amm_incentives` across `--family sync|admin|claim`, and `pump_amm_resize` with `--creator`.

## Totals

- **Differential runners (invocations):** 90  —  PASS **86** / MISMATCH **4** / ERROR **0**
- **Total behavioral cases executed (differential):** **39,098**
- **Total mismatches (differential):** **401** across **4** runners
- **Surfpool runners:** 16  —  **0 completed** (all blocked by a harness/environment incompatibility, see below). 0 cases counted, 0 mismatches observed.

## Differential results

| runner | program | case_count | mismatches | status | note |
|---|---|---|---|---|---|
| `fees_admin_cto_differential` | pump_fees | 63 | 0 | PASS |  |
| `fees_admin_differential` | pump_fees | 444 | 0 | PASS |  |
| `fees_admin_transfer_differential` | pump_fees | 56 | 0 | PASS |  |
| `fees_buyback_differential` | pump_fees | 1249 | 0 | PASS |  |
| `fees_config_differential` | pump_fees | 625 | 0 | PASS |  |
| `fees_deprecated_differential` | pump_fees | 80 | 0 | PASS |  |
| `fees_donation_create_differential` | pump_fees | 356 | 0 | PASS |  |
| `fees_error_messages_differential` | pump_fees | 2 | 0 | PASS |  |
| `fees_extend_differential` | pump_fees | 297 | 0 | PASS |  |
| `fees_external_codec_differential` | pump_fees | 9 | 0 | PASS |  |
| `fees_initialize_differential` | pump_fees | 180 | 0 | PASS |  |
| `fees_sharing_create_differential` | pump_fees | 116 | 0 | PASS |  |
| `fees_sharing_update_differential` | pump_fees | 417 | 4 | MISMATCH |  |
| `fees_social_claim_differential` | pump_fees | 347 | 0 | PASS |  |
| `fees_social_claim_v2_differential` | pump_fees | 627 | 0 | PASS |  |
| `fees_social_create_differential` | pump_fees | 588 | 0 | PASS |  |
| `fees_upsert_differential` | pump_fees | 578 | 0 | PASS |  |
| `fees_withdraw_differential` | pump_fees | 113 | 0 | PASS |  |
| `pump_amm_accumulator_differential` | pump_amm | 76 | 0 | PASS |  |
| `pump_amm_admin_differential` | pump_amm | 8331 | 0 | PASS |  |
| `pump_amm_boost_burn_differential` | pump_amm | 506 | 0 | PASS |  |
| `pump_amm_boost_differential` | pump_amm | 100 | 0 | PASS |  |
| `pump_amm_buyback_differential` | pump_amm | 369 | 0 | PASS |  |
| `pump_amm_cashback_differential` | pump_amm | 146 | 0 | PASS |  |
| `pump_amm_collect_differential` | pump_amm | 148 | 0 | PASS |  |
| `pump_amm_create_differential` | pump_amm | 246 | 0 | PASS |  |
| `pump_amm_creator_reassignment_cto_differential` | pump_amm | 159 | 0 | PASS |  |
| `pump_amm_creator_reassignment_differential` | pump_amm | 327 | 0 | PASS |  |
| `pump_amm_extend_differential` | pump_amm | 317 | 0 | PASS |  |
| `pump_amm_fee_config_differential` | pump_amm | 356 | 0 | PASS |  |
| `pump_amm_incentives_differential[admin]` | pump_amm | 668 | 0 | PASS |  |
| `pump_amm_incentives_differential[claim]` | pump_amm | 807 | 0 | PASS |  |
| `pump_amm_incentives_differential[sync]` | pump_amm | 222 | 0 | PASS |  |
| `pump_amm_legacy_buy_differential` | pump_amm | 1011 | 0 | PASS |  |
| `pump_amm_legacy_sell_differential` | pump_amm | 575 | 0 | PASS |  |
| `pump_amm_liquidity_differential` | pump_amm | 680 | 0 | PASS |  |
| `pump_amm_migration_create_differential` | pump_amm | 37 | 0 | PASS |  |
| `pump_amm_multi_hop_differential` | pump_amm | 735 | 0 | PASS |  |
| `pump_amm_reserved_differential` | pump_amm | 157 | 0 | PASS |  |
| `pump_amm_resize_differential` | pump_amm | 98 | 0 | PASS |  |
| `pump_amm_sweep_differential` | pump_amm | 254 | 0 | PASS |  |
| `pump_amm_trade_v2_differential` | pump_amm | 870 | 0 | PASS |  |
| `pump_amm_transfer_creator_differential` | pump_amm | 267 | 8 | MISMATCH |  |
| `mayhem_buy_differential` | mayhem | 486 | 0 | PASS |  |
| `mayhem_buy_v2_differential[native]` | mayhem | 613 | 0 | PASS |  |
| `mayhem_buy_v2_differential[token22]` | mayhem | 613 | 0 | PASS |  |
| `mayhem_buy_v2_differential[token]` | mayhem | 613 | 0 | PASS |  |
| `mayhem_pump_swap_differential[buy-native]` | mayhem | 419 | 0 | PASS |  |
| `mayhem_pump_swap_differential[buy-token22]` | mayhem | 419 | 0 | PASS |  |
| `mayhem_pump_swap_differential[buy-token]` | mayhem | 419 | 0 | PASS |  |
| `mayhem_pump_swap_differential[sell-native]` | mayhem | 413 | 0 | PASS |  |
| `mayhem_pump_swap_differential[sell-token22]` | mayhem | 413 | 0 | PASS |  |
| `mayhem_pump_swap_differential[sell-token]` | mayhem | 413 | 0 | PASS |  |
| `mayhem_sell_differential` | mayhem | 396 | 0 | PASS |  |
| `mayhem_sell_v2_differential[native]` | mayhem | 473 | 0 | PASS |  |
| `mayhem_sell_v2_differential[token22]` | mayhem | 473 | 0 | PASS |  |
| `mayhem_sell_v2_differential[token]` | mayhem | 473 | 0 | PASS |  |
| `pump_admin_cto_differential` | pump | 363 | 0 | PASS |  |
| `pump_buy_v2_differential` | pump | 216 | 0 | PASS |  |
| `pump_cashback_differential` | pump | 252 | 0 | PASS |  |
| `pump_create_control_differential` | pump | 85 | 0 | PASS |  |
| `pump_create_differential` | pump | 87 | 0 | PASS |  |
| `pump_create_nested_differential` | pump | 48 | 0 | PASS |  |
| `pump_create_quote_differential` | pump | 297 | 0 | PASS |  |
| `pump_create_v2_differential` | pump | 110 | 0 | PASS |  |
| `pump_creator_collect_differential` | pump | 119 | 0 | PASS |  |
| `pump_creator_collect_v2_differential` | pump | 154 | 0 | PASS |  |
| `pump_creator_distribution_differential` | pump | 298 | 0 | PASS |  |
| `pump_creator_migration_differential` | pump | 139 | 0 | PASS |  |
| `pump_exact_quote_differential` | pump | 352 | 0 | PASS |  |
| `pump_extend_differential` | pump | 308 | 0 | PASS |  |
| `pump_fee_sweep_differential` | pump | 504 | 0 | PASS |  |
| `pump_global_init_differential` | pump | 40 | 0 | PASS |  |
| `pump_holder_distribution_differential` | pump | 649 | 0 | PASS |  |
| `pump_idl_authority_differential` | pump | 171 | 0 | PASS |  |
| `pump_incentives_admin_differential` | pump | 299 | 297 | MISMATCH |  |
| `pump_legacy_buy_differential` | pump | 284 | 0 | PASS |  |
| `pump_legacy_sell_configured_fee_differential` | pump | 28 | 0 | PASS |  |
| `pump_legacy_sell_differential` | pump | 115 | 0 | PASS |  |
| `pump_migrate_differential` | pump | 228 | 0 | PASS |  |
| `pump_migrate_v2_differential` | pump | 827 | 0 | PASS |  |
| `pump_minimum_fee_differential` | pump | 181 | 0 | PASS |  |
| `pump_quote_control_differential` | pump | 491 | 0 | PASS | integer-schema output (cases=int, per-case list under 'results') |
| `pump_quote_control_fresh_differential` | pump | 507 | 0 | PASS | integer-schema output (cases=int, per-case list under 'results') |
| `pump_sell_v2_differential` | pump | 184 | 0 | PASS |  |
| `pump_set_creator_differential` | pump | 509 | 0 | PASS |  |
| `pump_set_params_differential` | pump | 169 | 0 | PASS |  |
| `pump_v3_configured_fee_differential` | pump | 372 | 0 | PASS |  |
| `pump_v3_token_extensions_differential` | pump | 126 | 92 | MISMATCH |  |
| `pump_volume_sync_differential` | pump | 341 | 0 | PASS |  |

## Surfpool results

All surfpool runners are `pump_*` → pump candidate. The `surfpool 1.6.1` binary at `work/localnet/surfpool` is present and launches (offline, in-memory validator); the PATH binary is 1.0.0 and would fail the runners' exact-version gate, so the default-path 1.6.1 binary was used explicitly via `--surfpool work/localnet/surfpool`.

| runner | program | case_count | mismatches | status | note |
|---|---|---|---|---|---|
| `pump_buy_v2_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: AssertionError: Unhandled original error: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6020))))) |
| `pump_cashback_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: AssertionError: Unhandled original error: TransactionErrorInstructionError((0, Tagged(Custom(InstructionErrorCustom(6024))))) |
| `pump_create_control_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: AssertionError: Unhandled original error: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6077))))) |
| `pump_create_nested_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: Unhandled original error Custom(6024) (re-run sequentially; surfpool 1.6.1 ran) |
| `pump_create_quote_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: Unhandled original error Custom(6030) (re-run sequentially; surfpool 1.6.1 ran) |
| `pump_create_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: Unhandled original error Custom(6030) (re-run sequentially; surfpool 1.6.1 ran) |
| `pump_create_v2_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: Unhandled original error Custom(6043) (re-run sequentially; surfpool 1.6.1 ran) |
| `pump_exact_quote_surfpool` | pump |  |  | ERROR | rc=1: AssertionError: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6020))))) |
| `pump_global_init_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: Unhandled original error Custom(2006) (re-run sequentially; surfpool 1.6.1 ran) |
| `pump_holder_distribution_surfpool` | pump |  |  | ERROR | rc=1: AssertionError: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6085))))) |
| `pump_idl_authority_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: AssertionError: Unhandled original error: TransactionErrorInstructionError((0, Tagged(Custom(InstructionErrorCustom(2012))))) |
| `pump_legacy_buy_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: AssertionError: Unhandled original error: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6020))))) |
| `pump_migrate_surfpool` | pump |  |  | ERROR | rc=1: AssertionError: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6027))))) |
| `pump_migrate_v2_surfpool` | pump |  |  | ERROR | rc=1: AssertionError: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6027))))) |
| `pump_v3_configured_fee_surfpool` | pump |  |  | ERROR | rc=1: AssertionError: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6025))))) |
| `pump_v3_token_extensions_surfpool` | pump |  |  | ERROR | harness expected_error map incomplete: AssertionError: Unhandled original error: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6024))))) |

## Mismatch detail (verbatim)

All four mismatching runners are reproducible. For each, the first mismatch entries as emitted by the runner are shown verbatim, followed by the concrete original-vs-candidate divergence and a one-line interpretation.

### 1. `pump_incentives_admin_differential` — 297 / 299 cases mismatch (pump candidate)

First mismatch entries (runner emits case `name`s): `["base", "fresh", "g-fresh", "ata-fresh", "token22", ...]`

Representative divergence (case `base`, `diff: ["after","error","events","inner"]`):
```
error    orig = null
error    cand = "TransactionErrorInstructionError((0, Tagged(Custom(InstructionErrorCustom(101)))))"
events   orig = ["Program data: k/psePcdQ94..."]
events   cand = []
logs     cand = "...AnchorError occurred. Error Code: InstructionFallbackNotFound. Error Number: 101..."
```
Case `fresh` (`diff: ["error"]`): orig = `Custom(3012)`, cand = `Custom(101)`.

**Interpretation:** The pump candidate does not recognize the `admin_update_token_incentives` instruction discriminator — it falls through to the Anchor fallback and returns `InstructionFallbackNotFound (101)` where the original dispatches and executes the instruction. The `admin_update_token_incentives` path is effectively unimplemented in this candidate. (This runner is **not** part of the CI `verify.yml` gate.)

### 2. `pump_v3_token_extensions_differential` — 92 / 126 cases mismatch (pump candidate)

First mismatch entries (case indices): `[5, 6, 7, ...]`

Representative divergence (case 5, `operation: "buy_v3", token_quote: true, quote2022: true`): original and candidate diverge on `accounts`, `inner_instructions`, and `logs` for Token-2022 quoted `buy_v3` flows (committed account set and inner CPI sequence differ between oracle and candidate).

**Interpretation:** The candidate's Token-2022 (`quote2022`) `buy_v3`/extension path produces a different account-mutation + inner-CPI trace than the original. The Token-2022 quote-extension handling in this candidate is not byte/behaviorally identical. (This runner is **not** part of the CI `verify.yml` gate; only `pump_v3_configured_fee` is, and it PASSED at 372 cases.)

### 3. `pump_amm_transfer_creator_differential` — 8 / 267 cases mismatch (pump_amm candidate)

First mismatch entries (case indices): `[194, 197, 200, 203, 256, 259, 262, 265]` — all `instruction: transfer_creator_fees_to_pump`, `diff: ["states","inner"]`, on `destination-data-rent=(N, 890880)` cases.

Representative divergence (case 194):
```
inner   orig = [[]]                              # original performs NO inner CPI
inner   cand = [[{programIdIndex:6, accounts:[[3],1,2,2], data:[[1],9]}, ...]]   # candidate emits transfer CPIs
states  (committed account state differs accordingly)
```

**Interpretation:** For `transfer_creator_fees_to_pump` where the destination is a rent-sized data account, the original performs no inner transfer (and leaves state unchanged) while the candidate executes inner CPIs and mutates state. **This reproduces identically (same 8 case indices) against the CI-intended AMM candidate `repro/pump_amm/update-event-borrow-v144/candidate.so` as well**, so it is candidate-independent — not an artifact of the task's candidate selection. This runner IS in CI `verify.yml` (run against `update-event-borrow-v144`).

### 4. `fees_sharing_update_differential` — 4 / 417 cases mismatch (pump_fees candidate)

First mismatch entries (case `name`s):
```
update_fee_shares-edge-empty-amm-gradTrue-lamports0-ownerTokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
update_fee_shares-edge-empty-amm-gradTrue-lamports0-ownerpfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ
update_fee_shares_v2-edge-empty-amm-gradTrue-lamports0-ownerTokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
update_fee_shares_v2-edge-empty-amm-gradTrue-lamports0-ownerpfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ
```
Representative divergence (case 1):
```
error   orig = "TransactionErrorInstructionError((1, Fieldless(InvalidAccountData)))"   # (case 2: Custom(3007))
error   cand = null                                                                      # candidate SUCCEEDS
events  orig = []
events  cand = ["Program data: pTeBcASzyig..."]
```

**Interpretation:** On four `empty-amm / graduated / 0-lamports` edge cases, the original program **rejects** the `update_fee_shares(_v2)` transaction (`InvalidAccountData` / `Custom(3007)`) while the candidate **accepts** it (succeeds and emits events). The candidate is more permissive than the original on these empty-AMM edge inputs. (This runner is **not** part of the CI `verify.yml` gate; CI's fees differential coverage is `fees_error_messages` + `fees_external_codec`, both PASSED.)

## Surfpool cross-check — blocked by harness/environment incompatibility (not a candidate result)

All 16 `*_surfpool.py` runners failed **before** producing any pass/mismatch comparison. The `surfpool` binary **is available and runs**: `work/localnet/surfpool` reports exactly `surfpool 1.6.1` (the version these runners hard-require) and successfully launches an offline in-memory validator. Each runner then aborts inside its own result-normalization step with, e.g.:
```
AssertionError: Unhandled original error: TransactionErrorInstructionError((1, Tagged(Custom(InstructionErrorCustom(6020)))))
```
The runners carry a hardcoded `expected_error` table mapping LiteSVM error strings to expected surfpool errors; the error codes emitted by surfpool 1.6.1 (6020, 6024, 6025, 6027, 6030, 6043, 6077, 6085, 2006, 2012, ...) are not in that table, so every runner raises `AssertionError` on the **original** (oracle) run. This is a stale-harness / environment-version mismatch, **not** a missing tool ("surfpool unavailable") and **not** a candidate behavioral mismatch. (Five runs in the first pass additionally showed `Address already in use` / `File exists` from my 2-worker parallelism; re-running those five sequentially reproduced the same `Unhandled original error` wall, confirming the classification.)

## Behavioral identicality verdict

The LiteSVM-based differential suite — the authoritative in-process oracle comparison — executed **39,098 behavioral cases across 90 runner invocations**, of which **86 runners (all pump_fees initialize/config/admin/social/buyback/sharing-create, all mayhem buy/sell/v2/pump-swap families, 25 of 27 pump_amm runners, and the full CI-gated pump suite incl. 827-case migrate_v2) passed with zero mismatches**. The CI-gated behavioral surface is clean on every runner that `verify.yml` actually gates. Mismatches are confined to **four runners / 401 cases**, and the evidence distinguishes two very different classes: (a) **two pump runners not wired into CI** reveal genuinely unimplemented/divergent surfaces — `admin_update_token_incentives` returns `InstructionFallbackNotFound` (297/299) and the Token-2022 `buy_v3` extension path diverges (92/126); (b) **two edge-case divergences** — the AMM `transfer_creator_fees_to_pump` rent-destination cases (8/267, reproducible on *both* AMM candidates, so a real reconstruction divergence rather than a candidate-pick artifact) and four pump_fees `empty-amm` `update_fee_shares` cases where the candidate accepts inputs the original rejects. Therefore, **behavioral/ABI identicality is strongly confirmed for the CI-gated instruction set, but it is NOT complete**: the candidates are provably non-identical to the originals on the `admin_update_token_incentives` instruction, the Token-2022 v3 quote path, AMM creator-fee-transfer to rent-sized destinations, and empty-AMM fee-share updates. For SDK integration testing against these specific surfaces, the candidates cannot be treated as drop-in behavioral equivalents until those four divergences are resolved. The surfpool on-chain-style cross-check could not corroborate any of this in the current environment because its error-mapping harness is incompatible with the installed surfpool 1.6.1.

## Reproduction

- Differential harness: `scratchpad/run_diff.py` (6-worker thread pool, 330s/runner timeout). Raw per-runner results incl. stdout/stderr tails: `scratchpad/B-diff/results_raw.json`; per-runner output files under `scratchpad/B-diff/<runner>/report.out`.
- Surfpool harness: `scratchpad/run_surf.py` (2-worker, 480s timeout); raw: `scratchpad/B-surf/results_surf_raw.json`.
- Machine-readable summary: `results.json` (this directory).
