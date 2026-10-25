# Fees withdrawal main build identity

One clean root main build applies the reviewed three-site withdrawal correction and exact final README. Both the complete executable and the complete symbol-bearing ELF are byte-identical to the tested scratch build. Main source contains 26 bound inputs: README differs intentionally from scratch, and the other 25 Rust/Cargo/IDL/workspace inputs are identical.

The executable SHA-256 is `76b027c2f4393912e274c1f05b21de77743e18116969a3546ccf8718c2cfa7f7`; symbols SHA-256 is `086901d9b3860569b3990198e7a63a9af94bace3602b4d96119eaceda2eca351`. This packet retains the root build records, exit records, before/after dependency gates, source and helper files, and selected files bound to the complete scratch manifest.

The scratch evidence records 17,461 passing comparisons and a separate ten-step sequence, 17,204 verified signatures in 8,644 baseline/sequence transaction fields, 80 signatures in 40 focused fields, and separately verified historical messages. Main inherits those observations solely by full executable and symbol identity; no target runtime is repeated here. Full receipts and the saved-signature verifier are in the companion scratch package `../withdraw-owned-error-v144/`.

Missing-vault and missing-user application errors have direct existing-case coverage. The final missing-token-program application error has static support only; the existing cases hit earlier checks or parser constraints. The scratch raw log differences and all unproven original/recursive equivalence limits remain. No original whole-file identity or unique historical source claim is made.

Run `python3 -B verify.py` using only this packet. Optionally supply `--current-main /absolute/repository/path` to compare actual current source and helper files with the bound build inputs. The verifier runs no compiler and executes no target transaction.

`validation/` provides the same ten comparison reports and separate sequence as losslessly compressed JSON for existing status tooling. `validation-bindings.json` binds every decompressed report to its exact member in the included, scratch-manifest-bound receipt archive. These are copies of the scratch results, not a main replay.
