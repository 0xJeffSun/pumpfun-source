# Shared AMM sell quote source recovery

This two-file successor restores the AMM Sell handler's call to the shared quote
routine. It composes onto the [426-window source/data checkpoint](../mayhem-source-data-recovery/README.md).
The inventory remains **426/441 normalized windows: 70 raw-local,
356 normalized-only and 15 unmatched**. There is no new complete body match.

The live helper corresponding to O0093 now has the original ten direct-callee
shapes and the same multiset of ten typed data references: unwrap literals,
Debug vtables and panic Source records. It uses the original checked `u64`
subtraction before converting the remaining reserve to `u128`. Its source
locations include `state.rs:321:26`, `424:43`, `490:14` and `491:34`.
The actual entry wrapper identifies the handler and its single helper call.

The helper is **1,096 bytes versus the original 1,120**, so instruction-site
correspondence remains open. Equal callee/data multisets do not establish equal
instruction order, transitive behavior or a complete recreated function. All
426 prior bodies, 70 raw-local windows, 4,234 supported direct-call observations
and 441 matching Source observations are retained.

## Builds and runtime evidence

Two builds from the same 65-input source map reproduce:

- Candidate: `fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4`
- Symbol ELF: `cc56231724a7973fb9cecfd3c24ab390875dd828925f79b33388a05c71f12d25`

The build uses the parent's unchanged macOS v1.54 compiler, official Linux
v1.54 target libraries and v1.52 stripper. Root, Anchor and external-account
compilations are recorded; other cached dependencies are reused. The inherited
archive/member checks retain their original scope. No compiler output is
patched or padded, and the original ELF is not a build input.

Fresh local execution compares this candidate with the original across all
**6,636 trade cases in fourteen suites**, with **13,272 signed transaction
records** checked. These are record counts, not unique signature counts.
All checked account changes, rollback, event, CPI, error and return values agree.
Independent AMM verification also rederives successful quote arguments,
account order, state changes and complete events.

All **1,239 AMM sell cases now have equal non-compute logs**, repairing the
parent's eight differences across the native and legacy-token suites. The
other trade suites retain 21 diagnostic differences, with no new differing
case. Admin, Burn,
initializer and sweep receipts from the parent remain bound to that parent's
artifact; this packet does not relabel them as executions of the new candidate.

The remaining fifteen bodies still cover **119,400 original text bytes**.
Whole ELF, arbitrary data extents, indirect/transitive closure, exhaustive
semantics and historical build provenance remain unresolved. No live RPC or
mainnet operation is used.

## Verify or materialize

With the repository's prepared Python environment, including `solders`:

```sh
python3 -B research/mayhem-sell-quote-call-recovery/verify.py
python3 -B research/mayhem-sell-quote-call-recovery/test_scope.py
python3 -B research/mayhem-sell-quote-call-recovery/analysis.py --check
python3 -B research/mayhem-sell-quote-call-recovery/verify.py --skip-runtime --materialize /absolute/new/source-directory
```

Default verification checks saved evidence; it does not execute a compiler,
target VM or network operation. The mutation suite rejects a substituted parent
binary, missing/duplicate cases, an invalid signature and an unrelated source
edit even after its source hashes are resealed. Diagnostic mutations remain
visible independently of the other comparison fields.
