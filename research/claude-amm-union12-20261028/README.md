# PumpSwap AMM union composite 12: data-side step, 783/785 normalized unchanged (raw 236, layout layer raw 259)

Follow-up to [`research/claude-amm-union11-20261028`](../claude-amm-union11-20261028/README.md) (merged as #548,
Linux 783/785, 236 raw source-only, 259 raw with its layout layer). **This step is data-side only: no window changes.**
The normalized, raw and layout-layer counts are the same as in the parent, and so are the window sets. It adds lane
`fz-A-data-r1-04`, which supersedes the lane's -01 to -03. It moves the program's read-only data to the original's
values and order: every panic `Location` record (file, line:col) and one constant table. The **separately labeled
layout layer**, a linker order **generated from the original program's layout**, is regenerated.

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union11-20261028` (symbols `89962e4c…`) | 783/785 | 236 |
| **this candidate, source only** (symbols `36a94b38…`, stripped `97222480…`) | **783/785** | **236** |
| this candidate **+ generated layout layer** (stripped `aafac14e…`) | 783/785 | 259 |

- **Windows:** no normalized or raw gain and no loss against the parent, in the source-only image and in the layout
  layer. The window sets are identical. The native macOS build also stays at 778/225 with identical sets.
- **End-state data check** (a diagnostic, not a deliverable). The source-only build is relinked with `lay.py --mode pad`,
  which pads `.text` so every window starts at its original address. In that image:
  - `.rodata` (25,715 bytes at `0x11bc58`) and `.data.rel.ro` (8,584 bytes at `0x1220d0`) are **byte-identical to
    the original** (sha256 `1df4e071eb74…` and `b14ba9a08c75…`);
  - the lane's `locdiff.py` reports 0 differing data entries, against 27 for union-779;
  - all 783 matched windows are raw-equal at their padded addresses.

  The padded image is not part of this packet's claims. It only shows that, once the two unmatched windows match and
  the code is laid out at the original addresses, the data needs no further change. `composition.json`
  (`end_state_data_check`) records the hashes and the tools used.
- **Runtime:** the 25 maintained suites report 17,462 cases and 0 mismatches for both images. The five incentive
  error-order controls in `negative/` agree 5/5 for both images, each run in a fresh VM.
- **Still open:** 2 windows are unmatched: `0x351a8 0x4c750`. Whole-ELF identity is still false: `.text` differs in
  those two windows, and the unpadded images do not sit at the original addresses.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Against the parent archive, 7 files are modified; none are added or removed. The lane patch was made on union-779 and
applies unchanged. No matched window's code changes. Most edits only move source positions, which changes the line:col
values the compiler writes into panic `Location` records, and the order in which it emits them:

- `state/volume_accumulator.rs`: `roll_over`, `update_user_volume_accumulator` and `add_sol_volume` change position
  inside their `impl` blocks (`add_sol_volume`'s parameter is renamed). Some lines are broken or indented differently,
  and comment and blank lines are added. The `update_token_supply` guard is unchanged; `negative/verify.py` checks it.
- `instructions/coin_creator/set_coin_creator.rs`: comment lines before the match, arm bodies at arm indentation, and
  event literals on 3 lines. Two blank lines keep the `SetCoinCreator` struct on lines 111-117.
- `instructions/swap/multi_hop_swap.rs`:
  - in `execute`, the `HopKind::Amm` match arm comes before `HopKind::Curve`, with the same code; `output_mint` is
    renamed `last_mint` and a local in `vault_for_mint` is renamed `vault`;
  - in `curve_run`, the two wSOL checks share one closure, `is_native`, with the same values. The header moves up 2
    lines;
  - comment and blank lines, and indentation that sets the columns of `[`.
- `instructions/swap/buy.rs`: the `BuyEvent` `#[event]` struct moves from the end of the file to line 233. The
  cashback ATA lookup in `distribute_cashback` (the still-unmatched `0x351a8`) is written
  `match remaining_accounts.get(0) { Some(ata) => ata, None => return err!(MissingCashbackAccounts) }` instead of
  `.ok_or_else(|| error!(..))?`. That is the same error, still on line 44, but its error block is now emitted first, so
  the error-code constant table at `.rodata` `0x11c070` gets the original order.
- `utils/token.rs`: 77 blank lines before `supported_mint`, a parameter rename, and the tail call's arguments on separate
  lines.
- `instructions/extend_account.rs`: `let type_discriminator = &account.try_borrow_data()?[..8];` replaces two `let`s
  on line 96. The borrow guard lives to the same point, and `err!` stays on line 114 through comment lines.
- `lib.rs`: `mod create; pub mod utils;` moves onto line 21, before the two `declare_program!` lines, so that the
  `utils/math.rs` record is emitted first, as in the original.

The checks, error codes and lines, events and CPI order are unchanged. The 25 runtime suites re-check the behavior,
including the cashback suite (146 cases) for the changed `distribute_cashback`.

The composite was measured natively against the union-779 frontier (identical sets, zero losses), then rebuilt twice
with the Linux recipe.

## Positioning devices (all of them, this step)

- **fz-A-data-r1-04:**
  - comment-only `//` lines: +6 in `set_coin_creator.rs`, +1 in `extend_account.rs`, +13 in `multi_hop_swap.rs` and +4
    in `volume_accumulator.rs`;
  - blank lines: +77 in `utils/token.rs`, +2 each in `set_coin_creator.rs` and `lib.rs`, and +1 in
    `volume_accumulator.rs`. `buy.rs` loses 47 blank lines with the `BuyEvent` move and goes from 1,039 to 993 lines;
  - line breaks and indentation, moves of whole items inside a file or between `impl` blocks, local or parameter
    renames, and the arm-order swap in `execute`.

  All are listed in the lane's description (`composition.json`). There is no `#[inline]` attribute and no file move.

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
- **Error-order controls (`negative/`):** the PR434/PR464/PR494/PR500/PR525/PR548 producer and fixture, byte-identical, re-run for
  both images with `PUMP_AMM_FRESH_VM=1`. All 5 pairs agree for each image (20 signed executions). `negative/verify.py`
  checks the H11 guard witness in `state/volume_accumulator.rs` in its new dispatcher form (see `negative/README.md`).

```sh
python3 -I -B research/claude-amm-union12-20261028/verify.py
python3 -I -B research/claude-amm-union12-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union12-20261028/test_verify.py
```

`verify.py` uses only the standard library. It checks:

- exact packet membership and hashes, rejecting symlinks and special files first;
- the source archive against the staged build inputs, and `source.patch` rebuilt from the parent archive;
- both build pairs;
- the source-only, layout and parent measurements, recomputed against `evidence/original/pump_amm/deployed.so`;
- the layout layer against the parent packet's layout layer (no raw loss), and its raw differences from the source-only
  image against the recorded lists;
- the regenerated `ordered.ld`;
- both reported runtime summaries against the repository harness hashes;
- the five-pair error-order record for each image.

## Limits

Still open:

- whole-ELF identity;
- 2 unmatched windows: `0x351a8 0x4c750`;
- this step changes no window. The data-section identity holds only for the padded diagnostic image, not for the
  delivered images.

Normalized equality masks address and call operands, so it is not raw identity. The positioning devices and the
generated layout reproduce original line numbers and addresses. They are not claims about the original file layout or
build process. The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
