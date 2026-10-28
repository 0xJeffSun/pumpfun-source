# Mayhem 436/441: O0081 + O0082 progress

## Result
| | parent-434 (main, #397) | this packet |
|---|---|---|
| normalized windows | 434/441 | **436/441** |
| raw-local | 100 | 100 |
| direct edges | 4370 | 4472 |
| Source records | 470 | 484 |
| stripped | `e0d0d0c3…` | `e93b60f1…` |
| symbols | `828751f9…` | `49d70dc7…` |

- O0081 (Legacy Buy, start 113672, 13,848 B) and O0082 (Legacy Sell, start 127520, 12,992 B)
  are now normalized-identical. O0082 has ratio 1.0000 and 0 masked slots.
- There are no body, raw, profile, edge or Source losses, and no `Stack offset … exceeded max
  offset` warning.
- The build is deterministic: two clean builds (fresh target dirs `r436-bank` and `r436-bank2`,
  anchor re-cleaned) gave identical ELFs. These also equal lane pl-o82's incremental
  `final2-434` build.
- Runtime:
  - The stock sweep suite matches the original on all 692 cases, with 0 mismatches and logs
    equal (mod CU). It is identical to the parent-434 receipt on main.
  - The trade suites ran 14 families and 6,636 cases with 0 mismatches and 0 non-compute log
    differences.
- Remaining unmatched windows: O0076 (sweep_fees), O0077 (BuyPumpSwap), O0079 (SellPumpSwap),
  O0083 (BuyV2), O0084 (SellV2).

## Edits (six files, ordinary Rust)
Shared helper layer (state.rs, used by all buy/sell handlers):
- `initial_trade_output`, `buy_amounts` and `sell_amounts` take `c: &curve_accounts::BondingCurve`
  and `cap: &u64` instead of pre-loaded scalars. They read `virtual_sol_reserves`,
  `real_sol_reserves` and `real_token_reserves` from the curve at the point of use.
  `buy_amounts` computes `retained_basis_points` itself. The retained-reserve max is bound
  (`let max = …`) before the cap is applied.
- Call sites in pump_interface.rs (Legacy Buy and Legacy Sell), buy_v2.rs and
  pump_interface_v2.rs (SellV2) pass `c, &cap, …, retained_reserve_bps`.

`SellEvent` (pump_interface.rs):
- The struct is declared in its serialized order (`side` first, then `version` and
  `retained_reserve_bps` after `real_tokens`), with `side: bool` and no `#[repr(C)]`. The manual
  `AnchorSerialize` writes `self.side as u8`, so the wire format is unchanged.
- All six emitters use `side: false` or `side: true`.

O0081, Legacy Buy (pump_interface.rs `buy`):
- The price-check closure uses `let Some(price) = (vs*1e18).checked_div(vt) else {…}` and
  `let … else` for the scaled, low and high values. This replaces the eager `vt == 0` test and
  `.ok_or(..)?` chains.
- The Pump `buy` CPI is a single expression:
  `crate::pump::cpi::buy(CpiContext::new_with_signer(a.pump_program.key(), …, &[&[b"sol-vault", &[ctx.bumps.sol_vault]]]).with_remaining_accounts(vec![…]), input, output, false)`.
  It no longer has the `cpi_program`, `bump`, `seeds`, `signer_seeds` or `mut cpi_ctx` locals.
- The `SellEvent` literal is ordered with `end_timestamp` before the virtual reserves and
  `global_sol_deployed` after `version`.

O0082, Legacy Sell (pump_interface.rs `sell`):
- The price check is an immediately-invoked closure with the same `let … else` form. It replaces
  the `#[inline(always)] fn legacy_price_check`, which is removed (it was the last 12 lines of
  the file).
- Inline signer seeds `&[&[b"sol-vault", &[ctx.bumps.sol_vault]]]` replace the `bump`/`seeds`
  locals.
- The `token_program` account clone comes before `creator_vault` in the `Sell` accounts literal.
- The `SellEvent` literal has `end_timestamp` before the virtual reserves and
  `global_sol_deployed` after `timestamp`.

## Mechanism and ablations (lane pl-o82, measured on the 433 base; O0073 is independent)
`measurement/o0082-ablations.json`:

| variant | O0082 bytes (orig 12,992) | ratio | windows |
|---|---|---|---|
| 433 base | 13,008 | 0.328 | 433 |
| + O0081 layer only | 13,128 | 0.333 | 434 (+O0081) |
| **+ O0081 layer + O0082 hunks (shipped)** | **12,992** | **1.000** | **435 (+O0081 +O0082)** |
| shipped minus inline signer seeds | 12,976 | 0.369 | 434 |
| shipped minus token_program/creator_vault order | 13,016 | 0.755 | 434 |
| shipped minus SellEvent literal order | 13,008 | 0.945 | 434 |
| shipped with price check as `#[inline(always)] fn` | 12,952 | 0.643 | 434 |
| O0082 hunks without the O0081 layer | 12,936 | 0.637 | 433 |

What the ablations show:
- Every O0082 hunk is necessary.
- The O0082 hunks need the shared O0081 helper layer: by-reference curve and cap, lazy reserve
  loads and the `SellEvent` layout.

Interpretation of each hunk. This is read from the ablation deltas and pl-o82's instruction diffs.
Unlike the O0073 packet, these effects were not each proven separately on IR with `llc`.
- **Curve and cap by reference.** The parent loaded every reserve into scalars before the call,
  which hoisted the loads and the retained-bps computation above the price check. Passing `&c`
  and `&cap` lets them sink the loads to their single use inside the inlined helper. This matches the
  original's load order and register assignment.
- **Inline signer seeds.** Building the seeds inside the CPI call moves the bump byte's stack
  slot and store next to the `invoke_signed` setup, instead of keeping a long-lived local across
  the 13 or so account clones. Without this hunk, O0082's stack-only diff is about 501, against 0 when it is shipped.
- **Account clone order.** The original clones `token_program` before `creator_vault`. Swapping
  the literal fields reorders the clone sequence (each `Rc::clone` increment), and that clone
  sequence is the body's largest straight-line block.
- **`SellEvent` literal order and layout.** Rust evaluates struct-literal fields in source order,
  so the literal order fixes the order of the `Clock::get` syscall and the global-params loads.
  Declaring the struct in its serialized order with `side: bool` gives the in-memory layout the
  original's serializer walks.
- **Closure-form price check.** The closure is immediately invoked and then followed by `?`. It
  produces a single `Result` join block with the original's error-materialization layout. The
  `#[inline(always)] fn` form duplicates the error paths.

## Provenance
- Lane pl-o82 produced the closing tree (`v/final2-434` = parent-434 + O0081 + O0082).
- The coordinator then published it as `mayhem-env/parent-436`.
- The O0081 layer was first found by lane ir-o81 (`o81-close.diff`, on the 432 parent).
- This packet rebuilt the tree clean twice, re-measured it against the 434 and 433 parents, and
  reran both runtime suites on the clean ELF.
