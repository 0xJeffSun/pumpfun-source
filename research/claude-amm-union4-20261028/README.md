# PumpSwap AMM union composite 4: 763 -> 769/785 normalized, error-order regression removed, layout layer raw 175

Follow-up to [`research/claude-amm-union3-20261028`](../claude-amm-union3-20261028/README.md) (merged as #434,
Linux 763/785, 160 raw source-only, 172 raw with its layout layer). It composes five more mega-run lane windows and the
merged [`research/amm-v2-selector-union-recovery`](../amm-v2-selector-union-recovery/README.md) source change, and it
regenerates the **separately labeled layout layer** (a linker order **generated from the original program's layout**).

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union3-20261028` (symbols `5d1bac28…`) | 763/785 | 160 |
| **this candidate, source only** (symbols `576eb629…`, stripped `4259b8b0…`) | **769/785** | **160** |
| this candidate **+ generated layout layer** (stripped `cbd9e10f…`) | 769/785 | 175 |

- **Source-only result:** +6 normalized windows (`0xc5d0 0x14088 0x14920 0x24fd8 0x53350 0x56710`), +0 raw, with zero
  normalized and zero raw losses against the parent.
- **Layout layer:** same 769 normalized set; raw 160 -> 175 with no raw loss (parent layer: 172; new raw windows against
  the parent layer: `0xc5d0 0xcaa8 0x4fac0`).
- **Native macOS build** of the same tree: 764/151 (it differs from Linux only in 5 sysroot TypeId windows and raw layout).
- **Incentive error-order regression of #430/#434 removed:** the five PR434 schedule controls now agree for both images
  (`negative/`, 0 mismatches in 10 pairs). The 25 maintained suites report 17,462 cases / 0 mismatches for both images.
- **Still open:** 16 windows are unmatched (`measurement.json` `unmatched`), and whole-ELF identity is still false.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

- **s13 `0x56710 0x24fd8`** `trade_v2::execute_sell` (lane mg-A-sp1-01: the three executors call the existing
  `quote_reserves` helper, its `#[inline(never)]` removed) and `set_coin_creator` (lane mg-A-res1-02: handler moved to
  `instructions/coin_creator/set_coin_creator.rs` as an external function; per-arm event block).
- **s14 `0x53350`** `trade_v2::execute_buy` (lane mg-A-sp1-02): `calculate_buy_result` takes the 48-byte `Copy`
  `AppliedFees` by value; `trade.rs` caller changes one line.
- **s15 `0xc5d0 0x14920`** `<[Pubkey;7] as BorshSerialize>::serialize` (lane mg-A-sp3-01: the `declare_program!(pump)`
  IDL input `idls/pump.json` carries pump's own `ReservedFeeRecipientsEvent`, as the original's IDL did, which gives the
  serializer its second caller; `set_reserved_fee_recipients` handler in `instructions/admin/`) and `admin_cto_pool`
  (lane mg-A-sp2-02: a file-private `prepare_pool` forwarder).
- **s16 `0x14088`** `curve::fees::select_and_apply_v2`: the merged `research/amm-v2-selector-union-recovery`
  `source.patch`, applied unchanged. It also imports the maintained H11 condition
  `if current_timestamp>=self.start_time { require!(current_timestamp<=self.end_time, ...) }` in
  `state/volume_accumulator.rs` (one line, same coordinates). That packet measured 759 -> 760 on union2 and said the
  combination with #434 was not built; this packet builds and measures it.

Each lane step was kept only with zero normalized and zero raw losses natively, then rebuilt with the Linux recipe.
Behavior: errors, checks, events and CPI order are unchanged on the 25-suite replay; the only behavioral change against
the parent is the error-order fix, which matches the original (`negative/`).

## Positioning devices (all of them, these steps)

- **s13:** `set_coin_creator` handler file move to its original error-origin path; `lib.rs` line 26 re-export changed in
  place (line count unchanged); `trade_v2.rs` error lines aligned to the original line numbers (mg-A-6 groundwork).
- **s14:** none.
- **s15:** handler file at the original `instructions/admin/set_reserved_fee_recipients.rs` path; `admin_cto_pool` and
  `admin_update_token_incentives` file moves to `instructions/admin/` (from mg-A-sp2-01, already in the parent). No
  comment/doc padding, no `#[inline(always)]`.
- **s16:** blank lines in `fees.rs` keep the original `fees.rs:184` error record (from the selector packet).

Devices from earlier steps are listed in the parent packets. `source-changes.json` has per-file layout counts.

## Layout layer (`layout/`, mega-run rule 4b)

**`layout/ordered.ld` is generated from the original deployed program's layout. It is not evidence of historical build
provenance.** Same three-pass method as the parent: `tools/lbuild-raw.sh` (root crate built through `lwrap-lin.sh`,
byte-identical to the source-only build, link map saved), `tools/lay.py --mode order` (`.text` input sections in original
window order, `.rodata`/`.data.rel.ro` atoms in bound original-address order, no padding, no address assignments), then a
relink with that script. `verify.py` regenerates `ordered.ld` from the source-only build plus the saved link map and
requires the same bytes. More raw matches need `.text` size parity first: every unmatched window still shifts later
addresses.

## Builds, runtime, verify

- **Builds:** `builds/a` and `builds/b` (source only) and `layout/builds/a` and `layout/builds/b` use the parent recipe
  (pinned `solana-verifiable-build` image, recorded mounts and cargo command; `tools/lbuild.sh`, `tools/lbuild-raw.sh`).
  Each pair is byte-identical; only the two workspace crates recompile. The existing
  `admin_update_token_incentives` stack-frame diagnostic remains, as in the parent; this is not a warning-free build.
- **Runtime (reported):** `runtime/` and `layout/runtime/` each report 25 suites, **17,462 cases, 35,074 transactions,
  35,418 signatures, 0 mismatches**, bound to the respective stripped image and to the repository harness hashes. As in
  the parent, the per-case receipts are not included, so the verifier checks the reported totals and input hashes only.
- **Error-order controls (`negative/`):** PR434's producer and fixture, byte-identical, re-run for both images with a
  fresh VM per execution: 5/5 pairs agree for each image (20 signed executions). The intermediate tree without the H11
  guard still gave 2/5 mismatches, as in PR434.

```sh
python3 -I -B research/claude-amm-union4-20261028/verify.py
python3 -I -B research/claude-amm-union4-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union4-20261028/test_verify.py
```

`verify.py` uses the standard library only. It checks exact packet membership and hashes (rejecting symlinks and special
files first); the source archive against the staged build inputs; `source.patch` rebuilt from the parent archive; both
build pairs; the source-only, layout and parent measurements recomputed against `evidence/original/pump_amm/deployed.so`;
the regenerated `ordered.ld`; both reported runtime summaries against the repository harness hashes; and the five-pair
error-order record for each image.

## Limits

Still open:

- whole-ELF identity;
- 16 unmatched windows: `0x2288 0xfb08 0x19138 0x2ba60 0x2e720 0x351a8 0x3a5a0 0x3dbc0 0x40a08 0x45940 0x4c750 0x50f00
  0x54a20 0x6d408 0x6db20 0xf28b8`;
- the merged constant-pool order, which needs source-order work.

Normalized equality masks address and call operands; it is not raw identity. The positioning devices and the generated
layout reproduce original line numbers and addresses. They are not claims about the original file layout or build process.
The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
