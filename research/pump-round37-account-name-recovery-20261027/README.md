# Pump Round37 account-name recovery: 747 to 748

The exact 232-byte original window at `0x2bc0` is recovered by a typed owned-label clone helper. The candidate matches **748/1,035 original windows**, retaining all 747 arithmetic-candidate matches and all 744 selected Round37 matches. Both fresh final compilations produce identical stripped and unstripped ELF hashes. The four recovered roots' pointwise direct-call closure covers **33 function pairs / 120 edges with no open direct edges**; indirect calls and data bindings are excluded.

The original helper branches on the Anchor error variant, calls the matching complete `String::clone` body, and stores the cloned name as its account-name origin. The proposed helper expresses that operation using Anchor's public error fields and a borrowed `String`, rather than formatting the already-owned label again. The reserved-recipient executable error uses this helper. Other error construction remains unchanged. The original Rust identifier, type-parameter spelling and API boundaries remain inferred.

The incoming original caller at `0x6fef8` remains unmatched. It is reached through the full-normalized matching Anchor dispatch wrapper at `0x125ae8`, attributed through the compiled `set_reserved_fee_recipients` wrapper. This is bounded caller attribution, not complete handler or data-reference recovery. The retained caller certificate states that limit.

The exact 748 binary passes **59 authority/recipient cases and 351 configuration cases**, including the executable-recipient failure, under the captured upgradeable-loader profile. Errors, state, events and CPI observations are compared by those unchanged harnesses; their paired diagnostics also have zero mismatches. The exact 748 ELF also passes its own complete **44-suite / 10,468-case** captured-loader run, with **10,464 log-bearing cases and zero diagnostic mismatches**. Full receipts and loader bindings are retained. The focused cases overlap the full corpus and are not added to its case count; the separate 747 result is not transferred.

This packet includes independent baseline (744), arithmetic parent (747), candidate (748) and repeat builds with complete primary source archives and build receipts. `account-name-only.patch` isolates the incremental source change; `proposed-against-round37.patch` includes the arithmetic prerequisite for independent composition. Readable proposed source files are retained under `proposed/`. No main object enters the external-only cache; no captured bytes are compiled, linked or patched into the candidate.

As in PR #339, this is a native Linux v1.44 / Linux SBF build, separate from the selected macOS-host/Linux-target Round37 recipe and ordered layout. No maintained source or README checkpoint is changed. Whole ELF identity, complete data/relocation bindings and historical compiler/source provenance remain open.

```sh
python3 -B research/pump-round37-account-name-recovery-20261027/verify.py
```

The verifier checks the complete manifest, input archives and native hashes, injective counts and preservation, all four complete bodies and direct edges, repeat identity, and the exact-candidate focused runtime/loader/diagnostic receipts.
