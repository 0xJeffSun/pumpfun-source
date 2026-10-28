# Selected data checks for Mayhem436

This strengthens the [qualified436](../mayhem-current436-composition-20261027/README.md)
whole-window relation with three explicit obligations: all corresponding Source
coordinates, relocated code-address loads, and 32-byte data prefixes selected by
the original bytes. The original and candidate binaries are unchanged.

The selected prefix has two scalar words (size and power-of-two alignment), a
zero-or-function pointer at offset zero, and a function pointer at offset 24.
Nonzero pointers require actual relocations and complete inferred function targets.
The reader checks all 32 bytes by value or mapped target; it does not infer a
larger allocation or authenticate the prefix's Rust type. Selection bounds are
explicit (size at most 1 MiB, alignment at most 4,096) and are not completeness claims.

| Measure | Result |
|---|---:|
| Original selected prefixes | 30 |
| References to selected prefixes in matched windows | 119 |
| Matching Source-coordinate sites | 486 |
| Relocated code-address sites | 48 |
| Direct-call-only relation | 429 windows / 601 pairs |
| Stronger selected-data relation | 429 windows / 579 pairs |

All 429 windows retain a corresponding pair. The stronger obligations reject 22
alternative pairings that matched a complete normalized instruction body but
had incompatible selected data or recursively depended on such a pairing.
The reduction is in ambiguous counterpart pairs, not in recovered functions.
Complete normalized bodies remain 436/441, including 141 raw-local bodies.

This is a bounded data relation. It does not establish object extents beyond
these 32 bytes, consumer value flow, arbitrary indirect dispatch, full data
identity, runtime equivalence or whole-ELF identity. The selected original
function boundaries and normalization remain the existing reader's assumptions.

Verification recomputes the relation from the two exact ELF images. Mutation
checks change actual size/alignment words and callback pointers for every
selected candidate prefix, remove a relocation, and corrupt a Source coordinate.
The same 436 local body matches survive those data mutations while their affected
counterpart relation is rejected. Filesystem controls reject unlisted files,
symlinks and special files.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-selected-prefixes-20261027/verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-selected-prefixes-20261027/test_verify.py
```
