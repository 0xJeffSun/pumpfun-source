# Canonical Relay source and exact build

This transition installs the complete 60-input reconstructed Rust source in
`programs/donation-relay`. The source and an explicit input-section ordering
recipe compile to the exact 818,280-byte captured ELF. The genuine offline
upgradeable loader produces the entire 830,448-byte captured program payload.
The 12,168 trailing bytes come from loader allocation, not executable padding.
The linker recipe is reconstructed; historical build provenance is not claimed.

The previous 23-input source, README and selection record are retained in
`historical-source23/`. The old pass-27 metadata and its 3,338-window queue remain
historical snapshots. They are not relabeled as the current Relay inventory.
The successor keeps all four core source maps, candidates, script sets, asset
checks, signatures, historical packages and queue checks. Its reviewed changes
are retained as diffs. The old Relay signature checkpoint is still verified as
a historical checkpoint; the current Relay source, build and payload have
separate exact checks.

`verify_current.py` checks canonical state; `verify_metadata.py` checks the
preserved historical metadata; `verify_portable_crypto.py` checks the saved
signature corpus with Python 3.12 and solders 0.27.1. These checks authenticate
recorded builds. They do not silently run a compiler or make network requests.

Pump, Pump AMM, Pump Fees and Mayhem are still byte-unequal. A finite differential
corpus and exact artifact reconstruction do not establish exhaustive security
acceptance or the unique historical source spelling.

## Recorded local validation

- Fresh canonical build: one root compilation, an empty target, network disabled; all 253 registry packages and 7,968 files verified before and after. ELF SHA-256 `56d81ec64a0ba070d3d23f3c1547b31d659e85716dfa2198ec4b0ce6cd355333`.
- Fresh real-loader deployment: 912 signed transactions; all 830,448 payload bytes equal. Payload SHA-256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`.
- Seven selection mutation tests pass. Independent controls also reject resealed modified verifier code and extra, missing or altered historical whitespace rules.
- Current-source, historical-metadata, source-scanner, tooling, and all nine captured-evidence checks pass.
- All retained portable signature routes and the exact Relay 536-record check pass; the lossless output is in `build/saved-crypto-verification.json.gz`.

The build controller in `build/` records the actual local invocation and paths, rather than claiming those machine paths are portable defaults. The [portable source recipe](../raw-elf-reconstruction/README.md) rebuilds the same 60-input source; the canonical selection gate proves that those inputs are installed here. Four literal whitespace attributes preserve two current source files, the archived dispatch and the recorded linker map without changing their bytes.
