# Fees formatting helper: shipped sysroot to linked bytes

The official Darwin arm64 platform-tools **v1.46.1** archive ships the exact
1,160-byte `core::fmt::write` body found in the retained v1.46.1 Fees build.
The same body occurs in the retained v1.46 build. It does not occur anywhere
in the captured Fees `.text`; the prior audit's corresponding captured window
is 1,056 bytes and equals the v1.44 build's body.

This adds a direct **release archive → rlib → ELF object symbol → linked
function** byte comparison to the existing
[controlled compiler audit](../../repro/identity-audit/2026-10-25/compiler-v1461/REPORT.md).
That audit already measured v1.46.1; this is not a new compiler build or a newly
discovered v1.46.1 exclusion. The narrower finding is that this negative helper
fingerprint is present in the shipped generic-v0 sysroot object before application
linking. Changing application source order alone cannot explain a difference
already present in that object, if the object body is linked unchanged.

## Exact observations

| Bytes | File offset | Length | SHA-256 |
| --- | ---: | ---: | --- |
| Shipped `core.rcgu.o` symbol | 670,992 | 1,160 | `c95bc90f012059c7644fb399e1344707a09e5fb7ef9f0ada292a5b22e734ebd6` |
| Retained v1.46.1 Fees build | 322,864 | 1,160 | same |
| Retained v1.46 Fees build | 320,240 | 1,160 | same |
| Retained v1.44 Fees build | 319,272 | 1,056 | `7a5339492369c3813ea033c29cf8313288cf8efa07b2da552321cebc9c9f13c1` |
| Captured Fees window | 775,776 | 1,056 | same as v1.44 |

The shipped symbol is `_ZN4core3fmt5write17h1292dd406f3af67fE`, in section 525,
`.text._ZN4core3fmt5write17h1292dd406f3af67fE`, of an ELF64-LE relocatable object
with `(e_machine, e_flags) = (263, 0)`. Its section-relative offset is zero.
The symbol's complete body has no object relocations and no SBF relative-call
immediates. Indirect-call instructions remain intact. All comparisons above use
unmodified bytes; **no instruction masking, relocation rewriting, zero padding,
or normalized match** is involved.

The verifier derives body bounds from the unstripped ELF symbol tables, checks
stripped/unstripped `.text` equality and the raw stripped body at the recorded
offset, and cross-checks the prior helper record. The captured binary is stripped:
its function identification/bounds come from the linked prior audit, not an
original named symbol. The new check reads that exact captured window and also
searches all of captured `.text` for the complete shipped 1,160-byte body; there
are zero occurrences. It makes no behavioral claim about the two implementations.

## Archive binding

Input repository revision: `b05ed7f023fcd2935564441ccf239a477790c741`.
The hash-bound repository inputs are listed in `provenance.json`.

- [Official release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.46.1),
  asset ID `564703966`, `platform-tools-osx-aarch64.tar.bz2`, 372,707,817 bytes.
- Archive SHA-256:
  `b8764fbd1cd2c7e99011f7b1ac645e1a6eb9313d3356c44ec7a2d46c4b340f5a`.
  It matches the retained release API's publisher digest. The acquisition command
  was a direct HTTPS download; no release executable was run.
- Archive member:
  `rust/lib/rustlib/sbpf-solana-solana/lib/libcore-d7515fd2b390385b.rlib`,
  32,617,896 bytes, SHA-256
  `508892859174d93bfeec246a85d77283e83ecfc481e2ee2225f3bd01c46ffe0d`.
- Its ar member `core-d7515fd2b390385b.core.e8f91360fcb7dc2d-cgu.0.rcgu.o`
  starts at rlib byte 31,413,080, is 1,204,816 bytes, and has SHA-256
  `bd8b5c5964af0dd1ac566932938fc44d814c1aaa2bdee95ac4fb0242d18c4476`.
  This complete object is retained as `core.rcgu.o` so symbol and relocation
  checks can run without the large release archive.
- `version.md` records Rust source commit
  `71e82b8fbf1c50edc2cb1bf711b1d5b15a2c7278`. This is a distribution's recorded
  source identity, not a source-to-toolchain reproducible-build attestation.
- A fresh stream check verified **all 30 files** in the prior selected distribution
  manifest against the official archive, plus `version.md`, and compared the
  retained object with its ar member. The 30 entries cover five tool paths and 25
  generic SBPF target rlibs, not the entire distribution. `ld.lld` is shipped as
  `llvm/bin/ld.lld -> lld`; the checker validates that exact link and hashes
  `llvm/bin/lld` in memory. It creates/follows no filesystem links. The initial
  failed check, which expected every selected entry to be regular, is retained in
  `audit-attempts.json`.

`archive-validation.json` is the successful run receipt. The large tarball and
rlib remain outside this packet. Default verification checks retained object and
repository bytes and explicitly reports that it has **not rechecked** the
archive-to-object association. To independently recheck that association, supply
the publisher-digest-verified archive with `--archive`; the checker hashes it
before reading members and never extracts or executes tools. Saved JSON receipts
alone do not authenticate omitted archive bytes or establish historic execution.

## Reproduce

From the repository root, using Python 3.11 or later, standard library only:

```sh
python -B research/fees-sysroot-object-provenance/verify.py
python -B -m unittest discover -s research/fees-sysroot-object-provenance -p 'test_*.py'
python -B research/fees-sysroot-object-provenance/verify.py \
  --archive /path/to/platform-tools-osx-aarch64.tar.bz2
```

The default checks are offline and read-only. The optional archive command is
also offline; acquire the linked release separately. Tests mutate instruction
bytes, archive payloads, symbol/section data, relocation references, duplicate
members, symlink destinations and external input identities. Rust's pinned
MIT/Apache license and copyright notices accompany the object; their source URLs
and hashes are in `license-sources.json`.

## Limits and next step

This packet attributes one unchanged linked routine to bytes also shipped in a
specific sysroot. It does not prove which files a historical compiler loaded:
the v1.46 body is byte-identical despite a different mangled symbol. It does not
identify the deployed compiler, recover missing application source, or improve
whole-file identity. Raw output, captured allocation size, and behavioral
equivalence are separate questions.

The useful constraint is on a **stock generic-v0 sysroot with unchanged linkage
of this body**. LTO/recompilation, custom sysroots, changed standard-library build
profiles, and mixed compiler/linker pipelines remain possible. v1.44 remains
the prior audit's strongest measured stock candidate. Future compiler trials
should record and compare the supplied sysroot object's body as well as the
frontend version; repeating the already measured v1.46.1 application build is
not needed to establish this particular mismatch.
