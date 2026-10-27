# AMM handler source-shape controls on the 432-window parent

Nine ordinary Cargo root builds isolate source-level causes of the remaining
AMM Buy and Sell differences. The [qualified parent](../mayhem-quotes-current-recovery-20261027/README.md)
remains **432/441 normalized, 100 raw-local, nine unmatched**. This packet adds
**no accepted function match and no target execution**.

The controls retain the complete 67-file parent source, exact changed files,
patches, compiler commands, input hashes, logs and full stripped/unstripped
outputs. Every control uses the same checked tools and target libraries, with
an isolated mutable cache. These are incremental root builds reusing pinned
dependencies, not clean all-dependency builds or original-toolchain provenance.
Standard stripping is the only post-link transformation.

The search build order gives **432 normalized / 89 raw-local** matches. All
eight source variants preserve that search baseline's complete bodies, raw
matches, positive call shapes and Source profiles. Its eleven fewer raw matches
than the qualified parent are not attributed to source changes. The independent
qualified-order build of the `root-sell-inline-price` source preserves all
**432 normalized / 100 raw-local**, 4,314 positive immediate-call observations
and 456 positive Source references. It has one retained build, without repeat
compilation or runtime qualification, and does not replace the selected parent.

The [derived observations](observations.md) separate three useful changes:

- Explicit field copies remove the extra out-of-line AccountInfo clone calls
  from AMM Sell. Its body grows from 8,088 to 16,064 bytes, still different from
  the 17,312-byte original.
- A small enum-valued arithmetic result restores the original Sell immediate
  callee multiset. The order of those calls still differs.
- Deferring native-token comparisons and the checked scaling result moves the
  instruction sequence closer to the original. The last Sell control has 567
  aligned slots out of 2,164; the last Buy control has 330 out of 1,217. These
  partial sequence scores do not establish byte identity or semantic equivalence.

All six large trade handlers remain unmatched. Current error precedence, data
references, complete call ordering, register allocation and object lifetimes
remain obligations for further recovery. The original and candidate head
disassemblies are retained as observations. No assembly replacement, invented
padding or dummy machine operation is used.

```sh
python -B research/mayhem-amm-handler-shape-controls-20261027/verify.py
python -B research/mayhem-amm-handler-shape-controls-20261027/test_verify.py
```

The verifier re-derives the table, complete body counts, call multisets and
source/build bindings from retained artifacts. It executes no compiler or VM.
The parent's signed runtime evidence remains bound to the parent's artifact;
it is not transferred to these experimental builds. Whole-ELF identity is false.
