# AMM formatting-error review

The preserved [review](REVIEW.md) identifies a concrete BufferTooSmall formatter and an unresolved dependency renderer mismatch. No application-source change follows.

Run `python3 -B verify.py --repo /path/to/repository`. This entry point adds package-integrity checks and explicit repository/package paths to the original static assertions; it executes no target program. The original verifier and manifest remain in `history/`. All referenced repository inputs are hash-bound in `input-bindings.json`. Historical paths in the preserved collection script and review are not operational dependencies.
