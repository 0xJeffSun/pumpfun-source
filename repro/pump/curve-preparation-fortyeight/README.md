# Pump connected decoder and account preparation

This checkpoint integrates the reviewed three-file correction for historical
BondingCurve decoding and shared account preparation. It preserves 48 bounded
handlers and five partial paths. Nine evidenced historical layouts now decode;
the three V3 trade bodies perform the recovered rent/reserve-aware preparation
before quote checks. The route retains its explicit short-account boundary.
The existing valid 166-byte Create/CreateV2 initialization is preserved.

A clean main build of the 37 recorded source inputs used the same v1.44 compiler
and observed v1.52 strip phase as the isolated build. The entire main executable
and symbol file equal the tested scratch outputs. The executable is 1,588,480
bytes, SHA-256
`b02a7e08b1f928a48793d909a86ef01c99cb3cb11a2aaf3d85e4ac422b989b51`.
The symbol file SHA-256 is
`95e2b7906dcfb0c343ac27346efddd7236a011dbf2fd156750a828a9852ef7a8`.
Neither equals the captured original program.

All 9,269 unchanged differential comparisons across 40 suites and 1,024 Surfpool
comparisons across 28 runners passed on that executable. The saved receipts
contain 24,352 differential signatures and 2,980 Surfpool signatures, with 32
additional original-only prerequisite signatures. Sixty-eight receipt bindings
identify the actual scratch inputs and carry them to main through complete
executable identity. Legacy receipt checkout maps remain incidental snapshots.
No unique cases or historical short-layout runtime coverage were added.

The complete 1,840-byte serializer, its 25 immediate targets and discriminator,
four error-metadata bodies and 62 immediate metadata targets retain their
normalized matches. The full inventory records all original/candidate windows:
original call-consistent matches change from 455 to 454, candidate-consistent
matches from 428 to 427, and raw-equal pairs remain 617. The new decoder and
preparation do not match the original split bodies. Source recovery and passing
regressions do not imply improved byte identity.

The sealed 750-payload scratch package retains the reviewed proposal, exact
source, complete static inventories, fresh receipts, logs and portable verifier
in `scratch-handoff.tar.gz`. The main source, build evidence, current bindings
and direct receipt copies are available separately here. `packaging-note.json`
records reconstruction of the initially empty driver stdout in the prebuild
archive; its observed digest and final driver output are both retained. No
compiler input or executable was repaired or altered during packaging.

```sh
python -B /path/to/curve-preparation-fortyeight/verify.py
python -B /path/to/curve-preparation-fortyeight/verify.py --check-current --repo /path/to/pumpfun-source
python -B /path/to/curve-preparation-fortyeight/verify.py --current-main --repo /path/to/pumpfun-source
```

Verification checks saved signatures with the accepted Solders dependency and
does not build, execute target programs, sign transactions or access a network.
The final command additionally requires all current inputs and package files to
be tracked. Mode/whitelist, residual settlement/events, broader routes and
creation, transitive code/data, historical build identity and full security
assessment remain incomplete. All stopped scopes remain stopped.
