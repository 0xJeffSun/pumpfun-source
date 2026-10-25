# D — SDK localnet: running the pump.fun SDK against the reconstructed candidates

**Date:** 2026-10-25
**Question answered:** Can the pump.fun team locally test a new SDK integration against the
current reconstructed candidate programs *without* requiring whole-binary byte-identicality
(which is 0/4)? **Yes.** This directory is the runnable setup, captured demonstration output,
and the safe-flow matrix.

> **Scope / safety.** Everything here is **local and offline**. No tool in this repo (or this
> write-up) broadcasts to any real network. The three harnesses run against an in-process VM
> (LiteSVM), a local offline Surfnet, or a local `solana-test-validator` bound to `127.0.0.1`.
> Keep it that way. All artifacts live under this directory; nothing tracked was modified.

---

## 0. Bottom line

**The team can start SDK testing now.** The reconstructed programs are *behaviorally* usable at
their canonical mainnet program IDs even though not one of the four is byte-identical to its
original (acceptance is **0/4 whole-binary**, and that is not close). Handler-level coverage is
**140/150 instructions = 93.3%** reconstructed with bounded differential tests, backed by
~53,700 saved original-vs-candidate comparison receipts.

Three independent local paths all run **here, now**, verified in this session:

1. **LiteSVM in-process differential oracle** (fastest; the repo's core pattern) — ran clean.
2. **Surfpool 1.6.1 offline local RPC** (bundled binary) — ran clean: 36 signed txs, 0 mismatches.
3. **`solana-test-validator` persistent JSON-RPC** (the SDK-native endpoint) — all 8 programs
   load executable at canonical IDs and the candidate bytecode executes and dispatches.

**Safe to drive from the SDK today:** `create`, `buy`/`buy_v2`, `sell`/`sell_v2`, `migrate`/
`migrate_v2`, PumpSwap pool create + `buy_v2`/`sell_v2` + liquidity + multi-hop, fee collection
(creator + protocol + the whole Fees program), quote-control, standalone cashback claims, and
holder-reward distribution — each is covered by bounded differential suites that currently pass.

**Do NOT rely on (partial or stopped):** `buy_v3`/`sell_v3`/`buy_exact_quote_in_v3` beyond the
SOL/USDC branch; `create_v2` in Mayhem mode or with migrated-parent / deep-nested routes; native
Pump `multi_hop_curve_swap` beyond the two hard-coded ordinary-Tokenkeg routes; Pump token
incentives (`admin_update_token_incentives`, `claim_token_incentives`); `set_mayhem_virtual_params`;
Mayhem state init (`initialize_mayhem_state`); PumpSwap `create_config`; and `sell_v2` with a
Token-2022 **transfer-fee** quote mint (a confirmed, still-open divergence). Details in §4.

---

## 1. Environment inventory (what is actually installed here)

| Tool | Version here | Needed for | Status |
| --- | --- | --- | --- |
| `solana-test-validator` / `solana` | Agave 2.1.21 | Path C (persistent RPC) | installed, works |
| `surfpool` (on `PATH`) | **1.0.0** | — | too old; scripts refuse it |
| `surfpool` (bundled) | **1.6.1** at `work/localnet/surfpool` | Path B | present, works |
| `cargo` | present | rebuilding candidates (not required to test) | installed |
| system `python3` | 3.13.2, **solders 0.26.0** | Path A (LiteSVM) | works for differential suites |
| pinned venv | **solders 0.27.1** at `D-sdk-localnet/.venv` | Path B + strict error parsing | created here, works |

Two version gotchas the team must know:

- **Surfpool must be 1.6.1.** The `*_surfpool.py` scripts hard-assert `surfpool 1.6.1` and will
  `RuntimeError` on the PATH 1.0.0. Use the bundled `work/localnet/surfpool` (verified 1.6.1).
- **LiteSVM ships *inside* `solders`** (`from solders.litesvm import LiteSVM`) — there is no
  separate `litesvm` pip package. The system `solders 0.26.0` runs every `*_differential.py`
  suite correctly. Only the Surfpool runner's error-string normalizer assumes 0.27.1's error
  `repr` (0.26.0 renders `Tagged(Custom(InstructionErrorCustom(N)))`, which the runner's regex
  does not parse), so **run Path B from the pinned 0.27.1 venv.** Recreate it with:
  ```sh
  python3 -m venv work/reconstruction-review-2026-10-25/D-sdk-localnet/.venv
  work/reconstruction-review-2026-10-25/D-sdk-localnet/.venv/bin/pip install -r requirements.txt
  ```

### Candidate artifacts (program-id → .so)

| Program | Program ID | Candidate `.so` | SHA-256 (candidate) |
| --- | --- | --- | --- |
| pump | `6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P` | `repro/pump/tokenkeg-two-curve-fortyeight/candidate.so` | `5c1c1c2d…` |
| pump_amm (PumpSwap) | `pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA` | `repro/pump_amm/update-event-borrow-v144/candidate.so` | `d27be7e9…` |
| pump_fees | `pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ` | `repro/pump_fees/donation-event-account-v144/pump_fees_candidate.so` | `8f89dbeb…` |
| mayhem | `MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e` | `repro/mayhem/twentyfour/mayhem_recovered.so` | — |

> **AMM path note.** The task brief named `repro/pump_amm/create-config-shared-methods-v144/candidate.so`
> (SHA `80701082…`). Per `repro/status.json` + `docs/COMPLETION.md` that is the **prior**
> checkpoint; the **current head** is `update-event-borrow-v144` (`d27be7e9…`, the event-borrow
> fee-update checkpoint). Both pass the AMM differential suites here; this setup uses the current
> head. If you want the exact task-named binary, swap the `pump_amm.so` source in §3.

### Dependencies (captured mainnet payloads, loaded at their canonical IDs)

| Dependency | Program ID | Captured payload | Reconstruction state |
| --- | --- | --- | --- |
| SPL Token | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` | `evidence/dependencies/spl_token/deployed.so` | rebuilt, full byte match |
| Token-2022 | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` | `evidence/dependencies/spl_token_2022/deployed.so` | rebuilt, full byte match |
| Associated Token | `ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL` | `evidence/dependencies/associated_token/deployed.so` | captured (recipe unresolved) |
| Token Metadata (Metaplex) | `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s` | `evidence/dependencies/token_metadata/deployed.so` | captured (1250/1251 windows) |

The harnesses load the **captured original** dependency payloads (not reconstructions), so
dependency behavior on localnet is the genuine mainnet bytecode. (Donation relay
`RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu` is captured too but is only needed for Fees
donation-relay flows.)

---

## 2. The three runnable paths

### Path A — LiteSVM differential oracle (recommended for regression; fastest)

This is the repo's core pattern and the strongest correctness signal: it runs **the same signed
transaction on the original and on the candidate in-process** and diffs account state, logs,
events, inner instructions and return data. 79 `scripts/*_differential.py` suites exist.

```sh
# system python (solders 0.26.0) is fine for these
python3 scripts/pump_create_differential.py \
  --candidate repro/pump/tokenkeg-two-curve-fortyeight/candidate.so \
  --output work/reconstruction-review-2026-10-25/D-sdk-localnet/demo/pump_create.json.gz
# prints "<N> cases <M> mismatches"; exit 0 and M==0 means candidate == original on that surface
```

These are not an SDK endpoint — they are an oracle. Use them as the CI gate behind SDK changes:
if the SDK starts exercising a new account layout, add/extend the matching differential.

### Path B — Surfpool 1.6.1 offline local RPC (real JSON-RPC, replayed signed txs)

Uses the bundled 1.6.1 binary, starts an **offline** in-memory Surfnet, injects captured state
with `surfnet_setAccount`, loads the candidate + deps, and submits real signed transactions over
RPC, comparing original vs candidate. 16 `scripts/*_surfpool.py` suites exist.

```sh
VPY=work/reconstruction-review-2026-10-25/D-sdk-localnet/.venv/bin/python   # solders 0.27.1
$VPY scripts/pump_create_surfpool.py \
  --candidate repro/pump/tokenkeg-two-curve-fortyeight/candidate.so \
  --surfpool work/localnet/surfpool \
  --output work/reconstruction-review-2026-10-25/D-sdk-localnet/surfpool-create
```

### Path C — `solana-test-validator` persistent JSON-RPC (point your SDK here)

This is what a JS/TS SDK integration test actually wants: a long-lived RPC at
`http://127.0.0.1:8899` (+ websocket `:8900`) with the candidates deployed at their real IDs and
the captured global configs seeded. Use the generated launch script:

```sh
bash work/reconstruction-review-2026-10-25/D-sdk-localnet/start-localnet.sh
# then point the SDK at http://127.0.0.1:8899 (airdrop a payer, derive PDAs as on mainnet)
```

`start-localnet.sh` runs (program-id → `.so`, all ELF-trimmed into `./programs/`, plus the three
seeded configs in `./seed-accounts/`):

```
solana-test-validator --ledger <dir> --reset --rpc-port 8899 \
  --bpf-program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P programs/pump.so \
  --bpf-program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA programs/pump_amm.so \
  --bpf-program pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ programs/pump_fees.so \
  --bpf-program MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e programs/mayhem.so \
  --bpf-program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA programs/spl_token.so \
  --bpf-program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb programs/spl_token_2022.so \
  --bpf-program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL programs/associated_token.so \
  --bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s programs/token_metadata.so \
  --account 4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf seed-accounts/pump_global.json \
  --account ADyA8hdefvWN2dbGGWFotbzWxrAvLW83WG6QCVXvJKqw seed-accounts/pump_amm_global.json \
  --account CHqnuTkj6sXDFknM652aEFPECZh9qVsBXWkhPohmV9dA seed-accounts/pump_fees_global.json
```

- **ELF trimming.** `--bpf-program` wants a bare ELF. The 4 candidate `.so` files are already
  trimmed; the dependency `deployed.so` captures carry a zero allocation tail (Token-2022,
  Metaplex), stripped here to the ELF extent (all stripped tails verified zero — no data loss).
  The regenerator lives inline in this README's provenance; `./programs/` already holds the result.
- **State seeding.** `./seed-accounts/*.json` are the three captured global-config accounts
  (`research/imported-lab/analysis/pump_fun/config-snapshot.json`) in test-validator `--account`
  format, keyed at their canonical addresses with the owning program. They are what lets the SDK's
  read/quote and create/trade paths find an initialized config. Any further per-test state (bonding
  curves, ATAs) the SDK creates itself, exactly as on mainnet, or you can add more `--account`
  seeds / clone captured accounts the same way. There is **no** `--url`/clone to a live cluster —
  offline only.
- **Loader note.** `--bpf-program` deploys under the upgradeable loader at the canonical IDs
  (verified `owner = BPFLoaderUpgradeab1e…`, `executable = true` for all 8). ATA on mainnet uses
  the immutable legacy loader; here it is loaded as an ordinary BPF program, which is transparent
  to CPI callers.

---

## 3. Demonstration output captured in this session

All three paths were executed here against the candidates. Raw artifacts are under `demo/`,
`surfpool-create/`, `programs/`, `seed-accounts/`.

**Path C — `solana-test-validator` (persistent RPC):** all 8 programs came up
`executable = true` at their canonical IDs; the three configs seeded with correct owners
(`pump` 1088 B, `pump_amm` 949 B, `pump_fees` 338 B). A signed instruction with a bogus
discriminator to the pump candidate committed and the loaded bytecode dispatched through Anchor:
```
Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P invoke [1]
Program log: AnchorError occurred. Error Code: InstructionFallbackNotFound. Error Number: 101.
Program 6EF8…F6P consumed 1659 of 200000 compute units
Program 6EF8…F6P failed: custom program error: 0x65
```
i.e. the candidate runs, routes by discriminator, and rejects the unknown selector exactly as an
Anchor program should — the SDK-facing surface is live. (See `demo/test_validator_invoke.txt`.)

**Path B — Surfpool 1.6.1 (`demo/.../surfpool-create/`):** `pump_create_surfpool.py` →
`{"cases": 18, "signed_transactions": 36, "mismatches": [], "unexpected_original_errors": [],
"candidate_sha256": "5c1c1c2d…"}`. 36 transactions were signed, submitted, committed and
diffed against the original through a real local RPC with 0 mismatches.

**Path A — LiteSVM differential suites (all exit 0, 0 mismatches):**

| Flow / suite | cases | mismatches |
| --- | ---: | ---: |
| `pump_create_differential` | 87 | 0 |
| `pump_buy_v2_differential` | (pass) | 0 |
| `pump_sell_v2_differential` | (pass) | 0 |
| `pump_migrate_differential` | 228 | 0 |
| `pump_migrate_v2_differential` | 827 | 0 |
| `pump_create_v2_differential` (bounded safe subset) | 110 | 0 |
| `pump_v3_configured_fee_differential` | 372 | 0 |
| `pump_quote_control_fresh_differential` | 507 | 0 |
| `pump_cashback_differential` | 252 | 0 |
| `pump_holder_distribution_differential` | 649 | 0 |
| `pump_amm_create_differential` | 246 | 0 |
| `pump_amm_trade_v2_differential` | 870 | 0 |
| `pump_amm_multi_hop_differential` | 735 | 0 |
| `pump_amm_liquidity_differential` | 680 | 0 |
| `fees_withdraw_differential` | 113 | 0 |
| `fees_donation_create_differential` | 356 | 0 |

(`demo/*.json.gz` hold the full per-case receipts; `demo/headline_flows_batch.txt` the run log.)

---

## 4. Safe-flow matrix

Legend: **(a) covered** = fully covered by bounded differential tests that pass against the
candidate; **(b) partial** = only specific branches match, named edges diverge or are
unrecovered; **(c) stopped** = unrecovered / not reconstructed. All handler names cited from
`repro/status.json` + `docs/COMPLETION.md`. "Covered" is bounded behavioral equivalence on the
tested surface, **not** whole-binary equality (still 0/4) and **not** a security sign-off (audit
incomplete).

| SDK flow | Handler(s) | Verdict | What is safe / what diverges | Runner(s) |
| --- | --- | --- | --- | --- |
| **create** | `pump.create` | **(a)** | Full create lifecycle, ordinary Tokenkeg; 87 + 18 txs clean. | `pump_create_differential`, `pump_create_surfpool`, `pump_create_quote/control` |
| **create_v2** | `pump.create_v2` | **(b)** | Safe: normal SOL + whitelisted-token quote creation, holder creation, quote-control consumer admission/reserves, configured creator-fee checks, **depth-1** nested create from a normal SOL-root quote coin. Diverges/unsupported: **Mayhem mode** (needs `mayhem.initialize_mayhem_state`, stopped), **migrated-parent**, **deeper-nested** routes. | `pump_create_v2_differential` (110), `pump_create_nested_differential`, `pump_create_v2_surfpool` |
| **buy** | `pump.buy`, `buy_exact_sol_in`, `buy_v2`, `buy_exact_quote_in_v2` | **(a)** | SOL + quote-in buy branches incl. completion, fee overrides, context/absent-account guards. | `pump_buy_v2_differential`, `pump_legacy_buy_differential`, `pump_exact_quote_differential`, `pump_buy_v2_surfpool` |
| **buy_v3** | `pump.buy_v3`, `buy_exact_quote_in_v3` | **(b)** | Safe: SOL + USDC quote branches, Mayhem/holder fields, cashback **rejection**. Diverges: other quote routes, nested routes, transfer-fee extensions, exhaustive extension/account validation; **final TradeEvent u64 suffix uninterpreted**. | `pump_v3_configured_fee_differential` (372); v3 token-extension work partial/in-progress (`pump_v3_token_extensions_*`) |
| **sell** | `pump.sell`, `sell_v2` | **(a)*** | Full SOL + quote sell. **Known open edge:** `sell_v2` with a **Token-2022 transfer-fee** quote mint has a confirmed minimum-output/event mismatch (corrective lane stopped) — treat that one edge as diverging. | `pump_sell_v2_differential`, `pump_legacy_sell_differential` |
| **sell_v3** | `pump.sell_v3` | **(b)** | Same shape as `buy_v3`: SOL/USDC + Mayhem/holder + cashback rejection only; other routes and exhaustive validation incomplete; event suffix uninterpreted. | (shares v3 fixtures) |
| **migrate** | `pump.migrate`, `migrate_v2`, `migrate_bonding_curve_creator`; `pump_amm.create_pool`, `migrate_pool_coin_creator` | **(a)** | Curve→AMM migration incl. v2; pool creation on the AMM side. 228 + 827 clean. | `pump_migrate_differential`, `pump_migrate_v2_differential`, `pump_migrate_surfpool`, `pump_amm_migration_create_differential`, `pump_creator_migration_differential` |
| **fee collection** | `pump.collect_creator_fee(_v2)`, `distribute_creator_fees(_v2)`, `sweep_creator_fee`, `sweep_protocol_fee`; **all 31 `pump_fees.*`**; `pump_amm.collect_coin_creator_fee`, `sweep_*` | **(a)*** | Creator + protocol fee collection/sweep/distribution and the entire Fees program (withdraw, buyback, sharing, social, config). **Edge:** Fees **donation** handler (`create_donation_fee_pda`/`crank_donation_fee_pda`) is bounded-covered but two original log paths + a reserve-dependent BondingCurve branch are absent from the current pool-only implementation. 2 Fees dispatches (`revoke_/transfer_fee_sharing_authority`) are deprecated rejection paths. | `pump_creator_collect(_v2)`, `pump_creator_distribution`, `pump_fee_sweep`, `fees_withdraw` (113), `fees_*` suite, `fees_donation_create` (356), `pump_amm_collect/sweep` |
| **multi-hop** | `pump_amm.multi_hop_swap` **(a)**; `pump.multi_hop_curve_swap` **(b)** | **(a)/(b)** | PumpSwap AMM multi-hop: covered (735 clean). **Native Pump curve multi-hop: heavily restricted** — only `SOL→A→B` and `B→A→SOL` with ordinary Tokenkeg, flags `[1,2]`/`[2,1]`, pre-existing canonical vaults, strictly non-completing buys. Broader routes, other quote currencies, arbitrary hop counts, Token-2022/extensions, holder/cashback/Mayhem, completion: unsupported. | `pump_amm_multi_hop_differential` (735) |
| **quote-control** | `pump.initialize_quote_control`, `set_quote_control_admin`, `set_quote_control_reserves_admin`, `add/remove_quote_control_mint`, `set_quote_control_mint_reserves` | **(a)** | All 6 quote-control handlers covered (507 clean). | `pump_quote_control_fresh_differential` (507) |
| **cashback** | `pump.claim_cashback`, `claim_cashback_v2`; `pump_amm.claim_cashback`, `toggle_cashback_enabled` | **(a)*** | Standalone cashback claim covered (252 clean). **Edge:** cashback *inside* v3 buy/sell is only covered as the **rejection** path, not full accrual (see buy_v3/sell_v3). | `pump_cashback_differential` (252), `pump_amm_cashback_differential` |
| **holder rewards** | `pump.distribute_fee_to_holders`, `update_holder_reward_config` | **(a)** | Holder-reward distribution covered (649 clean). | `pump_holder_distribution_differential` (649) |
| **token incentives** | `pump.admin_update_token_incentives`, `pump.claim_token_incentives` | **(c)** | **Unrecovered on Pump — do not test.** (PumpSwap's own `pump_amm.admin_update_token_incentives`/`claim_token_incentives` **are** implemented and covered.) | — (Pump); `pump_amm_incentives_differential` (AMM) |

### Fully stopped lanes (treat as not implemented)

| Handler | Program | State |
| --- | --- | --- |
| `admin_update_token_incentives` | pump | unrecovered |
| `claim_token_incentives` | pump | unrecovered |
| `set_mayhem_virtual_params` | pump | unrecovered (static body/wrapper/parser attribution only; no valid Mayhem PDA invocation) |
| `create_config` | pump_amm | static-only compiled; **no** authentic positive initializer replay → counted unrecovered |
| `initialize_mayhem_state` | mayhem | unrecovered → **blocks `create_v2` Mayhem mode** |

Mayhem trading itself (`buy`/`sell`/`buy_v2`/`sell_v2`/`buy_pump_swap`/`sell_pump_swap`, 24/25)
is implemented; only the state **initializer** is stopped.

### Program-level counts (from `docs/COMPLETION.md`)

| Program | Bounded impl. | Partial | Unrecovered | Whole-ELF equal |
| --- | ---: | ---: | ---: | --- |
| Pump | 48 / 56 | 5 | 3 | No |
| PumpSwap | 37 / 38 | 0 | 1 | No |
| Fees | 31 / 31 | 0 | 0 | No |
| Mayhem | 24 / 25 | 0 | 1 | No |
| **Total** | **140 / 150 (93.3%)** | 5 | 5 | **0 / 4** |

---

## 5. Caveats the team must carry into SDK testing

1. **Behavioral, not byte-identical.** 0/4 whole-binary equality. These candidates match the
   original on the *tested surfaces* under documented normalization; they are not the deployed
   binaries. Treat localnet results as "the SDK's instruction encodings/accounts are accepted and
   produce matching state/events on tested paths," not as mainnet certainty.
2. **Security audit is incomplete.** The differential + malformed-input checks are not an
   authorization/economic/CPI audit. Do not infer safety of untested inputs.
3. **"Covered" = the tested cases.** Saved cases include repeats and are bounded, not exhaustive.
   A green suite means no divergence was found on those inputs, not that none exists.
4. **State seeding is on you beyond the three global configs.** Bonding curves, pools, ATAs,
   volume accumulators etc. must be created by the SDK (as on mainnet) or seeded with more
   `--account` files / `surfnet_setAccount` calls, exactly like the harnesses do.
5. **`scripts/local_validation.py`** regenerates the **tracked** `audit/local-validation.json`
   (393 malformed-input checks + lifecycle) and targets the **original** binaries, not the
   candidates. Run it from the 0.27.1 venv if you want the smoke gate, but note it rewrites a
   tracked file — run against a copy if you must keep the tree clean. Not required for SDK testing.

## 6. Files in this deliverable

```
D-sdk-localnet/
  README.md                     <- this file
  start-localnet.sh             <- Path C launcher (8 programs + 3 seeded configs)
  programs/                     <- ELF-trimmed .so for all 8 program IDs
  seed-accounts/                <- pump / pump_amm / pump_fees global configs (--account JSON)
  surfpool-create/              <- Path B run: raw + normalized transactions, logs, fixtures
  demo/                         <- Path A receipts (*.json.gz), batch log, test-validator transcript
  .venv/                        <- pinned solders 0.27.1 (for Path B / strict error parsing)
```
