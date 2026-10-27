# Mayhem quote: same-IR backend control

Two installed LLVM backends compile the **same saved Rust-generated IR**. The
v1.54 backend reproduces the reference Rust build's 1,120-byte sell-quote
instruction body after the diagnostic masks below. The v1.52 backend instead
produces 1,288 bytes. Both report LLVM 20.1.7-rust-dev, but their executable
hashes differ. The v1.44 LLVM 18.1.7 backend rejects the unchanged IR at its
newer `initializes` parameter attribute and produces no object.

| Producer | Body bytes | Same-position 8-byte slots versus original | Aligned slots |
| --- | ---: | ---: | ---: |
| v1.54 backend | 1,120 | 124 / 140 | 125 |
| Reference Rust compiler build | 1,120 | 124 / 140 | 125 |
| v1.52 backend | 1,288 | 2 / 140 | 67 |

**No original function or whole-ELF identity is established.** This diagnostic
masks every call immediate and address relocation in a local copy. It does not
verify callee identity, referenced data, linked layout or runtime behavior and
is not a replacement for the repository's full matcher. It adds no global
matched window and does not promote a candidate. Different Rust frontend IR
could still change the result for any of these compiler versions.

The retained module IR was emitted by an earlier quote source control with a
borrowed key argument. Its source-input map, original IR receipt, Rust build
receipt and reference symbol artifact are retained. This packet replays the
saved IR; it does not claim a fresh complete Rust-source or dependency build.
The complete original source tree, SDKs and dependency caches are not bundled.
The tool-path, executable hash, version and command records were collected
after execution and are labeled accordingly.

The object reader extracts the real function symbol and its section bytes;
it never edits an executable. V1.54's masked body equals the Rust reference
exactly. This narrows the simple backend-substitution hypothesis, without
identifying the original Mayhem compiler or explaining the remaining sixteen
quote instruction slots. The earlier initializer host comparison concerns a
different function and must not be generalized to all code generation.

```sh
python -B research/mayhem-quote-backend-replay-20261027/verify.py
python -B research/mayhem-quote-backend-replay-20261027/test_verify.py
```

Verification is portable standard-library Python. It reads saved files only;
it does not run the retained compiler commands or execute target code.
