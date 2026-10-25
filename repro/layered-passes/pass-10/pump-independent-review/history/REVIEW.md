# Independent Pump buy fee-basis review

**Pass for the narrow static supply-selector correction.** The completed candidate implements the two reviewed buy-side substitutions and the private helper. No sell or dormant whitelist helper change is present. This does not establish full fee-wrapper/buy equivalence or targeted runtime validation of divergent supplies.

Original `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`; candidate `2b7e104ca71cf680208a72bc2d3eca86f3767c2bf83a6b75abe814356f9e8b66`. The exact before/proposal patch was reproduced, the staged compiled source equals the proposal, and all37 actual compiler source hashes were checked: only `programs/pump/src/trade.rs` differs from baseline. The complete pre-buy prefix is unchanged; the remainder differs only at the two cap expressions plus appended helper. Thus sell code remains byte-for-byte unchanged, and the two dormant whitelist helper names are absent.

## Static checks

Original helper `[657656,658416)` is complete, including its terminal exit. It loads virtual base at decoded curve+64 and checks zero before selecting supply. Mode byte curve+154 equals0 selects mint+40; nonzero selects curve+96. The selected u64 supply and virtual quote+72 are widened, multiplied and divided by the saved nonzero virtual base. The zero path constructs6026.

Candidate helper `[625528,626288)` reproduces this input selection: nonzero virtual base branches625544 ->625824; mint pointer advances40, mode check625832/625840 selects curve+96 on mode1. The entire200-byte nonzero selector/arithmetic region is byte-identical to original after replacing only the two direct-call operands. Original/candidate multiply bodies have the same352-byte normalized body; divide bodies have the same72-byte normalized body. The candidate zero path explicitly constructs6026 at626152.

An independent full `.text` direct-call scan finds **exactly two** calls to625528:575512 within `buy`, and590384 within `buy_exact_quote`. There are no sell/dormant callers. The original wrapper's mint/curve argument association remains the retained original attribution evidence; the source supplies the already parsed `base_mint`, avoiding eager supply extraction before the helper guard.

These are bounded observations. The full760-byte cap bodies are unequal because error construction/layout and source metadata differ. Arithmetic helper body correspondence does not prove all recursive data/ABI identity. Wider wrapper admission, whitelist exemption, fee-config decoding and error precedence remain unresolved. In particular the ordinary `buy` path still performs earlier quote arithmetic; this helper does not repair every zero-base whole-handler error order.

## Coverage limit

I independently decoded the persisted64 `exact_quote` and156 `v3_configured_fee` Surfpool fixture accounts using the standard Mint supply bytes36..44 and the declared BondingCurve serialized supply bytes40..48/mode byte81. Every fixture has mint and curve supplies equal to10^15, in mode0 or mode1. **No mode0 divergent-supply case appears in those220 saved fixtures.** The broader retained coverage report also does not establish such a case. Passing existing suites is preservation evidence, not a runtime test of the newly selected supply.

This correction is supported by static original data flow, not by a fabricated new fixture. No new build, transaction, runtime replay, source change, fixture, compiler variant or normalization was performed in this review. Whole-original equality, full buy semantics and security acceptance remain open.

## Reproduce

From repository root:

```
PYTHONDONTWRITEBYTECODE=1 work/test-env/bin/python -B work/pump-buy-fee-basis-independent-review/review.py
```

The verifier reads frozen proposal/build inputs, checks the exact source delta, selector/calls/error/terminal instructions, scans incoming calls and decodes saved coverage accounts. It writes only this review's result. Two initial reviewer bookkeeping failures are retained: the first counted a matching sell expression outside the active buy suffix, and the second had not stripped the actual-source manifest's staged-root prefix. The final verifier correctly preserves sell code and validates all37 staged paths; neither correction changed target code or fixtures.
