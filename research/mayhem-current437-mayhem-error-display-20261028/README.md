# Qualified437 MayhemError Display counted messages

This packet counts **20 static messages, 531 bytes**, selected by `MayhemError` Display. Original owner O0097 is `[196056, 196888)`. The normalized candidate is `[172736, 173568)`, symbol `_ZN68_$LT$mayhem_recovered..MayhemError$u20$as$u20$core..fmt..Display$GT$3fmt17hd2424290dfb80f8cE`.

The format-piece chain and the account-name intervals are preserved. The relation remains **437 normalized functions, 141 raw functions, 431 closed windows and 581 candidate pairs**. This packet adds data evidence, not a function match.

## What fixes each length

`fmt` saves `self`, loads formatter data at `+0`, the vtable at `+8`, and the unresolved slot at vtable `+24` into r4. It then loads the `u32` tag. Each source discriminant `0..=19` is a binary-search arm: one type-8 `lddw` of a `.rodata` pointer into r2, one immediate length into r3, and `callx r4`. Tags 8 (`PumpCpiFailed`) and 19 (`SweepFeeRateLimit`) share the length mov at offset 680. Both lengths are 20 and the pointers differ, so the bytes are counted once each.

The reader admits only that prologue, the tag comparisons, the relocated pointer, the immediate length, jumps, and the shared `callx` plus the following `exit`. r1 and r4 are not rewritten after the prologue. The proof stops at `callx r4`. It does not name the callback target or claim output, allocator behavior, or runtime effect.

Lengths are the immediates. A NUL, the following byte, and an adjacent string are not bounds. Every selected interval is inside `.rodata`, contains no relocation, and matches the other image and the archived `#[msg(...)]` text. The twenty arms together visit every instruction start in the 832-byte body. `lddw` continuation words are not separate instructions.

The sealed `src/lib.rs` enum `MayhemError` has discriminants 0 through 19. Those twenty tags are the observations. The reader rejects every other integer. A binary search can fall through; that fallthrough is not an observation and adds no bytes. The tag numbers describe this source and these images. They are not a stable Rust enum ABI.

No `.data.rel.ro` descriptor and no relocation-table byte is credited.

## Coverage

The baseline is the format-piece coverage chain **unioned** with the account-name intervals. Those two publications overlap, so the totals are not added. The baseline is **18,214 / 26,180** payload bytes (`.rodata` 11,758 / 18,396, `.data.rel.ro` 6,456 / 7,784).

These messages were disjoint from that baseline. Payload coverage becomes **18,745 / 26,180 bytes (71.60%)**, leaving **7,435 unproved**. `.rodata` becomes **12,289 / 18,396**. `.data.rel.ro` stays **6,456 / 7,784**. The twenty counted intervals union to `[709128, 709160)`, `[710600, 710616)`, and `[710924, 711407)`. The first two abut bytes that were already covered; only the 531 message bytes are new. Old packets and the inventory stay unchanged.

## Still open

The complement of `coverage-delta.json` remains open. The largest `.rodata` gaps include `[722392, 723755)`, `[713022, 714341)`, and `[709224, 710440)`. Beside these strings, `[710712, 710924)` and `[711407, 711412)` are still open. The largest `.data.rel.ro` gaps include `[732856, 733048)`, `[727696, 727880)`, `[732648, 732760)`, `[726592, 726688)`, `[726784, 726880)`, and `[733120, 733216)`. Relocation and section layout are unchanged.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-mayhem-error-display-20261028/verify.py --repo .
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-mayhem-error-display-20261028/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B scripts/verify_evidence.py
PYTHONDONTWRITEBYTECODE=1 python3 -B scripts/test_tooling.py
```

Run the last command from `scripts/`, or with `PYTHONPATH=scripts`.

Tests flip every selected message byte and every length and pointer immediate. A payload or pointer change keeps the normalized pair, then drops the owner and its dependents. A length change drops the normalized window. The following byte is not absorbed. Tag 20 and tag -1 are rejected. The prologue slot and the `callx` register are exact. Inventory, symlink, FIFO, and resealed report, coverage, and excerpt edits are rejected.

## Exact intervals

Ends are exclusive. Pointer and length offsets are relative to each owner start. The candidate has the same lengths, offsets, and bytes.

| Tag | Variant | Original interval | Candidate interval | Length | Pointer / length offsets |
| --- | --- | --- | --- | ---: | --- |
| 0 | `TradingPaused` | 710924–710941 | 693023–693040 | 17 | 288 / 304 |
| 1 | `TradingActive` | 710941–710958 | 693040–693057 | 17 | 696 / 712 |
| 2 | `MathOverflow` | 710958–710971 | 693057–693070 | 13 | 440 / 456 |
| 3 | `SolReservesTooLow` | 710971–710994 | 693070–693093 | 23 | 80 / 96 |
| 4 | `MayhemModeEnded` | 710994–711011 | 693093–693110 | 17 | 568 / 584 |
| 5 | `MayhemModeNotEnded` | 711011–711032 | 693110–693131 | 21 | 368 / 384 |
| 6 | `OverallRiskExceeded` | 711032–711063 | 693131–693162 | 31 | 760 / 776 |
| 7 | `CoinRiskExceeded` | 709128–709160 | 689408–689440 | 32 | 504 / 520 |
| 8 | `PumpCpiFailed` | 711063–711083 | 693162–693182 | 20 | 200 / 680 |
| 9 | `PumpCpiMathOverflow` | 711083–711113 | 693182–693212 | 30 | 632 / 648 |
| 10 | `PumpSwapCpiFailed` | 711113–711138 | 693212–693237 | 25 | 328 / 344 |
| 11 | `PumpSwapCpiMathOverflow` | 711138–711173 | 693237–693272 | 35 | 728 / 744 |
| 12 | `PumpCpiSlippage` | 711173–711229 | 693272–693328 | 56 | 472 / 488 |
| 13 | `PumpSwapCpiSlippage` | 711229–711290 | 693328–693389 | 61 | 144 / 160 |
| 14 | `WithdrawRateLimit` | 711290–711309 | 693389–693408 | 19 | 600 / 616 |
| 15 | `TradeRateLimit` | 710600–710616 | 691312–691328 | 16 | 408 / 424 |
| 16 | `AccountTypeNotSupported` | 711309–711335 | 693408–693434 | 26 | 792 / 808 |
| 17 | `MaxFeeRecipientsExceeded` | 711335–711366 | 693434–693465 | 31 | 536 / 552 |
| 18 | `InvalidBump` | 711366–711387 | 693465–693486 | 21 | 248 / 264 |
| 19 | `SweepFeeRateLimit` | 711387–711407 | 693486–693506 | 20 | 664 / 680 |

provider=Cursor model=grok-4.7 client=grok-build

Made via @slopdotcash
