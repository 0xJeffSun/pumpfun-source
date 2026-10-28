# Fresh native target-dependency builds of Mayhem437

Two fresh Windows-host builds reproduce **both complete published Mayhem437 ELF
files byte-for-byte**, including the unstripped symbol file. This extends
[the corrected native436 recipe](../mayhem-current436-native-seed-20261028/README.md)
to the [qualified437 source](../mayhem-current437-composition-20261028/README.md).
The existing437 record compiled the root against reused dependency caches;
these builds start with absent target directories and compile all target
dependencies again.

Only `src/instructions/fee_recipients.rs` changes among the 67 source inputs.
Every byte of that file comes from the published437 source archive. The Cargo
manifest, lockfile, metadata/path maps, compiler wrapper, linker wrapper, complete
linker script and tool/vendor inventories are unchanged from the corrected436
recipe. No new flag, padding, binary rewriting or normalization is used to
produce the outputs.

| Output, identical in both fresh builds and upstream437 | Bytes | SHA-256 |
| --- | ---: | --- |
| Compiler ELF with symbols | 889032 | `32098641a885e48451df4f6d8cb62f45afafc96651106f5e467ac3f7e0a9ab9a` |
| Ordinary `llvm-objcopy --strip-all` ELF | 755968 | `da217317cd82d23898b846c1d3b47d8643b495fad90796c2a6ef62b37cfbbeef` |

This is exact equality against the **published reconstruction**. Neither output
equals the unchanged original 777408-byte allocation image, SHA-256
`a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
No allocation image is manufactured. Matching the reconstruction does not prove
the original historical source or toolchain.

The independent offline window comparison reproduces **437 normalized windows,
141 raw-local windows, 431 recursively direct-call-closed windows, 4525 positive
internal-call observations and 499 positive Source observations**. Every row's
status and closure agrees with the 441-row upstream inventory. SweepFees O0076
is normalized/direct-call closed and remains raw-unequal. AMM Buy, AMM Sell,
BuyV2 and SellV2 remain unmatched. This packet adds no new recovered original
function and no new reconstruction percentage.

## Build and verification boundaries

Each build compiles 163 crate units, 85 for the target: 326 commands and 170
target commands in total. The historical host macro and its 61 pinned dependency
files are reused. Accordingly these are fresh **target-dependency/root** builds,
not fresh builds of every host input. Both builds check the pinned SDK v1.54,
Linux target-library tree, locked vendor contents and nine host executables
before and after compilation. These are recorded observations, not exhaustive
loaded-library attestations. Cargo is locked and offline; an operating-system
network-denial boundary is not claimed.

No SBF target, VM or blockchain transaction was executed. The existing437
runtime qualification remains in its upstream packet, bound to these same
artifact bytes. This packet neither reruns its transactions nor rechecks its
signatures and does not count them as fresh executions. Generic data, indirect
calls, complete behavior and security are not established by the window counts.

Default verification uses only Python's standard library and the files here:

```sh
python -I -B research/mayhem-current437-native-20261028/verify.py
python -I -B research/mayhem-current437-native-20261028/test_verify.py
```

It verifies exact source/Git associations, the one-file source composition,
unchanged compiler-recipe bytes, all compiler invocations and all 85 delivered
upstream metadata seeds, complete raw-output equality, allocated-byte preservation
under ordinary stripping, and the original-window inventory. It rejects unlisted
files, symlinks and special files. It uses the exact earlier reader/comparison
helpers without invoking their old packet-specific qualification entry points.
The retained compiler log establishes seed provenance; it is not evidence that
the older source snapshot equals437.

`report.json.gz` retains all original-window mappings, Source profiles, positive
call observations and output/section identities. The packet includes both raw
compiler logs, all wrapper records, source bytes, linker invocations/maps and
copied ephemeral inputs. Most dependency archives remain external build inputs;
their post-build hashes are recorded. Source/controller byte associations are
pinned at `317ae39d097620176f5c42474a8082edc90d3160`.

For an explicit Windows rebuild, supply the external inventories already
documented in the parent native packets and choose a new output directory:

```powershell
python -I -B controller/build.py --sdk <windows-v154> `
  --target-sysroot <linux-target-rust> --vendor <locked-vendor> `
  --msvc <msvc> --windows-sdk <windows-sdk> `
  --historical-macro-directory <historical-host-release> --output <new-directory>
```

The controller is the exact one used by both builds. Preparation provenance
retains its original local paths; the command above is the portable interface.
This current-source build closes dependence on a private target cache for
reproducing these artifacts with the supplied pinned inputs. It leaves the four
remaining original trade bodies and the deployed-binary identity objective open.
