# PumpSwap AMM union composite 10: 780 -> 782/785 normalized, raw 236, layout layer raw 248

Follow-up to [`research/claude-amm-union7-20261028`](../claude-amm-union7-20261028/README.md) (merged as #500,
Linux 780/785, 220 raw source-only, 248 raw with its layout layer). It contains everything in the still-open packets
union-8 (PR #514) and union-9 (PR #520). Those add lane `fz-A-pool-r2-01` (`0x2ba60`) and lane `fz-A-raw-r2-02`
(+16 raw by code motion). On top of that it adds lane `fz-A-srf-r3-01`, which makes the `set_reserved_fee_recipients`
handler (`0x19138`) normalized-equal, and the data-side patch `fz-A-raw-r2-04`. It also regenerates the **separately
labeled layout layer**, a linker order **generated from the original program's layout**. This packet supersedes #514
and #520.

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union7-20261028` (symbols `781859ca…`) | 780/785 | 220 |
| union-776 (PR #514, not merged; for reference) | 781/785 | 221 |
| union-777 (PR #520, not merged; for reference) | 781/785 | 237 |
| **this candidate, source only** (symbols `b07ff033…`, stripped `c5f40baa…`) | **782/785** | **236** |
| this candidate **+ generated layout layer** (stripped `ef85a33e…`) | 782/785 | 248 |

- **Source-only result against the parent:** +2 normalized windows (`0x19138 0x2ba60`) and +16 raw windows (`0x4fac0
  0x6f898 0x70280 0x70b60 0x727b8 0x738a0 0x74e30 0x753f8 0x7d538 0x8d5d8 0x90660 0xa7bc8 0xc8320 0xee028 0xf2d60
  0xf2ed0`), with zero normalized and zero raw losses.
- **Against the open union-777 (#520):** +1 normalized (`0x19138`) and **-1 raw, `0x8758`**. `0x8758` is a 48-byte
  `<&T as core::fmt::Debug>::fmt` monomorph whose only difference is one call displacement. Union-776 matched it raw by
  coincidence: after the `create_pool` change, its callee happened to sit at the original distance in the source-only
  image. The `set_reserved_fee_recipients` change moves code again and the coincidence is gone. No layout layer
  (union-7, -8, -9 or this one) and no native build ever matched it raw, and the parent does not either.
- **Layout layer:** it keeps the same 782 normalized set at 248 raw. That is the same raw set as the parent's layout
  layer: no gain and no loss. Against this packet's source-only image it gains 12 raw windows and loses none.
  `verify.py` checks the layout layer against the parent's layout layer (no raw loss) and checks its differences from
  the source-only image against the recorded lists.
- **Native macOS build** of the same tree measures 777/225 (union-775: 775/211). It differs from Linux only in 5 sysroot
  TypeId windows and in raw layout.
- **Runtime:** the 25 maintained suites report 17,462 cases and 0 mismatches for both images. The five incentive
  error-order controls in `negative/` agree 5/5 for both images, each run in a fresh VM.
- **Still open:** 3 windows are unmatched: `0x351a8 0x4c750 0x6db20`. Whole-ELF identity is still false, both
  source-only and with the layout layer.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Against the parent archive, 20 files are modified and 7 are added; none are removed. The added files are
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

- **`0x19138` `set_reserved_fee_recipients::handler`** (lane fz-A-srf-r3-01, on top of the fz-A-srf-r1 partial):
  the account-validation loop is written
  `{ let mut accounts = remaining_accounts.iter().take(LEN).enumerate(); while let Some((i, account)) = accounts.next() { .. } }`
  instead of a `for` loop. The braces replace two existing blank lines, so every line number is unchanged. It visits the
  same first `LEN` accounts with the same index `i`. The checks, errors and error lines (`require_gte!` line 40,
  `require_keys_neq!` line 60) and the event are unchanged.
- **Data-side order** (lane fz-A-raw-r2-04, as the incremental patch `fz-A-raw-r2-04-on-u777`; no scorer change):
  - `state/global_config.rs` has one buyback-split helper, `GlobalConfig::split_buyback_fee`, on lines 381-393. Its
    two `.expect`s sit at the original panic locations 388:45 and 391:14. `split_buyback(&self, ..)` delegates to it.
  - `Pool::accrue_fees` (`state/pool.rs`) calls `global_config.split_buyback(protocol_fee, self.is_mayhem_mode)` instead
    of repeating the split inline. The value is the same (mayhem: no buyback; otherwise `protocol_fee * bps / 10_000`),
    and so are the panic messages.
  - in `instructions/swap/sell.rs` the two `copy_from_slice` lines of the cashback-account initialization move from
    lines 426/427 to the original lines 439/440. They move past existing blank lines only, so the statement order is
    unchanged.

The checks, error codes, names and lines, events and CPI order are the same. `create_pool::execute` and the
`set_reserved_fee_recipients` handler are normalized-equal to the original as whole functions.

**Composition.** `fz-A-pool-r2-01` and `fz-A-srf-r3-01` were made on union-774. Their files are identical in union-774 and
in the bases they were composed onto, so they apply unchanged. `fz-A-raw-r2-02` was made on union-775 and 3-way merged
per file onto union-776 with `git merge-file`. Every file was taken except `utils/token.rs`, which merged cleanly, with
pool-r2's helper staying at the end. `fz-A-raw-r2-04-on-u777` touches 3 files whose union-777 copies equal the lane's
tree, so it applies unchanged. Each step was measured natively against the previous base's frontier (zero normalized and
zero raw losses natively), then rebuilt twice with the Linux recipe and replayed.

## Positioning devices (all of them, these steps)

- **fz-A-pool-r2-01:** 61 comment-only `//` lines in `instructions/create_pool.rs`, at lines 165-170, 172-176, 180-181,
  184-188, 195-197, 202-213, 261-273, 282-289 and 332-338. They put the `require!`/`error!` macros on the original lines.
  The file keeps 369 lines. There is no `#[inline]` attribute and no file move.
- **fz-A-raw-r2-02:** none: no comment or doc padding and no `#[inline]`. It does use the file moves and new files listed
  above.
- **fz-A-srf-r3-01:** none. The new braces replace two blank lines.
- **fz-A-raw-r2-04:** blank lines only. Six blank lines in `state/pool.rs` after the shorter `split_buyback` call keep
  lines 458 and later, including the `error!` sites, on their original lines. In `sell.rs`, 13 of the 15 existing
  padding blank lines move above the two `copy_from_slice` lines, and the line count is unchanged.

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
python3 -I -B research/claude-amm-union10-20261028/verify.py
python3 -I -B research/claude-amm-union10-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union10-20261028/test_verify.py
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
- 3 unmatched windows: `0x351a8 0x4c750 0x6db20`;
- `0x2ba60` and `0x19138` are normalized-equal but not raw-equal, in the source-only image and with the layout layer;
- the merged constant-pool order, which needs more source-order work.

Normalized equality masks address and call operands, so it is not raw identity. The positioning devices and the
generated layout reproduce original line numbers and addresses. They are not claims about the original file layout or
build process. The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
