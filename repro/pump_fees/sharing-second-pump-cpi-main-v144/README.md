# Fees second Pump creator migration typed CPI main build identity

One clean root main build applies the reviewed second typed Pump creator migration, with IDL unchanged and exact final README. Both the complete executable and the complete symbol-bearing ELF are byte-identical to the tested scratch build. Main source contains 26 bound inputs: README differs intentionally from scratch, and the other 25 Rust/Cargo/IDL/workspace inputs are identical.

The executable SHA-256 is `466725afe7406860177df56696a60897874ffa6dab7429e5cc62da087dbf48b5`; symbols SHA-256 is `31604790201a414dfe4bd2a8515eb213b3731ad0c36be61da56dc2a123d91d7e`. This packet retains the root build records, exit records, before/after dependency gates, source and helper files, and selected files bound to the complete scratch manifest.

The scratch evidence records 17,461 passing comparisons and a separate ten-step sequence, 17,204 verified signatures in 8,644 baseline/sequence transaction fields, 80 signatures in 40 focused fields, and separately verified historical messages. Main inherits those observations solely by full executable and symbol identity; no target runtime is repeated here. Full receipts and the saved-signature verifier are in the companion scratch package `../sharing-second-pump-cpi-v144/`.

The first typed CPI helper and its complete AccountMeta/AccountInfo constructors match original instruction windows under the retained normalization method; every immediate target body is supported. The remaining three manual calls are unchanged. Raw diagnostics and unresolved recursive target semantics remain retained; no whole original executable identity is claimed.

Run `python3 -B verify.py` using only this packet. Optionally supply `--current-main /absolute/repository/path` to compare actual current source and helper files with the bound build inputs. The verifier runs no compiler and executes no target transaction.

`validation/` provides the same ten comparison reports and separate sequence as losslessly compressed JSON for existing status tooling. `validation-bindings.json` binds every decompressed report to its exact member in the included, scratch-manifest-bound receipt archive. These are copies of the scratch results, not a main replay.
