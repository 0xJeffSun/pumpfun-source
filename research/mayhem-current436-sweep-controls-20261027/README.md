# Partial SweepFees source control on qualified436

This source control moves native-quote detection to the outer handler and passes
the result into the existing sweep method. It preserves all 436 normalized
windows, 141 raw-local bodies, 429 direct-call-closed windows, 4,473 supported
direct edges and 486 matching Source observations. It adds no complete match.

O0076 is 8,384 bytes, versus 8,400 in the original. All 51 immediate callee shapes
match in order, and the original 13 Source-location values agree. The complete
normalized body still differs. Two root builds reproduce the same full candidate
and symbol images; these use a reused dependency cache, not fresh dependencies.
No runtime replay is claimed for this exact candidate. The qualified436 runtime
records must not be transferred to it. Whole-ELF identity remains false.

The exact 67-file source archive, source diff, compiler/linker records and both
artifacts are preserved. The helper remains ordinary Rust; no dummy operations,
assembly, patched ELF bytes or matcher changes are used. Verification reads saved
evidence and rechecks source, complete-image equality, matched-window preservation
and the remaining Sweep body mismatch.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-sweep-controls-20261027/verify.py
```
