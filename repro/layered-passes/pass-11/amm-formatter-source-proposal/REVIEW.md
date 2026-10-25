# AMM formatter dependency-source reconstruction

## Result

A narrow dependency-source restoration is now supported: replace only the current `solana-pubkey` formatter implementation with the retained stack-buffer/`bs58`/checked-UTF8 implementation. `restore-pubkey-formatter.patch` changes the formatter body, its required UTF8 import, and adds `bs58 = 0.5.1` with default features disabled to the current dependency manifest. The unchanged `five8` dependency is deliberately retained. No crate is downgraded and no repository lockfile is edited.

This is an algorithm/error-path source reconstruction, not a performance or safety fix and not a size-driven change. It is uncompiled and unexecuted. Root must separately review and stage it as an isolated full vendored crate, preserving all other upstream bytes and licenses, before any build. The selected `sources/` extracts are evidence, not a complete replacement crate; the complete source archives are retained under `archives/`.

## Current pinned source

The accepted AMM lock pins `solana-pubkey 2.4.0`, archive checksum `9b62adb9c3261a052ca1f999398c388f1daf558a1b492f60a6d9e64857db4ff1`. Its `write_as_base58` uses a44-byte buffer, `five8::encode_32`, and `from_utf8_unchecked`, followed by `Formatter::write_str`. The5,512-byte current renderer is symbol-attributed to this function by the complete admitted ledger; the40-byte Pubkey Display/Debug wrapper calls it.

The full current `five8 0.2.1` encoder and `five8_core 0.1.2` constants are retained. The scalar fixed32-byte algorithm makes binary/intermediate arrays with precomputed radix58 conversion tables and returns a u8 length. It does not produce `bs58::encode::Error` or a checked UTF8 Result. This explains why the current renderer lacks the two original typed unwrap paths. It is not evidence of a missing application `PumpAmmError` variant.

Current accepted-build feature metadata reports `borsh`, `bytemuck`, `curve25519`, `default`, `serde`, `sha2`, `std`. The formatter body itself is unconditional, not behind a feature that could select its old algorithm. `bs58` is only a dev-dependency in this current crate manifest, even though `bs58 0.5.1` already exists elsewhere in the AMM lock graph. A feature toggle is therefore not the evidenced restoration.

## Exact retained source and original machine evidence

The retained public `solana-pubkey 2.2.1` archive has checksum `40db1ff5a0f8aea2c158d78ab5f2cf897848964251d1df42fef78efd3c85b863`. Its function uses:

```rust
let mut out = [0u8; MAX_BASE58_LEN];
let out_slice: &mut [u8] = &mut out;
let len = bs58::encode(p.0).onto(out_slice).unwrap();
let as_str = from_utf8(&out[..len]).unwrap();
f.write_str(as_str)
```

The earlier retained `solana-program 1.18.26` Pubkey Display uses `bs58::encode(self.0).into_string()` instead. That allocating form does not explain the observed original fixed44-byte stack buffer and is not proposed. No other package/version variants were built or searched.

Original admitted renderer `[0x10e380,0x10e970)` and wrapper `[0x10e970,0x10e998)` support the stack-buffer source at the algorithm and error levels:

| Operation | Original instructions/data | Retained source correspondence |
|---|---|---|
| Fixed input/output | Output zeroed across44 stack bytes at0x10e388..0x10e3b0; four input u64 words at0x10e3b8..0x10e3f0; input loop through32 bytes | `[u8;44]`, Pubkey's32 bytes |
| Base58 carry loop | At0x10e4e0..0x10e520: output digit `<<8`, carry addition, division by58, modulo through multiply/subtract; carry-extension loop0x10e548..0x10e5c0 | Complete `bs58::encode::encode_into` inner loop and `while carry > 0` |
| Leading zeros |0x10e5f0 bounds32;0x10e618 reads original input byte; zero path appends a zero digit and checks44-byte bound | `input.into_iter().take_while(|v| **v == 0)` |
| Alphabet/reverse |0x10e790 points at0x120c57;0x10e7a8 indexes+128;0x10e818..0x10e858 swaps endpoints | Default Bitcoin alphabet and final `output[..index].reverse()` |
| Exact alphabet bytes | Original0x120c57 contains128 decode bytes followed by58 encode bytes; both match the Bitcoin alphabet derived from the retained `Alphabet` source | Alphabet data, without assuming Rust field layout from source order |
| Typed encode failure | Capacity failure reaches0x10e650; Result unwrap at0x10e698 uses0x123be0, size0/alignment1, formatter0x10de40; that formatter consumes exactly14 bytes `BufferTooSmall` | `bs58::encode::Error` has the sole `BufferTooSmall` variant and derives Debug; `.onto(...).unwrap()` |
| Checked UTF8 | Slice check at0x10e6a0; call0x10e708 reaches original0x1168a0, a complete admitted match to current `core::str::converts::from_utf8`; error route uses a second Result unwrap and16-byte/alignment8 payload | `from_utf8(&out[..len]).unwrap()` |
| Writer result | Final call0x10e740 targets0x1154f0; its full48-byte body matches current Formatter `write_str` | `f.write_str(as_str)` |

There is unusually precise additional source evidence: the original encode-unwrap source descriptor records `src/lib.rs:817:49`, and the UTF8-unwrap descriptor records `src/lib.rs:818:41`. These are exactly the two retained2.2.1 source lines and `unwrap` columns. They are **observations only**. The proposed function stays at the natural location in the current crate; no filenames, lines or padding are synthesized.

These algorithm, typed error, call and source-descriptor facts support the retained formatter source. They do **not** prove that the entire deployed dependency was the published2.2.1 crate, or that its full dependency graph/compiler/features match any local package. The source may have been copied or shared by another revision. No version is inferred merely from a string or size.

## Provenance and proposed scope

All six retained public `.crate` archives are checked against their exact cached crates.io index record checksums. The current packages additionally match the AMM lockfile checksums. Selected source members are byte-for-byte archive extracts and match their retained cache files; current Pubkey also matches the accepted build's isolated source cache. `source-provenance.json` records archive/index/source paths, hashes, versions as declared by archive metadata, and exact members. No network source or unverified recipe report was used.

The restoration uses the already-locked `bs58 0.5.1` algorithm; its fixed-slice EncodeTarget is unconditional and needs no alloc/std feature. `five8` and every other manifest dependency stay present. Future integration must record Cargo's actual minimal lock delta (expected to add the `bs58` edge to the patched Pubkey package), verify unchanged versions/checksums, and reject unrelated graph changes. This proposal does not manufacture that lock result ahead of Cargo.

A full local vendor copy or explicit source-manifest extra inputs is required for an eventual build. Editing the shared registry cache is prohibited. The archive provides the full license/source bytes so a vendored copy can preserve every non-formatter upstream byte. No `[patch]` wiring or build has been performed here.

## Limitations and verification

`python3 -B verify.py --repo /path/to/repo` verifies every retained archive/member, lock checksum, source transformation, complete admitted original/candidate body hashes, precise original instruction/data witnesses and descriptor-to-retained-source correspondence. It compiles and runs no target.

No post-restoration binary exists, so no byte, match-count, performance or whole-program equivalence gain is claimed. The original formatter's writer behavior still crosses an indirect trait call; all error paths and dependency-global ABI behavior are not proved. Application scalar specializations, serializer semantics, authentic initializer success, security acceptance and whole-original identity remain unchanged. The current frozen AMM package was not modified.
