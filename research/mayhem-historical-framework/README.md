# Allocator context with consistent historical Anchor inputs

The 328-byte allocator body also occurs with historical Anchor runtime, derive
macros, program macro and registry versions together. It does not require the
Anchor 1.0.0 runtime used by [PR #261](https://github.com/lalalune/pumpfun-source/pull/261).
The actual historical Solana gate and a no-event control each produce 312 bytes.
A direct repetition reproduces the **complete curve archive**, including its
compiler object, byte for byte.

These are successful curve compilations inside **failed full-program attempts**.
The unmodified reconstructed root still uses Anchor 1.0 APIs. No whole-program
ELF, allocation image or runtime result is produced, and no original Mayhem
source attribution follows.

## Source and registry provenance

All fourteen Anchor packages resolve to source at
[`c0077c2`](https://github.com/otter-sec/anchor/tree/c0077c2a7de64361f451735ac89118bc89f1c277).
The packet retains 152 selected files, including SPL support, with their exact
Git blob associations. Only root workspace membership changes; the gated control
also applies the actual next-commit exclusion, producing `utils.rs` Git blob
`4fb84b0879c07819886ba419fee5b6434436555d`.

The historical root Cargo.lock supplies a 255-package registry dependency
closure. Cargo resolves 187 registry packages for this program; **every resolved
name, version and archive checksum occurs in that historical lock**. All 187
original archives and their 4,276 source-file hashes are retained and replayed
offline. The initial historical lock is pruned while the two reconstructed
program packages are added; the resulting lock is retained. This is a historical
dependency graph for the selected reconstruction, not the original Anchor
workspace build or the original Mayhem dependency graph.

Archive authentication occurs after the builds. It checks the same vendor maps
and file bytes observed before and after compilation; it is not described as
pre-build archive acquisition. The compiler and target libraries remain the
existing official v1.54 recipe, with the native Windows compiler and Linux target
libraries. The full SDK/target component lists and executable hashes are checked
before and after the three historical-graph attempts.

The program input remains the older 66-file qualified source at `21bf0cf`.
Only its dependency manifests, lockfile and curve IDL change. The IDL keeps the
three reconstructed CPI definitions and takes the official November 2025
`CreateEvent` definition from public-docs revision
`7d7abd77403f0646ea17468d7cb6e66b33dbc3ed`, Git blob
`1ecf2a032c83a4c7a66648e8bf21bd58dc2b6e4d`. It is not an entire historical IDL
substitution. The ordinary `declare_program!(pump)` invocation is unchanged;
no parser is manually appended and no alternate macro alias is injected.

## Actual compiler results

Each historical-graph attempt starts with an empty target directory and records
153 Cargo compiler commands. The wrapper passes compiler arguments through
unchanged. The retained native linker configuration uses the unchanged default
script; the failed roots never reach linking. Metadata/order qualification from
the older parent is not applied.

| Curve control | Helper bytes | Raw helper body SHA-256 |
| --- | ---: | --- |
| Historical event and historical framework | 328 | `d4ad3a73d04ec01a0c4ff8bd07b5eca189736db86e48dd19c8f082ba5ddcd3c1` |
| Same event with the historical gate | 312 | `7bd9b7c736fb26d0e71de4aacf548576ce65e5665b77fab9b07bf8506c0d31fb` |
| Historical framework, no event | 312 | `7bd9b7c736fb26d0e71de4aacf548576ce65e5665b77fab9b07bf8506c0d31fb` |

These body bytes equal the corresponding earlier object-level controls. They
are compiler-object section payloads, not a claim of linked-original raw-byte
identity. Symbol hashes differ among controls, so this packet does not claim
that every other section is unchanged or that whole objects equal the earlier
mixed-version artifacts.

The enabled archive is 593,102 bytes, SHA-256
`b7c51586b789078fef99fb869970d4f178d4da878ce27dd50e62f654b7984313`.
Its 156,904-byte object has SHA-256
`865d2595f7f375b14cbbe06f292c80646a08f1a60f5b0e4ec5130fd396b7b55a`.
One direct repeat changes only the output directory in the recorded curve
compiler command and reproduces both completely. It reuses the successfully
compiled historical libraries; it is not a fourth fresh full build. The actual
`anchor_lang` input is its `.rmeta`; that file, the companion `.rlib`, the
historical program-macro DLL, and producer/output bindings are retained.

All three roots fail with the same one missing `DuplicateMutableAccountKeys`
trait and two four-lifetime `Context` API errors. The rejected whole-program
builds are evidence against treating the historical framework as a drop-in
replacement for the present reconstruction. The source is not patched to hide
these failures.

Earlier failures are retained too: three offline resolution attempts stop at
missing historical versions; a fourth resolves a mixture of old/new packages,
then fails in `solana-sysvar` with four serialization-trait errors. That mixed
attempt records 149 actual compiler commands. Its existing-vendor package
identities are recorded, but those different registry source archives are not
duplicated here. The 187-archive replay applies to the three historical-graph
attempts. Initial derived compiler counts included auxiliary probes; original
results remain beside corrected counts, which the verifier derives from the
actual emit modes and Cargo logs.

## Verification and remaining work

```sh
python -I -B research/mayhem-historical-framework/verify.py
python -I -B research/mayhem-historical-framework/test_verify.py
```

Verification uses the standard library, reads only this packet and executes no
retained compiler, macro DLL or target. It checks archive/source hashes, source
scope, historical registry versions, Cargo/actual argument binding, compiler
primary-source membership, producer/output identities, raw curve archives and
the recorded failure boundaries. Its mutation tests also check relocation,
unsafe archives, unlisted cache/manifest files, and optimized-Python rejection.

The retained controllers evolved during exploration and use the original local
workspace layout. They are not a portable turnkey rebuild command. Launch
records and source snapshots identify each actual attempt, including changes
in dependency selection and the later derived-count correction. The compiler
trace and input observations provide provenance evidence, not a mathematical
attestation that arbitrary untrusted receipts describe real compilation.

This closes a sufficiency question about the allocator's historical compilation
context. It adds no linked-program coverage and does not qualify the newer
429-window source composition. Historical compatibility changes to the root,
their effect on actual output, and independent runtime qualification remain
separate work. No completeness, behavioral-equivalence or security claim is made.

The separate [current complete-macro composition](../mayhem-historical-macro-current-20261027/README.md)
already reproduces the newer parser-context artifact while keeping its Anchor
1.0.0 runtime. Its artifact-bound runtime receipts do not qualify these failed
historical-runtime roots or their curve-only outputs.

Anchor's Apache-2.0 license is retained in `historical-source.tar.gz`; modified
workspace/gate inputs are identified above and in each snapshot. All registry
archives retain their original licenses and notices. Public IDL authors retain
their ownership. Reused verification helpers are pinned to PR #261 in
`helper-origins.json`.
