# Native compilation of the qualified 436-window Mayhem source

Six offline Windows builds compile all 67 exact source inputs from
`18131c169d26d10fb0899bf42d981da2cb47aa45`'s
[qualified composition](../mayhem-current436-composition-20261027/README.md).
The final recipe independently reproduces its **436 normalized windows,
141 raw-local windows, 429 direct-call-closed windows, 4,473 positive internal
call observations, and 486 positive Source observations**, with the same
original-window sets. It reproduces the complete Legacy Buy and Sell bodies
under the existing normalization. This is a compiler-portability result, not
a new improvement beyond upstream's reconstruction frontier.

The raw compiler ELF and ordinary stripped ELF **remain unequal to both the
upstream compiler outputs and the original allocation image**. Two extra
allocator functions add 720 bytes to `.text`. Neither normalizing those functions
nor reproducing all of the above counts establishes whole-image, generic-data,
indirect-call, or behavioral equivalence. No target program or VM was executed.

## Controlled recipe progression

Every row starts with a new target directory, invokes 163 crate compilations
(85 for the target), and keeps the same 67 source files. The historical host
procedural macro and its 61 pinned host dependency files are reused. Thus these
are fresh target-dependency/root builds, not fresh builds of every host input.

| Build | Compiler recipe change | Normalized / raw local | Positive Source observations |
| --- | --- | --- | --- |
| 01 | Current source with prior native metadata/path/order controls | 436 / 78 | 485 |
| 02 | Four published current metadata seeds and current whole-section order | 436 / 141 | 485 |
| 03 | Honor the current `bpf_writer.rs` source remapping | 436 / 141 | 486 |
| 04 | Relocatable historical-macro directory argument; fresh repeat of 03 | 436 / 141 | 486 |
| 05 | Map the newly introduced V2 module's Windows source separator | 436 / 141 | 486 |
| 06 | Fresh repeat of 05 | 436 / 141 | 486 |

All rows retain the same 436 normalized-window and 429 direct-call-closed sets
and the same 4,473 positive internal-call observations. Builds 02–06 retain the
exact upstream 141 raw-local IDs. The combined metadata/order change restores
63 raw-local matches relative to 01, with no raw loss. This experiment does not
separate the effects of those two recipe changes.

The four changed metadata seeds are read from the exact upstream compiler
commands, not fitted to target bytes: `anchor_lang=452e6e8126c1715a`,
`anchor_spl=828f8507a281b283`, `curve_accounts=6fe74b79504bb460`, and
`mayhem_recovered=cf9f0934f5538f31`. The final wrapper strictly binds all 85
target metadata mappings; the four-crate fallback used only in 01 is retained
in its historical controller snapshot.

The native linker script preserves every upstream section selector and its
order. Only archive/object filename prefixes are adapted. An initial strict
member-identity attempt rejected 64 selectors from three stale-metadata crate
objects before compilation; its unresolved list is retained. After using the
current seeds, all 447 selectors bind to the actual compiled member tables.
The offline verifier replays these recorded tables. It does not pretend that
all 23 selected archives are included, or that membership alone proves every
selector selected a live section. The full linker maps and actual captured root
objects are included.

## Source-location controls

The old wrapper appended an identity remap for
`vendor/anchor-lang/src/bpf_writer.rs`, overriding the new Cargo profile's
`src/bpf_writer.rs` destination. Build 03 changes that single mapping. It restores
O0270's Source descriptor at instruction offset 256 (`src/bpf_writer.rs`, line
33, column 9), removes 16 bytes from `.rodata`, and leaves the code-match sets
unchanged. Builds 03 and 04 reproduce both complete output files exactly.

The current source also introduces `pump_interface_v2.rs`. Two Source descriptors
in the unmatched SellV2 body (instruction offsets 18056 and 18080, lines 591/592,
columns 25/26) retained a Windows separator. Build 05 adds one exact observed
source-path mapping. The final build preserves Source profiles for every shared
linked function name, including this unmatched body. This supplies no new
original-window match. Builds 05 and 06 reproduce both complete outputs exactly.

