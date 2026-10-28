# Five 48-byte writer records in Mayhem436

This extends the existing [32-byte selected-prefix proof](../mayhem-current436-selected-prefixes-20261027/README.md) for five records. Their additional words at offsets 32 and 40 are actual relocated code pointers, and their targets participate in the same recursive whole-window relation as their owners. The original and candidate ELF files, reader, normalizer and qualified source are unchanged.

| Obligation | Result |
|---|---:|
| Selected original records, each 48 bytes | 5 |
| References to these records in matched windows | 47 |
| Additional pointer words checked | 10, covering 80 original storage bytes |
| Selected-data relation before and after | 429 windows / 579 counterpart pairs |
| Local window matches, unchanged | 436 normalized / 141 raw-local |

All six words in each selected span are accounted for: drop pointer or zero, size, alignment, and three code pointers. Nonzero pointers require type-8 relocations, zero low words and complete function-entry targets. The added target pairs must survive the recursive relation; matching a function's bytes alone is insufficient.

The candidate symbols identify four `String` writer tables and one `PadAdapter` writer table. The three callable slots correspond to `write_str`, `write_char` and `write_fmt`. Exact compiler-library source snapshots in `source-context/` show those methods and default implementations. They support these candidate-side labels; they do not authenticate the original historical source or compiler. The record selector itself uses original bytes, relocation records and complete target bounds, not these labels.

This proves an additional bounded data obligation. It does **not** establish that 48 bytes is the complete allocation extent, that these pointers are consumed by every indirect call, or that the original and candidate pointer bytes have identical numeric values. It establishes corresponding referenced functions over the existing normalized/Source/code-reference relation. Arbitrary data, dynamic dispatch, runtime behavior and whole-ELF identity remain open. No function or runtime count is added.

The verifier recomputes every record and recursive target obligation from the exact images. Mutation controls alter all ten added pointers and remove an actual relocation; the original 32-byte relation still passes while the affected extended pairing is rejected. Additional controls cover source-context corruption, portable execution, unlisted files, symlinks and special files. No compiler, VM or target program runs.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B verify.py --repo /absolute/path/to/pumpfun-source
PYTHONDONTWRITEBYTECODE=1 python3 -B test_verify.py
```
