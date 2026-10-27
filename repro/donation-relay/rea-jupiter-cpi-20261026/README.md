# Relay Jupiter CPI source recovery

The recovered Jupiter CPI body now matches all **2,496 bytes of original window
90 after normalization**. Relay advances to **477/492 normalized original-window
matches**, retaining all previous 476 matches and 107 raw matches. This is still
not complete artifact equality.

The captured instructions distinguish two Rust source choices. Account infos
are cloned through an iterator collection, rather than `slice::to_vec()`. Signer
seeds use `Option<&[&[&[u8]]]>`, with the unsigned branch first. The preceding
iterator-only trial matched 295 instruction records but differed in four
seed-handling instructions. The combined source recovery matches the complete
window. The caller passes `Some(seeds)` and retains its previous normalized body.

Every other one of the 491 emitted function windows retains its normalized body.
All 11 direct-call occurrences in the recovered function have recursively closed
normalized call-shape witnesses. It has no indirect calls. Its two relocated data
references still lack complete data-object equality; no data or ABI closure is
inferred merely from instruction normalization.

All 18 existing runtime groups pass: 527 case records containing 289 unique
normally signed offline transactions. These finite fixtures and the frozen
comparator are unchanged. They do not establish exhaustive inputs, allocator
failures, all indirect/data behavior or every privileged success path.

`current/` records a separate fresh SDK v1.48 build directly from current source,
reproducing both tested artifacts exactly. The candidate is 818,248 bytes, versus
the captured original's 830,448 bytes. Fifteen original windows, toolchain
provenance, data, relocations and full ELF identity remain unresolved. No target
machine instructions or patched executable bytes enter the Rust build.

```sh
work/test-env/bin/python -B repro/donation-relay/rea-jupiter-cpi-20261026/verify.py --current
```

The verifier recomputes whole-ELF comparisons, proves the new complete normalized
body and preservation of the other 491 bodies, and rechecks saved signatures and
runtime comparisons. Build scripts and commands record their original work
locations. The candidate trial reused dependencies; the current-source build
used a fresh target directory. Rejected source trials remain under `work/rea-*`.

The recovered allocator source descriptor has the same file suffix, line 1971,
and column 9 as the target, but carries the native SDK `/Users/runner/...` prefix
instead of `/home/runner/...`. Applying a root-crate path-remap flag produced
identical artifacts and did not repair that imported descriptor. This negative
result is retained in `root-remap-trial.json`.
