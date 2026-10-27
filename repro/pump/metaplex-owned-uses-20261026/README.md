# Metaplex owned-Uses recovery

This Rust reconstruction reduces the full captured-image mismatch from **1,479
to 80 bytes**. The complete read-only data section remains byte-identical. Of the
1,251 inferred functions, 1,250 are raw-identical; the residual is **79 instruction
bytes inside Utilize plus one relocation byte**. Whole binary identity is still
false.

Utilize now clones the small owned `Uses` value before reading it, preserving the
parent metadata value through the early error paths. The redundant explicit
remaining-use bound is removed; the existing checked subtraction enforces it.
Zero and total-use checks stay in place. The local is named `usage` so the compiler
reproduces the captured unwrap column. These are reconstructed source choices,
not a claim to have authenticated historical identifier spelling.

The same rejection domain holds for every u64 count: zero, above-total and
above-remaining requests fail before state mutation. The clone contains an enum
and two integers and does not allocate. The source changes are in `owned-uses.patch`.
Apply `base-source.patch`, `coordinate-only.patch`, then `owned-uses.patch` to
public revision `17e99434af5ead3e989c08f32af33609821d0bc0`. This sequence was applied
to original Git blobs and all 18 resulting file hashes checked independently.
The complete changed-file snapshot is in `source-snapshot.tar.gz`.

**147 runtime cases / 294 signature checks pass.** The 135 inherited cases are
supplemented by 12 direct, normally signed owner-use cases. They cover zero,
above-total, above-remaining, exact remaining, partial use, empty remaining,
maximum-u64 boundaries, Single use, terminal Burn and partial Burn. The verifier
checks decremented counters, unchanged total/method, burn supply/token effects,
rejection rollback and actual signatures. Delegated-authority success is not
covered by these new cases; the comparisons remain finite.

The isolated source build uses the previously verified Linux/amd64 image and
SDK v1.37 / Rust 1.68.0-dev. `command.json` records its inputs and paths. The SDK
and registry were read-only, and no captured executable was mounted for compilation.
The raw ELF is 707,448 bytes, SHA-256
`0b9e26663abd22ba76e6b978423dcb9c18f28fcdcbfb877feb4fb714346538b7`.
Appending the verified 86,543 zero bytes reconstructs the 793,991-byte allocation
image, SHA-256 `1ee425d089650d5e265b5ccbefb450dc657d71c6fba622197193d792fbbc619c`.
No executable bytes, relocations or headers were patched.

```sh
work/test-env/bin/python -B repro/pump/metaplex-owned-uses-20261026/verify.py
```

The remaining window still differs in a value-copy sequence and conditional
branch layout. Source-level copying, borrowing, `Copy` derives and branch hints
were measured separately; rejected trials remain under `work/rea-metaplex-*`.
This checkpoint does not resolve the other programs' byte-identity requirements.
