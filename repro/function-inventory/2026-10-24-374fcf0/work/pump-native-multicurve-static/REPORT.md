# Native-only multi-curve reachability: bounded static finding

A successful run of two or more ordinary native-quoted curves is not supported by the authorized native-only scope through the genuine captured AMM caller. This is a reachability constraint of that scope, not recovery or resolution of the full Pump routing function. No source, build, fixture, program execution or signature construction was performed.

Assume every ordinary curve has distinct base and quote mints, and every quote is WSOL (the stored Pump quote may also use its native-zero alias). AMM fixes one direction for the entire route. Two buys require the first output/base mint to equal the second quote mint, contradicting the native-only distinct-base assumption. Two sells require the first quote mint to equal the second base mint, giving the same contradiction. A native curve A followed by native curve B is discontinuous; returning through the same native mint changes direction and is rejected. Degenerate synthetic base=quote=WSOL states are outside this ordinary-route claim and were not investigated.

The minimal useful same-direction route is SOL→A→B, or B→A→SOL. One curve must quote the other ordinary token. That nested ordinary quote was excluded by this first scope. The subsequent parent authorization permits a separate read-only study of that precise route; it is not implemented or validated here.

## Original branch and loop evidence

All addresses are file offsets in the captured `.text`. The new JSON instruction windows bind disassembly bytes directly to the original ELF, not to nearby strings. Pump original SHA-256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`; AMM original is `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.

| Operation | Exact original evidence |
| --- | --- |
| Pump route body | `0x567d8..0x57c38`, 5,216 bytes; entry-bounded |
| Pump per-curve body | `0x5b3b0..0x5fc48`, 18,584 bytes; entry-bounded |
| Five-account parser | `0xdd700..0xde4b8`, 3,512 bytes; base mint, quote mint, curve, base vault, quote vault |
| Pump shape/flags | `0x567f8..0x56828` checks nonempty groups of five; `0x56830..0x56880` checks one flag byte per group and each byte below four |
| Group loop | Source mint loaded at `0x56e20..0x56e60`; parser call `0x572c8→0xdd700`; group account pointer advances 240 bytes at `0x57000`, i.e. five 48-byte AccountInfos |
| Per-hop parameters | `0x57328..0x57348` computes last-hop status; `0x57368..0x57370` chooses absent/prior-hop state; `0x573a8` loads the hop flag; call `0x57438→0x5b3b0` |
| Sequential write/exit | Successful result amount is retained at `0x574f8`; hop exit `0x57570→0xde4b8` occurs before loop progression; previous-hop account/state construction occupies `0x57590..0x57930` |
| Accumulation and final mint | `0x57938..0x57978` adds buyback with overflow detection; `0x57058` compares current versus destination mint and `0x57100` constructs error 6098; success stores amount/buyback at `0x57988..0x57998` |
| Per-curve flag bits | `0x5b458` masks bit 1 and passes its inverted presence to the complete/cashback helper; `0x5c488` masks bit 0, gating buyback-recipient validation at `0x5c5a8→0x7e490`. This alone does not prove every fee arithmetic branch. |
| AMM route preflight | `0x3dbc0..0x40100`, 9,536 bytes. Current mint is read at `0x3ddb0..0x3ddf0`; each group advances 240 bytes at `0x3dee0`. Quote comparison is `0x3e0b0→0x1198e0`; fallback base comparison is `0x3e110→0x1198e0`. Neither match leads to error 6084 at `0x3eb80`. |
| AMM fixed direction | `0x3e2f8` compares current mint against group quote; `0x3e318..0x3e358` records first-hop direction; `0x3e360..0x3e3b8` compares later direction and branches to `0x3fa70` on reversal, then error 6086 is stored at `0x3fdd8`. |
| AMM before Pump execution | The entire route preflight loop returns to `0x3ded0`; curve-run preparation is only called later at `0x3ee18→0x45940`. A direction failure exits without entering Pump. |

The loop's optional previous-hop context and last-hop branches are material. A multi-curve implementation cannot be justified by simply repeating the current single-hop source. The current recovered module requires one hop with flag 3 and ordinary native/Tokenkeg layouts. Neither intermediate transfer ownership nor all non-last payout/state paths are recovered by this finding.

## Existing saved caller evidence

The frozen current Pump serializer package contains the unchanged 56-case partial corpus. Reading its saved signed transactions finds 50 genuine captured-AMM Pump CPIs, each with 13 fixed accounts plus one five-account group and flag `[3]`; six cases stop before Pump, and only 11 succeed. These receipts cover no multi-curve route. The current Pump candidate is `92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a`; the earlier main42 catalog is historical and not current implementation coverage.

The retained AMM37 corpus has 16 two-curve cases using captured Pump on both sides, with four successes. Their actual CPI flags are `[1,2]` for buys and `[2,1]` for sells. The source caller assigns protocol bit 0 at the native/user-currency endpoint and creator bit 1 at the distant base endpoint; an interior hop has zero. Consecutive Pump-owned groups form one Pump CPI, so a two-curve CPI has 23 accounts. AMM genuinely signs its canonical `global_config` PDA; the user signs the outer transaction. The current source preserves the observed caller grouping and endpoint flags, but source alone is not asserted as original binary equivalence.

Those saved two-curve fixtures are **nested Token-2022 fixtures**, not evidence of ordinary Tokenkeg two-curve parity. Their second buy group quotes the first group's base mint; the order reverses on sells. They are retained here only to establish existing caller shape and explain why they cannot be counted as native-only acceptance. No Token-2022 behavior was investigated or extended.

The existing `mixed-direction` receipt returns AMM 6086 with zero Pump CPIs. Its error log identifies the same original mixed-direction branch. Seventy-three original-side saved outer transactions were decoded and their existing signatures verified during this read-only inventory; this adds no runtime cases.

## Current disposition

No successful native-only multi-curve source extension is proposed under the first restrictions. The full routing function remains partial. A separately scoped ordinary Tokenkeg SOL→A→B / reverse analysis must establish intermediate vault transfers, prior-curve authority/seeds, non-last write ordering, fee suppression and quote-control dependencies before any implementation proposal. It cannot inherit success from the existing Token-2022 fixtures. No direct synthetic signing of AMM `global_config`, altered historical signed payload or initializer work is needed or permitted.
