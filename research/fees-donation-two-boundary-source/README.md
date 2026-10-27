# Donation source controls: quote boundaries and clean source-arm order

Three parent-bound, ordinary safe Rust research controls for `create_donation_fee_pda`. None is selected as a completed reconstruction. The first two independently change only that source file in the exact 48-file safe Box stage published in [PR #320](https://github.com/lalalune/pumpfun-source/pull/320), commit `7c3537fe8702dfefb9d3f9acb72cff18983ac27b`. No compiler/library settings, dependencies, unsafe code, layout attributes, linker ordering or generated IR are changed.

The third derives from the explicit-branch result, not directly from Box. This eight-file UTF-8 packet contains three source patches, exact source maps, a strict materializer, source tests and this report. It contains no ELF, IR, object/archive, compiler/runtime log, raw execution receipt or encoded payload. Local native observations below are technical prose only.

## Exact parent graph

`direct_outer` and `explicit_branches` apply independently to the same `box` parent; `explicit_branches` does **not** apply on top of `direct_outer`. Only `pool_first` derives from `explicit_branches`. Every edge changes only Donation; all 47 other source files remain byte-identical. The materializer follows this graph rather than accepting an already modified parent as Box.

- **`direct_outer`: mutable outer quote.** Move creator and quote result destinations out of the returned pair expression. The raw quote is written directly into the mutable outer quote, then normalized in place. This removes the unwanted normalized-quote-to-pair copy, but also removes a non-native raw-quote-to-final copy present in the original. The creator copy remains. Donation becomes 13,736 bytes, versus 13,800 original; this is a measured negative, not evidence that smaller is better.
- **`explicit_branches`: separate raw quote and explicit final assignments.** Keep the raw quote separate; assign the outer quote in explicit native/non-native branches, then assign creator. This restores the locally observed original branch/copy/creator topology, while physical stack locations still differ. Donation measures 13,800 bytes and 1,641 instructions, matching original extent and count, but its complete instruction body still does **not** match.
- **`pool_first`: clean condition/arm reorder.** On `explicit_branches`, complement the four nonzero OR tests into all-zero AND tests in the same field-read order, with Pool first and the unchanged live-curve arm second. Source checks cover all 16 truth-table/read-prefix cases and 14 rejecting guards. Pool statements and macro coordinates stay in place; five unchanged live statements move into existing blank lines. Those coordinates are deliberately inferred, not historical source evidence. The ordinary native result changes only 34 register bytes in Donation instruction offsets 960–1384 versus its explicit-branch parent. Branch instructions, stack offsets, immediates and the earlier Rc/Pool placement are unchanged. This is a negative result for this clean arm-order hypothesis: 13,800 bytes / 1,641 instructions still do not make the complete body equal. No likelihood hints or compiler options were introduced.

The source keeps the same validation, fallible raw-quote reads, normalization choice, creator retrieval and returned key order. This is inferred source, not a claim of historical authorship or a guarantee of Rust layout. The first two controls isolate why eliminating an aggregate copy is insufficient when it also changes an earlier producer-to-destination copy.

## What was measured locally

For **all three** controls:

- All 583 normalized and 143 raw-local original function matches remain; no full function is gained or lost. All 584 other parent complete shape/size multiplicities are retained.
- The 188 measured complete source Locations and 4,136 prior positive actual direct-call edges remain. These are finite scoped obligations, not an all-data or recursive-semantics claim.
- Sweep's complete normalized body, 37 actual call sites, 17 typed operands and 289 alias relations remain. Crank's parent body and 35 same-offset actual callees remain; Crank is still unmatched against original.
- Donation retains 77 actual complete callee identities in order and 49 typed references resolving to 19 consumed objects with the existing source/alias checks.

For the **first two** controls, separate local byte-provenance checks retain creator fragments of 7 + 16 + 9 bytes and the 32-byte quote through the observed return/state-copy paths. They do not establish every cleanup/drop path, compiler ABI equivalence or runtime behavior.

The explicit-branch payer argument setup was measured rather than assumed equal: its bound 64-byte comparator (`memcmp`) call is at the same observed function offset, and four setup instructions are literally identical, but two stack-address immediates differ by 64 bytes. The six setup rows are therefore **not** byte-identical. Different stack locations are reported, not masked into equality. The upstream ownership and producer roles of the two payer-comparison inputs remain only partially attributed; these six argument instructions do not prove the complete payer data flow. Earlier block rotation was already present in the parent and is not described as a newly introduced decoder regression.

None of the three controls has a repeated native build or fresh VM/runtime qualification. Prior runtime receipts belong to other exact artifacts and are not transferred here. Matching function size, instruction count, local copy topology or ordered callees does not establish full body or whole-binary identity. Remaining register/frame, producer, ordering and cleanup differences require further evidence; no completion percentage follows from these local results.

A separate bounded comparison of the original and explicit-branch Donation maps all 1,641 instruction boundaries and the successor structure of 105 branch sites under the known Rc/Pool block rotation. This is syntactic graph correspondence, not proof of operand values, branch weights, callee internals or whole-body semantics. Our toolchain/settings are verified for these reconstructed builds, not independently authenticated as the original historical recipe. No further local trial is currently evidence-grounded by these observations.

## Source-only reproduction

Obtain the existing public prerequisites separately; these tools neither download them nor invoke a compiler. The base source is [PR #302](https://github.com/lalalune/pumpfun-source/pull/302), commit `d6466ed793dd2fa68c23ba1c22c5b26a715e1082`, path `research/fees-causal582-source/source`. The PR #320 packet is `research/fees-safe-residual-source` at the exact commit above.

First materialize its exact safe Box stage:

```sh
python3 -B /path/to/pr320/research/fees-safe-residual-source/source_tools.py \
  --parent /path/to/pr302/research/fees-causal582-source/source \
  --stage box --output /fresh/path/safe-box-parent
```

Then, from this packet's directory (each command still starts with the exact Box parent):

```sh
FEES_SOURCE_PARENT=/fresh/path/safe-box-parent python3 -B test_source.py
python3 -B source_tools.py --parent /fresh/path/safe-box-parent \
  --stage direct_outer --output /fresh/path/direct-outer
python3 -B source_tools.py --parent /fresh/path/safe-box-parent \
  --stage explicit_branches --output /fresh/path/explicit-branches
python3 -B source_tools.py --parent /fresh/path/safe-box-parent \
  --stage pool_first --output /fresh/path/pool-first
```

All 23 pure source/materializer tests pass, including the third-stage parent edge, unchanged arm text, all 16 reserve truth/read-prefix cases, and wrong-branch rejection. The separate local source review rejected 14 semantic/coordinate corruptions.

The materializer checks all 48 inputs, exact changed paths, reversible patches, all output hashes and the eight-file packet allowlist. Altered/missing/extra inputs, traversal, symlinks, existing outputs and accidentally composed parents are rejected. Outputs are source only; successful materialization explicitly does not certify native, runtime or whole-binary identity.

These are three bounded research results, not a new selected checkpoint, a completed Fees body, or permission to merge/deploy. No unrelated program research or execution is included.
