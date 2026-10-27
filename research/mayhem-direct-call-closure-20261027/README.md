# Mayhem normalized bodies under ordered direct calls

The qualified 432-window artifact admits **722 normalized body pairs** before
checking call destinations. A fixed-point audit retains **594 pairs covering
414 original windows** when every ordered direct-call target must itself belong
to the retained relation. **Eighteen normalized windows lack any such counterpart.**
This is an additional static diagnostic; the established 432/441 body count and
100 raw-local matches remain unchanged.

The check enumerates all candidate function symbols instead of using the
inventory's five-counterpart display limit. It re-derives the complete inventory,
checks direct-call offsets, and prunes pairs with unsupported target pairs in
simultaneous rounds: **109, 18, then 1**. Supported recursive cycles survive.
The result is a greatest relation, not a globally injective function assignment.

## Concrete remaining call obligations

Eight business wrappers call unmatched handlers: O0169/O0170 and O0186–O0191.
That rejection propagates to dispatch O0166, then entry O0194. Those ten windows
have matching normalized bodies but lack matching handler closure.

A separate allocator-provider issue affects O0210 and seven transitive callers:
O0207, O0208, O0214, O0215, O0217, O0219 and O0222. At relative offset **528**,
all four O0210 counterparts call a `alloc::raw_vec::finish_grow` specialization
which is not a normalized counterpart of original **O0209 (539,680, 328 bytes)**.
O0209 itself has a matching, direct-closed candidate at **569,024**. The presence
of that body elsewhere does not validate the destination actually called by
O0210. The full report records each actual target, symbol and propagation edge.
This is a concrete provider-sharing obligation alongside the missing handlers.

Other rejected candidate alternatives do not necessarily reject an original
window: another counterpart can survive. The report preserves every alternative
and removal round so these two cases can be distinguished.

## Reproduction and limits

```sh
python3 -B research/mayhem-direct-call-closure-20261027/verify.py
python3 -B research/mayhem-direct-call-closure-20261027/test_verify.py
python3 -O -B research/mayhem-direct-call-closure-20261027/test_verify.py
```

Python standard library only. Four inputs are SHA-256 bound before the retained
reader is imported; the decompressed symbol artifact is checked separately.
The saved report is compared against independently recomputed evidence.
Tests cover supported recursion, unsupported cycles, multi-round propagation,
independent counterpart alternatives and mutation of every input.

No compiler or target VM runs, no executable is modified, and no new body is
recovered. Indirect calls, data/vtable references, external implementations,
relocation values, injective assignment, original provenance and whole-ELF
identity remain unresolved. A surviving relation is **not semantic equivalence**.
Calls to interior addresses or missing symbol starts fail this bounded check.

## Fresh Linux follow-up

The [portable Linux builds](../mayhem-clean-linux-build-20261027/README.md) use
fresh dependency graphs and default section order. Applying the same relation
to their baseline and Legacy Buy control gives 730 body pairs and 602 retained
pairs, but still **414 original windows** with direct-call support. The same
18 windows remain unclosed. Extra counterpart alternatives do not repair the
actual allocator call targets or the missing business handlers.

The input bindings and complete reports are in [portable-followup.json](portable-followup.json).
`portable_followup.py` verifies every external input, re-derives the candidate
inventory, then uses the unchanged hash-bound pruning algorithm with those
new input bindings. No normalization mask or pruning rule changes. This is
additional static evidence, not fresh runtime or whole-ELF qualification.

```sh
python3 -B research/mayhem-direct-call-closure-20261027/portable_followup.py
python3 -O -B research/mayhem-direct-call-closure-20261027/portable_followup.py
```
