# Mayhem type-ID bytes in the shipped Linux alloc library

The two 40-byte Mayhem type-ID bodies recovered by the
[Linux helper comparison](../mayhem-linux-helper-comparison/README.md) already
occur, unchanged and without relocations, in the official Linux x86_64 v1.54
`liballoc` object. The corresponding Darwin arm64 object contains the different
constants seen in the retained Darwin program build.

This adds **publisher archive → rlib member → complete object function** evidence
for the existing matches at capture offsets **599768 and 666624**. It adds **zero
new raw capture ranges**, runs no compiler/linker/VM, and preserves all four
possible pairings between the two linked Linux symbols and the two original
ranges. The differing constants are present in the prebuilt library objects;
they are not differences observed only after compiling the final program.

## Literal byte comparison

Each selected body consists of two LDDW instructions, into R0 and R1, followed by
EXIT. The checker decodes instruction fields, including zero continuation words,
and compares every body byte. These are literal instruction constants, not
values measured by target execution.

| Artifact family | R0 constant | R1 constant | Raw captured occurrences |
| --- | --- | --- | ---: |
| Linux shipped alloc object and both Linux linked functions | `0xb48b06e23bc32191` | `0x802914a71efcf08e` | 2 |
| Darwin shipped alloc object and both Darwin linked functions | `0xfc2cba3a8bdda727` | `0x09f7c3b95c533b40` | 0 |

Exactly 16 bytes differ between the two object bodies, all inside the four
32-bit immediate words. The body SHA-256 values are respectively
`adc10f09641de9edaafbcb44c1aef0ac342e2170f7e321d1a7993a744a6ed907`
and `151cc26517b94f6edc0dd28c729b7c8b45bdce2053f2e9ad8c0e362e891fa822`.

The object function's Rust symbol hash differs from the linked function hashes.
The checker binds **bytes**, not a same-symbol linker selection trace. It does
not establish that a final compiler copied this particular object instead of
emitting equivalent code from library metadata, nor isolate every compiler and
sysroot component causally. Host archive names alone do not identify the host
that produced the historical program.

## Object references and source annotation

Each host's liballoc has two ELF members and 99 nonempty function symbol records.
The selection is exactly the `core::error::Error::type_id` symbol family already
identified in the parent study; one function per host qualifies. The other 98
records are outside this type-ID comparison, not 98 failed raw matches. Both
complete ELF members from both hosts are retained in `objects.tar.gz`.

In each object, one 88-byte read-only table refers to the selected function at
table offset 56 using a type-1 REL record. The complete table and all nine
relocations are retained. Its other targets include named `StringError` drop,
Debug, Display and description methods; its nonpointer words are size 24 and
alignment 8. All nine object pointer fields contain zero addends. This identifies
the **shipped object's annotation**, not an authenticated original-program type.

Both release `version.md` files identify the same Rust commit,
`daa3af4a1110ec3f10ce08083bb0b7855a88416f`. The retained
[alloc conversion source](source/boxed-convert.rs) at that revision defines the
local `StringError(String)` in the conversion to `Box<dyn Error + Send + Sync>`.
Its Git blob is `8062658020239edfc517fe77e00dc54dd117e8ad`. This source/metadata
association is not a fresh source-to-object rebuild or proof that TypeId values
uniquely recover historical source types.

The two capture starts are referenced by actual type-8 stored pointers at
728232 and 731888. The first end, 599808, is a decoded direct-call target; the
second end, 666664, is referenced by the pointer at 732032. The checker reads
the generic-v0 high-word pointer representation, requires zero low words, and
rejects instruction-continuation targets. Start and end must be consecutive
entries in the union of decoded calls and relocated stored code pointers.
No captured loader relocation overlaps either body under the inherited
conservative 16-byte footprint. Boundaries remain inferred, not debug symbols.

## Archive provenance

Both full archives were independently hash-checked and scanned locally. The
assets and publisher digests are from the
[official v1.54 release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.54).

| Host archive | Asset ID | Bytes | SHA-256 |
| --- | ---: | ---: | --- |
| Linux x86_64 | 368583779 | 520154357 | `fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e` |
| Darwin arm64 | 368584261 | 415708909 | `1c8b3af5e8614e1c459393a95c5b19bfbcc8ed13822a1cb539fae68471f9bfbb` |

Under `rust/lib/rustlib/sbpf-solana-solana/lib/`, the selected rlibs are:

- Linux `liballoc-91c82d13bc4939af.rlib`, 6,746,928 bytes,
  SHA-256 `781c60a5d9e28a72bca31f6b811591ef0ad1446fc4afab649534e6fe97de7c76`.
- Darwin `liballoc-9b3e3f8db6f32888.rlib`, 6,746,976 bytes,
  SHA-256 `145885b240460ef2d72eba42f525a1cc2083b70ed0fc867d60cbb6b0329e4eb0`.

`provenance.json` records archive metadata, rlib identities and exact ar member
names/offsets/sizes/hashes. Four ELF members occupy 13,475,664 bytes, compressed
to 5,156,149 bytes here. Full archives, rlibs and non-ELF ar metadata are omitted.
`inputs.json` pins the capture, both linked ELFs and two existing parser files to
one repository revision. No executable or allocation image is generated.

## Verify offline

Python 3.11+ and the standard library suffice:

```sh
python3 -I -B research/mayhem-alloc-typeid-provenance/verify.py
python3 -I -B research/mayhem-alloc-typeid-provenance/test_provenance.py
```

The default verifies retained objects, repository pins, full function matches,
object references, capture boundaries and every finding. It explicitly reports
that full release membership was **not rechecked**. Supply already-downloaded
archives to independently replay both complete archive associations:

```sh
python3 -I -B research/mayhem-alloc-typeid-provenance/verify.py \
  --linux-archive /path/platform-tools-linux-x86_64.tar.bz2 \
  --darwin-archive /path/platform-tools-osx-aarch64.tar.bz2
```

The verifier hashes each full archive, checks the complete selected rlib, and
compares every ELF member with retained bytes. It extracts no executable tree
and runs no release tool. `--repo` supports a tree containing only the five
repository input pins. A minimal relocated `-I` replay is included in the tests.

The manifest detects accidental changes, not malicious replacement of the
package and its manifest. Original concrete type identity, historical build
recipe, complete program identity, indirect behavior and security remain outside
this evidence. The earlier 118-helper comparison and other target/host versions
retain their separate scopes. No selected checkpoint or stopped execution lane
changes.
