# Mayhem provider sharing recovery

This source successor removes duplicated compiler-generated providers while
preserving **428/441 normalized windows and all 100 raw-local matches**. It adds
no complete original function match. The thirteen unmatched bodies and 112,584
unmatched original text bytes remain unchanged; whole-ELF identity is false.

Two ordinary Rust builds reproduce the same qualified artifacts:

| Artifact | SHA-256 |
| --- | --- |
| Stripped | `04257040d6e05fe3e105ef1bae8bf1563f177b8f5ddbd02b774dd126931a8eac` |
| Symbols | `b537ac29531fc1d4cf6146212afa7b409663ec92ad8d4b363622b8f4a4b87ecb` |

Six of the parent's 66 source inputs change. The curve account crate reexports
the same Anchor SPL token interface used by both AMM handlers, and the Cargo
profile gives `solana-stake-interface` two code-generation units. These changes
remove one duplicate `Error::new<String>` provider and one AccountMeta vector
growth provider, together with their now-unused helpers. The candidate has
449 function sections instead of 456 and 663,376 text bytes instead of 664,384.
No source assembly, linker padding or executable-byte patch is used.

The Error constructor now has one counterpart instead of two. All nine original
caller groups reach it at their matching call sites. Its four immediate callees,
selected 88-byte error vtable and nested 32-byte Display table are checked against
the original. AccountMeta `grow_one` has two counterparts instead of three.
These are bounded call/data checks, not an exhaustive transitive proof.

The missing allocator relationship remains explicit: both original 328-byte
`finish_grow` windows still have only one candidate counterpart, and no matching
640-byte reserve helper calls it. The sysvar AccountMeta growth provider also
remains separate. The original-to-candidate ordering retains hypotheses; it is
not an authenticated original function map.

The source contains the parent's initializer Source correction unchanged. An
ordinary qualified linker permutation accounts for every one of the candidate's
449 sections, 4,916 direct calls, 10,330 local branches and 2,530 relocations,
plus data pointers, symbol values and entrypoint. It predicts every byte in both
stripped and symbol outputs relative to the unqualified build. All 4,280 prior
positive call observations, 444 matched Source records and observed Source
profiles survive. The initializer's two additional Source records remain equal.

Fresh local replay covers 69 initializer comparisons and 2,496 AMM comparisons:
168 initializer execution records have signature checks and actual program-account
attestations, and 4,992 AMM records have signature checks. The initializer includes
ten successful Pump CPI cases. AMM checked fields and non-compute diagnostics
retain the parent's results. Earlier Legacy, V2 and ExtendAccount receipts stay
bound to their earlier artifacts; they are not counted as executions of this one.
This packet does not promote a maintained selection or establish live acceptance.

```sh
python -B research/mayhem-provider-sharing/verify.py --repository-root "$PWD"
python -B research/mayhem-provider-sharing/test_scope.py
```

Verification reads saved evidence and checks signatures; it executes no compiler,
target program or network request. Use a solders-enabled Python for runtime
verification, or `--skip-runtime` for static checks. The complete source archive,
exact source patch, pinned SDK records, build commands, logs and linker recipes
are retained. Builds use the parent's mixed host/target SDK and locked dependencies;
they do not establish historical toolchain provenance. The first qualified build
uses a fresh target directory; the repeat cleans the root and Anchor crates.
