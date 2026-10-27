# Mayhem parallel source recovery

This composes the accounts, trade and interface investigations on the published
full-curve source. It adds **30 complete normalized original windows**, preserving
all previous normalized and raw-local matches. The complete 441-window inventory
is now **59 raw-local, 316 normalized-only and 66 unmatched**. The new matching
extents cover 80,576 original text bytes; 268,000 text bytes remain unmatched.
Whole-file equality and complete semantic/call/data closure remain unachieved.
A separate targeted sweep-rate matrix also finds 34 behavioral differences in
150 cases on this checkpoint; that known gap is retained explicitly below.

## Recovered bodies

These are original window IDs, with candidate source roles established by the
corresponding account types, entrypoints and calls. A normalized body match is
not raw byte equality or proof of every referenced dependency.

| Original windows | Recovered source/body |
| --- | --- |
| O0001, O0002 | Pool and external curve serializers |
| O0021, O0028 | Fee-recipient account conversion helpers |
| O0071 | Complete Burn handler |
| O0078, O0080 | PumpSwap CPI error adapters |
| O0085, O0086 | Native and quote withdrawal-rate helpers |
| O0088, O0089, O0180, O0181 | Pause/resume methods and entry wrappers |
| O0091 | Shared post-sell accounting |
| O0100, O0117 | Global-parameter and fee-recipient initialization closures |
| O0106, O0108 | Quote-withdrawal account parser and exit |
| O0113, O0114, O0115 | Fee-recipient serialization and decoders |
| O0143, O0150 | Mayhem-state and strict curve checked decoders |
| O0158, O0159 | AMM global-config decoders |
| O0215–O0219 | Pump SellV2 CPI helper and both V2 account-info/meta builders |

Every immediate callee shape of 28 of the new windows matches. The remaining two
account conversion windows still reach unmatched decoders at 249208 and 250208.
This is one-hop evidence; transitive closure and data remain separate obligations. Historical identifier
spelling and the historical build recipe are not authenticated by these matches.
The Burn audit checks all 26 immediate callees and typed extents for all 25 data
references. Twenty-three data uses agree; two standard-library Source paths retain
`/Users/runner/...` instead of `/home/runner/...`. The full inventory retains all
other unresolved data and call observations.

## Source composition

The 60 compiler inputs include the existing patched Anchor source, six newly
added files and nineteen added/changed files relative to the 54-input parent.
The changes restore actual source boundaries and source locations, full typed
fee-recipient fields, ordinary serializers, withdrawal/pause methods, post-sell
accounting and used Pump V2 CPI bindings. The V2 bindings compile as an ordinary
local dependency; this preserves required temporary-vector cleanup calls. Legacy
Pump bindings remain in the root crate. Package-specific path remapping restores
V2 source locations. No original ELF is a compiler/linker input and no compiler
output is edited, padded or substituted.

The external curve's unchecked decoder now uses a local input slice. Bounded
register/stack tracing shows that the original also leaves the caller slice
unchanged for long inputs; the parent advanced it. Short padded inputs retain
their separately observed advancement. The tracer is not a complete alias or
interprocedural proof. `consumption.py` records that boundary explicitly.

Two root builds reproduce candidate SHA-256
`96fc7a96d0f7e622ce46436573ac2166c92c6d8180e3bfa3d69fadc176c2e7b6`
and symbol artifact
`29a8d02de4981b3a31e88a248318ec764e721627d84dd17d636252fbf50caa8f`.
Both recompile vendored Anchor and the Pump interface dependency. Other cached
dependencies are reused; this is not an all-dependency-clean compilation.
`source.patch`, `overrides/`, complete input hashes, commands, logs and artifacts
are retained. The build driver supports independent per-agent Cargo targets;
parallel agents do not share mutable compiler outputs.

## Runtime and independent checks

The packet records fresh local replay of 6,636 trade comparisons, 1,032 admin
cases and twelve transactions in three Burn families. Additional focused replay
covers 306 fee-recipient cases, 692 sweep cases, 274 native-withdrawal cases and
329 quote-withdrawal cases. Cases use ordinary synthetic signatures and captured
dependency programs, with no live RPC or mainnet transactions.

The verifier independently checks saved signed transactions, account results,
rollback, event, CPI and return predicates. Diagnostic and compute-log differences
are retained separately. These finite suites are not exhaustive semantics;
initializer success for arbitrary production authority and complete program
behavior are not established by this packet.

```sh
python3 -B research/mayhem-parallel-recovery/analysis.py --check
python3 -B research/mayhem-parallel-recovery/verify.py
python3 -B research/mayhem-parallel-recovery/test_scope.py
```

The verifier requires the prepared Python environment with `solders`. These checks
execute no compiler or target VM. Canonical selected checkpoints remain unchanged.

## Known behavioral gap

The earlier sweep corpus does not cover all nonzero rate-limit configurations.
A separately captured 150-case matrix finds 34 differences: the current candidate
can succeed where the original rejects a rate-limited sweep or fails on checked
signed deadline overflow. The matrix includes ordinary signatures, deadline
boundaries, zero bypasses, administrative bypass and validation precedence.
This checkpoint is incomplete even though its existing regression corpora pass.
The parallel trade lane is implementing and testing the missing rate check.
