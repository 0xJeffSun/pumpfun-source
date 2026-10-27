# V2 Fees update finishing helper recovered from Rust

The complete 5,656-byte function at original address 225920 now matches under
the unchanged instruction normalization. All 36 direct callees and all 27
relocated data references match, including formatting tables, source locations,
program ID, event prefix and authority seed.

Fees coverage rises from 572 to **573/585 normalized original functions** with
143 raw local matches, 171 equal Location observations and 3,765 equal direct
callee observations. No earlier normalized/raw match, Location or positive
callee observation is lost. Twelve original functions remain unmatched.
**Whole meaningful ELF and whole capture remain unequal.**

## Source reconstruction

The V2 routine has the same compiler-level argument pattern as the recovered
legacy finisher: accounts, event-authority bump, and the new shareholder vector.
It validates shares, updates the sharing configuration, and emits both event
forms. Extracting those operations from the caller into a Context-taking Rust
helper reproduces the whole function. The captured source path is
`instructions/fee_sharing/update_fee_shares_v2.rs`; checks occur at lines
292/293/303/325/326. The new module provides that ordinary source placement.
The helper name is descriptive, not proof of historical spelling.

The V2 caller remains unmatched (7,920 candidate bytes versus 7,968 original
bytes). This packet does not claim that its surrounding call path is closed.
No assembly, binary patch, synthetic Source object or extra matching mask is used.

## Validation and limits

Two independent native root builds from the same 44 source inputs reproduce
candidate SHA-256
`cdd050b71f4df64f6a2f75b40c15eb2189ae75de2df77d71d2bd13198910e474`
and symbol-bearing SHA-256
`1d2a0ac774a464a984c7407ea8b1a490f66ddae39e3539e17748020a9b7e8bab`.
They use the parent's cached dependencies, locked/offline Linux platform-tools
v1.44 build and v1.52 stripping command. They are not fresh all-dependency builds.
All source inputs, commands, logs, outputs and comparison reports are retained.

Fresh execution passes 17,331 cases across 18 suites, 119 native arithmetic
cases, eight quote-owner cases and 24 preprocessing cases. Each suite's original
limits remain applicable. Finite synthetic tests do not establish exhaustive
semantics, mainnet reachability or whole-binary identity.

```sh
python3 -B research/fees-v2-finish-source-recovery/verify.py
python3 -B research/fees-v2-finish-source-recovery/test_scope.py
```

The standalone verifier authenticates the parent, recomputes complete function,
callee and data comparisons, and checks saved runtime evidence. Negative controls
reject unsealed claims, parent-binary substitution and an omitted runtime case.
