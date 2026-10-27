# Mayhem allocator sharing control

A single dependency-profile control reproduces the two allocator-function copies
missing from the native Windows build of the 60-input
[parallel recovery](../mayhem-parallel-recovery/README.md), pinned at
`d6e3792ceb3f2e72118bc75bd41db84c28c4ef65`. Setting
`-Zshare-generics=no` for `solana-instructions-sysvar` restores one 312-byte
`finish_grow` and one 408-byte `grow_one` copy. The resulting **428-function
normalized multiset** and **602,936-byte instruction-section size** equal the
published Darwin artifact. This advances the explanation of the native build
gap; it does not recover another deployed body.

The newer [411-window composition](../mayhem-composed-recovery/README.md) landed
while these controls were being validated. This packet keeps the 375-window
source fixed; it does not claim to build or retest that later composition.

**The raw published ELF is still unequal.** This experiment does not establish
that the historical build used this flag. It is a controlled way to reproduce
the missing multiplicities, not a change to selected source or a recommended
historical recipe. Cargo also propagates dependency-unit metadata changes from
the profile setting; this is not an assertion that only one byte of compiler
input differs.

## What the object evidence establishes

The baseline Token-2022 `instruction::burn` body has two static relocations to
an undefined `grow_one` symbol. The retained instructions-sysvar object defines
that symbol and its private `finish_grow` callee. The linked baseline also
routes the Pump BuyV2/SellV2 account-meta builders to that same grow helper.
Thus this sharing exists in the compiler objects, before linking.

With the provider control, the LLD map assigns the account-meta helper pair to
`solana_stake_interface`, while Token-2022 `burn` still uses the pair defined by
`solana_instructions_sysvar`. The two helper addresses become distinct, matching
the corresponding split in the published artifact. This is a bounded route
comparison, not complete call-graph equality or an attribution of the published
objects to particular archives. In particular, other sharing choices remain
different; the legacy Sell account-meta builder does not acquire the same helper
address as its published counterpart.

The verifier extracts all six retained object members directly from their
retained `.rlib` archives, checks their symbol definitions, the Token-2022 burn
relocations at offsets 912/1320, both linked call chains, and the map owners.
Each archive is bound to the dependency hashes saved before/after its map relink.
These files are compiler outputs from the pinned public dependencies; their
upstream licenses remain applicable.

## Controls and residuals

| Build | Text bytes | Function extents | Effect on missing copies |
| --- | ---: | ---: | --- |
| Published Darwin | 602,936 | 428 | Comparison reference |
| Native baseline | 602,216 | 426 | Missing 312 + 408 bytes |
| Flag only on Token-2022 interface | 602,216 | 426 | Missing copies remain |
| Flag only on instructions-sysvar | 602,936 | 428 | Complete function multiset agrees |

All controls preserve exactly the same **375/441 normalized original-window
matches**, including the same **59 raw-local matches**. Neither the consumer
control nor the provider control adds an original-window match. The comparison
uses the unchanged, hash-pinned parser and all 441 original boundaries.

The provider control's whole ordered normalized instruction section is still
unequal. Its raw instruction section has 7,811 differing byte positions against
the published artifact. The read-only data is 16 bytes longer and differs, as do
other data, relocations and symbols. Equal multisets, text sizes and selected
routes do not establish raw body, data, transitive-call or whole-file identity.
No compiler output is patched, padded or substituted; no allocation image is
constructed.

The provider raw linked ELF repeats exactly across three fresh dependency builds:

- Raw linked ELF: `fb99bcce659e4f56f94394a7c3f0abcdf2d99e10d14289dbfa7d19609290594f` (798,192 bytes).
- Separately stripped ELF: `8c9bd9e8b9331c69b5fe5ed3d2b345e2b47481c887f4db16258f2fefe264cc79` (669,968 bytes).

The native baseline raw ELF is
`432ea09e566f1300fcaa011f2b2878b953bd96acc42622cee411147d600e2c4d`;
the consumer control is
`c7cd1b9359fa3357cf593063721fe66daeee3b92c5aad4ab8735a8916a55da2a`.
The published raw symbol artifact is
`29a8d02de4981b3a31e88a248318ec764e721627d84dd17d636252fbf50caa8f`.

## Build and verification scope

Five fresh full builds contain 815 rustc invocations: 78 host and 85 target
invocations per build. Two additional root relinks add LLD maps and reproduce
their respective baseline/control raw ELF exactly. The three provider builds
use relocated source/target directories; the third executes the included
portable `build.py`. Other than the explicit Cargo profile addition, all 60
compiler inputs are identical to the published composition. No Rust business
logic or selected checkpoint changes.

Builds use the official Windows v1.54 compiler and Darwin v1.54 target libraries
from the [native baseline](../mayhem-native-windows-baseline/README.md), existing
MSVC/Windows SDK tools, and an offline checksum-verified vendor store. The
selected SDK/target components and checked executables are checked before and
after every full build. The current lock has 214 registry packages; the store
has 215 packages because its registry Anchor copy is unused by the path patch.
An initial preparation assertion confused those counts, and the dependent
launch failed before compilation; `failed/` retains both records. No failed
build supplies accepted output.

Compiler host code, build scripts and procedural macros run. No SBF target or
VM is executed by this packet. Existing runtime receipts remain bound to their
own candidates; the published sweep-rate behavioral gap remains unresolved by
this work; the later 411-window composition separately repairs that gap.
Cargo is offline; no OS network-denial or exhaustive host-DLL
attestation is claimed. The historical dependency-cache recipe remains open.

Default verification uses only Python's standard library and executes no
compiler, linker, target or network operation:

```sh
python3 -I -B research/mayhem-allocator-sharing/verify.py
python3 -I -B research/mayhem-allocator-sharing/test_verify.py
```

It checks saved receipts, sources, actual compiler flag delivery, all archive
members and object routes, both map relinks, complete function multiplicities,
all original-window sets, raw residuals, and repeated ELF bytes. It does not
rehash unavailable build-host SDK/vendor directories; their before/after checks
are recorded observations.

For an explicit fresh native build, supply the provisioned SDK/vendor/tool paths
matching the retained manifests and choose a new output directory:

```powershell
python research/mayhem-allocator-sharing/build.py `
  --variant provider `
  --sdk C:\inputs\windows-v154 `
  --target-sysroot C:\inputs\darwin-v154\rust `
  --vendor C:\inputs\vendor `
  --msvc "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.44.35207" `
  --windows-sdk "C:\Program Files (x86)\Windows Kits\10" `
  --output C:\probes\allocator-provider
```

`--variant baseline` and `--variant consumer` select the other controls. The
builder requires the retained raw and stripped artifact hashes and preserves
failure receipts. Historical preparation/map scripts retain their original
workspace locators; they are not the portable reproduction interface.

The next provenance step is to explain why the published dependency objects
expose a different set of reusable instantiations, then resolve remaining
function ordering, call routing, source paths, data and relocations. This
packet does not infer the original deployed source from compiler similarity.
