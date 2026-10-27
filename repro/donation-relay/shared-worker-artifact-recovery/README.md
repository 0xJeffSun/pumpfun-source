# Relay shared worker: artifact-backed recovery

A fresh official Linux x86_64 v1.48 build and saved replay now promote the
[source-only shared-worker proposal](../shared-worker-source-proposal/README.md)
to self-contained artifact-backed research evidence. The complete **10,248-byte**
original worker window 112 has a normalized counterpart, with all **51/51**
direct local callees bound to complete normalized bodies.

Relay advances from **482/492 to 483/492 normalized windows** with no lost body
and retains **130 raw local matches**. The remaining original ordinals are
**92–100**. Their nine windows span 42,368 / 752,488 original text bytes (5.6%).
These are whole-window extents, not differing-byte counts or estimated effort.

## Reproducible build

The exact 56-file baseline and recovered source maps come from the source-only
packet. Only `src/shared_donation.rs` changes. No captured program byte,
assembly, output patch, padding or generated unused helper is a compiler input.
The source is reconstructed Rust, not proof of unique historical source text.

Both variants were compiled from fresh target directories. The build used:

- official Anza platform-tools v1.48 Linux x86_64 archive
  `a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597`;
- `rustc 1.84.1-dev`, SHA-256
  `89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d`;
- all 2,873 SDK files equal to the previously published v1.48 SDK manifest;
- all 253 locked registry archives checked against `Cargo.lock`, with 7,968
  extracted files checked byte-for-byte against their `.crate` members;
- the pinned amd64/glibc 2.41 container image
  `sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50`;
- no network access during either compilation.

The fresh baseline reproduces the prior full-Linux burn/close build exactly:

| Object | SHA-256 | Bytes |
| --- | --- | ---: |
| Baseline stripped | `c6ae09b906b3c6a88042e40b02e0a2f6598268061d7527b667c0e631655a3921` | 818,096 |
| Baseline symbols | `786d74595e015abb6a0eee39bc94ad0ce6304e4b066227c5a4f8a8ff8f327e4c` | 926,064 |
| Worker stripped | `bdd03c7765c65d5c7ea9f1c16900f766e38c97fcec3071e29678f0ae52772399` | 818,016 |
| Worker symbols | `1ca9e99a37864a75d854d815848c7ce7cae838a719591dfac0286addf2193120` | 925,984 |

Each successful log contains exactly one root
`--crate-name donation_relay_source_proposal` invocation. Two pre-compile cache
attempts are retained: the v1.48 cargo could not read a Cargo 1.94 sparse-index
cache, even with sparse protocol selected. Re-fetching the same lockfile with
v1.48 cargo produced the compatible cache used by both successful offline builds.
Those failures produced no target artifact and are not source/compiler negatives.

## Complete body and call evidence

The recovered worker is candidate window 97 at address 76,824. Its normalized
SHA-256 equals original ordinal 112:

`c2d4d9828ae9e8b49c789dbabf13c8321fc0381d006f5f9e66f8f2e445b8200a`

The worker is normalized, not raw, equal. Normalization masks only established
local direct-call displacements and relocated `lddw` pointer words. Registers,
opcodes, stack displacements, branches and ordinary immediates remain strict.
The packet retains the full 492-window baseline/recovered analyses, all match
rows, and every recovered call witness. No prior normalized or raw match is lost.

The candidate remains different from the 830,448-byte captured allocation:

- 818,016 candidate bytes;
- 12,432 original-only tail bytes;
- 414,655 differing positions over the common file extent;
- whole-file equality false.

Matching a local body and its direct callees does not establish referenced-data,
indirect-call, allocation, borrow, transitive semantic or final-layout identity.

## Fresh replay

The recovered candidate passes a fresh replay of **536/536 signed records**
covering **534 unique fixtures**, with zero comparison failure. Every saved
original observation is reproduced before original/candidate comparison. The
existing comparator checks errors, retained state, events, inner instructions
and return data under its documented exclusions.

This is repeat execution of the retained finite corpus. It adds no new privileged
settlement success, allocator-exhaustion or arbitrary-alias coverage and is not
a security-completeness claim.

## Scope

This packet advances the artifact-backed Relay research inventory only. Its
source baseline is the pre-security-metadata 482-window state used by the
source-only proposal. The separate security-metadata candidate still owns the
510-byte declaration and 247-byte dynamic-string-table result. This packet does
not claim those data gains are composed into the worker artifact.

Selected Relay source and `repro/donation-relay/current.json` remain unchanged.
Promotion of source or a metadata-composed artifact requires a separate reviewed
build/guard transition. Whole-program identity remains false.

## Verify

```sh
python3 -B repro/donation-relay/shared-worker-artifact-recovery/verify.py
python3 -B repro/donation-relay/shared-worker-artifact-recovery/analyze.py
```

Verification recomputes source-parent bindings, artifact hashes, complete
baseline/recovered windows, the no-loss delta, all worker callees, registry and
SDK records, build logs and the saved replay. It does not compile, execute a VM
or access a network.
