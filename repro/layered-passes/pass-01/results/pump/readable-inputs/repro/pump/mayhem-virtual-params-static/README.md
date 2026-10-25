# Static `set_mayhem_virtual_params` recovery

This immutable package preserves the Pump instruction's recovered dispatch,
account constraints, reserve arithmetic, and event sequence. The source hypothesis
is **uncompiled static research**. It adds **zero implemented handlers and zero
runtime receipts**. Whole-file equality remains false.

The required `sol_vault_authority` is Mayhem's off-curve `sol-vault` PDA and must
sign. A genuine authorized Mayhem invocation has not been established for this
lane; an ordinary direct keypair cannot meet that prerequisite. No signer bypass,
caller workaround, build, runtime fixture, or stopped initializer analysis was
performed.

`historical-evidence.tar.gz` contains all 59 previously sealed files and their
unchanged original manifest (SHA-256
`6b66e3e60d34b0ed34b34aaac7f3a554c3e96276490755eac3c42db699492988`).
Its `REPORT.md`, `findings.json`, and `source-hypothesis.rs` explain the findings.
`frozen-source.tar.gz` contains the 31 Pump source/Cargo inputs from Git
`49e4ccc17ab45308ff3160d20c3d580512b772af`, plus raw Git commit/tree objects proving
their membership. `reference-snapshots.tar.gz` preserves the eight historical
references, including captured IDL and prior scope notes. Older notes retain their
original checkpoint counts and are historical context only.

The separate immutable Pump42 ELF is
`repro/pump/holder-nested-fortytwo/candidate.so`, SHA-256
`c07e67b055c87da881b33c9e07bddf913d5b0beffa1cfe52169ba1bc3f6d2bbf`.
That hash is not a Git revision. The original ELF is bound separately in
`provenance.json`. Neither executable is copied or modified by this package.

From a repository checkout, with Python 3's standard library only:

```sh
python3 repro/pump/mayhem-virtual-params-static/verify.py
```

The verifier also works outside the checkout:

```sh
python3 /path/to/mayhem-virtual-params-static/verify.py \
  --original /path/to/original-pump.so \
  --candidate /path/to/immutable-pump42.so
```

It reads archives without extracting them, verifies every original sealed file,
the source Git object chain and source hashes, captured IDL/reference hashes, both
whole ELF hashes, and 22 windows against original raw bytes. It recomputes branch
and direct-call targets. It does not build or execute a recovered program, and
does not depend on current main source contents or historical `work/` paths.

`package-manifest.json` seals this publication wrapper and archives. The archived
historical `verify.py` is preserved unchanged; use the top-level portable verifier
shown above. A passing result validates static provenance, not runtime behavior.
