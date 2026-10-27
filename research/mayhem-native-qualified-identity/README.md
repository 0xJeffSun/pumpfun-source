# Native reproduction of the qualified Mayhem checkpoint

Three fresh native Windows builds reproduce the complete raw and stripped ELFs
of the [initializer Source-origin checkpoint](../mayhem-initializer-source-origins/README.md)
at `21bf0cf41ffed3c753630235969b6f183efabf35`. This extends the
[native compiler recipe](../mayhem-native-reference-identity/README.md) to the
qualified linker layout. It makes that reconstructed checkpoint reproducible
on another host; it does not recover a new original function or establish
identity with deployed Mayhem.

| Output, identical in all three builds and the published checkpoint | Bytes | SHA-256 |
| --- | ---: | --- |
| Raw compiler-linked ELF | 867,744 | `80b6250391f76ad918f521095f8e63ba6b5e92eb9481998a9c91e3959dff2408` |
| Separate `--strip-all` output | 733,352 | `03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175` |

These are unchanged compiler/stripper outputs, not allocation images. No ELF
patching or original bytes enter the build. The 66 source files equal the
upstream archive exactly. Upstream spells the initializer whitespace differently
from [our earlier correction](../mayhem-initializer-origins/README.md);
`source-difference.json` retains that difference, rather than claiming source
identity between those two archives.

## What changes for the native linker

The existing recipe restores target metadata, full-file source paths and relative
registry source inputs. Cargo's artifact filenames still differ across hosts.
The upstream script qualifies sections by archive **and member** name, so copying
it unchanged silently leaves some selectors unmatched.

The mapping is derived from retained published compiler invocations and actual
native invocations, paired by source identity and checked compiler options.
All 85 target units and 295 target dependency edges agree under the earlier
recipe. Eighty-four unit filename suffixes differ. Substituting those filenames
in the qualified prefixes changes **135 of 456 selectors**. Every section name,
selector order and all other script text remain unchanged. `selector-bindings.json`
retains each unit and each changed line.

The native linker wrapper checks the incoming default script's exact bytes and
substitutes the adapted script. Its only additional linker argument writes a
map. Windows rustc supplies a UTF-8 response file with one quoted argument per
line. The wrapper retains and decodes that observed form, rejects unsupported
escaping, and writes a checked equivalent response file to avoid the Windows
command-line length limit. The verifier compares the incoming OS arguments,
decoded arguments, forwarded arguments and actual response bytes.

All **456 selected input sections**, including their qualified owners, match
the actual native maps in order. After translating filename prefixes back, their
addresses and sizes equal the upstream map. They cover all 664,384 text bytes
without gaps or overlaps. The qualification identifies candidate input objects;
it does not authenticate the original program's source ownership. The parent's
documented multiplicity and sharing conflicts remain unresolved.

## Compiler and input evidence

Each fresh build records 163 Cargo crate compilations (78 host, 85 target),
13 auxiliary compiler invocations including two compile probes, and two separately
compiled native host wrappers. Across the three full builds this is **489 crate
compilations, 39 auxiliary invocations and six host-wrapper compilations**.
Every Cargo compilation is checked against its actual wrapper observation. All
tool, SDK, target-library and vendor inputs retain the preceding recipe's checks.

Every actual linker input is retained: ephemeral root objects and the version
script beside the invocation, and the 94 input archives in a content-addressed
store. The archive hashes and contents are checked independently. **54 archives
differ** from the first build in each repeat. Their differing members are
`lib.rmeta` and, in some cases, the archive symbol index. All other members,
including compiled object bytes, are identical. The original failed whole-archive
equality assertion is retained; identical final ELFs do not imply identical
intermediate metadata archives. No cause for the metadata differences is inferred.

Two direct root-compilation controls precede the fresh builds. Using unchanged
upstream selectors produces raw hash
`6f72a2efdf24401729555146d555303f4c3777eaa6cee14c9e29eb4ed8531888`,
which fails reference identity. Using the mapped selectors reproduces the
reference exactly. Three failed root attempts are also retained: a missing
Cargo manifest environment, an unhandled response file, and an intentional
response-capture stop. These are failed diagnostic attempts, not successful
reproductions. Probe wrapper binaries and available receipts remain in
`exploration/`; the six full-build wrapper compilations have complete receipts.

## Scope and verification

The independent original-window inventory remains **428/441 normalized,
100 raw-local and 13 unmatched**. This counts shape coverage, not an injective
assignment of original ownership. The initializer remains 920 bytes versus the
original 960. Its two Source descriptors, four bounded immediate data observations
and five normalized immediate callee bodies are checked separately. The qualified
parent differs from this checkpoint only at the three previously recovered Source
bytes; all executable bytes remain unchanged by that source correction.

No target VM, transaction or runtime suite is executed here. The upstream
checkpoint's runtime receipts remain attributed to that checkpoint and are not
claimed as new executions. Whole-original-ELF identity, historical source/build
provenance, recursive call/data identity and exhaustive semantics remain open.

Python 3.11+ and the standard library can check the complete saved packet:

```sh
python3 -I -B research/mayhem-native-qualified-identity/verify.py
python3 -I -B research/mayhem-native-qualified-identity/test_verify.py
```

Twenty tests exercise response-file escaping, substituted linker options,
changed forwarded arguments, duplicate selectors, incomplete text maps,
truncated archives, changed object members and unlisted manifest files.
`manifest.json` seals the packet. The borrowed ELF/compiler/initializer helpers
are byte-pinned to their upstream Git revisions and introduce no normalization
mask changes. `initializer_evidence.py` is a retained helper, not this packet's
verification entry point.

To rebuild, supply the same pinned SDK, Linux target libraries, vendor tree,
MSVC 14.44.35207 and Windows SDK 10.0.26100.0 used by the native recipe:

```powershell
python -I -B research/mayhem-native-qualified-identity/build.py `
  --sdk C:/inputs/platform-tools-windows `
  --target-sysroot C:/inputs/platform-tools-linux/rust `
  --vendor C:/inputs/vendor `
  --msvc 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.44.35207' `
  --windows-sdk 'C:/Program Files (x86)/Windows Kits/10' `
  --output C:/work/mayhem-qualified-native-repeat
```

Use a fresh output directory and compare both hashes with the table. The builder
uses Cargo `--locked --offline`, verifies inputs before and after compilation,
and retains compiler/linker observations. It reads source, compiler and linker
inputs; it does not read the original or reconstructed reference ELFs. This is
an isolated offline build, not an OS network-denial sandbox or exhaustive loaded
host-library attestation. Third-party SDK and dependency material retains its
original licenses; repository-authored scripts follow the repository license.
