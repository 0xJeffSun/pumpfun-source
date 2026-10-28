Composes Claude's O0077 closure onto Codex qualified438 and packages it as `research/claude-mayhem-439-20261028/`.

## Result
- **439/441 normalized windows** (qualified438: 438). The only gain is O0077, the PumpSwap `Buy` handler (`buy_pump_swap::handler`, 9,736 B).
- **No losses of any kind** vs qualified438 (body, raw, profile, edge, Source).
- Raw-local 141 → 141, positive direct calls 4,573 → 4,670, Source records 502 → 505, direct-call closure 433 → 435 windows.
- **Still unmatched:** O0083 BuyV2 (18,648 B) and O0084 SellV2 (18,096 B).
- **The whole ELF is still unequal** to the original (765,856 vs 777,408 bytes).

## Source change (ordinary Rust, two files; no asm, padding, patched bytes or unused ops)
- `buy_pump_swap.rs`: plain CPIs with the `sol-vault` signer seeds inline, the `Buy` account literal in the original's order, and the `SellEvent` (`side:false`) assembled in O0079's phased form from #417. The handler goes from 129 to 130 lines.
- `pump_amm_interface.rs`: `#[inline(always)]` on `bought_amounts`, replacing a blank line (598 lines).

## Build
- Uses the qualified438 `builds/first` root recipe with paths changed only: a root-only `rustc` compile against the hash-pinned qualified434 dependency rlibs, linked with the parent's `ordered.ld`. The cargo path cannot compile this tree, because `curve-accounts` needs the `historical_anchor_program` macro crate passed by hand.
- On the unmodified parent tree, the same recipe reproduces `b69ee99d…` / `a4e4768d…` exactly.
- Three builds (first, clean copy with a fresh cache clone, shared tool) all give stripped `e899e096…` / symbols `5d18b89a…`, with no stack-offset warning.
- These are not fresh dependency builds.

## Runtime (fresh offline LiteSVM runs on this ELF; control = qualified438)
All matrices finished with 0 mismatches:
- 6,636 trade pairs across 14 families (13,272 signed transactions)
- 69 initializer pairs (168 signed records)
- 692 sweeps (2,076 records)
- 150 rates (450 records)
- 856 target-rate cases (2,568 attested records)

## Verify
- `python -B research/claude-mayhem-439-20261028/verify.py` uses only the standard library and passes 187 checks. It recomputes the census and the O0077 body from ELF bytes, and every runtime count from the saved per-case outputs.
- `test_verify.py` (14 counterexample tests) passes.
- Both run in the new CI suite `mayhem-439-o0077`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
