# Risk6006/6007 owned and compared-value error review

No concrete source correction is supported. The original and current source both attach **unsigned64 limit first, unsigned low64 counter second** after the signed128-positive guard. The current `require_gt!(limit, counter as u64, ...)` is the natural form of the observed risk contract. A signed128 string, reversed operand order, custom error box or formatting rewrite would contradict or exceed this evidence.

This source-only review reads the current accepted Mayhem build7d416f84 and the unchanged originala87fa9f8. It makes no main/build/runtime changes. Full selected original/candidate bodies, operand setup and outgoing call/data lists are retained. It does not claim recursively complete allocator/formatter or all error-variant equivalence.

## Operand and width evidence

Original buy post-accounting error6006 calls11776 at184088 with r3=r9 (selected overall limit) and r4=r8 (counter low limb), set at184072/184080. Error6007 calls11776 at183664 with r3=r7 (selected coin limit) and r4=r6 (counter low limb), set at183648/183656. The original signed128 positivity checks happen earlier, before these low-limb comparisons. Equal limit/counter is failure; the operands are not reversed on attachment.

In the current full legacy-buy handler [79520,90312), error6006 is stored at87448. Call87552→7264 receives r4 from global wrapper+128 (limit), r5 from global wrapper+72 (counter low), loaded87528/87520. Error6007 call89416→7264 receives r4 from global wrapper+136 (coin limit) and r5 from state wrapper+40 (counter low), loaded89392/89376. The helper's first three ABI inputs are now output pointer and the two-word Error value; thus scalar operands shift from original r3/r4 to current r4/r5. That internal ABI difference does not establish a source error.

Original11776 saves first scalar from r3 and second from r4. Each goes through695288 with a20-byte stack buffer: first11848, second12536 (the alternate Error variant follows equivalent paths). This is the maximum unsigned64 decimal capacity. Current named `Error::with_values`7264 saves r4/r5, formats via named unsigned64 formatter595080 with the same20-byte capacity, then owns two strings. The first conversion precedes the second in both. No signed128 formatter participates in these operand paths.

## Owned error and data order

The original error-value helper chooses between Error variants using the low tag bit and mutates the boxed error's compared-values field. Its source-string allocations/copies are retained in `original-values.asm`; it clears the existing compared-values tag and writes the newly owned two-string payload. Current `Error::with_values` has the corresponding two Error-variant branches and stores the two owned strings. Different native offsets and output-pointer conventions are recorded rather than patched into Rust.

Original posttrade error6006/6007 constructors build an Anchor error via named/error-string routines190160/196056 and box conversion620712. Complete selected bodies are retained. The current error construction uses existing `BuyError` names/messages and Anchor conversion519448. No evidence supports hand-writing an AnchorError representation or replacing generated `BuyError` definitions. Origin paths and line numbers differ naturally and remain outside this task; none are forged.

## Direct closure and unresolved boundary

`closure-ledger.json` records every direct call, indirect call and lddw data reference in the selected full bodies. Original bounds follow retained ledger entries; current bounds use actual function symbols (including alias-shared u64/usize formatter). Candidate box519448 has144 bytes; its full end is519592. The completed original box allocates160/alignment8 and copies160 before returning an Error pair. Candidate box is separately retained, not declared byte-identical.

This is **not a fully closed recursive equivalence proof**. Calls into allocator/OOM handling, memory copies, formatter padding/writing, ownership cleanup and indirect formatting targets remain explicit unclosed edges. Different Error variant representations and return lowering cannot be diagnosed as source bugs from offsets alone. Complete branch-feasibility/ownership equivalence through those runtime/library paths is missing; the artifact preserves them rather than inventing a fix.

The natural current source form is already:

```
if selected_global_counter > 0 {
    require_gt!(selected_overall_limit, selected_global_counter as u64, BuyError::OverallRiskExceeded);
}
if state_quote_counter > 0 {
    require_gt!(selected_coin_limit, state_quote_counter as u64, BuyError::CoinRiskExceeded);
}
```

The two original attachments and current actual compiled scalar arguments support that order and truncation. This review therefore supplies attribution/ownership evidence and precise remaining closure requirements, with **no source patch**. It does not revisit the initializer, other stopped scopes, sizing probes or compiler choices.

Run `python3 -B inspect.py` for static checks. It checks current/original scalar arguments, direct calls, widths and error codes and regenerates the call/data ledger. No target program or transaction runs.
