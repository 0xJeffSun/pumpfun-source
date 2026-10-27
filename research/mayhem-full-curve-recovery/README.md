# Mayhem full external curve recovery

The trade parser's boxed curve was reconstructed with only four reserve fields.
The captured helper allocates 144 bytes for `Account<Curve>`, rather than the
40 bytes produced by that abbreviated source. Restoring the complete external
curve, its wrapper and ordinary serialization/padding path adds **four complete
normalized windows**, preserving every earlier match:

| Original window | Bytes | Recreated body |
| --- | ---: | --- |
| O0018, 20232 | 424 | Box account parser used by V2 trades |
| O0020, 21080 | 424 | Box account parser used by legacy trades |
| O0047, 36904 | 656 | Allocator growth helper emitted by the serialization path |
| O0059, 41544 | 136 | Account parser called by the two boxed helpers |

Both boxed bodies have matching shapes for all four immediate callees. The
136-byte account parser still calls an unmatched decoder/owner helper at 26272.
The full checked decoder, unchecked decoder and padding routine remain unequal;
these four matches do not establish complete call/data or semantic closure.

The complete scan is **345/441 matching windows: 59 raw-local, 286 normalized-only,
96 unmatched**. The four newly matched extents total 1,640 original text bytes,
leaving **348,576 unmatched text bytes**. O0045 (`String::write_char`, 544 bytes)
also changes from normalized-only to raw-local because this layout reproduces
its local call displacement. That is an additional local byte match, not a new
recovery of a public handler or whole-file identity.

## Source and builds

The parent is the native Program + BuyV2 validation source, with its complete
54-input root/vendor map. Only `src/instructions/sell.rs` changes. The wrapper
stores the complete external account and exposes its existing reserve fields.
Its decoder serializes a default curve to determine the padded size, zero-fills
short inputs and delegates decoding; the remaining mismatch in that machinery
is retained explicitly. The appended account contains the full sequence through
`protocol_fees`. Field names are reconstruction labels, not authenticated
historical spelling. Existing handler source lines are preserved.

Two root builds reproduce candidate SHA-256
`995fc5a04fb8c8554a491082cf01cf6f36d595d55d649e011470b0641f637fad`
and symbol artifact
`ca7567992bd89a4157f28e81a8631d14971de9780267e4c90ee31e919ecaaa66`.
Both explicitly rebuild the vendored Anchor crate, then the root crate. Other
cached dependencies remain; this is not an all-dependency-clean build.

A rejected inlining experiment exposed reuse of an Anchor artifact after changing
vendor copies in a shared Cargo target. Its affected successor measurement was
excluded, the driver was corrected to clean Anchor explicitly, and the accepted
source was rebuilt twice. Those accepted outputs also equal the pre-experiment
candidate. No compiler output is patched or padded.

## Bounded runtime evidence

The packet retains fresh replay of all 6,636 trade comparisons, 1,032 admin
cases and three two-transaction Burn families. Independent verification checks
15,348 signature entries and rederives 624 complete successful admin-account
results. The verifier recomputes signed
transaction checks, tracked account results, rollback, events, CPI and return
predicates. Non-compute logs remain a separate measurement; differences are not
silently normalized into equality. Initializer execution is excluded. No
mainnet execution or exhaustive semantic equivalence is claimed.

```
python3 -B research/mayhem-full-curve-recovery/analysis.py --check
python3 -B research/mayhem-full-curve-recovery/verify.py
python3 -B research/mayhem-full-curve-recovery/test_scope.py
```

The last two require the prepared Python environment with `solders`. These
commands check saved evidence without compiling or executing a target. Sources,
build commands/logs, both artifacts, all-window inventory and runtime receipts
are retained or hash-bound to their parent. Canonical selected sources remain
unchanged; whole Mayhem identity is still unachieved.
