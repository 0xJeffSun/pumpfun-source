# Mayhem: platform-tools v1.54 shipped-object provenance

This offline check connects **10 distinct raw byte ranges** in the captured Mayhem
ELF to complete function symbols in the generic-v0 `libcore` and
`libcompiler_builtins` objects shipped in the official Darwin arm64 v1.54 archive.
All ten also equal same-named function bodies in the previously retained v1.54
Mayhem build. No compiler, linker, loader or VM was executed for this study.

The [existing v1.54 audit](../../repro/identity-audit/2026-10-25/mayhem-v154/REPORT.md)
already established eight of these linked-build matches. The addition is the
**publisher archive → rlib member → object function → linked body → capture**
chain, plus two conversion bodies absent from that audit's 118-function helper
table: `__floatundidf` and `__fixunsdfdi`. Absence from that bounded table is not
a claim that nobody previously found them.

## Results

Offsets below are file offsets in `evidence/original/mayhem/deployed.so`.
Each complete object symbol body occurs once in the capture's instruction section;
its start and end are consecutive decoded internal direct-call targets. This is
boundary evidence, not exhaustive recovery of the original symbol table.
No captured loader relocation overlaps any match under the conservative
16-byte footprint used by the checker.

| Linked symbol (Rust hash omitted here) | Bytes | Capture offset | Linked offset | In prior helper table |
|---|---:|---:|---:|---|
| core::fmt::write | 1,000 | 678096 | 510352 | yes |
| Formatter::pad_integral::write_prefix | 184 | 680640 | 512896 | yes |
| Formatter::debug_struct | 96 | 682192 | 514448 | yes |
| Formatter::debug_tuple | 136 | 682696 | 514952 | yes |
| core::str::count::do_count_chars | 1,480 | 685968 | 518224 | yes |
| __floatundidf | 512 | 703112 | 537392 | no |
| __fixunsdfdi | 184 | 705904 | 535184 | no |
| __ashlti3 | 168 | 706088 | 538584 | yes |
| __lshrti3 | 176 | 706256 | 538752 | yes |
| __multi3 | 344 | 706432 | 537904 | yes |

[findings.json](findings.json) retains exact symbol names, body hashes, object
identities, linked symbol extents and caller instruction bytes. Sixteen object
symbol records collapse to ten distinct capture ranges; aliases are not extra
recovered functions. In particular, three object labels share `__floatundidf`'s
512-byte body.

## Inputs and reproducibility

The [official v1.54 release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.54)
asset is `platform-tools-osx-aarch64.tar.bz2`, ID `368584261`, 415708909 bytes.
Its publisher SHA-256 is
`1c8b3af5e8614e1c459393a95c5b19bfbcc8ed13822a1cb539fae68471f9bfbb`.
[release.json](release.json) retains the relevant release/asset metadata and
[download-receipt.json](download-receipt.json) the successful acquisition receipt.
The local destination in that receipt was redacted; artifact bytes were unchanged.

The two selected paths under `rust/lib/rustlib/sbpf-solana-solana/lib/` are:

- `libcore-673053c840437f62.rlib` — 37551672 bytes,
  SHA-256 `228d058cc1991bb83a92b886db8c539485c6ca95335523b159851ca567be48b0`.
- `libcompiler_builtins-d02f1d3ca25f4ffa.rlib` — 3858166 bytes,
  SHA-256 `6a3544de6b8d5b1c228017d6991b1b362e828ccadf1a6863a10cb2b6f2c86c5e`.

[objects.json](objects.json) lists **every ELF member** of both rlibs, including
the member name, exact payload offset, size and SHA-256. All 354 objects are
retained unmodified in `objects.tar.gz` (41,257,368 uncompressed bytes;
12,843,501 compressed bytes). Non-ELF ar metadata is not retained separately.
The full release archive and rlibs are omitted to avoid a 416 MB duplicate.

The retained [version.md](version.md) identifies Rust commit
`daa3af4a1110ec3f10ce08083bb0b7855a88416f`. Its Cargo sources identify
`compiler_builtins` 0.1.160; the notices are pinned in
[source-notices.json](source-notices.json). This metadata is provenance supplied
with the release, not a fresh source-to-object compiler rebuild.

[repository-inputs.json](repository-inputs.json) pins the captured ELF, prior
unstripped and explicitly stripped linked ELFs, and prior helper/proof records
to repository revision `ba7883511942965c5c9def03971bdaff84963d6b`, with sizes,
SHA-256 and Git blob IDs. The two linked ELFs have identical complete `.text`
bytes and offsets; their whole files differ from the capture. No new executable,
allocation image or selected source checkpoint is produced.

From the repository root, using Python 3.11 or newer and no third-party modules:

```sh
python research/mayhem-sysroot-object-provenance/verify.py
python research/mayhem-sysroot-object-provenance/test_provenance.py
python -I research/mayhem-sysroot-object-provenance/verify.py
```

The default check verifies retained object bytes, all pinned repository inputs,
the complete scan, aliases, linked bodies and captured call boundaries. It
**explicitly reports that release-archive membership was not rechecked**.
To independently recheck the entire archive association, supply an already
downloaded official archive:

```sh
python research/mayhem-sysroot-object-provenance/verify.py --archive /path/to/platform-tools-osx-aarch64.tar.bz2
```

This first verifies the full publisher digest, streams the three selected members,
checks both full rlib hashes, and compares every embedded ELF member to the
retained objects. It never extracts or runs release tools. `--repo` permits a
separate directory containing only the five pinned repository input files.

## Scope and negative evidence

The selection is fixed before capture matching: every nonempty STT_FUNC in these
two rlibs, at least 64 bytes long, with no object relocation and no direct CALL
opcode. Indirect CALLX remains eligible. The full [scan.json.gz](scan.json.gz) records **286 eligible
symbols**, including **270 with no raw hit**, and **1,067 rejected symbols** with
reasons. Small bodies, relocatable bodies, direct-call bodies, other libraries,
other target variants and other host archives are outside the comparison.

Neither a no-hit result nor an excluded symbol eliminates v1.54 as a compiler
candidate: linking, relocations, optimization and source differences may change
bytes. The positives constrain particular prebuilt library bodies. They do not
prove a unique historical compiler, whole-program byte identity, dependency
identity, behavioral equivalence, or security.

No relocation or call displacement is masked, no executable is patched, and no
allocation padding is treated as compiler output. The older audit's decimal/LUT
and normalized matches retain their own evidence and scope.

## Attribution

The parser in [elf.py](elf.py) is adapted from the repository's
[earlier Fees sysroot provenance study](../fees-sysroot-object-provenance/verify.py);
the direct-call boundary approach follows its
[cross-program check](../fees-sysroot-object-provenance/cross_program.py).
The repository's MIT license covers this analysis code.

The unmodified retained objects are third-party Rust/core and compiler-builtins
artifacts. [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) identifies their source
revision and includes the corresponding upstream copyright/license texts.
They are not relicensed as original repository code.
