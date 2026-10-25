# Layered reconstruction pass 11

Pump's admitted buy path now rejects complete before cashback. The complete
executable changes at exactly nine bytes, all in buy; exact-quote and every byte
outside buy remain equal to the preceding fee-basis build. All 9,269 unchanged
differential and 1,024 Surfpool comparisons pass. The inspected existing inputs
do not cover simultaneous complete/cashback flags or divergent mint/curve supplies.

Mayhem SellPumpSwap now uses the original typed Result failure on a zero sizing
divisor. All 9,595 functional comparisons pass; 61 diagnostic rows, including
three second-burn source-location differences, remain visible. Saved verification
checks 13,284 retained transaction strings and 26,500 signatures. The 19,190
recorded/derived executions are not a universal raw-byte signature claim.

Both clean main builds exactly equal their tested scratch executable and symbol
files. The independent reviews preserve the exact scope of each source correction.

The [AMM formatting review](amm-formatting-review/REVIEW.md) identifies the original
BufferTooSmall error and a different base58 renderer. The [source proposal](amm-formatter-source-proposal/REVIEW.md)
authenticates a retained stack-buffer implementation and proposes a narrow
restoration. Its separate build is not accepted or counted in this pass.

The [complete remaining-work report](REMAINING.md), [current analysis index](current-analysis-index.json),
and [before](before-corrections/summary.json)/[after](after-corrections/summary.json)
comparisons retain every mismatch and opaque disposition. Whole-original acceptance
remains **0/4 core programs and 2/5 dependency captures**, with 140/150 bounded
instruction paths. None of these measures establishes exhaustive semantics,
historical build provenance or a completed security audit.
