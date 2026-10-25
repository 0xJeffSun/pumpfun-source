# RETRACTED — this package is based on a wrong compiler (v1.43)

The three candidates here were built with platform-tools **v1.43**, which emits ELF
`e_machine=247` (EM_BPF) — the originals are `e_machine=263` (EM_SBF), built with **v1.44+**.
So these candidates are header-incompatible with the captured programs and must not be used.
The `.so` files have been removed. The correct compiler is **v1.44** (pump/pump_amm/pump_fees)
/ **v1.52** (mayhem), as in status.json and build_reconstruction_candidate.py.
See ../COMPILER-CORRECTION.md for the proof. (Behavioral receipts in RECEIPTS-SUMMARY.json
reflected behavior, which is compiler-independent and was correct, but the build artifacts
were the wrong machine format.)
