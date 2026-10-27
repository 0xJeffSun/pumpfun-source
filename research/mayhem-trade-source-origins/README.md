# Compose retained-reserve and AMM Sell source origins

This successor to the [428-window checkpoint](../mayhem-accounting-extend-recovery/README.md)
composes the [retained-reserve repair](../mayhem-retained-bps-recovery/README.md)
with the actual post-CPI AMM Sell accounting helper. It preserves **428/441
normalized windows, all 70 raw-local bodies and all thirteen unmatched windows**.
The unmatched bodies still contain 112,584 original text bytes. Complete ELF
identity remains false; this change adds no complete function-body match.

The six-file delta exposes the existing `retained_basis_points` helper and uses
it in Legacy Buy, BuyV2 and SellV2. The same source moves the two checked AMM Sell
balance subtractions into `pump_amm_interface::sold_amounts`, which the real
handler calls. The five corresponding Rust Source observations now match:
`state.rs:321:26` in three handlers, and `pump_amm_interface.rs:595:23` and
`596:26` in AMM Sell. No log strings are rewritten. Both helpers are used by the
actual trade paths; no unused helper, assembly or output padding is introduced.

`data.py` identifies each live handler through a complete matching entry wrapper,
then bounds the actual relocated 24-byte Source records. This does not claim
matching instruction positions or complete business bodies. `progress.py`
retains all prior raw/normalized matches, positive immediate calls and observed
Source profiles. The earlier ExtendAccount, accounting and native-transfer
callee/data proofs are also checked on this exact artifact.

The complete 66-file source archive, exact parent delta, two saved original
controller builds and all outputs are retained. Both clean-root builds agree:

- Candidate: `8b11b4a471b61c734e8e803b2901d7d39050253d7f5f73ac1409fed36369b0e7`
- Symbols: `c29b81a84b4308170d65eb9a0d602e6246c7a1ba9ec98dc71fcbf6fee3944333`

The recipe remains the explicit macOS-compiler/Linux-target-library combination;
it does not establish the original historical compiler environment. Each saved
build recompiles the root, Anchor and external-account crates while reusing
other pinned dependency artifacts.

Fresh execution passes **6,636 trade comparisons and 13,272 verified signed
transaction records**. All checked account effects, errors, inner instructions,
returns and events agree. Exactly fourteen formerly differing overflow
comparisons now have matching non-compute diagnostics; seven division-by-zero
diagnostic cases remain. No previously matching diagnostic regresses.

The two post-CPI AMM Sell subtraction-panic branches are not exercised by this
corpus: their improvement is the static Source proof, not a runtime-coverage
claim. Parent ExtendAccount, admin, sweep, Burn and initializer receipts keep
their original artifact bindings and are not relabeled as fresh runs here.

Verification:

```sh
python -B research/mayhem-trade-source-origins/verify.py
python -B research/mayhem-trade-source-origins/test_scope.py
```

Six mutation checks reject unrelated source changes, an unused arithmetic helper,
wrong panic locations, missing cases and changed case parameters.

The verifier reads saved evidence and executes no compiler, VM, network request
or live transaction. Function matches and finite local tests do not establish
whole-program byte identity or exhaustive behavior.
