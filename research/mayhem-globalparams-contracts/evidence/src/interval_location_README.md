# Mayhem interval-overflow Location correction

The interval-overflow path now reports the original panic location,
`programs/mayhem-program/src/state.rs:562:32`, instead of `562:27`.
Five indentation spaces in the reconstructed source produce exactly one changed
byte in the compiled ELF: offset 578012 changes from 27 to 32. Both artifacts are
625,136 bytes, and their instruction bytes and all other ELF bytes are identical.
This is a compiled source correction, with no post-build byte patch.

The baseline reproduces the PR214 candidate. Two clean root builds of the
corrected source produce candidate
`a76f8c094fe39f83d221b0d553a11aaa4327bc3663bbb7259270ea06b0f18e7e`
and symbols
`0d984deaee6fffeb23d7a413e174a57a6157c0ab6aa88b261e29d3195138140a`.
All 15 source hashes remain bound; only `src/state.rs` differs. The baseline
sources remain in the pinned parent packet, and the complete changed file is
retained here. Commands, tool hashes, compiler outputs and logs are retained.
The builds use the private copied dependency target and pinned Darwin v1.54
compiler/v1.52 strip recipe; this is not a new all-dependency clean build.

A fresh full legacy Sell matrix passes 396 cases with 792 independently checked
signatures: 134 successful and 262 rejected pairs. The independent verifier also
checks quote/CPI behavior, full state/event bytes and failed-call rollback.
The known normalized-log differences decrease from four to three:
`retained10001`, `retained65535`, and `quote_extreme_1_0_1`. Compute logs remain
outside this comparison. No new complete function match is claimed; the 188
examined matches, eight unmatched bodies and 245 opaque windows are unchanged.

Run with Python and solders installed:

```sh
python3 -B research/mayhem-interval-location-recovery/verify.py
```

Verification checks the literal one-byte delta, original/candidate Location
records, source-only change, repeated build identities and all 792 signatures.
It does not run a compiler or VM. The observed indentation is a reconstructed
source recipe, not proof of the author's historical formatting. Canonical source
and selected artifacts remain unchanged, and whole-ELF identity is still false.
