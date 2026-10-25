# Generated external-account codecs

The 31-handler Fees candidate now uses Anchor-generated account codecs for external
Pump `Global` and `BondingCurve` accounts and one shared AMM `Pool` type. Explicit
external `Owner` implementations are preserved. Sharing and donation parsing use
the same Pool layout instead of duplicate generated/manual implementations.

The clean main build is 766,600 bytes, SHA-256
`15f2751b06136e6922116705ba07cb96d75430076280ced3f8a7f770466d2291`.
It still differs from the captured original at byte 24. The original payload is
948,944 bytes, SHA-256
`4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
No executable bytes or headers were edited; the captured binary is read only after
source compilation. Smaller size is not evidence of closer whole-program identity.

## Evidence

All 17,372 comparisons pass: 17,331 existing cases, two genuine signed historical
initializer replays, 28 initializer rejections, two literal error-message checks and
nine new malformed external-account cases. The ten-step donation sequence also
passes with 20 normally signed transactions. The initial combined scratch build and
independent main build are byte identical. Existing tests were rerun with main
source bindings; targeted receipts retain the identical scratch candidate path.
The historical initializer replay adapts blockhash freshness only and does not
reconstruct the full historical bank.

The new cases cover short data, incorrect discriminators and invalid bools for
Global, BondingCurve and Pool. They compare Anchor error logs after excluding only
source file/line locations, selected state, balances, events and inner calls, and
independently verify transaction signatures. The previous candidate also passes
these nine behavioral checks; this change recovers generated instruction structure
rather than claiming a newly discovered protocol bug. Raw before/original/after
logs remain available.

Three complete checked decoders are 728 bytes each, matching the original
instruction structure after call/relocation masking except for two embedded
source-location constants. The captured Global/BondingCurve decoders point to
`programs/pump-fees/src/lib.rs:27`, and Pool to line 28. The recovered files retain
their actual source locations. Unchecked decoder patterns of 3,976, 1,448 and 2,904 bytes
also match with consistent mapped calls. These results support generated external
codecs; they do not uniquely identify the historical source macro or IDL inputs.

The complete diagnostic reports 389 bounded call-consistent matching ranges out of
510 examined, with 68 raw matches. Counts include overlapping categories and are
not confidence scores or a whole-program proof. Relocated data, masked call
immediates and unmatched ranges remain unresolved. `codec-comparison.json` records
the three decoder deltas; `function-matches.json` preserves the full diagnostic.
Reproduce with the matcher under `repro/pump_fees/framework-matching/` and the
packaged stripped candidate plus unstripped `symbol-source.so`.

## Reproduction and limits

`source-snapshot.tar.gz` preserves 18 build inputs at their repository paths.
The 28-file harness snapshot and hashes retain local Python dependencies and the
matcher. Restore snapshots to a separate checkout containing captured `evidence/`,
imported fixture inputs and initializer history before replaying if maintained
files have changed. Build records retain source/compiler/SDK/command/log hashes.
The retained single-type experiment under `global-only-control/` isolates the
Global change and passes 17,331 cases; its source and build inputs are preserved.

```sh
CARGO_HOME="$PWD/work/fees-v144-cargo-home" python scripts/build_partial_candidate.py --manifest programs/pump-fees/Cargo.toml --program pump_fees --artifact-name pump_fees_candidate.so --tools-version v1.44 --output work/replay-fees-codecs-build
python scripts/fees_validate_all.py --candidate repro/pump_fees/external-codecs-v144/pump_fees_candidate.so --output work/replay-fees-codecs.json
python scripts/fees_external_codec_differential.py --candidate repro/pump_fees/external-codecs-v144/pump_fees_candidate.so --baseline repro/pump_fees/error-enum-v144/pump_fees_candidate.so --output work/replay-codec-errors.json
```

Pinned external Cargo caches, Rust/Solana tools and Python packages remain
prerequisites; this is not a hermetic image. The 112 Surfpool comparisons remain
attached to the earlier `all-thirtyone-v144` executable and were not relabeled for
this change. The complete error enum correction is retained in this candidate.
The frozen source security review at 329fc44 excludes these additions. Complete
account/context parity, original-program security and byte identity remain open.
