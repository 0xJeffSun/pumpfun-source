# Fees CPI branch and LLVM inline controls

Five normal SDK v1.44 Cargo builds reject two further hypotheses. No maintained source selection or progress-table change is made. The accepted checkpoint remains 583/585 normalized / 200 raw-local; both residual handlers and whole ELF equality remain unmatched.

Crank's strongest retained candidate has 1,947 decoded instructions versus 1,950 original. An opcode-sequence comparison first diverges around CPI error handling and block placement; this is diagnostic evidence, not a claim that the preceding raw instructions or registers match. Four new controls express the same CPI success/error handling with `core::intrinsics::likely`/`unlikely` and `is_ok`/`is_err`. They preserve all 583 qualified signature multiplicities, but produce 1,900 or 1,901 Crank instructions and an extra helper window. None matches the complete body; these controls are not selected. The source archives retain their actual error-conversion and guarded `unwrap_err` expressions.

| Control | Handler bytes | Decoded instructions | Matched original windows | Candidate windows |
| --- | ---: | ---: | ---: | ---: |
| Crank likely(is_ok) | 15,576 | 1,900 | 583 | 586 |
| Crank likely(is_err) | 15,584 | 1,901 | 583 | 586 |
| Crank unlikely(is_ok) | 15,576 | 1,900 | 583 | 586 |
| Crank unlikely(is_err) | 15,584 | 1,901 | 583 | 586 |
| Create root LLVM inline threshold 500 | 13,784 | 1,640 | 431 | 569 |

The Create control keeps the single-crate source and sets `-C llvm-args=-inline-threshold=500` only on the root Cargo rustc invocation. Its count approaches the original Create's 1,641 instructions but loses 152 original signature matches. The captured legacy `measure.json` reports 436 by signature membership, which overcounts five reused signatures; the independent verifier enforces multiplicities and establishes 431 injective matches. Its changed direct-callee multiset is retained in `measure.json`. This is an explicit regression, not recovery progress; the flag is rejected.

Complete source archives, native outputs, normal compiler logs, link maps, before/after input receipts, the unchanged macro dependency, and the experimental Anchor dependency are retained. No SDK modifications or native byte patches were used. The Anchor extension is the existing borrowed-info/reload experiment from PR #304, not established original framework provenance. None of these binaries has new runtime, readonly/reference, or Source qualification, and the qualified Sweep runtime evidence does not apply to them.

```sh
python3 -B research/fees-branch-inline-controls-20261027/verify.py
```

The verifier checks all packet hashes, every source/dependency archive against build inputs, both native hashes, injective original and qualified signature counts, function boundaries, complete normalized bodies, and whole-file inequality. Captured build scripts retain the actual `/workspace/fees-recovery` paths. The official SDK v1.44 archive SHA-256 is `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`.
