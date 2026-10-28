# Qualified 438-window Mayhem composition

This composition adds the complete normalized **O0079 SellPumpSwap handler (17,312 bytes)** from PR417 to the qualified437 source. The exact 67-file source differs from the published 437 parent only in `src/instructions/sell_pump_swap.rs`. It retains the completed SweepFees body and all prior raw matches.

| Evidence | Result |
| --- | ---: |
| Full normalized original windows | 438 /441 |
| Raw-local windows | 141 |
| Normalized-only windows | 297 |
| Unmatched windows | 3 |
| Matched original text | 660,264 /706,744 bytes |
| Recursive ordered direct/code-reference closure | 433 windows |
| Positive immediate calls | 4,573 |
| Positive Source observations | 502 |

The remaining bodies are AMM Buy (O0077, 9,736 bytes), BuyV2 (O0083, 18,648 bytes) and SellV2 (O0084, 18,096 bytes). Their combined 46,480 text bytes remain unmatched. Normalized bodies and raw-local windows are separate measurements. **The complete ELF remains unequal to the original.**

The candidate is `b69ee99d83cb1eaaa999082dc707560e95e1540174f27b5e6a8e1438cc4c34fc`; symbols are `a4e4768d99d31f078ef876b71faca42acd774db00c53f75e888bc1b1c119aa4a`. Two root compilations and a separate root reviewer compilation agree on both complete files. They reuse qualified dependency libraries; they are not fresh dependency builds or historical build-environment attribution.

PR417 supplies the ordinary-Rust source discovery: inlined price helpers, inline CPI signer seeds, and event scalar evaluation ordered before the final struct literal. Its actual shipped body was independently read and compared before composition. This packet verifies all 47 ordered direct calls and the full body under the unchanged normalizer. It also bounds all 13 direct data references: three Source descriptors, three selected 32-byte headers, two seed-slice elements, and explicit literal ranges. This does not prove unbounded object extents or generic indirect behavior.

Fresh offline VM validation uses this exact new executable:

- 6,636 trade comparison pairs /13,272 signed records across 14 families;
- 69 initializer pairs /168 signed records, including 10 successful Pump CPI cases;
- 692 sweep cases /2,076 signed records in original/control/candidate comparisons;
- 150 rate cases /450 signed records;
- 856 targeted rate cases /2,568 signed records.

These finite matrices overlap and are not unique-transaction or exhaustive-behavior counts. The independent verifier checks signatures, executable program hashes, payload/state equality, event/CPI data, rollback and non-compute logs. No live-chain transaction or deployment occurs.

Run `python -B verify.py` and `python -B test_verify.py`; use a Python environment with `solders` for full runtime verification and `test_runtime.py`. `verify.py --static-only` explicitly omits runtime. Verification reads only saved evidence and bound repository inputs; it never compiles or runs a target. The tests reject real body/register, call-target, Source, source-file, signature, account-data and program-hash corruptions, plus symlinks, FIFOs and unlisted files.
