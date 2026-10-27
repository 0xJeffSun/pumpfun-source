# Donation source controls: explicit quote-production boundaries

Two independently parent-bound, ordinary safe Rust research controls for `create_donation_fee_pda`. Neither is selected as a completed reconstruction. Both change only that source file in the exact 48-file safe Box stage published in [PR #320](https://github.com/lalalune/pumpfun-source/pull/320), commit `7c3537fe8702dfefb9d3f9acb72cff18983ac27b`. No compiler/library settings, dependencies, unsafe code, layout attributes, linker ordering or generated IR are changed.

This seven-file UTF-8 packet contains two source patches, exact source maps, a strict materializer, source tests and this report. It contains no ELF, IR, object/archive, compiler/runtime log, raw execution receipt or encoded payload. Local native observations below are technical prose only.

## Independent controls, not a patch chain

Both patches apply directly to the same `box` parent; `explicit_branches` does **not** apply on top of `direct_outer`. All 47 other source files must remain byte-identical.

- **`direct_outer`: mutable outer quote.** Move creator and quote result destinations out of the returned pair expression. The raw quote is written directly into the mutable outer quote, then normalized in place. This removes the unwanted normalized-quote-to-pair copy, but also removes a non-native raw-quote-to-final copy present in the original. The creator copy remains. Donation becomes 13,736 bytes, versus 13,800 original; this is a measured negative, not evidence that smaller is better.
- **`explicit_branches`: separate raw quote and explicit final assignments.** Keep the raw quote separate; assign the outer quote in explicit native/non-native branches, then assign creator. This restores the locally observed original branch/copy/creator topology, while physical stack locations still differ. Donation measures 13,800 bytes and 1,641 instructions, matching original extent and count, but its complete instruction body still does **not** match.

The source keeps the same validation, fallible raw-quote reads, normalization choice, creator retrieval and returned key order. This is inferred source, not a claim of historical authorship or a guarantee of Rust layout. The two controls isolate why eliminating an aggregate copy is insufficient when it also changes an earlier producer-to-destination copy.

## What was measured locally

For **each** control:

- All 583 normalized and 143 raw-local original function matches remain; no full function is gained or lost. All 584 other parent complete shape/size multiplicities are retained.
- The 188 measured complete source Locations and 4,136 prior positive actual direct-call edges remain. These are finite scoped obligations, not an all-data or recursive-semantics claim.
- Sweep's complete normalized body, 37 actual call sites, 17 typed operands and 289 alias relations remain. Crank's parent body and 35 same-offset actual callees remain; Crank is still unmatched against original.
- Donation retains 77 actual complete callee identities in order and 49 typed references resolving to 19 consumed objects with the existing source/alias checks.
- The local byte-provenance checks retain creator fragments of 7 + 16 + 9 bytes and the 32-byte quote through the observed return/state-copy paths. They do not establish every cleanup/drop path, compiler ABI equivalence or runtime behavior.

The explicit-branch payer argument setup was measured rather than assumed equal: its bound 64-byte comparator (`memcmp`) call is at the same observed function offset, and four setup instructions are literally identical, but two stack-address immediates differ by 64 bytes. The six setup rows are therefore **not** byte-identical. Different stack locations are reported, not masked into equality. The upstream ownership and producer roles of the two payer-comparison inputs remain only partially attributed; these six argument instructions do not prove the complete payer data flow. Earlier block rotation was already present in the parent and is not described as a newly introduced decoder regression.

Neither control has a repeated native build or fresh VM/runtime qualification. Prior runtime receipts belong to other exact artifacts and are not transferred here. Matching function size, instruction count, local copy topology or ordered callees does not establish full body or whole-binary identity. Remaining register/frame, producer, ordering and cleanup differences require further evidence; no completion percentage follows from these local results.

## Source-only reproduction

Obtain the existing public prerequisites separately; these tools neither download them nor invoke a compiler. The base source is [PR #302](https://github.com/lalalune/pumpfun-source/pull/302), commit `d6466ed793dd2fa68c23ba1c22c5b26a715e1082`, path `research/fees-causal582-source/source`. The PR #320 packet is `research/fees-safe-residual-source` at the exact commit above.

First materialize its exact safe Box stage:

```sh
python3 -B /path/to/pr320/research/fees-safe-residual-source/source_tools.py \
  --parent /path/to/pr302/research/fees-causal582-source/source \
  --stage box --output /fresh/path/safe-box-parent
```

Then, from this packet's directory:

```sh
FEES_SOURCE_PARENT=/fresh/path/safe-box-parent python3 -B test_source.py
python3 -B source_tools.py --parent /fresh/path/safe-box-parent \
  --stage direct_outer --output /fresh/path/direct-outer
python3 -B source_tools.py --parent /fresh/path/safe-box-parent \
  --stage explicit_branches --output /fresh/path/explicit-branches
```

The materializer checks all 48 inputs, exact changed paths, reversible patches, all output hashes and the seven-file packet allowlist. Altered/missing/extra inputs, traversal, symlinks, existing outputs and accidentally composed parents are rejected. Outputs are source only; successful materialization explicitly does not certify native, runtime or whole-binary identity.

These are two bounded research results, not a new selected checkpoint, a completed Fees body, or permission to merge/deploy. No unrelated program research or execution is included.
