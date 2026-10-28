# Partial Mayhem V2 source controls after qualified 436

This research checkpoint preserves four complementary source controls. None closes
another original function. All four retain exactly the qualified parent's 436/441
normalized whole windows, 141 raw whole windows, 429 direct-call-closed windows,
4,473 supported direct edges and 486 Source observations. Both complete Legacy
functions remain preserved. Five original windows remain unmatched.

These builds are **static research only**. No signed runtime result has been
executed for these four exact candidate hashes, and no qualified436 runtime
claim is transferred. They are neither whole-program byte identity nor a new
completion percentage. Matching individual field/store sequences and aligned
instruction slots are diagnostics, never additional matched functions.

| Control | Purpose | BuyV2 bytes | CFG blocks | Aligned slots | Final event writes | Event base |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Original | Reference | 18,648 | 289 | n/a | 39 | -1832 |
| R | Ordered scalar/key event snapshots | 18,592 | 290 | 841 | 39/39 | -1880 |
| X3 | R plus ordered output/input sizing helpers | 18,592 | 290 | 908 | 39/39 | -1880 |
| Y | R scalar prefix with direct key operands | 18,592 | 290 | 1370 | 1/39 | -1832 |
| Z | X3 sizing plus Y direct keys | 18,592 | 288 | 1177 | 1/39 | -1832 |

X3 and Z reproduce the complete conservatively recognized field-read sequence
before the first O0317 call. R and X3 reproduce all 18 recognized late field
reads and all 39 final event stores in order, with an event frame 48 bytes too
large. Y restores the event base but changes field/store order. Z demonstrates
that these source changes interact: its topology and call offsets differ more.
The same partial SellV2 body is present in each: 18,088 versus 18,096 original
bytes, 283 blocks on both sides, 954 aligned slots and seven call offsets equal.
Both V2 bodies retain all 48 immediate callee shapes, but neither matches whole.

Each folder contains the exact 67 source inputs in deterministic source.tar.gz,
a hash inventory, a source diff against qualified436, candidate and symbol ELFs,
actual launch/result records, linker inputs/map, stdout/stderr and full CFG and
field-read diagnostics. These were root recompilations against an existing
qualified dependency cache, not clean dependency rebuilds. Recorded source
inputs were unchanged during each build. No original ELF was a compiler input.

`summary.json`, `event-store-order.json` and each `preservation.json` are the
machine-readable observations. `verify.py` rechecks file integrity, exact source
inputs, build hashes and the unchanged whole-window/call/Source matcher against
the original evidence and packaged qualified436 symbol ELF. It performs no
build, VM, network or Git action. Run from any current repository directory:

```
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-v2-controls-20261027/verify.py
```

The original evidence ELF stays at `evidence/original/mayhem/deployed.so`.
External input hashes and the frozen parent manifest are recorded under
`reference/`. Diagnostic scripts are retained verbatim for provenance; their
original working-path assumptions are not part of the self-contained verifier.
The current-source distinction between WSOL transfer selection and
WSOL-or-default accounting selection is retained. Finite prior receipts do not
by themselves authenticate the original default-key branch semantics.
