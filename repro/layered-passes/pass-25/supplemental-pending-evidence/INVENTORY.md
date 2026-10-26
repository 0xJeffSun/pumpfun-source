# Supplemental pending evidence inventory

No archived controller/build/probe/VM was run. Complete sealed packages, not scratch output directories.

| Package | Known inner seal | Files | Directories | Raw file bytes | State |
|---|---|---:|---:|---:|---|
| amm-source-proof | `32825564c9164b980185c4b85d62fc4f4d66ec5ca296a5076621c1301dcde141` | 54 | 14 | 18909069 | source-only pending AMM proof; no new execution |
| amm-unexecuted-build-plan | `e3c3a9d36f0626091c428a943265d3e56f988722d77605e999c7b143e1cd7890` | 15290 | 2930 | 239281834 | UNEXECUTED AMM build plan; registry/source inputs retained, no controller/build run |
| fees-no-change-static-review | `fcd5e6a09a1b40f1a7b014d9d970046fb8e6263ad3114651d9db4d04ff886d51` | 17 | 1 | 1448915 | Fees NO-CHANGE limited static review; not runtime or original-equivalence acceptance |
| fees-admitted-with-values-static | `659afe6db95236c8fab594196e58a703ec69dfc5b2a3cb4fb0414fca1cf951b8` | 42 | 1 | 159022 | Fees NO-CHANGE admitted with-values limited static evidence; no execution |
| metadata-v2-unexecuted-proposal | `23082c205a00c409a7a045e5ced109e864cda39476d649e9af8fac73ce813202` | 10 | 1 | 46263 | UNEXECUTED metadata builder/verifier proposal; no final snapshot or builder run |

Logical compressed archive SHA256: `9fe6840b44db10873a91bd338b1904a1fb88d68b2a4f7bf59494389e8167ea39`.
Stored as 2 ordered parts, each at most64MiB. Every source file/directory mode and tar metadata is independently checked.
No Pump or Relay evidence package is duplicated; only the optional metadata-v2 code proposal is included.
