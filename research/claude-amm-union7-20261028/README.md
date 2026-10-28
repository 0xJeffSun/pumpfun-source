# PumpSwap AMM union composite 7: 779 -> 780/785 normalized, raw 220, layout layer raw 248

Follow-up to [`research/claude-amm-union6-20261028`](../claude-amm-union6-20261028/README.md) (merged as #494,
Linux 779/785, 220 raw source-only, 248 raw with its layout layer). It adds one fz-run lane delivery, `fz-A-mh2-r1-01`,
which makes `multi_hop_swap::amm_hop` (`0x40a08`, 15,512 bytes) normalized-equal. It also regenerates the **separately
labeled layout layer**, a linker order **generated from the original program's layout**.

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union6-20261028` (symbols `4bc5d049…`) | 779/785 | 220 |
| **this candidate, source only** (symbols `781859ca…`, stripped `605430b8…`) | **780/785** | **220** |
| this candidate **+ generated layout layer** (stripped `55abfad4…`) | 780/785 | 248 |

- **Source-only result against the parent:** +1 normalized window (`0x40a08`), raw unchanged at 220, with zero
  normalized and zero raw losses.
- **Layout layer:** it keeps the same 780 normalized set. Raw goes from 220 to 248, with no raw loss against the
  source-only image. Against the parent's layout layer (248 raw) the raw set is the same: no gain and no loss.
- **Native macOS build** of the same tree measures 775/211 (union-774: 774/211). It differs from Linux only in 5 sysroot
  TypeId windows and in raw layout.
- **Runtime:** the 25 maintained suites report 17,462 cases and 0 mismatches for both images. That includes the
  multi-hop suite (735 cases), which exercises the changed `amm_hop`. The five incentive error-order controls in
  `negative/` agree 5/5 for both images, each run in a fresh VM.
- **Still open:** 5 windows are unmatched: `0x19138 0x2ba60 0x351a8 0x4c750 0x6db20`. Whole-ELF identity is still
  false, both source-only and with the layout layer.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Against the parent archive, 2 files are modified (`instructions/swap/multi_hop_swap.rs`, `instructions/swap/trade_v2.rs`);
none are added or removed. Both files keep their line counts (946 and 1,122 lines).

- **`0x40a08` `multi_hop_swap::amm_hop`** (lane fz-A-mh2-r1-01):
  - `amm_hop` takes `minimum: Option<u64>` in place of `last: bool, minimum: u64`. The caller in `execute` passes
    `if last { Some(min_amount_out) } else { None }`. Inside, the user output account and balance come from
    `match minimum { Some(_) => .., None => (Pubkey::default(), 0) }`, the final-hop transfers run under
    `if minimum.is_some()`, and the events record `minimum.unwrap_or(0)`. The values are the same as before.
  - the buy-side `received` amount is computed first (`if buy { amount_after_fee(..)? } else { amount }`), then the
    `(base_reserve, raw_quote_reserve)` pair; the two existing overflow closures are unchanged.
  - in the buy arm the `BuyResult` is let-bound before `let event`, with `quote_transfer_fee` computed inside the
    literal; the buyback `amount_after_fee` is written inline in the `create_buy_event` / `create_sell_event`
    arguments; the `TradeEventContext` literals list their fields in the order the `trade_v2` executors use.
  - `apply_hop_fees` takes `&HopFeeContext` (`0x44ab0` stays matched).
- **`trade_v2.rs`** (same lane):
  - `validate_multi_hop_pool` is `#[inline(always)]`, and its pool-authority check is written
    `require!(pool.creator == crate::utils::pool_authority(&pool.base_mint), OnlyPumpPools)` without a `let` binding.
    The checks, error codes and error lines (119, 120, 124) are the same.
  - the declaration order of two plain internal structs changes: `BuyResult` lists `base_amount_out` and
    `quote_amount_in` before `fees`, and `TradeEventContext` lists `user_volume_accumulator` last. Neither struct is
    serialized or has a `#[repr]`. Their memory layout is unchanged; the order only sets the aggregate store order.

The checks, error codes and lines, events and CPI order are the same, and `amm_hop` is normalized-equal to the
original as a whole function.

**Composition.** `union-774` already held the mg-A-mh2 "k35" `multi_hop_swap.rs`, a descendant of the lane's starting file
(mg-A-mh2 "best-l20"). The lane's file was 3-way merged onto it with `git merge-file`, using best-l20 as the base. The one
conflict was the `amm_hop` call in `execute`. It keeps union-774's `&mint.key()` argument (the k35 `execute` form,
`0x3dbc0`) together with the lane's `Option` argument. `trade_v2.rs` was merged on the published union-764 file, the
lane's base. Its one conflict was `validate_multi_hop_pool`, which takes the lane's form. The lane patch also contained
reverse hunks of an earlier lane's `execute_buy_exact_quote` change (`0x54a20`, union-6). The frozen union-764 copy
had been modified in place when the lane diffed against it, so those hunks were not part of this lane's change. They
were dropped, and `0x54a20` stays matched. The lane's `lib.rs` change (the line-26 re-export) was already in union-774.

The composite was measured natively against the union-774 frontier (zero normalized and zero raw losses), then rebuilt
twice with the Linux recipe.

## Positioning devices (all of them, this step)

- **fz-A-mh2-r1-01:**
  - `#[inline(always)]` on `trade_v2::validate_multi_hop_pool`, on former blank line 116. Blank line 118 replaces the
    removed `let`.
  - in `multi_hop_swap.rs`, blank lines where statements were removed or moved. The `BuyResult` literal sits on lines
    665-672 (its overflow `error!` on line 671), with blank lines 663-664 and 673-680 around it. Other blank lines are
    left by the inlined buyback amounts and by the `HopFeeContext` and user-output edits. The file goes from 320 to 325
    blank lines.
  - the blank-line padding that union-774 already had for the `amm_hop` error lines is kept.
  - no file moves.

Devices from earlier steps are listed in the parent packets. `source-changes.json` has per-file counts of blank, comment,
doc and `#[inline]` lines.

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
- **Error-order controls (`negative/`):** the PR434/PR464/PR494 producer and fixture, byte-identical, re-run for both
  images with `PUMP_AMM_FRESH_VM=1`. All 5 pairs agree for each image (20 signed executions). `negative/verify.py`
  checks that the H11 guard witness is present in `state/volume_accumulator.rs`, which is unchanged from the parent.

```sh
python3 -I -B research/claude-amm-union7-20261028/verify.py
python3 -I -B research/claude-amm-union7-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union7-20261028/test_verify.py
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
- 5 unmatched windows: `0x19138 0x2ba60 0x351a8 0x4c750 0x6db20`;
- `0x40a08` is normalized-equal but not raw-equal, in the source-only image and with the layout layer;
- the merged constant-pool order, which needs more source-order work.

Normalized equality masks address and call operands, so it is not raw identity. The positioning devices and the
generated layout reproduce original line numbers and addresses. They are not claims about the original file layout or
build process. The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
