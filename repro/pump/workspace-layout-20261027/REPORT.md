# Workspace identity lane — 2026-10-27

The controlled actual-workspace build improves the sealed main Pump source from 568 to **572/1035 normalized windows**, with **111 raw windows**, no lost normalized windows, and 450,656/1,792,208 matched text bytes. Whole-ELF equality remains false.

The only source-input difference is Cargo geometry: the same40 Rust files are built at `programs/pump/src/...` in an actual virtual workspace. The same release profile and lockfile move to its root. Build01, which accidentally ignored the package release profile, remains rejected. The accepted control is source02/build02.

Build02 SHA256:
- Stripped: `ba91e28b6ca1cb7b6291744135b6b6bb62e756d8ffbacc900acce89b9e2b34d8`
- Unstripped: `dd3ff9a217f8688fe5b631504a6683c4e4916fc036ba4d86a6f52c033034e858`

The four gains are QuoteControl space (`0x68918`,704B), remove_mint (`0x69978`,1456B), set_mint_reserves (`0x69f28`,696B), and deserialize (`0xe4348`,744B). The direct-call-closed subset excluding data references remains132 windows.

## Runtime and binding

`captured-full-resumed.json.gz` passes44 suites/10,468 executions with10,464 paired diagnostic logs and zero mismatches. `captured-additional.json.gz` passes32 suites/2,657 executions and logs, zero mismatches. Corpora overlap. This is bounded local fixture evidence; source coordinates and compute usage are excluded from diagnostic comparison.

The initial full run retained38 passing suites, then its two-curve binding rejected the new workspace root before execution; five remaining suites were canceled. `scripts/pump_tokenkeg_two_curve_differential.py` now discovers the actual enclosing Cargo workspace and binds its root manifest and lockfile. It still rejects a wrong source or candidate; `binding-verification.json` records these checks. No VM or fixture logic changed. The original script, failure record and pre-fix hashes are retained.

`resume-validation.py` checked original bound inputs and exact current compiled sources, rechecked each reused suite and loader receipt, preserved script hashes, and ran all six missing suites. Its output identifies all38 reused results explicitly.

## Name experiments

All four name combinations remain572 normalized/111 raw with no gained/lost windows. Their857 candidate functions have identical normalized body multisets. The IDL supports module name `pump`; it does not establish the package name. No rename is recommended as a matching improvement or promoted.

| Build | Package | Program module | Candidate SHA256 |
|---|---|---|---|
|02|pump-recovered|pump_recovered|ba91e28b6ca1cb7b6291744135b6b6bb62e756d8ffbacc900acce89b9e2b34d8|
|04|pump|pump|c27fc4041b505e87366cf9917b6ab0b9cf5dbcfae3958fcc842c8cf2576cd947|
|05|pump-recovered|pump|7e26ebf31ed42c6a01129215deb915df6946b51e1eb53dd96c59ad010191783f|
|06|pump|pump_recovered|c27fc4041b505e87366cf9917b6ab0b9cf5dbcfae3958fcc842c8cf2576cd947|

Build05's Cargo compile succeeded but its trial postprocessor expected the renamed package's filename. `finalize-build05.py` copied and stripped the actual `pump_recovered.so`, without rebuilding or altering source, and records that recovery. No original bytes were supplied to any build.

Path triage found no credible additional whole-file move. The sole filename-length-only near pair was a generic quote-transfer-fee closure aligned to a sell_v2 error; it does not establish a function identity. No path edit was made.

## Reproduction

The public builder's optional `--workspace-layout` produces both build02 ELF hashes exactly, recorded in `portable-equivalence.json`. Keep the default standalone mode unchanged for the earlier sealed568-window checkpoint. The new bounded checkpoint and verifier are `repro/pump/workspace-layout-20261027/`; a fresh run of its archived-input reproducer also exactly matched both ELF hashes.
