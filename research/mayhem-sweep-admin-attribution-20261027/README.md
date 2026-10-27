# O0075: static SweepFeesAdmin attribution

The previously unattributed **8,008-byte O0075 (69,192–77,200)** has a
reconstruction attribution: **SweepFeesAdmin**. It remains unmatched. This
packet adds no recovered function, compiler build, or target execution and
leaves the qualified 432/441 normalized and 100 raw-local counts unchanged.

The proof re-derives direct calls from the frozen original ELF and all 441
inventory windows. O0170 is the only direct caller to O0075's start. Its
complete 488-byte body matches the qualified candidate wrapper after the
existing reader's call/address normalization, including relocation patterns.
The wrapper's unique symbol is `__private::__global::sweep_fees_admin`.
At relative offset 432, original PC 518,216 calls 69,192; corresponding candidate
PC 487,448 calls 69,200, whose symbol is the reconstructed `sweep_fees_admin`
handler. The candidate handler is only 4,408 bytes, versus the original 8,008.

This identifies the counterpart through an already matched caller rather than
choosing a similar-sized body. It does not authenticate original symbol names,
prove indirect-call closure, or establish handler equality. The byte matcher
and historical inventory remain unchanged. Sweep execution remains outside
the active trade recovery scope.

Run from the repository root with Python 3 (standard library only):

```sh
python3 -B research/mayhem-sweep-admin-attribution-20261027/verify.py
python3 -B research/mayhem-sweep-admin-attribution-20261027/test_verify.py
```

The verifier hashes every input before importing the retained reader, checks
the uncompressed symbol artifact binding, recomputes every direct caller,
compares the complete normalized wrapper and follows the paired call to its
unique candidate symbol. `report.json` records the evidence and limitations.
