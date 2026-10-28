# PumpSwap AMM union composite 9: 780 -> 781/785 normalized, raw 237, layout layer raw 248

Follow-up to [`research/claude-amm-union7-20261028`](../claude-amm-union7-20261028/README.md) (merged as #500,
Linux 780/785, 220 raw source-only, 248 raw with its layout layer). It contains everything in the still-open union-8
packet (PR #514: lane `fz-A-pool-r2-01`, which makes `create_pool::execute` normalized-equal). On top of that it adds lane
`fz-A-raw-r2-02`, a code-motion change worth 16 raw windows. It also regenerates the **separately labeled layout
layer**, a linker order **generated from the original program's layout**. This packet supersedes #514.

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union7-20261028` (symbols `781859ca…`) | 780/785 | 220 |
| union-776 (PR #514, not merged; for reference) | 781/785 | 221 |
| **this candidate, source only** (symbols `fe01350a…`, stripped `d64618c8…`) | **781/785** | **237** |
| this candidate **+ generated layout layer** (stripped `b503d307…`) | 781/785 | 248 |

- **Source-only result against the parent:** +1 normalized window (`0x2ba60`) and +17 raw windows, with zero normalized
  and zero raw losses. The raw windows are `0x8758` (from union-776) and the 16 of `fz-A-raw-r2-02`: `0x4fac0 0x6f898
  0x70280 0x70b60 0x727b8 0x738a0 0x74e30 0x753f8 0x7d538 0x8d5d8 0x90660 0xa7bc8 0xc8320 0xee028 0xf2d60 0xf2ed0`.
  Against union-776 the gain is +16 raw, with zero losses.
- **Layout layer:** it keeps the same 781 normalized set at 248 raw. That is the same raw set as the parent's layout
  layer: no gain and no loss. Against this packet's own source-only image it gains 12 raw windows and **misses one,
  `0x8758`**. `0x8758` is a 48-byte `<&T as core::fmt::Debug>::fmt` monomorph whose only difference is one call
  displacement. In the source-only image the callee happens to sit at the original distance. In the layout image the
  callee sits elsewhere in `.text`, so the distance differs. The parent's layout layer does not match it either.
  `verify.py` therefore checks the layout layer against the parent's layout layer (no raw loss), and checks its
  differences from the source-only image against the recorded lists.
- **Native macOS build** of the same tree measures 776/225 (union-775: 775/211). It differs from Linux only in 5 sysroot
  TypeId windows and in raw layout.
- **Runtime:** the 25 maintained suites report 17,462 cases and 0 mismatches for both images. That includes the create
  suite (246 cases). The five incentive error-order controls in `negative/` agree 5/5 for both images, each run in a
  fresh VM.
- **Still open:** 4 windows are unmatched: `0x19138 0x351a8 0x4c750 0x6db20`. Whole-ELF identity is still false, both
  source-only and with the layout layer.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Against the parent archive, 17 files are modified and 7 are added; none are removed. The added files are
`instructions/admin/{disable,set_boost_authority,update_admin,update_creator_fee_config,update_fee_config}.rs` and
`instructions/token_incentives/{close,sync}_user_volume_accumulator.rs`.

- **`0x2ba60` `create_pool::execute`** (lane fz-A-pool-r2-01, which builds on the fz-A-pool-r1 partial; the union-776
  step, unchanged from #514):
  - `canonical` is computed as `a.creator.key() == crate::utils::pool_authority(&a.base_mint.key())`. That is the same
    `pool-authority` PDA of the Pump program that the old inline `find_program_address` derived.
  - the new `Pool` account is written field by field instead of through `set_inner`. Every field gets the same final
    value: the mayhem and cashback flags are set inside their existing checks, and the coin-creator fields are written
    only for canonical pools. Non-canonical pools still require `creator_fee == 0 && !can_edit`, with the same error
    `OnlyCanonicalPumpPoolsCanHaveCoinCreator`. That check still comes after the token transfers and before the
    `TooLittlePoolTokenLiquidity` check, as before. The fields left unwritten keep the zero values of the freshly
    initialized account, which `set_inner` also wrote. The pool bump is a scalar `ctx.bumps.pool`.
  - the quote-mint check calls a new helper,
    `pub fn supported_mint_account(mint: &InterfaceAccount<Mint>, allow_extensions: bool) -> bool`. It sits at the end
    of `utils/token.rs` and forwards to the existing `supported_mint`. It is called once per `canonical` arm, so
    `supported_mint` still gets the same `(mint, canonical)` values. The helper is inlined, and its symbol is not in the
    final program.
  - the disable check is written `disable_flags & 1 != 1`, which is the same condition as `& 1 == 0`.
- **+16 raw, code motion only** (lane fz-A-raw-r2-02, cumulative on its -01). No function body changes:
  - the program-module handler bodies of `create_config`, `disable`, `set_boost_authority`, `update_admin`,
    `update_creator_fee_config`, `update_fee_config` and of the `init`/`close`/`sync` user-volume-accumulator instructions
    move into their instruction files as external functions. `lib.rs` keeps one-line forwarders and re-exports, on
    existing lines, so those bodies stay standalone at their module position. `#[program]` stays on line 36.
  - `lib.rs`, `utils/mod.rs`, `state.rs` and `instructions/{admin,token_incentives}/mod.rs` take the original `.text`
    module order. The `lib.rs` changes are swaps of single-line `mod` declarations.
  - `utils/token.rs` puts its functions in the original `.text` order. `validate_self_transfer` and its `require!` stay
    on lines 15-23. `crates/native-transfer-fee/src/lib.rs` moves the `supported_mint_data` block above
    `impl DecodedTransferFee`.
  - the `MigratePoolCoinCreator`/`SetCoinCreator` `Accounts` structs move to the end of their instruction files, and
    `creator_reassignment.rs` re-exports them. The `UpdateFeeConfigEvent`, `DepositEvent`, `WithdrawEvent` and
    `SellEvent` events move to the end of their instruction files, and every path is re-exported unchanged.
  - the build has 4 more `unused import` warnings than union-775, left over from the moves. No new code comes with them.

The checks, error codes, names and lines, events and CPI order are the same. `create_pool::execute` is normalized-equal
to the original as a whole function.

**Composition.** `fz-A-pool-r2-01` was made on union-774. Its two files are identical in union-774 and union-775, so it
applies unchanged. `fz-A-raw-r2-02` was made on union-775 and 3-way merged per file onto union-776 with
`git merge-file`. Every file was taken except `utils/token.rs`, which merged cleanly, with pool-r2's helper staying at the
end. Each step was measured natively against the previous base's frontier (zero normalized and zero raw losses), then
rebuilt twice with the Linux recipe.

## Positioning devices (all of them, these steps)

- **fz-A-pool-r2-01:** 61 comment-only `//` lines in `instructions/create_pool.rs`, at lines 165-170, 172-176, 180-181,
  184-188, 195-197, 202-213, 261-273, 282-289 and 332-338. They put the `require!`/`error!` macros on the original lines.
  The file keeps 369 lines. There is no `#[inline]` attribute and no file move.
- **fz-A-raw-r2-02:** none: no comment or doc padding and no `#[inline]`. It does use the file moves and new files listed
  above.

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
- **Error-order controls (`negative/`):** the PR434/PR464/PR494/PR500 producer and fixture, byte-identical, re-run for
  both images with `PUMP_AMM_FRESH_VM=1`. All 5 pairs agree for each image (20 signed executions). `negative/verify.py`
  checks that the H11 guard witness is present in `state/volume_accumulator.rs`, which is unchanged from the parent.

```sh
python3 -I -B research/claude-amm-union9-20261028/verify.py
python3 -I -B research/claude-amm-union9-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union9-20261028/test_verify.py
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
- 4 unmatched windows: `0x19138 0x351a8 0x4c750 0x6db20`;
- `0x2ba60` is normalized-equal but not raw-equal, in the source-only image and with the layout layer;
- `0x8758` is raw-equal only in the source-only image;
- the merged constant-pool order, which needs more source-order work.

Normalized equality masks address and call operands, so it is not raw identity. The positioning devices and the
generated layout reproduce original line numbers and addresses. They are not claims about the original file layout or
build process. The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
