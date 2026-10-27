# Final three account-cohort data bounds

This work leaves the published `fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4` program unchanged. It closes the three references left unresolved by `research/mayhem-account-data-extents`: the existing 156-reference cohort becomes 156 typed-equal, zero typed-different and zero unresolved. It adds no function-window match and makes no whole-ELF claim.

* **Original 0xb1220, two uses:** a tag-zero `std::io::SimpleMessage` for `READ_EXACT_EOF`. The target ABI probe establishes size 24, alignment 8, message at 0 and a one-byte kind at 16. Both actual consumers call the complete matching Borsh EOF converter, whose tag-zero branch reads that byte and compares 37. The relocated message pointer, length 27, exact `failed to fill whole buffer` payload and kind match. The seven padding bytes have no assigned ABI semantics; their observed saved bytes are also compared.
* **Original 0xb1340, one use:** the 32-byte empty hashbrown `RawTableInner` header and its 8-byte all-`ff` static control group. The actual parser copies its four words, constructs 16 zero hasher bytes, then passes the resulting 48-byte set to the complete matching `HashMap::insert` body. The separate target probe reproduces that precise 32+16 construction for an empty 32-byte-key `HashSet`. The old description as an “empty formatting prefix” was incorrect.

`refinement.py` binds the actual original and candidate read instructions, complete consumer shapes, static values and nested pointers. The ABI source and recorded compiler command live beside it; `probe-01/` retains the initial run and `probe-02/` the independent repeat. No accepted program is recompiled by the checker. The probe is compiled independently with the unchanged macOS v1.54 compiler and official Linux v1.54 target libraries; its source, compiler hash, options and IR hash are recorded. `hashbrown-0.15.4/` and `rust-library-sources/` provide explanatory source excerpts with their upstream MIT/Apache-2.0 licenses; the compiled target probe and actual consumer instructions provide the controlling layout evidence. The second compilation reproduces the IR exactly and checks all 26 target-library hashes before and after compilation.

Run from this repository:

```sh
python3 -B research/mayhem-account-cohort-complete/verify.py
python3 -B research/mayhem-account-cohort-complete/test_scope.py
```

The 12 tests include an unchanged control and in-memory changes to error kind, message, lengths, tags, pointer targets, load widths, empty-table fields, control bytes and constructed hasher state. Reference files are never mutated. `historical-build-probe.py.txt` preserves the original controller; `build_probe.py` provides a portable interface requiring explicit SDK and target-inventory paths.

These are typed bounds and content/target comparisons. Absolute relocated pointer bytes, arbitrary data outside this cohort, unrelated indirect calls, unbounded allocations and whole-program equivalence remain outside the result.

To reproduce the ABI probe in a new output directory:

```sh
python3 -B research/mayhem-account-cohort-complete/build_probe.py --sdk /absolute/pinned-sdk --target-inventory research/mayhem-source-data-recovery/provenance/target-libraries.json --output /absolute/new-probe
```
