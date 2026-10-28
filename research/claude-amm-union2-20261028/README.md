# PumpSwap AMM union composite 2: 755 -> 759/785 normalized (159 raw)

Follow-up to [`research/claude-amm-union-20261028`](../claude-amm-union-20261028/README.md) (merged as #426, Linux
755/785, 159 raw). It composes four more windows from the mega-run AMM lanes and fixes two behavior differences
that the full runtime replay found in those lanes' code. This is a research packet: the maintained `programs/` tree
and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union-20261028` (symbols `cc9586e3…`) | 755/785 | 159 |
| **this candidate** (symbols `5c02eed7…`, stripped `1eb1ce05…`) | **759/785** | **159** |

**+4 normalized windows (`0x23e40 0x376b0 0x49b50 0x50598`), zero normalized and zero raw losses.** Against the
research chain head `research/amm-fee-value-call-recovery` (733/148) this tree is +26 normalized, +11 raw.
Whole-ELF identity is still false; 26 windows remain unmatched (`measurement.json`). The plain macOS build of the
same tree measures 754/150.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

- **s06 `0x50598`** `calculate_buy_result` (lane mg-A-6): the buyback split becomes
  `GlobalConfig::split_buyback_fee(bps, protocol_fee, is_mayhem_mode)` with an early mayhem return, the amounts
  array for `total_quote` is bound in an inner block, and `quote_transfer_fee` is computed inside the `BuyResult`
  literal.
- **s07 `0x49b50`** legacy sell handler (lane mg-A-5): `sell::execute` is a separate external function in
  `instructions/swap/sell.rs` with the original's statement order.
- **s08 `0x376b0`** legacy buy handler (lane mg-A-3): a dedicated non-generic `pub fn buy` in
  `instructions/swap/buy.rs`. Cashback goes through a private `pay_cashback` wrapper to `distribute_cashback`.
- **s09 `0x23e40`** `migrate_pool_coin_creator` (lane mg-A-res1): moved to
  `instructions/coin_creator/migrate_pool_coin_creator.rs` as an external, non-inlined function.

No reachable error, check, event, CPI or account constraint was added or removed.

### Behavior fixes found by the runtime replay

Both cashback paths in the lane code created the user-volume-accumulator's quote ATA with
`associated_token::create_idempotent`. The original issues `Create`: the replay shows the ATA program logging
`Create` for the original and `CreateIdempotent` for the candidate, an inner-instruction difference. The cases
were `legacy_sell` 255, 257, 298-301 and 515-520, and `legacy_buy` 345-347, 706-708, 754-758 and 858-862. The
union uses `associated_token::create` in both paths, as the parent did. The two gained handler windows are
unaffected, and the cashback helper windows are still unmatched.

## Positioning devices (all of them)

- **s06:** blank lines only, so the two `error!()` sites sit on `trade_v2.rs` lines 283/294.
- **s07:** `lib.rs` line 13 (`pub use instructions::swap::sell as legacy_sell;`) and the `sell` signature are
  kept on their existing lines.
- **s08:**
  - `#[inline(never)]` on `pub fn buy`, so it stays a separate function as in the original.
  - Blank lines, so `error!`/`require!` sit on `buy.rs` 44/54/57/98 (cashback) and
    317/326/327/387/391/395/404/405/409 (buy).
  - The `BuyEvent` struct moved to the end of `buy.rs`.
  - `lib.rs` line 211 calls `legacy_buy::buy` on the same line.
- **s09:**
  - The function moved to the original error-origin path.
  - 41 blank lines and a 2-line doc comment, so `require!` sits on lines 52/59.
  - The `lib.rs` line 26 `pub use` is extended on the same line.
  - `creator_reassignment.rs` keeps its line count with 6 blank lines.

The parent packet lists the devices that were already there.
`source-changes.json` has per-file blank/comment/doc/inline/long-line counts before and after.

## Builds, runtime, verify

The builds use the same recipe as the parent (`tools/lbuild.sh`, `builds/recipe.json`): the pinned
`solana-verifiable-build` image with the recorded mounts and cargo command. Two builds are byte-identical, and only
the two workspace crates recompiled. No new stack-frame diagnostics appeared.

Runtime: the 25 maintained suites, run with the unchanged replay driver against `builds/a/candidate.so`, give
**17,462 cases, 35,074 transactions, 35,418 signatures and 0 mismatches**.

```sh
python3 -I -B research/claude-amm-union2-20261028/verify.py
```

`verify.py` uses the standard library only. It checks:

- exact packet membership and file hashes;
- `source.patch`, rebuilt from the parent packet's source archive;
- both builds;
- the measurements of this candidate and of the parent's candidate, recomputed against
  `evidence/original/pump_amm/deployed.so`;
- the runtime summary against the repository's harness, observer and driver hashes.

## Limits

Whole-ELF identity and 26 unmatched windows remain open, including the cashback helpers, `amm_hop`, `curve_run`,
`execute`, the trade_v2 handlers, create_pool and `buy_exact_quote_in`. The positioning devices reproduce original
line numbers; they are not claims about the original file layout.
