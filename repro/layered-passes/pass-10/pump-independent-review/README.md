# Portable independent Pump fee-basis review

The preserved independent review accepts only the narrow buy-side supply-selector correction: mode0 uses parsed mint supply, mode1 uses curve supply, and a zero virtual-base denominator returns6026. It finds exactly two compiled calls, in `buy` and `buy_exact_quote`; sell source and dormant whitelist helpers are unchanged.

**Coverage limit:** all220 inspected saved Surfpool fixtures (64 exact-quote and156 configured-fee) have equal mint/curve supplies of10^15. They do not establish runtime coverage of mode0 with divergent supplies. No full-wrapper, raw-binary or general behavior equivalence is claimed.

Run from any location with Python3.11+:

```
python3 -B /path/to/this/package/verify.py
```

The wrapper verifies the complete seal and provenance, creates disposable expected paths, and runs the **unchanged** original `history/review.py`. It checks the two incoming compiled calls, selector/zero-error instructions, both complete arithmetic helper mappings, all37 source hashes and the220 saved fixtures. Its output must equal the preserved original `history/result.json`. It builds nothing and executes no program transaction. The package's parent directory must be writable for the temporary tree.

All operational inputs come from frozen `repro/pump/buy-fee-basis-fortyeight` and the explicitly hash-bound baseline fixture. The original review, source assertions and failed-review history are preserved under `history/`; those historical paths are context only. The verifier does not access an old checkout or work directory. `input-origins.json` binds each copied input to the published scratch manifest, independent review manifest or baseline hash. `provenance/prepare_publication.py` records preparation only and is not part of the verification execution.

See `history/REVIEW.md` for exact original/candidate instruction evidence and remaining limitations. No new source, fixture, normalization rule, build or runtime test was introduced by packaging.
