# PumpSwap AMM union composite 6: 769 -> 779/785 normalized, raw 220, layout layer raw 248

Follow-up to [`research/claude-amm-union4-20261028`](../claude-amm-union4-20261028/README.md) (merged as #464,
Linux 769/785, 160 raw source-only, 175 raw with its layout layer). It contains everything in the still-open union-5
packet (PR #486: fz lanes small-r1-02 and srf-r1-01, plus the merged contributor packet
[`research/amm-mint-scanner-raw-20261028`](../amm-mint-scanner-raw-20261028/README.md), #480). On top of that it adds
seven fz-run lane deliveries: six normalized windows and one raw-order change. It also regenerates the **separately
labeled layout layer**, a linker order **generated from the original program's layout**. This packet supersedes #486.

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union4-20261028` (symbols `576eb629…`) | 769/785 | 160 |
| union-768 (PR #486, not merged; for reference) | 773/785 | 163 |
| **this candidate, source only** (symbols `4bc5d049…`, stripped `31a2fc17…`) | **779/785** | **220** |
| this candidate **+ generated layout layer** (stripped `e1b6eca9…`) | 779/785 | 248 |

- **Source-only result against the parent:** +10 normalized windows and +60 raw windows, with zero normalized and zero
  raw losses. The 10 normalized windows are `0x2288 0xfb08 0x2e720 0x3a5a0 0x3dbc0 0x45940 0x50f00 0x54a20 0x6d408 0xf28b8`.
  Against union-768 the gain is +6 normalized (`0x2e720 0x3a5a0 0x3dbc0 0x45940 0x54a20 0x6d408`) and +57 raw, also with
  zero losses.
- **Layout layer:** it keeps the same 779 normalized set. Raw goes from 220 to 248, with no raw loss against the
  source-only image. Against the parent's layout layer (175 raw) it gains 73 raw windows and loses none. The `0x4fac0`
  layout-layer loss that union-5 reported is gone.
- **Native macOS build** of the same tree measures 774/211. It differs from Linux only in 5 sysroot TypeId windows and in
  raw layout.
- **Runtime:** the 25 maintained suites report 17,462 cases and 0 mismatches for both images. That includes the
  multi-hop suite, which covers the rewritten `multi_hop_swap.rs`. The five incentive error-order controls in
  `negative/` agree 5/5 for both images, each run in a fresh VM.
- **Still open:** 6 windows are unmatched: `0x19138 0x2ba60 0x351a8 0x40a08 0x4c750 0x6db20`. Whole-ELF identity is
  still false, both source-only and with the layout layer.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Against the parent archive, 14 files are modified, 2 are added (`errors.rs`, `instructions/extend_account.rs`) and 1 is
removed (`extend.rs`). Union-768 content is described in the #486 packet and repeated in `composition.json`.

- **`0x3dbc0` `multi_hop_swap::execute`** (lane fz-A-mh1-r1-01). `multi_hop_swap.rs` becomes the mg-A-mh2 "k35" rewrite:
  - a `HopSource {User, Pool, Curve}` state enum, `HopKind`, a `next_mint` helper, and `amm_hop` returning `(u64, bool)`;
    validation goes through `trade_v2::validate_multi_hop_pool`, a helper whose checks and errors are unchanged;
  - `remaining.chunks_exact(5)` is built before the length `require!`, which reads `hops.remainder().is_empty()`;
  - `try_accounts(.., &mut BTreeSet::new())` uses a temporary;
  - the tail calls the existing `#[inline(always)] trade_v2::set_accumulator_user`, now `pub`.
- **`0x45940` `curve_run`** (lane fz-A-mh3-r1-02, on the same k35 tree):
  - the program `AccountInfo` and `hops.to_vec()` are hoisted, and `authority` is moved instead of cloned;
  - the pool seeds are built in local `index`/`bump`/`pool_seeds` bindings;
  - the expected-balance chain is `if same_account {..} else {..}`, and the operands of `if !same_account && !output_native`
    are reordered.

  It was merged with mh1 by `git merge-file` on their common base, the k35 file. The one conflict was a blank line inside
  the flags closure. It was resolved so that every line of `execute` sits where mh1 put it and every line of `curve_run`
  where mh3 put it (946 lines in all three files).
- **`0x2e720` `extend_account`** (lane fz-A-pool-r1-01). The handler moves from `extend.rs` to
  `instructions/extend_account.rs`. The account-type guards are written `d.starts_with(&X::DISCRIMINATOR)`.
- **`0x6d408` volume accumulator** (lane fz-A-vol-r1-02). `state/volume_accumulator.rs` takes the mg-A-7 layout, with
  `day_index`, `roll_over`, `add_sol_volume`, `update_time_range` and `update_token_supply` helpers. The updater passes the
  `roll_over` `Result` through. Checks, errors and panics are the same. The H11 start-gated guard is now written
  `require!(now < start_time || now <= end_time, SupplyUpdateForFinishedRange)`, which errors exactly when
  `now >= start_time && now > end_time`, as before. The error-order controls re-check it.
- **`0x54a20` `execute_buy_exact_quote`** (lane fz-A-trade-r1-01). The `BuyPreviewContext` is let-bound before
  `preview_total_quote`. A new `#[inline(always)] buy_result(ctx, out, quote)` helper sits at the end of `trade_v2.rs`; it
  computes the same values, with `fees.clone()` and then `calculate_buy_result`.
- **`0x3a5a0` legacy `buy_exact_quote_in`** (lane fz-A-buy-r1-01). The generic `execute::<EXACT>` is replaced by a
  dedicated `#[inline(never)] buy_exact_quote_in` in `instructions/swap/buy.rs`, in the buy handler's source shape, with
  its own single-use `pay_cashback_exact` wrapper. One overflow check on `pool_quote + protocol + creator` is not
  written. It could never fire, because the gross-total check already bounds that sum, and the whole function is
  normalized-equal to the original without it. Error lines 625/636/638/646/700/733/754/776/781 match the original.
- **raw order** (lane fz-A-raw-r1-01: no normalized change, +57 source-only raw). These are ordinary source moves with no
  body changes:
  - the `PumpAmmError` enum moves to `errors.rs`;
  - the admin, token-incentive and liquidity `Accounts` structs move into their instruction modules, so their impls
    precede the `#[program]` expansion as in the original;
  - `mod` order follows the original `.text` order;
  - `utils/token.rs` changes `static PUMP_MINT` to `const`;
  - `Program<PumpProgram>` and `Program<FeesProgram>` use the `declare_program!` program types (same key checks, same
    addresses).

Each lane delivery was measured on its own base. The composite was measured natively against the union-768 frontier
(zero normalized and zero raw losses), then rebuilt twice with the Linux recipe.

## Positioning devices (all of them, these steps)

- **fz-A-mh1-r1-01:** blank lines only. They sit inside `execute`'s direction match, in the blank block after loop 2,
  and as 2 blank lines after the tail call. The `trade_v2.rs` validate helper sits on former blank lines 117-126.
- **fz-A-mh3-r1-02:** blank lines only, including the one after `.collect()` in the flags closure.
- **fz-A-pool-r1-01:** a **file move** (`extend.rs` to `instructions/extend_account.rs`). Comment-only `//` lines 52-89
  and 100-113 put `require!` on line 91 and `err!` on line 114, the original lines.
- **fz-A-vol-r1-02:** comment-only `//` lines (150 in the file, 37 in union-764) put the error lines on the original
  lines. Those are `Truncation@104` and the `update_token_incentives` errors at 251, 263, 291, 292, 313, 327, 329, 331
  and 352.
- **fz-A-trade-r1-01:** one blank line removed inside the if-block keeps `require_gt!` at line 804. The new helper is
  `#[inline(always)]`.
- **fz-A-buy-r1-01:** blank lines for the error lines listed above. The new handler is `#[inline(never)]`.
- **fz-A-raw-r1-01:**
  - `lib.rs` doc lines 1-2 are merged into one line, which keeps `#[program]` at line 36;
  - in `sell.rs` and `multi_hop_swap.rs`, the 6-line hand-written `Id` impls become doc-comment lines plus one `pub use`
    (line-neutral; `multi_hop_swap.rs` keeps the k35 tree's two blank lines in front of them);
  - trailing blank lines in `admin/mod.rs`.

Devices from earlier steps are listed in the parent packets and in #486. `source-changes.json` has per-file counts of
blank, comment, doc and `#[inline]` lines.

## Layout layer (`layout/`, mega-run rule 4b)

**`layout/ordered.ld` is generated from the original deployed program's layout. It is not evidence of historical build
provenance.** The method is the same as in the parent:

1. `tools/lbuild-raw.sh` builds the root crate through `lwrap-lin.sh`. The output is byte-identical to the source-only
   build, and the link map is saved.
2. `tools/lay.py --mode order` writes the order: `.text` input sections in original window order, `.rodata` and
   `.data.rel.ro` atoms in bound original-address order, no padding, and no address assignments.
3. The program is relinked with that script.

`verify.py` regenerates `ordered.ld` from the source-only build plus the saved link map and requires the same bytes.

## Builds, runtime, verify

- **Builds:** `builds/a`, `builds/b`, `layout/builds/a` and `layout/builds/b` use the parent recipe: the pinned
  `solana-verifiable-build` image with the recorded mounts and cargo command (`tools/lbuild.sh`, `tools/lbuild-raw.sh`).
  - Each pair is byte-identical. Only the two workspace crates recompile.
  - The existing `admin_update_token_incentives` stack-frame diagnostic remains, as in the parent, so this is not a
    warning-free build. There is no `Stack offset` warning.
- **Runtime (reported):** `runtime/` and `layout/runtime/` each report 25 suites, **17,462 cases, 35,074 transactions,
  35,418 signatures and 0 mismatches**. Each summary is bound to its stripped image and to the repository harness
  hashes. As in the parent, the per-case receipts are not included, so the verifier checks only the reported totals and
  input hashes.
- **Error-order controls (`negative/`):** the PR434/PR464 producer and fixture, byte-identical, re-run for both images
  with `PUMP_AMM_FRESH_VM=1`. All 5 pairs agree for each image (20 signed executions). `negative/verify.py` checks that
  the H11 guard witness is present in the guard's union-6 form.

```sh
python3 -I -B research/claude-amm-union6-20261028/verify.py
python3 -I -B research/claude-amm-union6-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union6-20261028/test_verify.py
```

`verify.py` uses only the standard library. It checks:

- exact packet membership and hashes, rejecting symlinks and special files first;
- the source archive against the staged build inputs, and `source.patch` rebuilt from the parent archive;
- both build pairs;
- the source-only, layout and parent measurements, recomputed against `evidence/original/pump_amm/deployed.so`;
- the regenerated `ordered.ld`;
- both reported runtime summaries against the repository harness hashes;
- the five-pair error-order record for each image.

## Limits

Still open:

- whole-ELF identity;
- 6 unmatched windows: `0x19138 0x2ba60 0x351a8 0x40a08 0x4c750 0x6db20`;
- the merged constant-pool order, which needs more source-order work.

Normalized equality masks address and call operands, so it is not raw identity. The positioning devices and the
generated layout reproduce original line numbers and addresses. They are not claims about the original file layout or
build process. The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
