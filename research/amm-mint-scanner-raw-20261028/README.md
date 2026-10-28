# AMM mint scanner: exact raw function recovery

The source in `sources/recovered.rs` compiles to all **1,192 original bytes** of
the AMM function window **`0xf28b8..0xf2d60`**. Its SHA-256 is
`cd1639db833841b5299e37ae8ba4d5978cc9ee8db1988ebfe8881cd6634c564d`.
The function has no calls or relocations. No operands are masked for this result.

This is a standalone `native-transfer-fee` crate build, **not a complete AMM
build or a new whole-program coverage count**. No SBF code was executed.
The maintained source tree and selected artifacts are unchanged.

## Source and provenance

`source.patch` changes `crates/native-transfer-fee/src/lib.rs` in the union3
source archive at `8c1a7bf6d94a8aa49b8836dc2c57b6402fef3ad8`.
The verifier also checks that this file is byte-identical in union4's source
archive at `de95501138397befae3837165849e7bd6942edb0` ([PR #464](https://github.com/lalalune/pumpfun-source/pull/464)).
Both complete source archives and their Git blob bindings are retained.

The reconstruction deliberately controls compiler lowering:

- A successful-completion label and an ordinary `#[inline]` step helper place
  the shared return and loop merge as in the original.
- A match on extension kinds preserves the length-before-kind validation order.
- The transfer-hook check uses an iterator for its first two bytes and a Rust
  macro for the other 30 checks. Exposing these checks before LLVM's loop passes
  avoids the different loop specialization observed with one iterator.
- The transfer-fee length guard takes the positive `length >= 108` branch.
  Reversing this source guard is a retained negative control: it produces the
  same 1,192-byte size but differs at the last two instructions.

These are source reconstruction choices, not recovered historical source.
There is no inline assembly, byte embedding, object patching, generated linker
layout, padding, or custom LLVM pass option in the recorded acceptance builds.
The other three emitted helper functions retain their complete object body
bytes and relocation targets (`__multi3` / `__udivti3`). This does not establish
their eventual linked placement or qualify whole-program behavior.

## Compiler and controls

The compiler is the official [Anza platform-tools v1.44 Windows asset](https://github.com/anza-xyz/platform-tools/releases/download/v1.44/platform-tools-windows-x86_64.tar.bz2):

- Archive: 520,608,774 bytes; SHA-256
  `9e778abd95ff8bdac6eb033d9ff0ef49c7710c9c916e0e28b6f1b626a972fbfd`.
- `rustc -vV`: `1.79.0-dev`, Windows MSVC host, LLVM `18.1.7`, commit unknown.
  Separately, the shipped `version.md` records Rust revision
  `08b7341888ab480dfaaa0698300cbbbbb2d75b53`.
- `build.py` verifies the 1,831 retained SDK component identities before compiling.
  It uses the shipped SBPF sysroot, a fresh output directory and a local temp
  directory. It invokes only the compiler; archive/object analysis is Python.
- The unchanged baseline source reproduces the archived Linux union3 scanner
  byte-for-byte: 1,168 bytes, SHA-256
  `c2fd490b06baf53e297083498ec0171d7305b1c9c5ff8cc99e3a4735ed05a8dc`.
  This is a bounded control, not general Windows/Linux compiler equivalence.

Eight complete build receipts are included: two baseline builds, two negative
controls, an initial readable recovery and its repeat, and two builds of the
published source through the included controller. All four recovery bodies
equal the original. Each recovery/repeat pair also has identical complete
objects and rlibs. The published-source pair yields:

| Compiler artifact | SHA-256 |
| --- | --- |
| Object | `f789f1a600b20e6b296957cbb0e8c8660c64e154624ea37d049024a79777a1ad` |
| rlib | `5043d9b5222fe3112f1a046da0fe2f0d05f99c045cdccb4ebc4f8a8ba3bf5b38` |

The initial source spelling has a different rlib hash but the same complete
object. The raw object/rlib outputs are compiler artifacts; the included original
allocation capture is reference input. No whole allocation or ELF identity is
claimed, and no trailing bytes are fabricated.

## Reproduce

Offline evidence replay and counterexample tests require only Python 3:

```sh
python -I -B research/amm-mint-scanner-raw-20261028/verify.py
python -I -B research/amm-mint-scanner-raw-20261028/test_verify.py
```

On Windows, unpack the pinned official SDK into a workspace directory and run:

```sh
python -I -B research/amm-mint-scanner-raw-20261028/build.py --sdk PATH_TO_PLATFORM_TOOLS --output NEW_OUTPUT_DIRECTORY --case recovered
```

`--case baseline` and `--case last-guard-negative` reproduce the controls.
Output directories must not already exist. The controller never downloads
dependencies, runs a program on a VM, or accesses a chain.

The verifier checks the original boundary, Git-bound inputs, source patch,
standard compiler command, SDK/compiler identities, object membership in each
rlib, exact function bytes, lack of scanner calls/relocations, unchanged companion
bodies and relocation targets, and complete output repeats. Thirteen tests cover
relocated replay with network/process creation forbidden and reject resealed
counterexamples including branch-byte changes, changed companion calls, injected
relocations, source/compiler substitution and overbroad whole-program claims.
Receipts and hashes are reproducibility evidence, not cryptographic execution
attestation.

## Remaining work

Apply the patch to the current AMM composite, perform a complete compiler/linker
build, and verify whole-program window/call/data relationships and the relevant
runtime corpus before changing maintained checkpoints. No additional normalized
window, raw-body total, behavior coverage, security property, original toolchain
attribution or original source completeness is asserted by this packet.
