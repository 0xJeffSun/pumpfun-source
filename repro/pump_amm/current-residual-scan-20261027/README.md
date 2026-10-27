# Current AMM residual scan

`scan.py` compares equal-length original unmatched windows against complete symbols in the source-bound buyback-validation checkpoint. It ranks instruction differences without changing the established normalization. Candidate names and small distances are hypotheses, not equivalence claims.

Most close windows differ only in source metadata. One actionable candidate is the 376-byte token-amount reader at original `0x457c8`: all 19 differences are stack offsets. Its direct calls resolve to the same borrow, token-interface decoder, and program-error conversion operations. The original reuses the initial borrow-result stack allocation for the decoder result; the reconstruction uses an expression temporary and a separate allocation. A named borrow/token binding is being tested as a source-lifetime recovery, with no compiler layout directives.

The original token reader has four direct call sites: `0x419e0`, `0x49678`, `0x49790`, and `0x49a60`. The original remaining-buyback helper at `0x37150` has three: `0x38d50`, `0x3c790`, and `0x4b070`. These observations guide scoped reconstruction; they do not prove indirect call coverage or whole-program identity.
