# Current-parent AMM event-capture composition

This packet applies the existing [public event-capture patch](../amm-event-capture-independent-replay/README.md)
to the frozen [640-window source/ABI parent](../../repro/pump_amm/source-abi-recovery-20261027/README.md).
The source recovery belongs to the original `claude-amm-mid-20261027` authors.
This is new composition and execution evidence for the current parent, not a
newly discovered source transformation.

The candidate reaches **641/785 normalized windows**, retains all **128 raw
matches**, and covers **800,816/1,162,040 original text bytes**. The sole gain is
`create_sell_event` at original `0x52c58`, a complete 1,784-byte normalized body.
Its three actual immediate callees also match complete normalized bodies. The
window has no address relocations; its call operands differ, so it is not raw
equal. No earlier normalized or raw match is lost. **144 windows and whole-ELF
identity remain unresolved.**

Candidate: `dc6365752c9b2d8d5b3b2f304285f1b5a92ef10d9e2eedf4d705aae87715db53`.
Symbols: `1da44eed6c1226dbba63733e39a1684ce65f2759037e672e28419e8bff63a499`.

## Source and builds

The source recipe stages the exact frozen 51-file workspace, then applies the
byte-identical previously published patch. Only `instructions/swap/trade_v2.rs`
changes. The compiler sees captured user keys before the fallible clock read or
checked addition. No executable, IR or object bytes are edited.

Two ordinary Rust/Cargo builds agree on both hashes. The first uses an initially
empty target and rebuilds dependencies. The repeat copies that target into an
independent output directory and explicitly cleans the root package. Its log
also records dependency recompilation; it is not described as a root-only or
fully fresh dependency build. Linux/amd64 compiler containers run on the macOS
host with networking disabled, locked offline Cargo resolution and read-only
source/SDK mounts. The first Docker invocation downloads the pinned image before
starting that isolated compiler; the retained elapsed time includes this setup.

The checked inputs include SDK tools/target libraries and 169 authenticated
registry source/cache files from the parent. The actual legacy registry directory
is selected explicitly because this host has two registry source directories.
The standard v1.44 `llvm-objcopy --strip-all` has hash
`f078d5b1f9df4190e67938a13e81e1dda1057e16228ff1a6f2f5d5540c9e6aaf`, different
from the independent historical packet's strip executable. Three setup attempts
failed before compilation (missing strip path, a different strip hash and
ambiguous registry directories); their logs remain in `setup-failures/`.
Original historical build provenance and full dependency authentication remain
separate obligations.

## Fresh local execution and scope

All **25 maintained suites / 17,462 cases** pass on this exact candidate. The
independent saved-record audit verifies **35,074 serialized transactions,
35,418 signature fields and 17,537 pairs of identical signed messages**, with
no compared result differences. A separate focused replay passes ten sell-event
and sixteen buy-event cases, including successful original and candidate calls.
These scenarios overlap other corpora and are not additional unique coverage.
The established comparator removes source-coordinate and compute-usage log
fields; other recorded result fields are compared.

The newer parent's other supplemental matrices were not rerun on this candidate.
Its open resize-order differences are not claimed fixed. Maintained source,
selected checkpoint and earlier sealed packets remain unchanged; this qualified
research frontier is tracked separately. Immediate-callee checks do not prove
transitive code/data closure or exhaustive behavior. No live-chain transactions
were submitted, and whole-ELF identity remains false.

```sh
python -B research/amm-current-event-capture-20261027/verify.py
python -B research/amm-current-event-capture-20261027/test_verify.py
```

These commands verify retained evidence; they do not run a compiler or VM.
`controllers/` retains the actual composition/repeat drivers. The source recipe
and SDK/Cargo-cache requirements are the same as the linked parent and independent
packet. Supply those authenticated local inputs to reproduce the compiler runs.
