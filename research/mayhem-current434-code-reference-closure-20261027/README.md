# Mayhem 434: relocated code-reference closure

The [qualified 434-window composition](../mayhem-current434-composition-20261027/README.md)
also preserves every original code-address load in its matched windows: **48
sites refer to 15 original function windows**, represented by 56 candidate
pairs because some function bodies have multiple identical counterparts.

The reader checks the actual `lddw` relocation at each corresponding instruction
offset, requires both pointer values to name complete function windows, and
adds those target pairs to the existing ordered direct-call relation. Repeated
pruning leaves the same **425 original windows / 597 function pairs** closed
under both kinds of edge. Every one of the 56 reference pairs belongs to that
relation. The original ELF and the exact qualified candidate are hash-bound;
neither is modified or executed.

This is stronger evidence for a selected data obligation, with **zero new
function matches, builds or runtime executions**. The candidate remains 434/441
normalized windows, including 141 raw matches. Loading a code address does not
prove that a particular indirect call consumes it, and corresponding whole
instruction windows do not prove their complete data or runtime behavior.

## Remaining data and indirect-call scope

The full original-window inventory contains 93 indirect calls in 51 windows.
All 51 already have normalized body matches. These calls require their own
argument/vtable/value-flow evidence; this packet does not close them.

The matched windows contain 472 Source-location references and 1,362 other
relocated references, including the 48 code-address sites checked here. The
472 Source locations are checked by the parent composition. The other 1,314
references include selected typed checks in earlier packets, but this packet
does not claim general object extents or recursive data closure. A further 47
Source references are inside the seven unmatched business bodies. These are
counts of instruction reference sites, not unique allocations or engineering
completion percentages.

## Verify

From the repository root:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current434-code-reference-closure-20261027/proof.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current434-code-reference-closure-20261027/test_proof.py
```

The first command rejects symlinks and special files, checks the exact package inventory and all external input hashes,
recomputes the graph from ELF bytes, and requires an exact saved-report match.
The tests redirect every distinct candidate code-pointer site to an unrelated
complete function. The normalized window count and old direct-call relation
survive those mutations, while the new relation rejects each corrupted edge.
Additional controls cover a function-interior pointer, a code-to-data pointer,
a missing relocation and a corrupted target body. A non-code data mutation
is accepted by this deliberately bounded graph while changing the input hash;
ordinary verification therefore still rejects the changed artifact.
An independent review's FIFO counterexample is covered by a temporary-copy
special-file rejection test.

`observations.json` records every selected instruction offset, pointer target,
candidate symbol name and original-window classification. The existing ELF
reader, normalization policy and window inventory are used unchanged and
hash-bound in `inputs.json`. Whole-ELF identity and generic indirect-call
closure remain unproved.
