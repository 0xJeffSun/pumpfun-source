# Mayhem trade origins and quote validator

This Rust successor reaches **429/441 normalized windows and 100 raw-local
matches**, retaining every match and positive call/Source observation of the
[provider-sharing parent](../mayhem-provider-sharing/README.md). The newly
matched window is the complete 1,296-byte quote validator, O0095. Twelve original
windows remain unmatched, covering 111,288 of 706,744 text bytes. Full ELF and
captured-allocation equality remain false.

The validator uses the SPL native-mint `id()` function in the quote-key test.
That ordinary Rust expression recovers the original branch and register flow.
The verifier checks its eight immediate callees and all fourteen typed data
references: error discriminants, strings, Source records, and vtables with their
immediate method callees. This is bounded reference closure, not a proof of every
transitive library implementation or historical compiler provenance.

The other source changes recover real shared trade arithmetic and move handlers
into their inferred interface modules. The source archive contains 67 files;
seven paths differ from the parent, including the new interface module. Actual
Rust line positions reproduce all 21 observed Source descriptors and three CPI
error origins across these handlers. Their 148 immediate-callee shape
observations agree as multisets. The complete handler bodies still differ:

| Handler | Original bytes | Reconstructed bytes | Complete normalized match |
| --- | ---: | ---: | --- |
| Legacy Buy | 13,848 | 13,680 | No |
| Legacy Sell | 12,992 | 13,008 | No |
| SellV2 | 18,096 | 17,936 | No |

These are reconstructed source arrangements that explain the observations;
they do not establish unique original source text or full handler call order.

## Build and layout evidence

A fresh dependency build reproduces the unqualified control. Two subsequent
native Rust builds reproduce identical complete qualified artifacts:

- Stripped candidate: `64da456052f6c359b5841e8e91c59db64a8e8778cf944fa13a158b141039c1ad`
- Symbol artifact: `6e88b2bc974e4fb11d51f04cc26475b685a510f7e8ee83a12b55afddd928eef3`

The source, compiler tools and target libraries are checked unchanged in each
build. The retained dependency-cache inventory records 253 library identities;
the program and Anchor root are compiled again for the qualified builds.
Original target bytes are comparison inputs, never compiler inputs.

The linker only reorders complete emitted sections. Two old outlined helpers
disappear through source-level inlining, leaving 447 sections. The independent
translation verifier predicts every output byte, including 4,838 direct calls,
10,554 local branches, relocated data, symbols and entrypoint. No padding,
instruction insertion or post-link patching is used.

## Runtime evidence and reproduction

Fresh qualified execution passes **65 case pairs / 130 signed records**: 17
successful pairs and 48 rejection pairs. These cover the three changed handlers,
their quote gates, native/token/Token-2022 SellV2 paths, arithmetic failures,
downstream CPI rejections, events and rollback. Original outcomes match the
unqualified control exactly, and all non-compute logs agree. Every execution's
actual program account is bound to the expected candidate or original hash.
The packet freezes its receipt checkers, fixtures and auxiliary harness sources.

This finite matrix is not exhaustive. Parent initializer, AMM, BuyV2 and extension
receipts retain their earlier artifact bindings; they are not relabeled as new
executions of this candidate. No chain deployment or live acceptance occurred.

```sh
python3 -B research/mayhem-trade-origins-validator/verify.py
python3 -B research/mayhem-trade-origins-validator/test_verify.py
```

The verifier performs no compilation or target execution. The recorded build
controller and commands retain their original SDK/source paths; reconstruct the
source archive and adapt those paths explicitly when rebuilding on another host.
Ten regression tests cover source and build tampering, layout/repeat changes,
the validator's discriminant and vtable, and trade Source/CPI-origin mutations.
The selected maintained Mayhem checkpoint remains unchanged. Remaining work is
the twelve bodies, the unresolved allocator relationship, full data/call/layout
identity, original build provenance and broader behavioral qualification.
