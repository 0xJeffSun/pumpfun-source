# Mayhem: current parser context and retained source controls

This packet preserves 4,287 research files in a 32,328,829-byte archive. It
includes source inputs, successful and failed controls, native outputs, maps,
compiler logs and signed offline receipts. SDK binaries and Cargo/target caches
are excluded. Restoring the archive executes no research code.

## Composed parser experiment

The historical parser experiment from
[the provenance study](../mayhem-allocator-parser-provenance/README.md) now composes
with the current [BuyV2 sizing source](../mayhem-sizing-panic-recovery/README.md).
The existing token-interface re-export is preserved. Only the curve crate's
library and Pump IDL change in the 67-input source set.

The added parser renders the older Anchor template against the current public
`CreateEvent` type. It changes the required curve `finish_grow` from 312 to 328
bytes and fixes its incoming reserve-helper call. The parser itself is absent
from the linked function map. This remains a **mixed-version source-context
experiment**, not authenticated original Mayhem source or a selected checkpoint.

| Measurement | Parent | Composed, qualified experiment |
| --- | ---: | ---: |
| Complete normalized windows | 429 / 441 | 429 / 441 |
| Raw-equal local bodies | 100 | 139 |
| Maximum injective body matching | 428 | 429 |
| Positive direct-call observations | 4,288 | 4,289 |
| Positive Source observations | 446 | 446 |
| Unmatched original bodies | 12 | 12 |

No earlier positive observation is lost. The 39 additional raw-equal bodies span
33,968 original text bytes; [the complete raw-gain list](raw-gains.md) identifies
their original addresses and candidate symbols. They include allocation,
formatting and generated account-info helpers. This does not recover an
additional complete business handler or establish transitive equivalence.

Two native root rebuilds produce identical complete artifacts using the existing
official macOS v1.54 compiler / Linux v1.54 target-library recipe and qualified
linker order. Their stripped output is 755,104 bytes, SHA-256
`ed5b4020ca2659b427739a384bc7c014e2b192f81cce60d7d9b770d4978f0232`.
The gated control reproduces the parent's stripped ELF exactly. Its raw ELF
differs from the parent in symbol/string section payloads; raw-file equality is
not claimed. The independent whole-file permutation checks 447 input sections,
4,838 direct calls and 10,553 local branches without modifying an ELF.

All 6,636 fresh trade comparisons pass functional checks and exact logs after
removing only compute-consumption lines. The verifier checks 13,272 signed
records and actual executed-program hashes. A separate 53-case initializer
rejection matrix and 16-case CPI matrix pass, with ten successful CPI cases.
The CPI matrix retains its existing exclusion of the zero-creator probe. These
are bounded synthetic corpora, not arbitrary-state or current-chain acceptance.

Whole original ELF equality remains false. The twelve unmatched bodies cover
111,288 original text bytes. The main README keeps its established research
checkpoint distinct from this experiment.

## Other retained work

The archive also preserves initializer, AMM and BuyV2 source controls, including
negative and failed builds. The best initializer control still differs in
19 instruction slots despite matching the 960-byte size, five call offsets and
both panic locations. Its key/account stack placement remains unresolved.
An AMM sell control has the original 17,312-byte size, but its body still differs.
Typed `Result` arithmetic improves the separate quote helper to 1,104 bytes
versus 1,120 original; cap selection remains different. A later native-mint `id()`
control reaches the original 1,120-byte extent but still fails the full matcher.
Slot-alignment measures
in these notes are diagnostics and do not replace the complete-body matcher.

## Verify or restore

From the repository root with its Python dependencies and `zstd` installed:

```sh
python -B research/mayhem-control-work-20261027/restore.py
python -B research/mayhem-control-work-20261027/verify_frontier.py
python -B research/mayhem-control-work-20261027/test_restore.py
python -B research/mayhem-control-work-20261027/test_frontier.py
python -B research/mayhem-control-work-20261027/restore.py \
  --output /absolute/new/research-copy
```

Use `--prefix allocator-current-parser-enabled/` to restore just that source
variant. `verify_frontier.py --skip-runtime` rechecks source, native receipts,
complete bodies, inherited typed references and whole-file permutation without
reading the trade corpus. Neither verification mode compiles or runs a VM.
Fourteen regression tests cover archive paths, real source/build mutations,
allocator corruption and substitution of the earlier checkpoint.

The archive retains the builders' actual local paths. Rebuilding requires the
pinned external SDK and dependencies described in their launch records; the
archive does not supply those caches. The old-template/current-event provenance
and Apache-2.0 source attribution remain in the linked provenance study.