## Remaining compiler-output difference

Upstream has 446 distinct complete function ranges; the final native image has
448. Every shared symbol-name group's multiset of complete normalized bodies
and Source profiles is preserved. The two extra ranges are:

| Start | Bytes | Function |
| --- | --- | --- |
| 687432 | 312 | `alloc::raw_vec::finish_grow`, hash `940366e7697cd140` |
| 687744 | 408 | `alloc::raw_vec::RawVec::grow_one`, hash `4c9a6d399ed6a0b7` |

Both come from the actual native `solana_stake_interface` archive, whose full
bytes are included under `provider/`. The verifier binds its executable sections
to the link-map extents and finds complete normalized counterparts in upstream.
Their local raw bytes differ. These are extra linked providers, not additional
recovered original functions. The reason this compiler/dependency context selects
them remains unresolved; it is not established as a host-compiler defect.

After both source-path controls, the entire 18500-byte `.rodata` payload is
byte-identical to upstream (SHA-256
`b23340a6f10ee020469a3aa6d4b7584d6978973368d75b9d2ab5051a5cc42975`),
at an address 720 bytes later. This is section-payload equality against the
upstream candidate, not against the original allocation image.

Final native outputs (also exact in build 06):

| Output | Bytes | SHA-256 |
| --- | --- | --- |
| Compiler ELF with symbols | 890080 | `9b9db8aeb27e69b3e3edec7d09f834b3e163fb958c3e76bcb2fe0451fedfaa07` |
| Ordinary `llvm-objcopy --strip-all` ELF | 756752 | `00fe0ffb6e6b442ab1a8d0cf54a6ffd7f8c1f94503423dce290b572ef1b24660` |

The original input is the unchanged 777408-byte allocation image, SHA-256
`a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
It is not a compiler output. No output bytes are patched, padded, normalized
in place, or used to manufacture an allocation image.

## Replay and rebuild

The portable replay uses only Python's standard library and the files in this
directory; it does not invoke compilers, Git, network tools, or a target runtime:

```sh
python -I -B research/mayhem-current436-native-20261028/verify.py
python -I -B research/mayhem-current436-native-20261028/test_verify.py
```

`report.json.gz` retains all 441 original-window mappings for every build,
raw IDs, positive call/Source observations, source profiles, section identities,
and extra-provider evidence. The unchanged upstream reader and closure primitives
are copied with exact Git-blob bindings; their packet-specific `verify` entry
points are not run. This is an independent static replay of the checks described
here, not a replay of upstream's runtime, typed-data, or complete qualification.

`controller/build.py` is an explicit Windows-only offline rebuild command. Supply
the exact SDK v1.54, Linux target-library tree, locked vendor packages, MSVC/Windows
SDK, and historical host macro directory pinned by the controller inventories:

```powershell
python -I -B controller/build.py --sdk <sdk> --target-sysroot <linux-target-rust> `
  --vendor <locked-vendor> --msvc <msvc> --windows-sdk <windows-sdk> `
  --historical-macro-directory <historical-host-release> --output <new-directory>
```

The historical host macro is the earlier native historical-macro build recorded
in [the native 432 composition](../mayhem-native-current432-composition/README.md),
SHA-256 `f27a8319f76f19654145bac61c5076745fd667e3167221f38e904d1024616551`.
Its DLL and original build receipts are retained; its pinned dependency files
remain required external build inputs. The current upstream comparison uses its
recorded macOS-host compiler with Linux target libraries, not a Linux-host build.

The controller checks SDK/target/vendor files and nine host executables before
and after building, preserves the raw invocations and errors, substitutes one
complete linker script, and strips with the ordinary SDK tool. The script/path
controls are deliberate compiler inputs. Preparation scripts under `provenance/`
retain the original local derivation; they contain historical absolute locators
and are not the portable entry point.

The next useful comparison is the actual allocator-provider and dependency
context against upstream's cached target inputs. No additional source rewrite
is justified by the equal normalized counts alone. The five original unmatched
windows remain O0076, O0077, O0079, O0083 and O0084.
