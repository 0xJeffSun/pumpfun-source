# Mayhem compiler-sharing controls and metadata

The SDK-declared Rust source makes `share-generics=no` the default at the
observed `-C opt-level=3`. Consequently, adding that flag through a Cargo
dependency profile does **not** demonstrate a transition from enabled to
disabled sharing. This refines the interpretation of the earlier
[allocator-sharing experiment](../mayhem-allocator-sharing/README.md), which
already noted propagated Cargo metadata as a confound.

Four direct dependency compilations hold Cargo's `-C metadata`, dependency
artifacts, source, working directory and other arguments fixed. Adding or
removing the explicit `no` flag leaves the complete machine-code object
**byte-identical** in both tested contexts. The `.rmeta` member and complete
archive remain unequal. This is a bounded object result; it does not establish
that every downstream compiler effect is caused solely by Cargo's metadata
argument. No historical compiler flag is established.

## Full-build matrix

This packet freezes all 65 source inputs of
[source/data recovery](../mayhem-source-data-recovery/README.md) at
`5f88c2f7e7b32bd499bda8aa86c68b6d6e061ac0`. It uses the native Windows v1.54
compiler with the same official Linux target libraries as that published
mixed-SDK recipe. Every control changes only `Cargo.toml`; the other 64 inputs
and all locked dependency versions remain identical. All builds use fresh
target directories and offline vendoring.

`sysvar` below means a package-profile flag on `solana-instructions-sysvar`;
`curve` means one on `curve-accounts`, preserving its existing path remap.

| Build | Text bytes | Function extents | Normalized original windows | Raw-local windows |
| --- | ---: | ---: | ---: | ---: |
| Published mixed-SDK reference | 664,520 | 456 | 426 | 70 |
| Native baseline | 663,512 | 449 | 426 | 75 |
| sysvar `no` | 664,520 | 456 | 426 | 70 |
| curve `no` | 663,800 | 454 | 426 | 75 |
| Both `no` | 664,232 | 451 | 426 | 70 |
| sysvar `yes` | 663,816 | 454 | 426 | 70 |
| curve `yes` | 664,368 | 461 | 421 | 76 |
| Both `yes` | 664,248 | 464 | 418 | 70 |

The baseline lacks seven duplicate helper extents: 312/408-byte allocator
helpers and an 8/16/40/48/176-byte I/O-error group, totaling 1,008 bytes.
The sysvar `no` profile restores the complete published function-shape
**multiset**, including the error group. Combining both `no` profiles leaves
the 288-byte error group missing. These results are not additive.

The explicit `yes` controls are separate settings, **not default-preserving
controls**. The curve and combined `yes` cases lose five and eight normalized
original-window matches respectively; those negative artifacts are retained.
The baseline's five additional raw-local matches are O0255, O0256, O0258, O0265
and O0271. They do not add normalized windows or establish whole-program
identity. Every build is assessed against all 441 unchanged original boundaries;
no new normalization masks are introduced.

The sysvar profile changes Cargo's metadata arguments for seven target-crate
names, including curve and the root. The curve-only profile changes two.
`findings.json` preserves every metadata value, full match sets and function
multiset differences. No source candidate or canonical checkpoint is promoted.
The later [sell-quote recovery](../mayhem-sell-quote-call-recovery/README.md)
is outside this frozen source comparison.

## Direct replay and source evidence

The SDK's `version.md` declares Rust revision
`daa3af4a1110ec3f10ce08083bb0b7855a88416f`. Retained files from that exact
[Anza Rust revision](https://github.com/anza-xyz/rust/blob/daa3af4a1110ec3f10ce08083bb0b7855a88416f/compiler/rustc_session/src/config.rs)
show the optimized-build default; `options.rs` marks the optional flag as
tracked. `instance.rs` also permits reuse of upstream `inline(never)` generic
instantiations when sharing is disabled. Source inspection follows the SDK's
declaration; it is not independent proof of how the SDK binaries were built.
The retained compiler source remains under its upstream MIT/Apache-2.0 terms;
both license texts are included in `compiler-source/`.

Each direct pair starts with a byte-exact replay of its corresponding Cargo
dependency archive and standalone metadata. The second compile changes only
the explicit `no` flag and output directory. Both code-object hashes repeat:

- Baseline metadata context: `32d5efc85029173a0a99ba6e514bcd525d7e6c973d05cbe4f014b6da2c6f958f`.
- sysvar-profile metadata context: `11c454d9c921368911675e32bd342307e363561739a70267999e50330a3363d4`.

These hashes differ **between** contexts. Within each pair, the code object is
identical and the Rust metadata member differs. Complete `.rlib` and `.rmeta`
files, actual command arrays, source/tool bindings and dependency hash inventories
are retained. The first exploratory replay compiled successfully from the wrong
working directory but failed the exact Cargo baseline gate. It remains under
`failed-direct/` and is excluded from accepted controls.

## Reproduction and limits

```sh
python -I -B research/mayhem-sharing-matrix/verify.py
python -I -B research/mayhem-sharing-matrix/test_verify.py
```

The standalone verifier uses only the standard library and hash-pinned existing
ELF/archive readers. It checks eight full builds (1,304 rustc invocations), four
accepted direct compilations and the failed direct baseline: 1,309 retained
invocations total. A fresh run of the included portable builder repeats the
sysvar `no` raw and stripped artifacts exactly:

- Raw compiler ELF: `2f799d509c5e7b66fcbe377ef79b56e6a9a0d2f82cea37bbc2c760fa60b552de` (868,520 bytes).
- Separately stripped ELF: `653c1b496d2bc48fa5a1c3f86341e8acf7e06b38ccde55183b946bcde99fa07c` (733,672 bytes).
- Published raw reference: `6d90940933cc97c7858fae262e77c0f735ee059c1a71350e500b156cd7809522` (868,280 bytes).

On Windows, supply the previously documented SDK/vendor inputs and existing
MSVC/Windows SDK to build another fresh output directory:

```text
python -I -B research/mayhem-sharing-matrix/build.py --variant alloc-provider --sdk <windows-platform-tools> --target-sysroot <linux-platform-tools>/rust --vendor <locked-vendor> --msvc <VC/Tools/MSVC/14.44.35207> --windows-sdk <Windows-Kits/10> --output <new-directory>
```

The builder checks 2,639 SDK components, 27 Linux target components, 215 vendored
packages and nine executable/library identities before and after compilation.
The lockfile uses 214 registry packages; one unused registry Anchor package is
still present in the 215-package vendor store. The full SDK archives and vendor
tree are external prerequisites. Historical exploratory controllers retain their
original local locators; `build.py` is the relocatable full-build entry point.

**No raw published ELF equality, new normalized window, runtime equivalence or
security result is claimed.** Equal function multisets omit order, call targets,
data, relocations and file layout. The objects are unpatched compiler outputs;
no allocation image, padding or deployed-byte substitution is used. Host build
scripts and proc macros run during compilation. No SBF program, VM or live
transaction is executed, and no OS-level network-denial claim is made.
